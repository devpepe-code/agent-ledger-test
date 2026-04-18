import { MARKETING_NAV_LINKS } from "@/lib/marketing-nav-links";

import { MarketingNavClient } from "./marketing-nav-client";

/** Server wrapper passes link config as props so labels match SSR after nav changes (avoids stale client chunk hydration mismatches). */
export function MarketingNav() {
  return <MarketingNavClient links={MARKETING_NAV_LINKS} />;
}
