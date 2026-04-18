"use client";

import dynamic from "next/dynamic";

import type { OwnerDashboardPayload } from "@/lib/mock/types";
import {
  buildHeroNarrative,
  computeWellbeing,
} from "@/lib/mock/narrative";

import { DailyDigest } from "./daily-digest";
import { DashboardEmptyAgents } from "./dashboard-empty-agents";
import { DemoWorkspaceBanner } from "./demo-workspace-banner";
import { HeroNarrative } from "./hero-narrative";
import {
  SiteHeader,
  type DashboardLiveStatus,
  type DashboardSessionKind,
} from "./site-header";
import { WellbeingStrip } from "./wellbeing-strip";

const DashboardPerformanceSection = dynamic(
  () =>
    import("./dashboard-performance-section").then(
      (m) => m.DashboardPerformanceSection,
    ),
  {
    ssr: false,
    loading: () => (
      <section className="space-y-5" aria-hidden>
        <div className="space-y-2">
          <div className="h-7 w-44 animate-pulse rounded bg-white/10" />
          <div className="h-4 max-w-xl animate-pulse rounded bg-white/[0.06]" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-[320px] min-h-[320px] animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]" />
          </div>
          <div className="h-[320px] min-h-[320px] animate-pulse rounded-xl border border-white/10 bg-white/[0.04] lg:h-auto" />
        </div>
      </section>
    ),
  },
);

function Shell({
  children,
  sessionKind,
  liveStatus,
}: {
  children: React.ReactNode;
  sessionKind: DashboardSessionKind;
  liveStatus?: DashboardLiveStatus | null;
}) {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[var(--bg-base)] via-[#0D1117] to-[var(--bg-base)] text-white"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.22), transparent),
            radial-gradient(ellipse 60% 40% at 100% 0%, rgba(6, 182, 212, 0.12), transparent),
            linear-gradient(to bottom, transparent, var(--bg-base))
          `,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <SiteHeader sessionKind={sessionKind} liveStatus={liveStatus} />
      <main className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export function DashboardPage({
  payload,
  sessionKind,
}: {
  payload: OwnerDashboardPayload;
  sessionKind: DashboardSessionKind;
}) {
  const hero = buildHeroNarrative(payload);
  const wellbeing = computeWellbeing(payload.recentEvents);
  const hasAgents = payload.agents.length > 0;
  const blocksWeek = payload.recentEvents.filter((e) => e.type === "safety_block")
    .length;
  const verifiedWeek = payload.recentEvents.filter(
    (e) => e.verificationStatus === "verified",
  ).length;
  const actionSum = payload.eventVolumeByDay.reduce((s, d) => s + d.count, 0);
  const lastDayCount =
    payload.eventVolumeByDay[payload.eventVolumeByDay.length - 1]?.count ?? 0;
  const openIncidents = payload.recentEvents.filter(
    (e) => e.verificationStatus === "challenge_open",
  ).length;
  const liveStatus: DashboardLiveStatus = {
    agentCount: payload.agents.length,
    eventsToday: lastDayCount,
    incidents: openIncidents,
    tone:
      hero.tone === "critical"
        ? "critical"
        : hero.tone === "watch"
          ? "warning"
          : "ok",
  };

  return (
    <Shell sessionKind={sessionKind} liveStatus={liveStatus}>
      <div className="space-y-10">
        {sessionKind === "simulated" ? <DemoWorkspaceBanner /> : null}
        <section className="max-w-4xl space-y-3">
          <h1 className="text-sm font-medium text-white/55">
            Every agent action in the agentic economy — with a record you can verify.
          </h1>
        </section>

        <HeroNarrative
          headline={hero.headline}
          tone={hero.tone}
          highlight={hero.highlight}
          primaryLink={hero.primaryLink}
        />

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">
              Events in this chart window
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-white">
              {hasAgents ? actionSum.toLocaleString("en-US") : "0"}
            </p>
            <p className="mt-1 text-xs text-white/45">
              Actions your agents logged into AgentLedger across the displayed range.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">
              Verified records
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-[#6ee7b7]">
              {hasAgents ? verifiedWeek : 0}
            </p>
            <p className="mt-1 text-xs text-white/45">
              Sealed with cryptographic proof — ready for audit or customer evidence.
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-amber-200/70">
              Safety blocks
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-amber-100">
              {hasAgents ? blocksWeek : 0}
            </p>
            <p className="mt-1 text-xs text-white/55">
              Guardrails stopped risky steps before they reached customers or regulators.
            </p>
          </div>
          <div className="rounded-xl border border-[#7C3AED]/25 bg-[#7C3AED]/[0.08] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#c4b5fd]/90">
              Production agents
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-white">
              {payload.agents.length}
            </p>
            <p className="mt-1 text-xs text-white/55">
              Each with its own policy pack and attestation trail.
            </p>
          </div>
        </section>

        <WellbeingStrip level={wellbeing} agents={payload.agents} />

        <DailyDigest events={payload.recentEvents} agents={payload.agents} />

        {!hasAgents ? <DashboardEmptyAgents /> : null}

        {hasAgents ? (
          <DashboardPerformanceSection
            eventVolumeByDay={payload.eventVolumeByDay}
            agents={payload.agents}
          />
        ) : null}

        <footer className="border-t border-white/10 pt-8 text-center text-xs text-white/40">
          AgentLedger — trust layer for the agentic economy
        </footer>
      </div>
    </Shell>
  );
}
