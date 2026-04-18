import type { Metadata } from "next";
import Link from "next/link";

import { MarketingNav } from "@/components/marketing/marketing-nav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AgentLedger handles personal and customer data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-white">
      <MarketingNav />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-6 text-sm leading-relaxed text-white/65">
          AgentLedger processes account, billing, and workspace data you
          provide so we can deliver the behavioral ledger service. Event
          payloads you send may include operational metadata required for
          attestations; you control what your agents log. Cryptographic
          commitments are anchored in the public verification layer; public data
          is visible per network rules.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/65">
          For data processing agreements, EU residency options, or deletion
          requests, contact{" "}
          <a
            href="mailto:pilots@agentledger.dev?subject=Privacy"
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
