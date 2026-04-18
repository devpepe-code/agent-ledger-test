"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { AgentProfile } from "@/lib/mock/types";
import type { WellbeingLevel } from "@/lib/mock/narrative";
import { wellbeingCopy } from "@/lib/mock/narrative";
import { cn } from "@/lib/utils";

function letterGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function gradeColor(letter: string): string {
  if (letter === "A" || letter === "B") return "text-emerald-400";
  if (letter === "C") return "text-amber-400";
  return "text-red-400";
}

export function WellbeingStrip({
  level,
  agents,
}: {
  level: WellbeingLevel;
  agents: AgentProfile[];
}) {
  const { headline, detail } = wellbeingCopy(level);
  const ok = level === "ok";
  const n = agents.length;
  const fleetScore =
    n > 0
      ? Math.round(
          agents.reduce((s, a) => s + a.trustScore, 0) / n,
        )
      : 0;
  const letter = n > 0 ? letterGrade(fleetScore) : "—";
  const narrative =
    n === 0
      ? "Connect an agent to compute fleet trust rating."
      : ok
        ? `${n} agent${n === 1 ? "" : "s"} in the agentic economy window. No open reviews in this snapshot.`
        : "One agent needs your attention before the fleet is back to green.";

  return (
    <div
      className={cn(
        "rounded-xl border px-5 py-5",
        ok
          ? "border-[#10B981]/25 bg-[#10B981]/[0.07]"
          : "border-amber-400/25 bg-amber-500/[0.08]",
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
          <div className="flex items-baseline gap-4">
            <span
              className={cn(
                "font-display text-[5rem] font-extrabold leading-none tracking-tight sm:text-[5.5rem]",
                n > 0 ? gradeColor(letter) : "text-white/30",
              )}
            >
              {letter}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Fleet Trust Rating</p>
              <p className="font-mono text-sm tabular-nums text-white/50">
                {n > 0 ? `${fleetScore}/100` : "—/100"}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-snug text-white/70">
                {narrative}
              </p>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-white/50">
                Combined behavioral score across {n || "your"} agents. Based on:
                mandate compliance, task success, record completeness, and
                incident history.
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex min-w-0 flex-1 flex-col gap-3 border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
        >
          <div className="flex gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                ok ? "bg-[#10B981]/20 text-[#6ee7b7]" : "bg-amber-500/20 text-amber-200"
              }`}
            >
              {ok ? (
                <CheckCircle2 className="h-5 w-5" aria-hidden />
              ) : (
                <AlertCircle className="h-5 w-5" aria-hidden />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-white">{headline}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/65">
                {detail}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pl-0 sm:pl-14 lg:pl-14">
            <Button variant="outline" size="sm" className="border-white/20" asChild>
              <Link href="/alerts">Live Alerts →</Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a href="#todays-summary">Today&apos;s activity summary</a>
            </Button>
            {!ok ? (
              <Button size="sm" className="bg-amber-600 hover:bg-amber-500" asChild>
                <Link href="/agents">Review integrations</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
