import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/auth";

const cookieOpts = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

/**
 * Demo: sets session without a real wallet connection.
 * - Browser form POST → 303 to /dashboard with Set-Cookie (reliable in all envs).
 * - Fetch with Accept: application/json → { ok: true } (tests / programmatic).
 */
export async function POST(request: Request) {
  const wantsJson = (request.headers.get("accept") ?? "").includes(
    "application/json",
  );

  if (wantsJson) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(AUTH_COOKIE_NAME, "simulated", cookieOpts);
    return res;
  }

  const dashboard = new URL("/dashboard", new URL(request.url).origin);
  const res = NextResponse.redirect(dashboard, 303);
  res.cookies.set(AUTH_COOKIE_NAME, "simulated", cookieOpts);
  return res;
}
