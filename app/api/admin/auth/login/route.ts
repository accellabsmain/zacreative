import { NextResponse } from "next/server";
import { authenticateAdmin, setAdminSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/portfolio";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      const msg =
        parsed.error.issues[0]?.message ?? "Username dan password wajib diisi.";
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    const admin = await authenticateAdmin(
      parsed.data.username,
      parsed.data.password
    );

    if (!admin) {
      // Constant artificial delay to mitigate brute-force attempts
      await new Promise((resolve) => setTimeout(resolve, 600));
      return NextResponse.json(
        { ok: false, error: "Username atau password salah." },
        { status: 401 }
      );
    }

    await setAdminSessionCookie(admin.username);

    return NextResponse.json({
      ok: true,
      username: admin.username,
    });
  } catch (err) {
    console.error("[Auth Login] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan pada server saat login." },
      { status: 500 }
    );
  }
}
