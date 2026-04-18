/** Session cookie from /api/auth/simulate (demo) or /api/auth/wallet (real addresses). */
export const AUTH_COOKIE_NAME = "al_session";

/** Previous name — cleared on logout so old 7-day cookies do not skip the wallet gate. */
export const LEGACY_AUTH_COOKIE_NAME = "al_auth";

/** Canonical in-app dashboard route. */
export const DASHBOARD_MAIN_HREF = "/dashboard";

/**
 * Marketing “Launch App” — clears session via `?connect=1` middleware so users
 * always see the connect / demo gate (not a stale demo session).
 */
export const DASHBOARD_LAUNCH_HREF = "/dashboard?connect=1";

/**
 * Clears session cookies (middleware) so the connect-wallet gate runs; used by
 * `/login` redirects and optional deep links — not required for Launch App.
 */
export const DASHBOARD_CONNECT_HREF = "/dashboard?connect=1";

/** Spread on `<Link href={…DASHBOARD…}>` so dashboard opens in a new tab from marketing/public pages. */
export const DASHBOARD_LINK_NEW_TAB = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};
