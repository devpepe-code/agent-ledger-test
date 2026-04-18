import type { Metadata } from "next";
import { cookies } from "next/headers";

import { AgentsAppShell } from "@/components/agents/agents-app-shell";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { AGENT_COMPANIES } from "@/lib/mock/agent-companies";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agents | AgentLedger",
  description: "Connect AI agent platforms to your AgentLedger workspace.",
};

export default function AgentsRoutePage() {
  const cookieVal = cookies().get(AUTH_COOKIE_NAME)?.value;
  const sessionKind =
    cookieVal === "simulated"
      ? ("simulated" as const)
      : cookieVal === "wallet"
        ? ("wallet" as const)
        : ("none" as const);

  return (
    <AgentsAppShell
      sessionKind={sessionKind}
      companies={AGENT_COMPANIES}
    />
  );
}
