"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { DASHBOARD_LINK_NEW_TAB, DASHBOARD_MAIN_HREF } from "@/lib/auth";
import { useScrambleCount } from "@/hooks/use-scramble-count";
import { cn } from "@/lib/utils";

import { SectionEyebrow } from "./section-eyebrow";

const STATS = [
  {
    key: "a",
    numeric: 88,
    suffix: "%",
    label:
      "of enterprises confirmed an AI agent security incident — with no audit trail to diagnose what went wrong.",
    source: "source: gravitee_2026.pdf",
    border: "border-[#EF4444]/40",
    top: "bg-[#EF4444]",
  },
  {
    key: "b",
    special: "1 in 2" as const,
    label:
      "deployed agents operate with zero behavioral logging. Zero identity. Invisible actors in a visible economy.",
    source: "source: gravitee_state_of_ai_agents.pdf",
    border: "border-amber-400/45",
    top: "bg-amber-400",
  },
  {
    key: "c",
    special: "$1T" as const,
    label:
      "projected agentic AI market by 2030. Trust infrastructure is the missing layer.",
    source: "source: NVIDIA GTC 2026",
    border: "border-[#7C3AED]/45",
    top: "bg-[#7C3AED]",
  },
  {
    key: "d",
    special: "96:1" as const,
    label:
      "ratio of AI agents to human workers in financial services today",
    source: "source: a16z crypto, 2026",
    border: "border-[#6366F1]/45",
    top: "bg-[#6366F1]",
  },
] as const;

function StatCard({
  border,
  top,
  children,
}: {
  border: string;
  top: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-[var(--bg-surface)] transition-all duration-200 hover:border-white/[0.16] hover:bg-[var(--bg-surface-hover)]",
        border,
      )}
    >
      <div className={cn("absolute left-0 right-0 top-0 h-0.5", top)} />
      <div className="p-6 pt-7">{children}</div>
    </div>
  );
}

export function MarketingProblemStats() {
  const n88 = useScrambleCount(88);

  return (
    <section
      className="relative border-t border-white/[0.06] py-12 sm:py-16"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionEyebrow>{"// the_accountability_gap.md"}</SectionEyebrow>

        <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-section max-w-xl text-white">
              The agentic economy is scaling faster than trust.
            </h2>
            <p className="mt-4 text-lg text-white/55">
              AI agents now outnumber human workers 96-to-1 in financial
              services. They&apos;re transacting, hiring, deciding —
              autonomously, at machine speed. Most have no verified behavioral
              record. None.
            </p>
            <p className="mt-12 text-lg font-semibold text-white lg:text-xl">
              The agentic economy needs more than agents. It needs accountable
              ones.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#how-it-works"
                className={cn(
                  buttonVariants({ variant: "accent", size: "lg" }),
                  "min-h-[48px]",
                )}
              >
                See how proof works →
              </Link>
              <Link
                href={DASHBOARD_MAIN_HREF}
                prefetch={false}
                {...DASHBOARD_LINK_NEW_TAB}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "min-h-[48px]",
                )}
              >
                Open Dashboard →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard border={STATS[0].border} top={STATS[0].top}>
              <p className="font-display text-5xl font-extrabold tabular-nums text-white sm:text-6xl md:text-7xl">
                {n88}
                {STATS[0].suffix}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {STATS[0].label}
              </p>
              <p className="mt-4 font-mono text-[11px] text-white/35">
                {STATS[0].source}
              </p>
            </StatCard>

            <StatCard border={STATS[1].border} top={STATS[1].top}>
              <p className="font-display text-5xl font-extrabold tabular-nums text-white sm:text-6xl md:text-7xl">
                {STATS[1].special}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {STATS[1].label}
              </p>
              <p className="mt-4 font-mono text-[11px] text-white/35">
                {STATS[1].source}
              </p>
            </StatCard>

            <StatCard border={STATS[2].border} top={STATS[2].top}>
              <p className="font-display text-5xl font-extrabold tabular-nums text-white sm:text-6xl md:text-7xl">
                {STATS[2].special}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {STATS[2].label}
              </p>
              <p className="mt-4 font-mono text-[11px] text-white/35">
                {STATS[2].source}
              </p>
            </StatCard>

            <StatCard border={STATS[3].border} top={STATS[3].top}>
              <p className="font-display text-5xl font-extrabold tabular-nums text-white sm:text-6xl md:text-7xl">
                {STATS[3].special}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {STATS[3].label}
              </p>
              <p className="mt-4 font-mono text-[11px] text-white/35">
                {STATS[3].source}
              </p>
            </StatCard>
          </div>
        </div>
      </div>
    </section>
  );
}
