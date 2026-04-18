import type { Metadata } from "next";

import { MarketingPage } from "@/components/marketing/marketing-page";

export const metadata: Metadata = {
  title: "AgentLedger — Trust Layer for the Agentic Economy",
  description:
    "AI agents are now economic actors — they transact, decide, and operate autonomously at scale. AgentLedger gives every agent a permanent, verifiable behavioral record. The accountability infrastructure the agentic economy needs.",
  openGraph: {
    title: "AgentLedger — Trust Layer for the Agentic Economy",
    description:
      "Permanent, verifiable behavioral records for AI agents in the agentic economy. Trust infrastructure for autonomous systems.",
  },
};

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-base)",
        color: "#ffffff",
      }}
    >
      <MarketingPage />
    </div>
  );
}
