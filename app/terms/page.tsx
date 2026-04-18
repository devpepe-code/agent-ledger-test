import type { Metadata } from "next";
import Link from "next/link";

import { MarketingNav } from "@/components/marketing/marketing-nav";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using AgentLedger.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-white">
      <MarketingNav />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-white/65">
          By accessing AgentLedger you agree to use the service lawfully and to
          provide accurate workspace information. You are responsible for the
          behavior of agents you connect and for complying with applicable AI,
          privacy, and financial regulations. The service is provided as-is
          during beta; enterprise customers receive SLAs under separate order
          forms.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/65">
          Questions:{" "}
          <a
            href="mailto:pilots@agentledger.dev?subject=Terms"
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
