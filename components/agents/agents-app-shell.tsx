"use client";

import type { DashboardSessionKind } from "@/components/dashboard/site-header";
import type { AgentCompany } from "@/lib/mock/agent-companies";

import { AgentCompaniesDirectory } from "./agent-companies-directory";
import { AgentsLayoutShell } from "./agents-layout-shell";

export function AgentsAppShell({
  sessionKind,
  companies,
}: {
  sessionKind: DashboardSessionKind;
  companies: AgentCompany[];
}) {
  return (
    <AgentsLayoutShell sessionKind={sessionKind}>
      <AgentCompaniesDirectory companies={companies} />
    </AgentsLayoutShell>
  );
}
