import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { readBlobBytes, writeBlobData } from "@/lib/blob-storage";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  signAdminSession,
  verifyAdminSession,
  type SessionPayload,
} from "@/lib/session-token";

const CREDENTIALS_BLOB_PATH = "config/admin-auth.bin";

interface StoredAdminCredentials {
  username: string;
  saltHex: string;
  hashHex: string;
  updatedAt: string;
}

function deriveEncryptionKey(): Buffer {
  const rawSecret =
    process.env.AUTH_SECRET?.trim() ||
    process.env.CRON_SECRET?.trim() ||
    "zacreative-dev-fallback-secret-change-in-production";
  return createHash("sha256").update(rawSecret).digest();
}

function encryptCredentials(data: StoredAdminCredentials): Buffer {
  const key = deriveEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(data), "utf8");
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();
  // Format: [12-byte IV][16-byte GCM Tag][Ciphertext]
  return Buffer.concat([iv, authTag, encrypted]);
}

function decryptCredentials(buf: Buffer): StoredAdminCredentials | null {
  try {
    if (buf.length < 29) return null;
    const key = deriveEncryptionKey();
    const iv = buf.subarray(0, 12);
    const authTag = buf.subarray(12, 28);
    const ciphertext = buf.subarray(28);

    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);
    const parsed = JSON.parse(
      decrypted.toString("utf8")
    ) as StoredAdminCredentials;
    if (!parsed.username || !parsed.saltHex || !parsed.hashHex) return null;
    return parsed;
  } catch {
    return null;
  }
}

function hashPassword(password: string, saltHex: string): string {
  return scryptSync(password, Buffer.from(saltHex, "hex"), 64).toString("hex");
}

function verifyPasswordHash(
  password: string,
  saltHex: string,
  expectedHashHex: string
): boolean {
  const candidate = Buffer.from(hashPassword(password, saltHex), "hex");
  const expected = Buffer.from(expectedHashHex, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

/**
 * Loads encrypted admin credentials from Vercel Blob.
 * Automatically bootstraps initial credentials on first run using
 * ADMIN_USERNAME & ADMIN_INITIAL_PASSWORD from environment variables.
 */
export async function getOrSeedAdminCredentials(): Promise<StoredAdminCredentials> {
  const existingBytes = await readBlobBytes(CREDENTIALS_BLOB_PATH);
  if (existingBytes) {
    const decrypted = decryptCredentials(existingBytes);
    if (decrypted) return decrypted;
  }

  const initialUsername = process.env.ADMIN_USERNAME?.trim() || "admin";
  const initialPassword =
    process.env.ADMIN_INITIAL_PASSWORD?.trim() || "zacreative2026";
  const saltHex = randomBytes(16).toString("hex");
  const seeded: StoredAdminCredentials = {
    username: initialUsername,
    saltHex,
    hashHex: hashPassword(initialPassword, saltHex),
    updatedAt: new Date().toISOString(),
  };

  await writeBlobData(
    CREDENTIALS_BLOB_PATH,
    encryptCredentials(seeded),
    "application/octet-stream"
  );

  return seeded;
}

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<StoredAdminCredentials | null> {
  const creds = await getOrSeedAdminCredentials();
  const usernameMatches =
    creds.username.toLowerCase() === username.trim().toLowerCase();
  const passwordMatches = verifyPasswordHash(
    password,
    creds.saltHex,
    creds.hashHex
  );

  if (!usernameMatches || !passwordMatches) {
    return null;
  }
  return creds;
}

export async function updateAdminCredentials(
  currentPassword: string,
  newUsername: string,
  newPassword: string
): Promise<{ ok: true; username: string } | { ok: false; error: string }> {
  const creds = await getOrSeedAdminCredentials();
  const validCurrent = verifyPasswordHash(
    currentPassword,
    creds.saltHex,
    creds.hashHex
  );

  if (!validCurrent) {
    return { ok: false, error: "Password saat ini tidak sesuai." };
  }

  const newSaltHex = randomBytes(16).toString("hex");
  const updated: StoredAdminCredentials = {
    username: newUsername.trim(),
    saltHex: newSaltHex,
    hashHex: hashPassword(newPassword, newSaltHex),
    updatedAt: new Date().toISOString(),
  };

  await writeBlobData(
    CREDENTIALS_BLOB_PATH,
    encryptCredentials(updated),
    "application/octet-stream"
  );

  return { ok: true, username: updated.username };
}

export async function setAdminSessionCookie(username: string): Promise<void> {
  const token = await signAdminSession(username);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSession(token);
}
