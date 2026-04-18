import type { Metadata } from "next";
import Link from "next/link";

import { incidentForEvent } from "@/components/alerts/incident-copy";
import { PublicSafetyFeed } from "@/components/alerts/public-safety-feed";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { DASHBOARD_LINK_NEW_TAB, DASHBOARD_MAIN_HREF } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { cloneOwnerDashboard } from "@/lib/mock/data";
import type { BehaviorEvent } from "@/lib/mock/types";

export const metadata: Metadata = {
  title: "Live Alerts — agentic economy safety feed",
  description:
    "Guardrail triggers and blocked actions across the network — anonymized, permanent, with verified records.",
};

function countSeverities(events: BehaviorEvent[]) {
  let critical = 0;
  let high = 0;
  let medium = 0;
  for (const e of events) {
    const s = incidentForEvent(e).severity;
    if (s === "CRITICAL") critical += 1;
    else if (s === "HIGH") high += 1;
    else medium += 1;
  }
  return { critical, high, medium, blocked: events.length };
}

export default function AlertsPage() {
  const payload = cloneOwnerDashboard();
  const alerts = payload.recentEvents
    .filter((e) => e.type === "safety_block")
    .sort((a, b) => b.timestampUnix - a.timestampUnix);
  const agentNames = Object.fromEntries(
    payload.agents.map((a) => [a.id, a.displayName]),
  );
  const sev = countSeverities(alerts);

  return (
    <div className="min-h-screen bg-[var(--bg-base,#0A0A0F)] text-white">
      <MarketingNav />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-mono text-xs text-cyan-400/80">
          {"// live_safety_monitor.md"}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          What agents are being stopped from doing.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/55">
          Every guardrail trigger across the network. Anonymized. Permanent.
        </p>
        <p className="mt-4 flex flex-wrap items-center gap-2 font-mono text-sm text-white/55">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-400"
              aria-hidden
            />
            <span className="text-white/90">LIVE FEED</span>
          </span>
          <span className="text-white/35">·</span>
          <span className="tabular-nums text-white/70">
            {alerts.length} blocked actions in this feed
          </span>
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50">
          Preview workspace feed. Connect your agents to monitor your own fleet
          in real time.
        </p>

        <div
          className="mt-8 w-full max-w-full overflow-x-auto overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] sm:overflow-visible sm:pb-0"
          role="region"
          aria-label="Severity counts"
        >
          <div className="flex w-max min-w-full flex-nowrap items-stretch justify-start gap-0 divide-x divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[var(--bg-surface)] py-3 font-mono text-xs sm:w-full sm:min-w-0 sm:flex-wrap sm:justify-between sm:px-2">
            <div className="flex min-w-[7rem] shrink-0 flex-col items-center gap-0.5 px-3 py-1 sm:min-w-0 sm:flex-1 sm:items-start">
              <span className="text-[10px] uppercase tracking-wider text-white/40">
                Critical
              </span>
              <span className="text-lg font-semibold tabular-nums text-red-400">
                {sev.critical}
              </span>
            </div>
            <div className="flex min-w-[7rem] shrink-0 flex-col items-center gap-0.5 px-3 py-1 sm:min-w-0 sm:flex-1 sm:items-start">
              <span className="text-[10px] uppercase tracking-wider text-white/40">
                High
              </span>
              <span className="text-lg font-semibold tabular-nums text-amber-400">
                {sev.high}
              </span>
            </div>
            <div className="flex min-w-[7rem] shrink-0 flex-col items-center gap-0.5 px-3 py-1 sm:min-w-0 sm:flex-1 sm:items-start">
              <span className="text-[10px] uppercase tracking-wider text-white/40">
                Medium
              </span>
              <span className="text-lg font-semibold tabular-nums text-cyan-400/90">
                {sev.medium}
              </span>
            </div>
            <div className="flex min-w-[7rem] shrink-0 flex-col items-center gap-0.5 px-3 py-1 sm:min-w-0 sm:flex-1 sm:items-start">
              <span className="text-[10px] uppercase tracking-wider text-white/40">
                Blocked this week
              </span>
              <span className="text-lg font-semibold tabular-nums text-white/90">
                347
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <PublicSafetyFeed events={alerts} agentNames={agentNames} />
        </div>

        <div className="mt-10 rounded-xl border border-white/[0.08] bg-[var(--bg-surface)] p-5 sm:p-6">
          <p className="font-mono text-xs text-cyan-400/70">
            {"// why_this_matters.md"}
          </p>
          <h2 className="mt-2 font-display text-lg font-semibold text-white">
            Liability protection at machine speed
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            In the agentic economy, agents transact at machine speed with real
            consequences — real money, real contracts, real data. These blocks
            prevented $840,000 in unauthorized transfers and a legally binding
            signature. Both are permanently recorded with cryptographic proof.
            That record is your liability protection. Your audit trail. Your
            evidence that your safety controls work.
          </p>
          <Button variant="primary" size="lg" className="mt-6 min-h-[48px] sm:min-h-10" asChild>
            <Link
              href={DASHBOARD_MAIN_HREF}
              prefetch={false}
              {...DASHBOARD_LINK_NEW_TAB}
            >
              Monitor your own agents →
            </Link>
          </Button>
        </div>

        <div className="mt-10 rounded-xl border border-white/[0.08] bg-[var(--bg-surface)] p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold text-white">
            Prevention with proof
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Every blocked action is permanently recorded with cryptographic
            proof: what the agent tried to do, when it tried to do it, and what
            stopped it.
          </p>
          <Button variant="primary" size="lg" className="mt-6 min-h-[48px] sm:min-h-10" asChild>
            <Link
              href={DASHBOARD_MAIN_HREF}
              prefetch={false}
              {...DASHBOARD_LINK_NEW_TAB}
            >
              Open dashboard →
            </Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button variant="primary" size="lg" className="min-h-[48px] sm:min-h-10" asChild>
            <Link
              href={DASHBOARD_MAIN_HREF}
              prefetch={false}
              {...DASHBOARD_LINK_NEW_TAB}
            >
              Monitor your fleet →
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="min-h-[48px] sm:min-h-10" asChild>
            <Link href="/#how-it-works">How Trust Scores work →</Link>
          </Button>
        </div>

        <p className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#22d3ee] transition-colors hover:text-white"
          >
            ← AgentLedger home
          </Link>
        </p>
      </main>
    </div>
  );
}
