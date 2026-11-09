import { randomUUID } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  deletePublicMedia,
  readBlobBytes,
  writeBlobData,
} from "@/lib/blob-storage";
import {
  INSTAGRAM_FALLBACK_POSTS,
  type InstagramPost,
} from "@/lib/data/instagram-fallback";
import { fetchAndUploadInstagramThumbnail } from "@/lib/ig-scraper";
import {
  normalizeInstagramPermalink,
  type PortfolioCreateInput,
  type PortfolioItem,
  type PortfolioUpdateInput,
} from "@/lib/validations/portfolio";

const PORTFOLIO_BLOB_PATH = "data/portfolio.json";
export const PORTFOLIO_CACHE_TAG = "portfolio-items";

interface PortfolioBlobDocument {
  version: 1;
  updatedAt: string;
  items: PortfolioItem[];
}

async function readPortfolioDoc(): Promise<PortfolioBlobDocument> {
  const bytes = await readBlobBytes(PORTFOLIO_BLOB_PATH);
  if (!bytes) {
    return {
      version: 1,
      updatedAt: new Date().toISOString(),
      items: [],
    };
  }

  try {
    const parsed = JSON.parse(bytes.toString("utf8")) as PortfolioBlobDocument;
    if (!Array.isArray(parsed.items)) {
      return { version: 1, updatedAt: new Date().toISOString(), items: [] };
    }
    return parsed;
  } catch {
    return { version: 1, updatedAt: new Date().toISOString(), items: [] };
  }
}

async function writePortfolioDoc(items: PortfolioItem[]): Promise<void> {
  const doc: PortfolioBlobDocument = {
    version: 1,
    updatedAt: new Date().toISOString(),
    items,
  };
  await writeBlobData(
    PORTFOLIO_BLOB_PATH,
    JSON.stringify(doc, null, 2),
    "application/json"
  );
}

