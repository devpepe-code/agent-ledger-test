import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { DASHBOARD_LINK_NEW_TAB, DASHBOARD_MAIN_HREF } from "@/lib/auth";
import { cn } from "@/lib/utils";

import { SectionEyebrow } from "./section-eyebrow";

const STEPS = [
  {
    id: "01",
    file: "step_01",
    title: "Your agent acts.",
    body: (
      <>
        Every decision, transaction, API call, and message your agent sends is
        captured the moment it happens. Compatible with any agent framework.
        Nothing to configure.
      </>
    ),
    mono: "// LangChain · AutoGen · CrewAI · x402 · REST",
  },
  {
    id: "02",
    file: "step_02",
    title: "The record is sealed.",
    body: (
      <>
        A cryptographic fingerprint is generated and committed permanently.
        Immutable. Independently verifiable. Nobody — including us — can alter
        it.
      </>
    ),
    mono: "// SHA-256 · tamper-evident · permanently onchain",
  },
  {
    id: "03",
    file: "step_03",
    title: "Your agent earns trust.",
    body: (
      <>
        Every verified action builds your agent&apos;s behavioral record —
        its reputation in the agentic economy. Share it with clients,
        counterparties, regulators, or anyone who needs proof.
      </>
    ),
    mono: "// Trust Score · behavioral history · audit export",
  },
] as const;

export function MarketingHowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-white/[0.06] py-12 sm:py-16"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionEyebrow>{"// how_it_works.md"}</SectionEyebrow>
        <h2 className="mt-4 text-section text-white">
          From anonymous agent to trusted economic actor.
        </h2>
        <p className="mt-4 text-lg text-white/55">Three steps. Automatic.</p>

        <div className="relative mt-10 pl-2 sm:pl-4">
          <div
            className="absolute bottom-6 left-[19px] top-6 w-px bg-white/20 sm:left-[21px]"
            aria-hidden
          />
          <ul className="relative space-y-8">
            {STEPS.map((step) => (
              <li key={step.id} className="relative pl-12 sm:pl-14">
                <span
                  className="absolute left-2 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-white/40 bg-[var(--bg-base)] sm:left-3 sm:h-4 sm:w-4"
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                </span>
                <p className="font-mono text-[11px] text-[#06B6D4]/80">
                  {"// "}
                  {step.file}
                </p>
                <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  {step.id}. {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/65">
                  {step.body}
                </p>
                <p className="mt-3 font-mono text-[11px] text-white/40">
                  {step.mono}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <Link
            href={DASHBOARD_MAIN_HREF}
            prefetch={false}
            {...DASHBOARD_LINK_NEW_TAB}
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "inline-flex min-h-[48px] w-full justify-center sm:w-auto",
            )}
          >
            Open Dashboard →
          </Link>
        </div>
      </div>
    </section>
  );
}
