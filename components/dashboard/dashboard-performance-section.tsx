"use client";

import { useEffect, useState } from "react";

import { ErrorBoundary } from "@/components/error-boundary";
import type { OwnerDashboardPayload } from "@/lib/mock/types";

import { AgentGrid } from "./agent-grid";
import { VolumeChart } from "./volume-chart";

type EventVolumeDay = OwnerDashboardPayload["eventVolumeByDay"];

/** Split from main dashboard bundle so Recharts loads in a separate chunk. */
function VolumeChartGate({ data }: { data: EventVolumeDay }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div
        className="flex h-[320px] min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sm text-white/45"
        aria-hidden
      >
        Loading chart…
      </div>
    );
  }
  return <VolumeChart data={data} />;
}

export function DashboardPerformanceSection({
  eventVolumeByDay,
  agents,
}: {
  eventVolumeByDay: EventVolumeDay;
  agents: OwnerDashboardPayload["agents"];
}) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Performance
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
          Event volume and agent connections — enough context to steer your agent
          fleet without wading through raw infrastructure.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ErrorBoundary>
            <VolumeChartGate data={eventVolumeByDay} />
          </ErrorBoundary>
        </div>
        <AgentGrid agents={agents} />
      </div>
    </section>
  );
}
