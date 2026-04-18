/**
 * QA matrix — routes, API behavior, middleware edge cases
 *
 * Pages (manual / build verification via `npm run build`):
 * - / marketing home
 * - /dashboard session gate + overlay when no cookie
 * - /login redirect chain
 * - /home → /
 * - /alerts public feed (mock data)
 * - /agents/profile/[agentId] in-app agent profile + tabs
 *
 * API:
 * - POST /api/auth/simulate — sets session
 * - POST /api/auth/logout — clears session (path/httpOnly parity with setters)
 * - POST /api/auth/wallet — validates addresses; rejects bad JSON / empty
 *
 * Out of scope here: Playwright/Cypress E2E (new tab, cookie jar timing, UI paint).
 * Those flows need browser tests — Vitest only runs Node.
 */

import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { POST as postLogout } from "@/app/api/auth/logout/route";
import { POST as postSimulate } from "@/app/api/auth/simulate/route";
import { POST as postWallet } from "@/app/api/auth/wallet/route";
import { AUTH_COOKIE_NAME, LEGACY_AUTH_COOKIE_NAME } from "@/lib/auth";
import { middleware } from "@/middleware";

const SAMPLE_EVM = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0";

function cookieFromResponse(res: Response): string | null {
  return res.headers.get("set-cookie");
}

function allSetCookies(res: Response): string[] {
  const headers = res.headers as Headers & { getSetCookie?: () => string[] };
  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }
  const single = res.headers.get("set-cookie");
  return single ? [single] : [];
}

