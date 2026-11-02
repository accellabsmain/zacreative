import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { del, put } from "@vercel/blob";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { resolveInstagramToken } from "@/lib/instagram";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export interface IgSlide {
  id: string;
  type: string;
  url: string;
}

interface IgMediaChild {
  id: string;
  media_type: string;
  media_url?: string;
}

interface IgMediaItem {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  permalink: string;
  timestamp: string;
  children?: {
    data: IgMediaChild[];
  };
}

interface IgGraphResponse {
  data?: IgMediaItem[];
  error?: {
    message: string;
    type: string;
    code: number;
    fbtrace_id?: string;
  };
}

/**
 * Daily Vercel Cron endpoint to sync Instagram feed:
 * 1. Validates CRON_SECRET authorization.
 * 2. Cleans up posts and blob media older than 7 days.
 * 3. Fetches latest 5 posts from Instagram Graph API.
 * 4. Streams images directly to Vercel Blob (no in-memory buffering).
 * 5. Persists new posts in Database & revalidates frontend cache.
 */
export async function GET(request: Request) {
  // 1. Authorization check
  const cronSecret = process.env.CRON_SECRET?.trim();
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const userId = process.env.INSTAGRAM_USER_ID?.trim();
  const token = (await resolveInstagramToken()) || process.env.INSTAGRAM_ACCESS_TOKEN?.trim();

  if (!userId) {
    return NextResponse.json(
      { ok: false, error: "INSTAGRAM_USER_ID is not configured" },
      { status: 400 }
    );
  }

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "INSTAGRAM_ACCESS_TOKEN is not configured" },
      { status: 400 }
    );
  }

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // 2. Cleanup job: delete DB records and Blob media > 7 days old
  let cleanedCount = 0;
  let cleanedBlobsCount = 0;

  try {
    const expiredPosts = await prisma.instagramPost.findMany({
      where: {
        publishedAt: {
          lt: sevenDaysAgo,
        },
      },
    });

    if (expiredPosts.length > 0) {
      const urlsToDelete: string[] = [];

      for (const post of expiredPosts) {
        if (Array.isArray(post.slides)) {
          for (const rawSlide of post.slides as unknown as IgSlide[]) {
            if (
              rawSlide &&
              typeof rawSlide.url === "string" &&
              rawSlide.url.includes("blob.vercel-storage.com")
            ) {
              urlsToDelete.push(rawSlide.url);
            }
          }
        }
      }

      if (urlsToDelete.length > 0) {
        try {
          await del(urlsToDelete);
          cleanedBlobsCount = urlsToDelete.length;
        } catch (blobDelErr) {
          console.error("[CRON Cleanup] Error deleting expired blobs:", blobDelErr);
        }
      }

      const dbDel = await prisma.instagramPost.deleteMany({
        where: {
          id: {
            in: expiredPosts.map((p) => p.id),
          },
        },
      });
      cleanedCount = dbDel.count;
    }
  } catch (cleanupErr) {
    console.error("[CRON Cleanup] Error running cleanup job:", cleanupErr);
    // Cleanup failure should not block fetching new posts
  }

  // 3. Fetch Instagram Graph API (limit=6)
  const endpoint = new URL(`https://graph.facebook.com/v21.0/${encodeURIComponent(userId)}/media`);
  endpoint.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,permalink,timestamp,children{id,media_type,media_url}"
  );
  endpoint.searchParams.set("limit", "6");
  endpoint.searchParams.set("access_token", token);

  let graphData: IgMediaItem[] = [];
  try {
    const res = await fetch(endpoint.toString(), { cache: "no-store" });
    const payload = (await res.json()) as IgGraphResponse;

    if (!res.ok || payload.error) {
      const message = payload.error?.message ?? `Instagram API HTTP ${res.status}`;
      return NextResponse.json(
        { ok: false, error: message, step: "fetch_graph_api" },
        { status: 502 }
      );
    }

    graphData = payload.data ?? [];
  } catch (fetchErr) {
    return NextResponse.json(
      {
        ok: false,
        error: fetchErr instanceof Error ? fetchErr.message : "Failed to fetch Instagram API",
        step: "fetch_graph_api",
      },
      { status: 502 }
    );
  }

  // 4. Blob Upload & DB Persistence
  let syncedCount = 0;
  const skippedCount = { existing: 0, olderThanSevenDays: 0, noMedia: 0 };
  const failedPosts: { id: string; error: string }[] = [];

  for (const post of graphData) {
    try {
      const publishedAt = new Date(post.timestamp);
      if (isNaN(publishedAt.getTime())) {
        console.warn(`[CRON Sync] Skipping post ${post.id}: invalid timestamp`);
        continue;
      }

      // Ignore posts older than 7 days
      if (publishedAt < sevenDaysAgo) {
        skippedCount.olderThanSevenDays++;
        continue;
      }

      // Ignore posts already in DB
      const existing = await prisma.instagramPost.findUnique({
        where: { igPostId: post.id },
      });

      if (existing) {
        skippedCount.existing++;
        continue;
      }

      // Extract slide candidates (single post vs CAROUSEL_ALBUM)
      const rawCandidates: { id: string; type: string; mediaUrl?: string }[] = [];

      if (post.media_type === "CAROUSEL_ALBUM" && post.children?.data?.length) {
        for (const child of post.children.data) {
          rawCandidates.push({
            id: child.id,
            type: child.media_type,
            mediaUrl: child.media_url,
          });
        }
      } else {
        rawCandidates.push({
          id: post.id,
          type: post.media_type,
          mediaUrl: post.media_url,
        });
      }

      const validCandidates = rawCandidates.filter((c) => Boolean(c.mediaUrl));
      if (validCandidates.length === 0) {
        skippedCount.noMedia++;
        continue;
      }

      // Stream images directly to Vercel Blob
      const uploadedSlides: IgSlide[] = [];

      for (let i = 0; i < validCandidates.length; i++) {
        const candidate = validCandidates[i];
        const mediaUrl = candidate.mediaUrl!;

        const imageRes = await fetch(mediaUrl);
        if (!imageRes.ok || !imageRes.body) {
          throw new Error(
            `Failed to download image stream for post ${post.id} slide ${i} (${imageRes.status} ${imageRes.statusText})`
          );
        }

        const pathname = `ig-feed/${post.id}-${i}.jpg`;
        const contentType = imageRes.headers.get("content-type") || "image/jpeg";

        // Stream imageRes.body directly to Vercel Blob without in-memory buffering
        const blobResult = await put(pathname, imageRes.body, {
          access: "public",
          contentType,
        });

        uploadedSlides.push({
          id: candidate.id,
          type: candidate.type,
          url: blobResult.url,
        });
      }

      // Persist to Database
      await prisma.instagramPost.create({
        data: {
          igPostId: post.id,
          caption: post.caption ?? null,
          permalink: post.permalink,
          publishedAt,
          slides: uploadedSlides as unknown as Prisma.InputJsonValue,
        },
      });

      syncedCount++;
    } catch (postErr) {
      console.error(`[CRON Sync] Failed processing post ${post.id}:`, postErr);
      failedPosts.push({
        id: post.id,
        error: postErr instanceof Error ? postErr.message : String(postErr),
      });
      // Continue loop without failing the entire cron execution
    }
  }

  // 5. Revalidate cache on frontend
  try {
    revalidatePath("/");
  } catch (revalidateErr) {
    console.error("[CRON Sync] revalidatePath failed:", revalidateErr);
  }

  return NextResponse.json({
    ok: true,
    timestamp: now.toISOString(),
    cleanup: {
      cleanedPostsCount: cleanedCount,
      cleanedBlobsCount,
    },
    sync: {
      totalFetched: graphData.length,
      syncedCount,
      skippedCount,
      failedCount: failedPosts.length,
      failedPosts,
    },
  });
}
