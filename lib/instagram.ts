import { prisma } from "@/lib/db";
import {
  INSTAGRAM_FALLBACK_POSTS,
  type InstagramMediaType,
  type InstagramPost,
  type InstagramSlide,
} from "@/lib/data/instagram-fallback";

const IG_REVALIDATE_SECONDS = 3600; // 1 hour ISR
export const INSTAGRAM_CACHE_TAG = "instagram-feed";
const KV_TOKEN_KEY = "instagram:access_token";

interface GraphMediaItem {
  id?: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
}

interface BeholdPostItem {
  id?: string;
  caption?: string;
  prunedCaption?: string;
  mediaType?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  sizes?: {
    medium?: { mediaUrl?: string };
    large?: { mediaUrl?: string };
  };
  permalink?: string;
  timestamp?: string;
}

export interface InstagramFeedResult {
  posts: InstagramPost[];
  source: "database" | "instagram" | "behold" | "fallback";
}

function normalizeMediaType(raw?: string): InstagramMediaType {
  if (raw === "VIDEO" || raw === "CAROUSEL_ALBUM" || raw === "IMAGE") {
    return raw;
  }
  return "IMAGE";
}

/**
 * Reads a refreshed Instagram token from Upstash Redis REST KV if configured,
 * falling back to INSTAGRAM_ACCESS_TOKEN from environment variables.
 */
