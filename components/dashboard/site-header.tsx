"use client";

import { Activity, Bell, LogOut, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WalletConnectPanel } from "@/components/auth/wallet-connect-panel";
import { cn } from "@/lib/utils";

export type DashboardSessionKind = "simulated" | "wallet" | "none";

export type DashboardLiveStatus = {
  agentCount: number;
  eventsToday: number;
  incidents: number;
  /** Drives status dot: ok = green, warning = amber, critical = red */
  tone: "ok" | "warning" | "critical";
};

async function postLogout() {
  await fetch("/api/auth/logout", { method: "POST" });
}

function breadcrumbLabel(pathname: string): string {
  if (pathname === "/agents" || pathname.startsWith("/agents/")) {
    return "/ agents";
  }
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return "/ dashboard";
  }
  return "/ app";
}

export function SiteHeader({
  sessionKind,
  liveStatus,
}: {
  sessionKind: DashboardSessionKind;
  liveStatus?: DashboardLiveStatus | null;
}) {
  const pathname = usePathname();
  const onDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const onAgents = pathname === "/agents" || pathname.startsWith("/agents/");

  async function clearSessionAndExit() {
    await postLogout();
    window.location.href = "/";
  }

  const dotClass =
    liveStatus == null
      ? "bg-white/30"
      : liveStatus.tone === "critical"
        ? "bg-red-500 animate-pulse"
        : liveStatus.tone === "warning"
          ? "bg-amber-400 animate-pulse"
          : "bg-emerald-400 animate-pulse";

  const liveLine =
    liveStatus != null ? (
      <p
        className="max-w-[min(100%,28rem)] truncate text-center font-mono text-[11px] leading-tight text-white/70 sm:text-xs"
        title="Live workspace telemetry (demo)"
      >
        <span className="inline-flex items-center gap-1.5">
          <span
            className={cn("inline-block h-2 w-2 shrink-0 rounded-full", dotClass)}
            aria-hidden
          />
          <span className="text-white/90">LIVE</span>
        </span>
        <span className="text-white/35"> · </span>
        <span className="tabular-nums text-white/80">
          {liveStatus.agentCount} agents
        </span>
        <span className="text-white/35"> · </span>
        <span className="tabular-nums text-white/80">
          {liveStatus.eventsToday.toLocaleString("en-US")} events today
        </span>
        <span className="text-white/35"> · </span>
        <span className="tabular-nums text-white/80">
          {liveStatus.incidents} incidents
        </span>
      </p>
    ) : (
      <p className="text-center font-mono text-[11px] text-white/40 sm:text-xs">
        AgentLedger command center
      </p>
    );

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/[0.08] bg-[var(--bg-base,#0A0A0F)]/95 backdrop-blur-md"
      style={{ backgroundColor: "rgba(10, 10, 15, 0.96)" }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-baseline gap-2"
        >
          <span className="flex items-center gap-1.5 font-display text-lg font-bold tracking-tight text-white">
            <span className="text-[#06B6D4]" aria-hidden>
              ⬡
            </span>
            AgentLedger
          </span>
          <span className="hidden font-mono text-xs text-white/30 sm:inline">
            {breadcrumbLabel(pathname)}
          </span>
        </Link>

        <nav
          className="flex shrink-0 items-center gap-3 sm:gap-4 md:gap-5"
          aria-label="Product"
        >
          <Link
            href="/dashboard"
            aria-current={onDashboard ? "page" : undefined}
            className={cn(
              "nav-link whitespace-nowrap text-[13px] tracking-wide transition-colors",
              onDashboard
                ? "font-medium text-white"
                : "text-white/60 hover:text-white",
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/agents"
            aria-current={onAgents ? "page" : undefined}
            className={cn(
              "nav-link whitespace-nowrap text-[13px] tracking-wide transition-colors",
              onAgents
                ? "font-medium text-white"
                : "text-white/60 hover:text-white",
            )}
          >
            Agents
          </Link>
        </nav>

        <div className="hidden min-w-0 max-w-full flex-1 justify-center overflow-hidden px-2 md:flex">
          {liveLine}
        </div>

        <div className="ml-auto flex min-w-0 shrink-0 items-center gap-1 sm:gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white/60 hover:text-white"
                  asChild
                >
                  <Link href="/alerts" aria-label="Open safety feed">
                    <Bell className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Safety feed</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden h-9 w-9 sm:flex"
                  aria-label="Anchoring status"
                >
                  <Activity className="h-4 w-4 text-[#06B6D4]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ledger anchoring health</TooltipContent>
            </Tooltip>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 gap-0 px-2 text-white/60 hover:text-white sm:gap-2 sm:px-3"
              aria-label="Sign out and return to marketing site"
              onClick={() => void clearSessionAndExit()}
            >
              <LogOut className="h-3.5 w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
            {sessionKind === "wallet" ? (
              <span className="inline-flex h-9 max-w-[min(42vw,10rem)] min-w-0 items-center gap-1 truncate rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-2 text-[11px] font-mono text-emerald-200/90 sm:max-w-[11rem] sm:px-3 sm:text-xs">
                <Wallet
                  className="h-3 w-3 shrink-0 text-emerald-300"
                  aria-hidden
                />
                <span className="truncate" title="Wallet connected">
                  Wallet connected
                </span>
              </span>
            ) : (
              <div className="flex max-w-[min(92vw,20rem)] flex-nowrap items-center justify-end gap-2 sm:max-w-none">
                {sessionKind === "simulated" ? (
                  <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white/50">
                    Demo
                  </span>
                ) : null}
                <div className="min-w-0 shrink">
                  <WalletConnectPanel compact />
                </div>
              </div>
            )}
          </div>
      </div>
      <div className="border-t border-white/[0.06] px-4 py-2 md:hidden">
        {liveLine}
      </div>
    </header>
  );
}
