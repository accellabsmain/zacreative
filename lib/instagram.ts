import {
  INSTAGRAM_FALLBACK_POSTS,
  type InstagramMediaType,
  type InstagramPost,
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
  source: "instagram" | "behold" | "fallback";
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
    });

    if (posts.length >= limit) break;
  }

  return posts.length > 0 ? posts : null;
}

/**
 * Fetches latest Instagram posts on the server with 1-hour ISR revalidation.
 * Falls back cleanly to curated local posts when credentials are absent or API fails.
 */
export async function getInstagramFeed(limit = 8): Promise<InstagramFeedResult> {
  try {
    const beholdUrl = process.env.INSTAGRAM_FEED_URL?.trim();
    if (beholdUrl) {
      const beholdPosts = await fetchFromBehold(beholdUrl, limit);
      if (beholdPosts) {
        return { posts: beholdPosts, source: "behold" };
      }
    }

    const token = await resolveInstagramToken();
    if (token) {
      const graphPosts = await fetchFromGraphApi(token, limit);
      if (graphPosts) {
        return { posts: graphPosts, source: "instagram" };
      }
    }
  } catch {
    // Gracefully fall back so the landing page never breaks
  }

  return {
    posts: INSTAGRAM_FALLBACK_POSTS.slice(0, limit),
    source: "fallback",
  };
}

