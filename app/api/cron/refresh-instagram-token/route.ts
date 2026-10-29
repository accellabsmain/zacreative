import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import {
  INSTAGRAM_CACHE_TAG,
  resolveInstagramToken,
  saveInstagramTokenToKv,
} from "@/lib/instagram";

interface RefreshTokenResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  error?: {
    message?: string;
    type?: string;
    code?: number;
  };
}

/**
 * Weekly cron endpoint to refresh a 60-day Instagram long-lived access token
 * before it expires, persist it to Upstash KV (if configured), and revalidate
 * the cached Instagram feed on the home page.
 *
 * Protected by Authorization: Bearer <CRON_SECRET>.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const currentToken = await resolveInstagramToken();
  if (!currentToken) {
    return NextResponse.json(
      { ok: false, error: "INSTAGRAM_ACCESS_TOKEN is not configured" },
      { status: 400 }
    );
  }

  try {
    const refreshUrl = new URL("https://graph.instagram.com/refresh_access_token");
    refreshUrl.searchParams.set("grant_type", "ig_refresh_token");
    refreshUrl.searchParams.set("access_token", currentToken);

    const res = await fetch(refreshUrl.toString(), { cache: "no-store" });
    const data = (await res.json()) as RefreshTokenResponse;

    if (!res.ok || !data.access_token) {
      return NextResponse.json(
        {
          ok: false,
          error: data.error?.message ?? "Failed to refresh Instagram token",
        },
        { status: 502 }
      );
    }

    const storedInKv = await saveInstagramTokenToKv(data.access_token);
    revalidateTag(INSTAGRAM_CACHE_TAG, "max");

    return NextResponse.json({
      ok: true,
      expiresInSeconds: data.expires_in ?? null,
      storedInKv,
      note: storedInKv
        ? "Refreshed token saved to Upstash KV and feed cache invalidated."
        : "Token refreshed in Instagram; configure UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN to persist rotated tokens automatically.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Unexpected error refreshing token",
      },
      { status: 500 }
    );
  }
}

