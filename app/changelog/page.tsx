import type { Metadata } from "next";
import Link from "next/link";

import { MarketingNav } from "@/components/marketing/marketing-nav";

export const metadata: Metadata = {
  title: "Changelog",
  description: "AgentLedger product updates and release notes.",
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-white">
      <MarketingNav />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Changelog</h1>
        <p className="mt-6 text-base leading-relaxed text-white/70">
          <span className="font-mono text-sm text-white/50">2026-04-05</span>
          <br />
          Public dashboard, Live Alerts, and Trust Score views —
          with Base-anchored event receipts in the activity timeline.
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
