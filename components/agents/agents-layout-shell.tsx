"use client";

import type { ReactNode } from "react";

import { SiteHeader, type DashboardSessionKind } from "@/components/dashboard/site-header";

export function AgentsLayoutShell({
  sessionKind,
  children,
}: {
  sessionKind: DashboardSessionKind;
  children: ReactNode;
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
      <SiteHeader sessionKind={sessionKind} />
      <main className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
