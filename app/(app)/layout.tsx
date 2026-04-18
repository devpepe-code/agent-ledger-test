import type { ReactNode } from "react";

import { AppWeb3Shell } from "@/components/app-web3-shell";

/** Web3 providers + session sync for in-app routes; tooltips in `dashboard/layout` and `agents/layout`. */
export default function AppShellLayout({ children }: { children: ReactNode }) {
  return <AppWeb3Shell>{children}</AppWeb3Shell>;
}
