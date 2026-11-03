import { putPublicMedia } from "@/lib/blob-storage";

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function decodeHtmlAndJsonUrl(raw: string): string {
  return raw
    .replace(/\\u0026/gi, "&")
    .replace(/\\x26/gi, "&")
    .replace(/\\\//g, "/")
    .replace(/&amp;/gi, "&")
    .trim();
}

export interface ExtractedIgMedia {
  imageUrl: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

/**
 * Layer 1: Extract high-res image URL directly from Instagram's public
 * /embed/captioned/ or /embed/ HTML endpoint (no API token required).
 */
async function extractFromInstagramEmbed(
  shortcode: string,
  variant: "captioned" | "plain"
): Promise<ExtractedIgMedia | null> {
  const endpoint =
    variant === "captioned"
      ? `https://www.instagram.com/p/${encodeURIComponent(shortcode)}/embed/captioned/`
      : `https://www.instagram.com/p/${encodeURIComponent(shortcode)}/embed/`;

  const res = await fetch(endpoint, {
    headers: {
      "User-Agent": BROWSER_UA,
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const html = await res.text();
  if (!html) return null;

  const isVideo =
    html.includes("EmbeddedMediaVideo") ||
    html.includes('"is_video":true') ||
    html.includes('\\"is_video\\":true');
  const isCarousel =
    html.includes("EmbedSidecar") ||
    html.includes("GraphSidecar") ||
    html.includes("Carousel");

  const mediaType: ExtractedIgMedia["mediaType"] = isCarousel
    ? "CAROUSEL_ALBUM"
    : isVideo
      ? "VIDEO"
      : "IMAGE";

  // 1. Primary: <img class="EmbeddedMediaImage" ... src="..." />
  const imgTagMatch =
    html.match(
      /<img[^>]*class="[^"]*EmbeddedMediaImage[^"]*"[^>]*src="([^"]+)"/i
    ) ||
    html.match(
      /<img[^>]*src="([^"]+)"[^>]*class="[^"]*EmbeddedMediaImage[^"]*"/i
    );

  if (imgTagMatch?.[1]) {
    const cleaned = decodeHtmlAndJsonUrl(imgTagMatch[1]);
    if (cleaned.startsWith("http")) {
      return { imageUrl: cleaned, mediaType };
    }
  }

  // 2. Secondary: Embedded JSON display_url or thumbnail_src inside embed script
  const jsonUrlMatch =
    html.match(/\\?"display_url\\?"\s*:\s*\\?"(https?:[^"\\]+(?:\\.[^"\\]*)*)\\?"/i) ||
    html.match(/\\?"thumbnail_src\\?"\s*:\s*\\?"(https?:[^"\\]+(?:\\.[^"\\]*)*)\\?"/i);

  if (jsonUrlMatch?.[1]) {
    const cleaned = decodeHtmlAndJsonUrl(jsonUrlMatch[1]);
    if (cleaned.startsWith("http")) {
      return { imageUrl: cleaned, mediaType };
    }
  }

  return null;
}

/**
 * Layer 2: Automatic fallback via Microlink OpenGraph resolver for Reels/posts
 * where datacenter IP hits an embed challenge.
 */
async function extractFromMicrolink(
  permalink: string
): Promise<ExtractedIgMedia | null> {
  const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(permalink)}`;
  const res = await fetch(apiUrl, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) return null;

  const payload = (await res.json()) as {
    status?: string;
    data?: {
      image?: { url?: string };
      logo?: { url?: string };
    };
  };

  const imgUrl = payload?.data?.image?.url;
  if (
    !imgUrl ||
    !imgUrl.startsWith("http") ||
    imgUrl.includes("static.cdninstagram.com/rsrc.php")
  ) {
    return null;
  }

  return {
    imageUrl: decodeHtmlAndJsonUrl(imgUrl),
    mediaType: permalink.includes("/reel/") ? "VIDEO" : "IMAGE",
  };
}

/**
 * Resolves the thumbnail from an Instagram post/reel shortcode with automatic retries,
 * downloads the image binary, and streams it permanently into Vercel Blob.
 */
export async function fetchAndUploadInstagramThumbnail(params: {
  itemId: string;
  shortcode: string;
  permalink: string;
}): Promise<{ blobUrl: string; mediaType: ExtractedIgMedia["mediaType"] }> {
  const { itemId, shortcode, permalink } = params;

  let extracted: ExtractedIgMedia | null = null;

  // Attempt 1: /embed/captioned/
  try {
    extracted = await extractFromInstagramEmbed(shortcode, "captioned");
  } catch (err) {
    console.warn("[IG Worker] Embed captioned attempt failed:", err);
  }

  // Attempt 2: /embed/
  if (!extracted) {
    try {
      extracted = await extractFromInstagramEmbed(shortcode, "plain");
    } catch (err) {
      console.warn("[IG Worker] Embed plain attempt failed:", err);
    }
  }

  // Attempt 3: Microlink OpenGraph API fallback
  if (!extracted) {
    try {
      extracted = await extractFromMicrolink(permalink);
    } catch (err) {
      console.warn("[IG Worker] Microlink fallback failed:", err);
    }
  }

  if (!extracted) {
    throw new Error(
      "Tidak dapat mengambil thumbnail dari link Instagram tersebut. Pastikan akun/postingan bersifat publik."
    );
  }

  // Download image stream from Instagram CDN and pipe straight to Vercel Blob
  const imageRes = await fetch(extracted.imageUrl, {
    headers: {
      "User-Agent": BROWSER_UA,
      Referer: "https://www.instagram.com/",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
    cache: "no-store",
  });

  if (!imageRes.ok || !imageRes.body) {
    throw new Error(
      `Gagal mengunduh gambar dari CDN Instagram (HTTP ${imageRes.status}).`
    );
  }

  const contentType = imageRes.headers.get("content-type") || "image/jpeg";
  const ext = contentType.includes("webp")
    ? "webp"
    : contentType.includes("png")
      ? "png"
      : "jpg";

  const blobUrl = await putPublicMedia(
    `portfolio/${itemId}.${ext}`,
    imageRes.body,
    contentType
  );

  return {
    blobUrl,
    mediaType: extracted.mediaType,
  };
}
