export const ADMIN_SESSION_COOKIE = "za_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface SessionPayload {
  sub: string;
  exp: number;
}

function getSecretKeyBytes(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET?.trim() ||
    process.env.CRON_SECRET?.trim() ||
    "zacreative-dev-fallback-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array | null {
  try {
    const padded = str.replace(/-/g, "+").replace(/_/g, "/");
    const padLen = (4 - (padded.length % 4)) % 4;
    const binary = atob(padded + "=".repeat(padLen));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
}

async function importHmacKey(): Promise<CryptoKey> {
  const keyBytes = getSecretKeyBytes();
  return crypto.subtle.importKey(
    "raw",
    keyBytes.buffer.slice(
      keyBytes.byteOffset,
      keyBytes.byteOffset + keyBytes.byteLength
    ) as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signAdminSession(username: string): Promise<string> {
  const payload: SessionPayload = {
    sub: username,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payloadB64 = toBase64Url(
    new TextEncoder().encode(JSON.stringify(payload))
  );
  const key = await importHmacKey();
  const dataBytes = new TextEncoder().encode(payloadB64);
  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    dataBytes.buffer.slice(
      dataBytes.byteOffset,
      dataBytes.byteOffset + dataBytes.byteLength
    ) as ArrayBuffer
  );
  const sigB64 = toBase64Url(new Uint8Array(sigBuffer));
  return `${payloadB64}.${sigB64}`;
}

export async function verifyAdminSession(
  token?: string | null
): Promise<SessionPayload | null> {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, sigB64] = parts;
  const sigBytes = fromBase64Url(sigB64);
  const payloadBytes = fromBase64Url(payloadB64);
  if (!sigBytes || !payloadBytes) return null;

  try {
    const key = await importHmacKey();
    const dataBytes = new TextEncoder().encode(payloadB64);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes.buffer.slice(
        sigBytes.byteOffset,
        sigBytes.byteOffset + sigBytes.byteLength
      ) as ArrayBuffer,
      dataBytes.buffer.slice(
        dataBytes.byteOffset,
        dataBytes.byteOffset + dataBytes.byteLength
      ) as ArrayBuffer
    );
    if (!valid) return null;

    const decoded = JSON.parse(
      new TextDecoder().decode(payloadBytes)
    ) as SessionPayload;

    if (
      !decoded ||
      typeof decoded.sub !== "string" ||
      typeof decoded.exp !== "number" ||
      decoded.exp <= Date.now()
    ) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_TTL_MS / 1000);
