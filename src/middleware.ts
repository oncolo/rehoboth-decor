import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "am", "om", "ti"],
  defaultLocale: "en",
  localePrefix: "always",
});

export default function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") ?? "";
  const isAdminDeployment =
    process.env.DEPLOYMENT === "admin" ||
    hostname.includes("rehoboth-admin");
  const { pathname } = req.nextUrl;

  // ── ADMIN DEPLOYMENT ──────────────────────────────────────
  if (isAdminDeployment) {
    // Block all public pages — only /admin* and /api* allowed
    if (!pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
    // Protect /admin/* routes (not /admin-login)
    if (pathname.startsWith("/admin") && pathname !== "/admin-login") {
      const cookie = req.cookies.get("admin_token")?.value;
      if (cookie !== "authenticated") {
        return NextResponse.redirect(new URL("/admin-login", req.url));
      }
    }
    return NextResponse.next();
  }

  // ── FRONTEND DEPLOYMENT ───────────────────────────────────
  // Block all admin routes on frontend
  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/en", req.url));
  }

  if (pathname.startsWith("/api")) return NextResponse.next();

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)" ],
};
