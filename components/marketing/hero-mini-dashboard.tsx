"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { DASHBOARD_LINK_NEW_TAB, DASHBOARD_MAIN_HREF } from "@/lib/auth";
import { cn } from "@/lib/utils";

const FEED_LINES = [
  {
    tone: "ok" as const,
    text: "✓ treasury-agent · Swept $12,400 USDC to yield vault — verified",
  },
  {
    tone: "info" as const,
    text: "→ deal-scout · Evaluated 847 acquisition targets",
  },
  {
    tone: "ok" as const,
    text: "✓ compliance-agent · Filed EU AI Act Q2 disclosure — verified",
  },
  {
    tone: "info" as const,
    text: "→ treasury-agent · Paid deal-scout · $240 USDC · x402",
  },
  {
    tone: "alert" as const,
    text: "⚠ deal-scout · Attempted to sign NDA — blocked",
  },
  {
    tone: "danger" as const,
    text: "⛔ rogue-scraper · BLOCKED · credential exfiltration attempt",
  },
  {
    tone: "info" as const,
    text: "→ compliance-agent · Policy drift detected · deal-scout",
  },
  {
    tone: "info" as const,
    text: "→ treasury-agent · Declined vendor invoice $9,200 — escalated",
  },
] as const;

function trustGrade(score: number): string {
  if (score >= 95) return "A+";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function LiveClock() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const tick = () => {
      setLabel(
        new Intl.DateTimeFormat("en-CA", {
          dateStyle: "short",
          timeStyle: "medium",
          timeZone: "UTC",
          hour12: false,
        }).format(new Date()) + " UTC",
      );
    };
    tick();
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(tick, reduced ? 60_000 : 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[10px] text-white/40 sm:text-[11px]" suppressHydrationWarning>
      {label || "—"}
    </span>
  );
}

export function HeroMiniDashboard() {
  const doubled = [...FEED_LINES, ...FEED_LINES];

  const agents = [
    { name: "treasury-agent", score: 91, ok: true },
    { name: "deal-scout", score: 78, ok: true },
    { name: "compliance-agent", score: 96, ok: true },
    { name: "rogue-scraper", score: 31, ok: false },
  ];

  return (
    <div className="relative mx-auto mt-8 w-full max-w-4xl">
      <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
        Preview Mode — sample agentic economy workspace
      </p>
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--bg-surface)] p-4 shadow-2xl shadow-black/40 sm:p-5">
        <div className="pointer-events-none absolute inset-0 z-[2] crt-scanlines opacity-70" />
        <div className="relative z-[3] flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/70 sm:text-xs">
            <span className="flex items-center gap-1.5 rounded border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-red-300">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 motion-safe:animate-rec-pulse" />
              REC
            </span>
          </div>
          <LiveClock />
        </div>

        <div className="relative z-[3] mt-3 flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_1.1fr]">
          <div className="hidden space-y-3 md:block">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[var(--bg-base)] px-3 py-2.5 transition-shadow duration-200 hover:shadow-[0_0_0_1px_rgba(124,58,237,0.3)] sm:px-4"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={`relative flex h-2.5 w-2.5 shrink-0 rounded-full ${
                      agent.ok ? "bg-[#10B981]" : "bg-[#EF4444]"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 rounded-full motion-safe:animate-marketing-pulse-dot ${
                        agent.ok ? "bg-[#10B981]" : "bg-[#EF4444]"
                      }`}
                      style={{ opacity: 0.45 }}
                    />
                  </span>
                  <div className="min-w-0">
                    <span className="block truncate font-mono text-xs text-white/85">
                      {agent.name}
                    </span>
                    <span className="text-[10px] text-white/45">
                      Trust Score {trustGrade(agent.score)} · {agent.score}/100
                    </span>
                  </div>
                </div>
                {agent.ok ? (
                  <span className="shrink-0 rounded-md bg-[#10B981]/15 px-2 py-0.5 text-[10px] font-medium text-[#6ee7b7]">
                    Running
                  </span>
                ) : (
                  <span className="motion-safe:animate-marketing-blink shrink-0 rounded-md bg-[#EF4444]/20 px-2 py-0.5 text-[10px] font-medium text-[#fca5a5]">
                    Suspended
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="relative min-h-[200px] overflow-hidden rounded-xl border border-white/[0.08] bg-[var(--bg-base)] sm:min-h-[220px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-[var(--bg-base)] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[var(--bg-base)] to-transparent" />
            <div className="motion-safe:animate-marketing-feed">
              <ul className="space-y-2 p-3 font-mono text-[11px] sm:text-xs">
                {doubled.map((line, i) => (
                  <li
                    key={`feed-${i}`}
                    className={`rounded-lg border px-3 py-2 ${
                      line.tone === "ok"
                        ? "border-[#10B981]/25 bg-[#10B981]/10 text-[#a7f3d0]"
                        : line.tone === "info"
                          ? "border-[#06B6D4]/25 bg-[#06B6D4]/10 text-[#a5f3fc]"
                          : line.tone === "alert"
                            ? "border-amber-500/30 bg-amber-500/10 text-[#fde68a]"
                            : "border-[#EF4444]/30 bg-[#EF4444]/10 text-[#fecaca]"
                    }`}
                  >
                    {line.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="relative z-[3] mt-4 text-center text-xs leading-relaxed text-white/50">
          Behavioral ledger for your fleet — every economic action with a receipt
          you can show an auditor. Permanent records; plain-language readout.
        </p>
        <div className="relative z-[3] mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <Link
            href="/#faq"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "min-h-[48px] w-full justify-center border-white/15 bg-transparent sm:min-h-9 sm:w-auto",
            )}
          >
            Read FAQ →
          </Link>
          <Link
            href={DASHBOARD_MAIN_HREF}
            prefetch={false}
            {...DASHBOARD_LINK_NEW_TAB}
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "min-h-[48px] w-full justify-center sm:min-h-9 sm:w-auto",
            )}
          >
            Open Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