describe("POST /api/auth/simulate", () => {
  it("returns 200 + JSON and sets session cookie when Accept includes application/json", async () => {
    const res = await postSimulate(
      new Request("http://127.0.0.1:3000/api/auth/simulate", {
        method: "POST",
        headers: { Accept: "application/json" },
      }),
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok?: boolean };
    expect(body.ok).toBe(true);
    const cookie = cookieFromResponse(res);
    expect(cookie).toContain(`${AUTH_COOKIE_NAME}=simulated`);
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Path=/");
  });

  it("returns 303 to /dashboard and sets cookie for browser form posts", async () => {
    const res = await postSimulate(
      new Request("http://127.0.0.1:3000/api/auth/simulate", {
        method: "POST",
        headers: { Accept: "text/html" },
      }),
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe(
      "http://127.0.0.1:3000/dashboard",
    );
    const cookies = allSetCookies(res);
    expect(
      cookies.some(
        (c) =>
          c.includes(`${AUTH_COOKIE_NAME}=simulated`) &&
          c.includes("HttpOnly"),
      ),
    ).toBe(true);
  });
});

describe("POST /api/auth/logout", () => {
  it("returns 200 and clears session + legacy cookies with Path=/", async () => {
    const res = await postLogout();
    expect(res.status).toBe(200);
    const setCookies = allSetCookies(res);
    expect(
      setCookies.some(
        (c) =>
          c.includes(`${AUTH_COOKIE_NAME}=`) &&
          c.toLowerCase().includes("max-age=0"),
      ),
    ).toBe(true);
    expect(
      setCookies.some(
        (c) =>
          c.includes(`${LEGACY_AUTH_COOKIE_NAME}=`) &&
          c.toLowerCase().includes("max-age=0"),
      ),
    ).toBe(true);
    for (const cookie of setCookies) {
      expect(cookie).toContain("Path=/");
      expect(cookie).toContain("HttpOnly");
      expect(cookie.toLowerCase()).toContain("samesite=lax");
    }
  });
});

describe("POST /api/auth/wallet", () => {
  it("rejects invalid JSON", async () => {
    const res = await postWallet(
      new Request("http://localhost/api/auth/wallet", {
        method: "POST",
        body: "not-json",
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("rejects empty body / no valid addresses", async () => {
    const res = await postWallet(
      new Request("http://localhost/api/auth/wallet", {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(400);
    const j = (await res.json()) as { error?: string };
    expect(j.error).toBeDefined();
  });

  it("rejects malformed EVM-only payload", async () => {
    const res = await postWallet(
      new Request("http://localhost/api/auth/wallet", {
        method: "POST",
        body: JSON.stringify({ evmAddress: "0x123" }),
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("accepts valid EVM address and sets cookie", async () => {
    const res = await postWallet(
      new Request("http://localhost/api/auth/wallet", {
        method: "POST",
        body: JSON.stringify({ evmAddress: SAMPLE_EVM }),
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(200);
    expect(cookieFromResponse(res)).toContain(`${AUTH_COOKIE_NAME}=wallet`);
  });

  it("treats explicit null addresses as empty", async () => {
    const res = await postWallet(
      new Request("http://localhost/api/auth/wallet", {
        method: "POST",
        body: JSON.stringify({
          evmAddress: null,
        }),
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(res.status).toBe(400);
  });
});

describe("middleware: /login", () => {
  it("redirects unauthenticated GET /login to /dashboard with connect=1", () => {
    const request = new NextRequest(new URL("http://127.0.0.1:3000/login"));
    const response = middleware(request);
    expect(response.status).toBeGreaterThanOrEqual(300);
    expect(response.status).toBeLessThan(400);
    const loc = response.headers.get("location");
    expect(loc).toBeTruthy();
    const u = new URL(loc!);
    expect(u.pathname).toBe("/dashboard");
    expect(u.searchParams.get("connect")).toBe("1");
  });

  it("preserves safe next= on redirect to dashboard for unauthenticated user", () => {
    const request = new NextRequest(
      new URL("http://127.0.0.1:3000/login?next=/alerts"),
    );
    const response = middleware(request);
    const loc = response.headers.get("location")!;
    const u = new URL(loc);
    expect(u.pathname).toBe("/dashboard");
    expect(u.searchParams.get("connect")).toBe("1");
    expect(u.searchParams.get("next")).toBe("/alerts");
  });

  it("blocks open redirect: next=//evil.com becomes dashboard without hostile host", () => {
    const request = new NextRequest(
      new URL("http://127.0.0.1:3000/login?next=//evil.com"),
    );
    const response = middleware(request);
    const loc = response.headers.get("location")!;
    const u = new URL(loc);
    expect(u.pathname).toBe("/dashboard");
    expect(u.searchParams.get("connect")).toBe("1");
    expect(u.searchParams.has("next")).toBe(false);
  });

  it("authenticated /login redirects to next=/alerts", () => {
    const request = new NextRequest(
      new URL("http://127.0.0.1:3000/login?next=/alerts"),
      {
        headers: { cookie: `${AUTH_COOKIE_NAME}=simulated` },
      },
    );
    const response = middleware(request);
    const loc = response.headers.get("location")!;
    expect(new URL(loc).pathname).toBe("/alerts");
  });

  it("authenticated /login with bad next falls back to /dashboard", () => {
    const request = new NextRequest(
      new URL("http://127.0.0.1:3000/login?next=//evil.com"),
      {
        headers: { cookie: `${AUTH_COOKIE_NAME}=simulated` },
      },
    );
    const response = middleware(request);
    const loc = response.headers.get("location")!;
    expect(new URL(loc).pathname).toBe("/dashboard");
  });
});

describe("middleware: /dashboard", () => {
  it("passes through when no cookies", () => {
    const request = new NextRequest(new URL("http://127.0.0.1:3000/dashboard"));
    const response = middleware(request);
    expect(response.headers.get("location")).toBeNull();
    expect(response.status).toBe(200);
  });

  it("clears legacy al_auth when only legacy cookie is present", () => {
    const request = new NextRequest(
      new URL("http://127.0.0.1:3000/dashboard"),
      {
        headers: { cookie: `${LEGACY_AUTH_COOKIE_NAME}=simulated` },
      },
    );
    const response = middleware(request);
    expect(response.status).toBe(200);
    const cleared = response.headers.getSetCookie?.() ?? [];
    expect(
      cleared.some((c) =>
        c.includes(`${LEGACY_AUTH_COOKIE_NAME}=`),
      ),
    ).toBe(true);
  });

  it("connect=1 clears session cookies and continues same navigation (no redirect race)", () => {
    const request = new NextRequest(
      new URL("http://127.0.0.1:3000/dashboard?connect=1&next=/settings"),
      {
        headers: { cookie: `${AUTH_COOKIE_NAME}=simulated` },
      },
    );
    const response = middleware(request);
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
    const setCookies = response.headers.getSetCookie?.() ?? [];
    expect(
      setCookies.some(
        (c) =>
          c.includes(`${AUTH_COOKIE_NAME}=`) &&
          c.toLowerCase().includes("max-age=0"),
      ),
    ).toBe(true);
    expect(
      setCookies.some(
        (c) =>
          c.includes(`${LEGACY_AUTH_COOKIE_NAME}=`) &&
          c.toLowerCase().includes("max-age=0"),
      ),
    ).toBe(true);
  });
});
