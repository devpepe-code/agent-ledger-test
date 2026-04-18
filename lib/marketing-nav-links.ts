export type MarketingNavLink = {
  readonly href: string;
  readonly label: string;
};

/** Source of truth for marketing header links (passed from server → client for stable hydration). */
export const MARKETING_NAV_LINKS: readonly MarketingNavLink[] = [
  { href: "/#how-it-works", label: "How It Works" },
];
