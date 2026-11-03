import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSession,
} from "@/lib/session-token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public login page and login API endpoint
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/admin/auth/login")
  ) {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const session = await verifyAdminSession(token);
    if (session && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = await verifyAdminSession(token);

  if (!session) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { ok: false, error: "Sesi berakhir. Silakan login kembali." },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