export async function resolveInstagramToken(): Promise<string | null> {
  const kvUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const kvToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl.replace(/\/$/, "")}/get/${KV_TOKEN_KEY}`, {
        headers: { Authorization: `Bearer ${kvToken}` },
        next: { revalidate: IG_REVALIDATE_SECONDS, tags: [INSTAGRAM_CACHE_TAG] },
      });
      if (res.ok) {
        const payload = (await res.json()) as { result?: string | null };
        if (payload.result && payload.result.trim().length > 0) {
          return payload.result.trim();
        }
      }
    } catch {
      // Fall back to env variable silently
    }
  }

  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  return envToken ? envToken : null;
}

/**
 * Persists a refreshed long-lived token into Upstash Redis REST KV when configured.
 */
export async function saveInstagramTokenToKv(token: string): Promise<boolean> {
  const kvUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const kvToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!kvUrl || !kvToken) return false;

  const res = await fetch(`${kvUrl.replace(/\/$/, "")}/set/${KV_TOKEN_KEY}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kvToken}`,
      "Content-Type": "text/plain",
    },
    body: token,
    cache: "no-store",
  });

  return res.ok;
}

/**
 * Loads Instagram posts synced to the database with permanent Vercel Blob URLs.
 */
export async function getSyncedDatabasePosts(limit: number): Promise<InstagramPost[] | null> {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const records = await prisma.instagramPost.findMany({
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    if (!records || records.length === 0) {
      return null;
    }

    const posts: InstagramPost[] = [];

    for (const record of records) {
      const rawSlides = Array.isArray(record.slides)
        ? (record.slides as unknown as InstagramSlide[])
        : [];

      const slides: InstagramSlide[] = rawSlides.filter(
        (s) => s && typeof s.url === "string" && s.url.length > 0
      );

      const mainUrl = slides[0]?.url;
      if (!mainUrl) continue;

      const mediaType: InstagramMediaType =
        slides.length > 1
          ? "CAROUSEL_ALBUM"
          : slides[0]?.type === "VIDEO"
            ? "VIDEO"
            : "IMAGE";

      posts.push({
        id: record.igPostId || record.id,
        caption: (record.caption ?? "").trim(),
        mediaType,
        imageUrl: mainUrl,
        permalink: record.permalink,
        timestamp: record.publishedAt.toISOString(),
        slides,
      });
    }

    return posts.length > 0 ? posts : null;
  } catch (dbErr) {
    console.error("[Instagram] Failed to read synced posts from DB:", dbErr);
    return null;
  }
}

async function fetchFromBehold(feedUrl: string, limit: number): Promise<InstagramPost[] | null> {
  const res = await fetch(feedUrl, {
    next: { revalidate: IG_REVALIDATE_SECONDS, tags: [INSTAGRAM_CACHE_TAG] },
  });
  if (!res.ok) return null;

  const json = (await res.json()) as BeholdPostItem[] | { posts?: BeholdPostItem[] };
  const rawList = Array.isArray(json) ? json : json.posts;
  if (!Array.isArray(rawList)) return null;

  const posts: InstagramPost[] = [];
  for (const item of rawList) {
    const mediaType = normalizeMediaType(item.mediaType);
    const imageUrl =
      item.sizes?.medium?.mediaUrl ??
      item.sizes?.large?.mediaUrl ??
      (mediaType === "VIDEO" ? item.thumbnailUrl ?? item.mediaUrl : item.mediaUrl ?? item.thumbnailUrl);

    if (!item.id || !imageUrl || !item.permalink) continue;

    posts.push({
      id: item.id,
      caption: (item.prunedCaption ?? item.caption ?? "").trim(),
      mediaType,
      imageUrl,
      permalink: item.permalink,
      timestamp: item.timestamp ?? new Date().toISOString(),
      slides: [{ id: `${item.id}-0`, type: mediaType, url: imageUrl }],
    });

    if (posts.length >= limit) break;
  }

  return posts.length > 0 ? posts : null;
}

async function fetchFromGraphApi(token: string, limit: number): Promise<InstagramPost[] | null> {
  const endpoint = new URL("https://graph.instagram.com/me/media");
  endpoint.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp"
  );
  endpoint.searchParams.set("limit", String(Math.min(Math.max(limit, 1), 24)));
  endpoint.searchParams.set("access_token", token);

  const res = await fetch(endpoint.toString(), {
    next: { revalidate: IG_REVALIDATE_SECONDS, tags: [INSTAGRAM_CACHE_TAG] },
  });

  if (!res.ok) return null;

  const payload = (await res.json()) as { data?: GraphMediaItem[] };
  if (!Array.isArray(payload.data)) return null;

  const posts: InstagramPost[] = [];
  for (const item of payload.data) {
    const mediaType = normalizeMediaType(item.media_type);
    const imageUrl =
      mediaType === "VIDEO"
        ? item.thumbnail_url ?? item.media_url
        : item.media_url ?? item.thumbnail_url;

    if (!item.id || !imageUrl || !item.permalink) continue;

    posts.push({
      id: item.id,
      caption: (item.caption ?? "").trim(),
      mediaType,
      imageUrl,
      permalink: item.permalink,
      timestamp: item.timestamp ?? new Date().toISOString(),
      slides: [{ id: `${item.id}-0`, type: mediaType, url: imageUrl }],
    });

    if (posts.length >= limit) break;
  }

  return posts.length > 0 ? posts : null;
}

/**
 * Fetches latest Instagram posts on the server:
 * 1. Database synced posts with Vercel Blob URLs (preferred).
 * 2. Behold / Graph API (direct fallback).
 * 3. Local curated fallback posts (guarantees the landing page is never broken).
 */
export async function getInstagramFeed(limit = 6): Promise<InstagramFeedResult> {
  try {
    // 1. Try DB first (synced via daily Cron + Vercel Blob)
    const dbPosts = await getSyncedDatabasePosts(limit);
    if (dbPosts && dbPosts.length > 0) {
      return { posts: dbPosts, source: "database" };
    }

    // 2. Behold external feed
    const beholdUrl = process.env.INSTAGRAM_FEED_URL?.trim();
    if (beholdUrl) {
      const beholdPosts = await fetchFromBehold(beholdUrl, limit);
      if (beholdPosts) {
        return { posts: beholdPosts, source: "behold" };
      }
    }

    // 3. Instagram Graph API directly
    const token = await resolveInstagramToken();
    if (token) {
      const graphPosts = await fetchFromGraphApi(token, limit);
      if (graphPosts) {
        return { posts: graphPosts, source: "instagram" };
      }
    }
  } catch (err) {
    console.error("[Instagram] Error resolving feed:", err);
  }

  return {
    posts: INSTAGRAM_FALLBACK_POSTS.slice(0, limit),
    source: "fallback",
  };
}
