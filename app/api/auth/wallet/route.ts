import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/auth";

function isEvmAddress(s: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(s);
}

/**
 * Sets session cookie when a valid EVM address is present.
 * (Demo gate — replace with signature verification / SIWE later.)
 */
export async function POST(request: Request) {
  let body: { evmAddress?: string | null } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const evmRaw = body.evmAddress != null ? String(body.evmAddress).trim() : "";
  const evm = evmRaw && isEvmAddress(evmRaw) ? evmRaw : null;

  if (!evm) {
    return NextResponse.json(
      { error: "Connect an Ethereum wallet on Base." },
      { status: 400 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE_NAME, "wallet", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
