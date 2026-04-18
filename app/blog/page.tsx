import type { Metadata } from "next";
import Link from "next/link";

import { MarketingNav } from "@/components/marketing/marketing-nav";

export const metadata: Metadata = {
  title: "Blog",
  description: "Updates on AI agent accountability, EU AI Act readiness, and product releases.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-white">
      <MarketingNav />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Blog</h1>
        <p className="mt-6 text-base leading-relaxed text-white/70">
          We publish deep dives on agent governance, safety monitoring, and
          how teams prepare for EU AI Act enforcement. For executive briefings
          or early access posts, email{" "}
          <a
            href="mailto:pilots@agentledger.dev"
            className="text-[#22d3ee] hover:text-white"
          >
            pilots@agentledger.dev
          </a>
          .
        </p>
        <p className="mt-12 text-center text-sm">
          <Link href="/" className="text-[#22d3ee] hover:text-white">
            ← AgentLedger home
          </Link>
        </p>
      </main>
    </div>
  );
}
