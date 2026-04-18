/**
 * Centralized public env with compile-time friendly access.
 * Do not put server-only secrets in NEXT_PUBLIC_* vars.
 */

const FALLBACK_APP_URL = "http://127.0.0.1:3000";

/**
 * Absolute app URL for metadata / OG. Invalid or blank `NEXT_PUBLIC_APP_URL`
 * must not throw — `new URL()` in `app/layout.tsx` would crash the whole route.
 */
function resolveAppUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim();
  const fromVercel = process.env.VERCEL_URL?.trim();
  const candidate =
    raw && raw.length > 0
      ? raw.replace(/\/$/, "")
      : fromVercel
        ? `https://${fromVercel.replace(/\/$/, "")}`
        : FALLBACK_APP_URL;
  try {
    const u = new URL(candidate);
    if (u.protocol !== "http:" && u.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
    return u.href.replace(/\/$/, "");
  } catch {
    return FALLBACK_APP_URL;
  }
}

const wc =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim() || "";

export const env = {
  walletConnectProjectId:
    wc.length > 0 ? wc : "00000000000000000000000000000000",
  baseRpcUrl:
    process.env.NEXT_PUBLIC_BASE_RPC_URL?.trim() ||
    "https://mainnet.base.org",
  baseChainId: 8453 as const,
  basescanUrl:
    process.env.NEXT_PUBLIC_BASESCAN_URL?.replace(/\/$/, "") ||
    "https://basescan.org",
  appUrl: resolveAppUrl(),
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
  isProd: process.env.NEXT_PUBLIC_APP_ENV === "production",
  ipfsGateway:
    process.env.NEXT_PUBLIC_IPFS_GATEWAY?.replace(/\/$/, "") ||
    "https://ipfs.io/ipfs",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  realWalletEnabled: process.env.NEXT_PUBLIC_ENABLE_REAL_WALLET !== "false",
} as const;

export function isWalletConnectConfigured(): boolean {
  return (
    Boolean(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim()) &&
    env.walletConnectProjectId !== "00000000000000000000000000000000"
  );
}

/** Non-throwing checklist for ops / health diagnostics */
export function getEnvIssues(): string[] {
  const issues: string[] = [];
  if (!isWalletConnectConfigured()) {
    issues.push(
      "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is missing or placeholder — WalletConnect may not work in production.",
    );
  }
  if (!process.env.NEXT_PUBLIC_APP_URL?.trim() && !process.env.VERCEL_URL) {
    issues.push(
      "NEXT_PUBLIC_APP_URL unset and VERCEL_URL missing — Open Graph URLs may be wrong locally.",
    );
  }
  return issues;
}
