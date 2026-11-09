import { NextResponse } from "next/server";
import { getPublicPortfolioPosts } from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const posts = await getPublicPortfolioPosts();
  return NextResponse.json(
    { ok: true, posts },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

