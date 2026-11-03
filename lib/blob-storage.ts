import { del, get, put } from "@vercel/blob";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const LOCAL_BLOB_DIR = path.join(process.cwd(), ".local-blob");

export function hasVercelBlobToken(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
      process.env.VERCEL_OIDC_TOKEN?.trim()
  );
}

/**
 * Reads raw bytes from Vercel Blob (origin storage, bypassing CDN cache)
 * or local dev fallback when BLOB_READ_WRITE_TOKEN is not configured locally.
 */
export async function readBlobBytes(pathname: string): Promise<Buffer | null> {
  if (hasVercelBlobToken()) {
    try {
      const result = await get(pathname, {
        access: "public",
        useCache: false,
      });
      if (!result || result.statusCode !== 200 || !result.stream) {
        return null;
      }
      const arrayBuf = await new Response(result.stream).arrayBuffer();
      return Buffer.from(arrayBuf);
    } catch {
      // Try private access in case the user configured a Private Blob store
      try {
        const privResult = await get(pathname, {
          access: "private",
          useCache: false,
        });
        if (!privResult || privResult.statusCode !== 200 || !privResult.stream) {
          return null;
        }
        const arrayBuf = await new Response(privResult.stream).arrayBuffer();
        return Buffer.from(arrayBuf);
      } catch {
        return null;
      }
    }
  }

  // Local dev filesystem fallback (only when BLOB_READ_WRITE_TOKEN is absent)
  try {
    const filePath = path.join(LOCAL_BLOB_DIR, pathname);
    return await readFile(filePath);
  } catch {
    return null;
  }
}

/**
 * Writes raw string/buffer data to a deterministic pathname in Vercel Blob
 * with overwrite enabled.
 */
export async function writeBlobData(
  pathname: string,
  body: string | Buffer,
  contentType: string
): Promise<string> {
  if (hasVercelBlobToken()) {
    const res = await put(pathname, body, {
      access: "public",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType,
      cacheControlMaxAge: 60,
    });
    return res.url;
  }

  const filePath = path.join(LOCAL_BLOB_DIR, pathname);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, body);
  return `local://${pathname}`;
}

/**
 * Streams or writes public media (portfolio thumbnails) to Vercel Blob
 * (or public/uploads in local dev fallback without token).
 */
export async function putPublicMedia(
  pathname: string,
  body: ReadableStream<Uint8Array> | Buffer,
  contentType: string
): Promise<string> {
  if (hasVercelBlobToken()) {
    const res = await put(pathname, body, {
      access: "public",
      addRandomSuffix: true,
      contentType,
    });
    return res.url;
  }

  // Local dev fallback: save under public/.local-media so next/image can render it
  const relPublicPath = path.posix.join(".local-media", pathname);
  const absPublicPath = path.join(process.cwd(), "public", relPublicPath);
  await mkdir(path.dirname(absPublicPath), { recursive: true });

  const buffer = Buffer.isBuffer(body)
    ? body
    : Buffer.from(await new Response(body).arrayBuffer());
  await writeFile(absPublicPath, buffer);
  return `/${relPublicPath}`;
}

/**
 * Deletes a previously uploaded media URL from Vercel Blob.
 */
export async function deletePublicMedia(url?: string | null): Promise<void> {
  if (!url) return;

  if (hasVercelBlobToken() && url.includes("blob.vercel-storage.com")) {
    try {
      await del(url);
    } catch (err) {
      console.error("[BlobStorage] Failed deleting media:", err);
    }
    return;
  }

  if (url.startsWith("/.local-media/")) {
    try {
      const absPath = path.join(process.cwd(), "public", url);
      await rm(absPath, { force: true });
    } catch {
      // Ignore cleanup errors in local dev
    }
  }
}
