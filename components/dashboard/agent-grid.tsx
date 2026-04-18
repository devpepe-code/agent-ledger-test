"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { memo, useState, type ReactElement } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AgentProfile } from "@/lib/mock/types";
import { relativeTime } from "@/lib/mock/narrative";
import { cn } from "@/lib/utils";

const AGENT_COPY: Record<
  string,
  { tagline: string; today: string; last: string; status: "running" | "suspended" }
> = {
  "treasury-agent": {
    tagline: "Manages protocol treasury & agent payroll",
    today: "Today: $12,400 swept · 3 invoices settled · 0 blocks",
    last: "Last: Swept USDC to Aave vault · 4s ago",
    status: "running",
  },
  "deal-scout": {
    tagline: "Autonomous deal sourcing & LOI workflow",
    today: "Today: 847 targets · 1 LOI · 1 block (NDA)",
    last: "Last: Submitted LOI for target acquisition · 12m ago",
    status: "running",
  },
  "compliance-agent": {
    tagline: "Regulatory filings & policy drift monitoring",
    today: "Today: 1 EU filing · 1 drift flag · 0 blocks",
    last: "Last: Filed EU AI Act disclosure for Q2 · 8m ago",
    status: "running",
  },
  "rogue-scraper": {
    tagline: "Market data collection — suspended after policy violations",
    today: "Today: 0 events · 14 violations on record",
    last: "Last: BLOCKED — attempted credential exfiltration · 2h ago",
    status: "suspended",
  },
};

function trustGrade(score: number): string {
  if (score >= 95) return "A+";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function gradeColor(letter: string): string {
  if (letter === "A" || letter === "A+" || letter === "B") return "text-emerald-400";
  if (letter === "C") return "text-amber-400";
  return "text-red-400";
}

function demoDayCounts(agentId: string, totalEvents: number) {
  let h = 0;
  for (let i = 0; i < agentId.length; i++) {
    h = (h * 31 + agentId.charCodeAt(i)) >>> 0;
  }
  return {
    events: Math.min(999, Math.max(12, Math.floor(totalEvents / 8) + (h % 40))),
  };
}

export function AgentGrid({
  agents,
}: {
  agents: AgentProfile[];
}): ReactElement {
  return (
    <div>
      <Card className="rounded-xl border border-white/[0.08] bg-[var(--bg-surface)]">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-2">
          <div>
            <CardTitle className="font-display text-base tracking-tight">
              Agent Connections
            </CardTitle>
            <p className="mt-1 text-sm text-white/50">
              Live panels — trust grade, economic context, verified records
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

const AgentCard = memo(function AgentCard({
  agent,
}: {
  agent: AgentProfile;
}): ReactElement {
  const [showDetails, setShowDetails] = useState(false);
  const grade = trustGrade(agent.trustScore);
  const day = demoDayCounts(agent.id, agent.totalEvents);
  const copy = AGENT_COPY[agent.id] ?? {
    tagline: "Production agent",
    today: `Today: ${day.events} events`,
    last: `Last: anchored record · ${relativeTime(agent.lastAnchoredAtUnix)}`,
    status: "running" as const,
  };
  const shortName = agent.displayName.split(" —")[0]?.trim() ?? agent.displayName;
  const slug = shortName.toLowerCase().replace(/\s+/g, "-");

  const borderAccent =
    copy.status === "suspended"
      ? "border-l-red-500/80 motion-safe:animate-pulse"
      : agent.trustScore < 60
        ? "border-l-red-500/60"
        : agent.trustScore < 75
          ? "border-l-amber-500/60"
          : "border-l-emerald-500/60";

  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.08] bg-[var(--bg-surface)] py-4 pl-4 pr-3 transition-all duration-200 hover:border-[rgba(124,58,237,0.3)] hover:shadow-[0_0_0_1px_rgba(124,58,237,0.2)]",
        "border-l-[3px]",
        borderAccent,
      )}
    >
      <div className="flex items-start justify-between gap-2 border-b border-white/[0.08] pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "inline-block h-2 w-2 shrink-0 rounded-full",
              copy.status === "suspended" ? "bg-red-400" : "bg-emerald-400",
            )}
            aria-hidden
          />
          <p className="truncate font-display font-semibold tracking-tight text-white">
            {slug}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-white/45">
            {copy.status === "suspended" ? "Suspended" : "Running"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                "font-display text-2xl font-extrabold leading-none",
                gradeColor(grade),
              )}
            >
              {grade}
            </span>
            <span className="font-mono text-sm tabular-nums text-white/50">
              {agent.trustScore}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-2 font-mono text-[11px] leading-relaxed text-white/55">
        {copy.tagline}
      </p>
      <p className="mt-2 font-mono text-[11px] text-white/50">{copy.today}</p>
      <p className="mt-1 font-mono text-[11px] text-white/45">{copy.last}</p>

      <div className="mt-3 h-1 w-full overflow-hidden rounded-sm bg-white/10">
        <div
          className="h-full rounded-sm bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
          style={{ width: `${Math.min(100, agent.trustScore)}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
        <span className="text-[10px] text-white/35">
          {day.events} events · Verified ✓
        </span>
      </div>

      <div className="mt-3 border-t border-white/[0.06] pt-3">
        <div className="mb-2 flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="primary"
            className="h-9 min-h-[44px] flex-1 text-xs sm:min-h-8"
            asChild
          >
            <Link href={`/agents/profile/${agent.id}`}>View agent profile →</Link>
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 w-full min-h-[44px] justify-between px-2 text-xs text-white/50 hover:text-white sm:min-h-8"
          onClick={() => setShowDetails((v) => !v)}
          aria-expanded={showDetails}
        >
          Policy technical details
          <span
            className={`inline-block transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </Button>
        {showDetails ? (
          <div className="overflow-hidden">
            <p className="mt-2 font-mono text-[10px] leading-relaxed text-white/35">
              Policy pack{" "}
              {agent.policyVersion.match(/[\d.]+/)?.[0] ?? "—"}
              {agent.ledgerContract
                ? ` · contract ${agent.ledgerContract.slice(0, 6)}…`
                : ""}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
});
