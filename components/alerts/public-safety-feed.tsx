"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  incidentForEvent,
  shortTxHash,
} from "@/components/alerts/incident-copy";
import { Button } from "@/components/ui/button";
import { DASHBOARD_LINK_NEW_TAB, DASHBOARD_MAIN_HREF } from "@/lib/auth";
import { baseTxUrl } from "@/lib/basescan";
import { verificationHuman } from "@/lib/mock/narrative";
import type { BehaviorEvent } from "@/lib/mock/types";
import { cn } from "@/lib/utils";

function formatUtcHm(ts: number): string {
  return (
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      hour12: false,
    }).format(new Date(ts * 1000)) + " UTC"
  );
}

export function PublicSafetyFeed({
  events,
  agentNames,
}: {
  events: BehaviorEvent[];
  agentNames: Record<string, string>;
}) {
  return (
    <ul className="mx-auto max-w-3xl space-y-4">
      {events.map((ev) => (
        <IncidentRow
          key={ev.id}
          event={ev}
          agentName={agentNames[ev.agentId] ?? "Agent"}
        />
      ))}
    </ul>
  );
}

function IncidentRow({
  event,
  agentName,
}: {
  event: BehaviorEvent;
  agentName: string;
}) {
  const [open, setOpen] = useState(false);
  const v = verificationHuman(event.verificationStatus);
  const incident = incidentForEvent(event);
  const txShort = shortTxHash(event.anchored.txHash);
  const titleUpper = incident.title.toUpperCase();

  const accent =
    incident.severity === "CRITICAL"
      ? {
          border: "border-l-red-500",
          label: "text-red-400",
        }
      : incident.severity === "HIGH"
        ? {
            border: "border-l-amber-500",
            label: "text-amber-400",
          }
        : {
            border: "border-l-cyan-500",
            label: "text-cyan-400",
          };

  return (
    <li
      className={cn(
        "overflow-hidden rounded-xl border border-white/[0.08] bg-[#111118]",
        "border-l-[3px]",
        accent.border,
      )}
    >
      <div className="flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3 font-mono text-[11px] text-white/40">
          <span className={cn("font-semibold tracking-wide", accent.label)}>
            {incident.severity}
          </span>
          <span className="tabular-nums">{formatUtcHm(event.timestampUnix)}</span>
        </div>

        <div>
          <p className="text-sm text-white/55">{agentName}</p>
          <p
            className={cn(
              "mt-3 font-mono text-xs font-semibold leading-snug tracking-wide",
              accent.label,
            )}
          >
            {titleUpper}
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/90">
            {event.summary}
          </p>
        </div>

        <div className="space-y-1 font-mono text-[11px] text-white/55">
          <p>
            <span className="text-white/35">ACTION</span> — {incident.actionTaken}
          </p>
          <p>
            <span className="text-white/35">PROOF</span>{" "}
            <span className="text-white/75">{txShort}</span>
            <span className="text-white/35"> · </span>
            <span
              className={
                v.variant === "success" ? "text-emerald-300" : "text-white/55"
              }
            >
              {v.label} ✓
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-[44px] border-white/[0.15] font-mono text-xs sm:min-h-9"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            Details
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="min-h-[44px] font-mono text-xs sm:min-h-9"
            asChild
          >
            <Link
              href={DASHBOARD_MAIN_HREF}
              prefetch={false}
              {...DASHBOARD_LINK_NEW_TAB}
            >
              View in app →
            </Link>
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/[0.08] bg-[#0A0A0F] px-4 py-4 sm:px-5">
          <p className="font-mono text-[11px] break-all text-white/50">
            {event.anchored.txHash}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-2 gap-1 font-mono text-[#22d3ee]"
            onClick={() =>
              window.open(baseTxUrl(event.anchored.txHash), "_blank")
            }
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open explorer →
          </Button>
        </div>
      ) : null}
    </li>
  );
}
