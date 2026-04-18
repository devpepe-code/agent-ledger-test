import type { Metadata } from "next";
import Link from "next/link";

import { MarketingNav } from "@/components/marketing/marketing-nav";

export const metadata: Metadata = {
  title: "About",
  description:
    "AgentLedger is the tamper-proof behavioral ledger for AI agents in the agentic economy.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-white">
      <MarketingNav />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight">About AgentLedger</h1>
        <p className="mt-6 text-base leading-relaxed text-white/70">
          We built AgentLedger because autonomous AI systems now move money,
          message customers, and change production data — and organizations
          deserve a permanent, independently verifiable record of what those
          agents did. That record is committed permanently so no party,
          including us, can rewrite history after the fact.
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
