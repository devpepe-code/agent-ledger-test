import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_COOKIE_NAME, LEGACY_AUTH_COOKIE_NAME } from "@/lib/auth";

const secure = process.env.NODE_ENV === "production";

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);

  if (pathname === "/login") {
    if (hasSession) {
      const raw = request.nextUrl.searchParams.get("next") || "/dashboard";
      const next =
        raw.startsWith("/") && !raw.startsWith("//") ? raw : "/dashboard";
      return NextResponse.redirect(new URL(next, request.url));
    }
    const target = new URL("/dashboard", request.url);
    target.searchParams.set("connect", "1");
    const q = request.nextUrl.searchParams.get("next");
    if (q && q.startsWith("/") && !q.startsWith("//")) {
      target.searchParams.set("next", q);
    }
    return NextResponse.redirect(target);
  }

  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    if (request.nextUrl.searchParams.get("connect") === "1") {
      /**
       * Continue this same navigation (no 302). Redirect + new tab (`target=_blank`)
       * can race: the follow-up GET sometimes still sends the old session cookie.
       * Clear cookies on this response and let the page force the gate via
       * `searchParams.connect` (see dashboard `page.tsx`).
       */
      const res = NextResponse.next();
      res.cookies.set(AUTH_COOKIE_NAME, "", {
        path: "/",
        maxAge: 0,
        httpOnly: true,
        sameSite: "lax",
        secure,
      });
      res.cookies.set(LEGACY_AUTH_COOKIE_NAME, "", {
        path: "/",
        maxAge: 0,
        httpOnly: true,
        sameSite: "lax",
        secure,
      });
      return res;
    }
  }

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    const hasLegacy = Boolean(
      request.cookies.get(LEGACY_AUTH_COOKIE_NAME)?.value,
    );
    if (!hasSession && hasLegacy) {
      const res = NextResponse.next();
      res.cookies.set(LEGACY_AUTH_COOKIE_NAME, "", {
        path: "/",
        maxAge: 0,
        httpOnly: true,
        sameSite: "lax",
        secure,
      });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard", "/dashboard/:path*"],
};
