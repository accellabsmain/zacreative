import { NextResponse } from "next/server";
import {
  getAdminSession,
  setAdminSessionCookie,
  updateAdminCredentials,
} from "@/lib/auth";
import { changeCredentialsSchema } from "@/lib/validations/portfolio";

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Sesi tidak valid. Silakan login kembali." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const parsed = changeCredentialsSchema.safeParse(body);

    if (!parsed.success) {
      const msg =
        parsed.error.issues[0]?.message ?? "Data kredensial tidak valid.";
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    const result = await updateAdminCredentials(
      parsed.data.currentPassword,
      parsed.data.newUsername,
      parsed.data.newPassword
    );

    if (!result.ok) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 400 }
      );
    }

    await setAdminSessionCookie(result.username);
    return NextResponse.json({ ok: true, username: result.username });
  } catch (err) {
    console.error("[Auth Credentials] Failed updating credentials:", err);
    return NextResponse.json(
      { ok: false, error: "Gagal menyimpan kredensial baru ke Vercel Blob." },
      { status: 500 }
    );
  }
}
