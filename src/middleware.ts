import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "am", "om", "ti"],
  defaultLocale: "en",
  localePrefix: "always",
});

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip API routes
  if (pathname.startsWith("/api")) return NextResponse.next();

  // Admin login page — no auth check, just pass through
  if (pathname === "/admin-login") return NextResponse.next();

  // Admin pages — check cookie
  if (pathname.startsWith("/admin")) {
    const cookie = req.cookies.get("admin_token")?.value;
    if (cookie !== "authenticated") {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)" ],
};
