import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { DASHBOARD_LINK_NEW_TAB, DASHBOARD_MAIN_HREF } from "@/lib/auth";
import { cn } from "@/lib/utils";

import { MarketingHeroBackground } from "./marketing-hero-background";

export function MarketingHero() {
  return (
    <section
      className="relative flex flex-col px-4 pb-12 pt-6 sm:px-6 sm:pb-14 sm:pt-8"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <MarketingHeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div className="mono-label mb-6 w-full">
          {"// trust_layer_for_the_agentic_economy"}
        </div>

        <h1
          className="max-w-4xl text-balance text-center"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          <span className="block text-white">The agentic economy</span>
          <span className="gradient-text block"> needs a ledger.</span>
        </h1>

        <p
          className="mt-8 max-w-2xl text-center text-white/55"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.7,
          }}
        >
          AI agents are now economic actors — they transact, decide, and operate
          autonomously at scale. AgentLedger gives every agent a permanent,
          verifiable record of everything they do. So you can trust them with
          more.
        </p>

        <div className="mt-8 flex w-full max-w-lg flex-col flex-wrap items-center justify-center gap-3 sm:max-w-none sm:flex-row">
          <Link
            href={DASHBOARD_MAIN_HREF}
            prefetch={false}
            {...DASHBOARD_LINK_NEW_TAB}
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "group min-h-[44px] w-full justify-center sm:w-auto",
            )}
          >
            Deploy your first agent
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href={DASHBOARD_MAIN_HREF}
            prefetch={false}
            {...DASHBOARD_LINK_NEW_TAB}
            className={cn(
              "inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border border-white/15 px-5 py-2.5 text-sm text-white/70 transition-all hover:border-white/30 hover:text-white sm:w-auto",
            )}
          >
            Explore the dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
