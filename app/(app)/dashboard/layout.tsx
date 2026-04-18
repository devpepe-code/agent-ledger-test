import type { ReactNode } from "react";

import { AppTooltipShell } from "@/components/app-tooltip-shell";

export default function DashboardSegmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppTooltipShell>{children}</AppTooltipShell>;
}