export function revalidatePortfolioCache(): void {
  try {
    revalidateTag(PORTFOLIO_CACHE_TAG, "max");
    revalidatePath("/");
    revalidatePath("/portofolio");
  } catch (err) {
    console.warn("[PortfolioStore] Revalidate warning:", err);
  }
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  const doc = await readPortfolioDoc();
  return doc.items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Returns public-ready portfolio posts mapped to InstagramPost for the landing page.
 * Falls back to curated local posts when no dashboard items are ready yet.
 */
export async function getPublicPortfolioPosts(): Promise<InstagramPost[]> {
  try {
    const items = await getAllPortfolioItems();
    const readyItems = items.filter(
      (item) => item.syncStatus === "ready" && Boolean(item.thumbnailUrl)
    );

    if (readyItems.length === 0) {
      return INSTAGRAM_FALLBACK_POSTS;
    }

    return readyItems.map((item) => ({
      id: item.id,
      caption: item.note,
      mediaType: item.mediaType,
      imageUrl: item.thumbnailUrl,
      permalink: item.instagramUrl,
      timestamp: item.createdAt,
      categoryTag: item.category,
      footnote: item.footnote || undefined,
    }));
  } catch (err) {
    console.error("[PortfolioStore] Failed loading public posts:", err);
    return INSTAGRAM_FALLBACK_POSTS;
  }
}

export async function createPortfolioEntry(
  input: PortfolioCreateInput
): Promise<PortfolioItem> {
  const normalized = normalizeInstagramPermalink(input.instagramUrl);
  if (!normalized) {
    throw new Error("Format link Instagram tidak valid.");
  }

  const doc = await readPortfolioDoc();
  const now = new Date().toISOString();

  const newItem: PortfolioItem = {
    id: randomUUID(),
    instagramUrl: normalized.permalink,
    shortcode: normalized.shortcode,
    category: input.category,
    note: input.note.trim(),
    footnote: (input.footnote ?? "").trim(),
    thumbnailUrl: "",
    mediaType: normalized.inferredType,
    syncStatus: "syncing",
    createdAt: now,
    updatedAt: now,
  };

  const nextItems = [newItem, ...doc.items];
  await writePortfolioDoc(nextItems);
  return newItem;
}

export async function updatePortfolioEntry(
  input: PortfolioUpdateInput
): Promise<{ item: PortfolioItem; needsResync: boolean }> {
  const doc = await readPortfolioDoc();
  const idx = doc.items.findIndex((i) => i.id === input.id);
  if (idx === -1) {
    throw new Error("Item portofolio tidak ditemukan.");
  }

  const existing = doc.items[idx];
  let nextPermalink = existing.instagramUrl;
  let nextShortcode = existing.shortcode;
  let needsResync = false;

  if (input.instagramUrl) {
    const normalized = normalizeInstagramPermalink(input.instagramUrl);
    if (!normalized) {
      throw new Error("Format link Instagram tidak valid.");
    }
    if (normalized.shortcode !== existing.shortcode) {
      nextPermalink = normalized.permalink;
      nextShortcode = normalized.shortcode;
      needsResync = true;
    }
  }

  const updated: PortfolioItem = {
    ...existing,
    instagramUrl: nextPermalink,
    shortcode: nextShortcode,
    category: input.category ?? existing.category,
    note: input.note !== undefined ? input.note.trim() : existing.note,
    footnote:
      input.footnote !== undefined ? input.footnote.trim() : existing.footnote,
    syncStatus: needsResync ? "syncing" : existing.syncStatus,
    syncError: needsResync ? undefined : existing.syncError,
    updatedAt: new Date().toISOString(),
  };

  doc.items[idx] = updated;
  await writePortfolioDoc(doc.items);
  revalidatePortfolioCache();

  return { item: updated, needsResync };
}

export async function deletePortfolioEntry(id: string): Promise<boolean> {
  const doc = await readPortfolioDoc();
  const target = doc.items.find((i) => i.id === id);
  if (!target) return false;

  const remaining = doc.items.filter((i) => i.id !== id);
  await writePortfolioDoc(remaining);

  if (target.thumbnailUrl) {
    await deletePublicMedia(target.thumbnailUrl);
  }

  revalidatePortfolioCache();
  return true;
}

export async function markPortfolioSyncing(id: string): Promise<PortfolioItem | null> {
  const doc = await readPortfolioDoc();
  const idx = doc.items.findIndex((i) => i.id === id);
  if (idx === -1) return null;

  doc.items[idx] = {
    ...doc.items[idx],
    syncStatus: "syncing",
    syncError: undefined,
    updatedAt: new Date().toISOString(),
  };
  await writePortfolioDoc(doc.items);
  return doc.items[idx];
}

/**
 * Background Worker task invoked inside Next.js `after()`:
 * Extracts the Instagram thumbnail, streams binary image to Vercel Blob,
 * updates `data/portfolio.json`, and revalidates `/` ISR cache.
 */
export async function syncPortfolioThumbnailInBackground(
  itemId: string
): Promise<void> {
  const initialDoc = await readPortfolioDoc();
  const target = initialDoc.items.find((i) => i.id === itemId);
  if (!target) return;

  const previousThumbnailUrl = target.thumbnailUrl;

  try {
    const { blobUrl, mediaType } = await fetchAndUploadInstagramThumbnail({
      itemId: target.id,
      shortcode: target.shortcode,
      permalink: target.instagramUrl,
    });

    // Re-read latest doc before writing so concurrent edits aren't lost
    const latestDoc = await readPortfolioDoc();
    const idx = latestDoc.items.findIndex((i) => i.id === itemId);
    if (idx === -1) {
      // Item was deleted while worker was running -> clean up newly uploaded blob
      await deletePublicMedia(blobUrl);
      return;
    }

    latestDoc.items[idx] = {
      ...latestDoc.items[idx],
      thumbnailUrl: blobUrl,
      mediaType,
      syncStatus: "ready",
      syncError: undefined,
      updatedAt: new Date().toISOString(),
    };

    await writePortfolioDoc(latestDoc.items);

    if (previousThumbnailUrl && previousThumbnailUrl !== blobUrl) {
      await deletePublicMedia(previousThumbnailUrl);
    }

    revalidatePortfolioCache();
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Gagal mengambil gambar dari Instagram.";
    console.error(`[PortfolioWorker] Failed syncing item ${itemId}:`, message);

    const latestDoc = await readPortfolioDoc();
    const idx = latestDoc.items.findIndex((i) => i.id === itemId);
    if (idx !== -1) {
      latestDoc.items[idx] = {
        ...latestDoc.items[idx],
        syncStatus: "failed",
        syncError: message,
        updatedAt: new Date().toISOString(),
      };
      await writePortfolioDoc(latestDoc.items);
    }
  }
}
