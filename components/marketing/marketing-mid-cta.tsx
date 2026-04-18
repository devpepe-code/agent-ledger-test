import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { DASHBOARD_LINK_NEW_TAB, DASHBOARD_MAIN_HREF } from "@/lib/auth";
import { cn } from "@/lib/utils";

import { SectionEyebrow } from "./section-eyebrow";

export function MarketingMidCta() {
  return (
    <section
      className="border-t border-white/[0.06] py-12 sm:py-16"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionEyebrow>{"// the_question.md"}</SectionEyebrow>
        <h2
          className="mt-6 max-w-3xl text-left font-bold leading-tight tracking-tight text-white"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Your agents are out there right now.
          <br />
          Transacting. Deciding. Acting.
          <br />
          <span className="text-white/90">Do you know what they did</span>
          <br />
          in the last 24 hours?
        </h2>
        <Link
          href={DASHBOARD_MAIN_HREF}
          prefetch={false}
          {...DASHBOARD_LINK_NEW_TAB}
          className={cn(
            buttonVariants({ variant: "primary", size: "lg" }),
            "group mt-8 inline-flex min-h-[48px]",
          )}
        >
          See your agent activity
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </section>
  );
}
