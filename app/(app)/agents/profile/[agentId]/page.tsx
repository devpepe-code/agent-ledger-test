import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { AgentProfileView } from "@/components/agents/agent-profile-view";
import { AgentsLayoutShell } from "@/components/agents/agents-layout-shell";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { cloneOwnerDashboard, eventsForAgent, findAgentProfile } from "@/lib/mock/data";

type Props = { params: { agentId: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const payload = cloneOwnerDashboard();
  const agent = findAgentProfile(payload, params.agentId);
  if (!agent) return { title: "Agent | AgentLedger" };
  return {
    title: `${agent.displayName} | AgentLedger`,
    description: "Agent profile, policy, and verified activity.",
  };
}

export default function AgentProfileRoute({ params }: Props) {
  const cookieVal = cookies().get(AUTH_COOKIE_NAME)?.value;
  const sessionKind =
    cookieVal === "simulated"
      ? ("simulated" as const)
      : cookieVal === "wallet"
        ? ("wallet" as const)
        : ("none" as const);

  const payload = cloneOwnerDashboard();
  const agent = findAgentProfile(payload, params.agentId);
  if (!agent) notFound();

  const events = eventsForAgent(payload, agent.id);

  return (
    <AgentsLayoutShell sessionKind={sessionKind}>
      <AgentProfileView agent={agent} events={events} />
    </AgentsLayoutShell>
  );
}
