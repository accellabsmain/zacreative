import { after, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  createPortfolioEntry,
  deletePortfolioEntry,
  getAllPortfolioItems,
  markPortfolioSyncing,
  syncPortfolioThumbnailInBackground,
  updatePortfolioEntry,
} from "@/lib/portfolio-store";
import {
  portfolioCreateSchema,
  portfolioUpdateSchema,
} from "@/lib/validations/portfolio";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const items = await getAllPortfolioItems();
  return NextResponse.json({ ok: true, items });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = portfolioCreateSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Input tidak valid.";
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    const created = await createPortfolioEntry(parsed.data);

    // Schedule Vercel background worker via Next.js 16 `after()`
    after(async () => {
      await syncPortfolioThumbnailInBackground(created.id);
    });

    return NextResponse.json({ ok: true, item: created }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Gagal menambahkan portofolio.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Retry thumbnail extraction worker for a specific item
    if (body.action === "retry" && typeof body.id === "string") {
      const item = await markPortfolioSyncing(body.id);
      if (!item) {
        return NextResponse.json(
          { ok: false, error: "Item tidak ditemukan." },
          { status: 404 }
        );
      }

      after(async () => {
        await syncPortfolioThumbnailInBackground(item.id);
      });

      return NextResponse.json({ ok: true, item });
    }

    const parsed = portfolioUpdateSchema.safeParse(body);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Input tidak valid.";
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    const { item, needsResync } = await updatePortfolioEntry(parsed.data);

    if (needsResync) {
      after(async () => {
        await syncPortfolioThumbnailInBackground(item.id);
      });
    }

    return NextResponse.json({ ok: true, item });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Gagal memperbarui portofolio.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim();

  if (!id) {
    return NextResponse.json(
      { ok: false, error: "ID item diperlukan." },
      { status: 400 }
    );
  }

  const deleted = await deletePortfolioEntry(id);
  if (!deleted) {
    return NextResponse.json(
      { ok: false, error: "Item tidak ditemukan." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}
