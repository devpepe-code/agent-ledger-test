"use client";

import { type ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

/** Only `/dashboard` and `/agents` use tooltips — keep marketing routes free of Radix at root. */
export function AppTooltipShell({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
  );
}
