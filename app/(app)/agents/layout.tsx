import type { ReactNode } from "react";

import { AppTooltipShell } from "@/components/app-tooltip-shell";

export default function AgentsSegmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppTooltipShell>{children}</AppTooltipShell>;
}
