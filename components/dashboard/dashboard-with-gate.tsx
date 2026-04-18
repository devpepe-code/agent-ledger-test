"use client";

import type { OwnerDashboardPayload } from "@/lib/mock/types";

import { DashboardWalletOverlay } from "@/components/auth/dashboard-wallet-overlay";

import { DashboardPage } from "./dashboard-page";
import type { DashboardSessionKind } from "./site-header";

export function DashboardWithGate({
  hasSession,
  payload,
  sessionKind,
}: {
  hasSession: boolean;
  payload: OwnerDashboardPayload;
  sessionKind: DashboardSessionKind;
}) {
  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh" }}
    >
      <div
        className={
          hasSession
            ? undefined
            : "pointer-events-none select-none opacity-50 transition-opacity duration-300"
        }
        aria-hidden={!hasSession}
      >
        <DashboardPage payload={payload} sessionKind={sessionKind} />
      </div>
      {!hasSession ? <DashboardWalletOverlay /> : null}
    </div>
  );
}
