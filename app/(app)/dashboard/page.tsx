import type { Metadata } from "next";
import { cookies } from "next/headers";

import { DashboardWithGate } from "@/components/dashboard/dashboard-with-gate";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { cloneOwnerDashboard } from "@/lib/mock/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | AgentLedger",
  description: "See what your AI agents did — and prove it.",
};

function hasConnectGateParam(
  params: Record<string, string | string[] | undefined>,
) {
  const c = params.connect;
  return c === "1" || (Array.isArray(c) && c.includes("1"));
}

export default function DashboardRoutePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const forcingConnectGate = hasConnectGateParam(searchParams);
  const cookieVal = cookies().get(AUTH_COOKIE_NAME)?.value;
  const hasSession = Boolean(cookieVal) && !forcingConnectGate;
  const sessionKind = forcingConnectGate
    ? ("none" as const)
    : cookieVal === "simulated"
      ? ("simulated" as const)
      : cookieVal === "wallet"
        ? ("wallet" as const)
        : ("none" as const);
  const payload = cloneOwnerDashboard();

  return (
    <DashboardWithGate
      hasSession={hasSession}
      payload={payload}
      sessionKind={sessionKind}
    />
  );
}
