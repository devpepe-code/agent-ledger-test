import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, LEGACY_AUTH_COOKIE_NAME } from "@/lib/auth";

const secure = process.env.NODE_ENV === "production";

function clearCookie(name: string, res: NextResponse) {
  res.cookies.set(name, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure,
  });
}

export async function POST() {
  const res = NextResponse.json({ ok: true });
  clearCookie(AUTH_COOKIE_NAME, res);
  clearCookie(LEGACY_AUTH_COOKIE_NAME, res);
  return res;
}
