import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SectionEyebrow } from "./section-eyebrow";

const CHIPS = [
  "LangChain",
  "AutoGen",
  "CrewAI",
  "OpenAI Agents SDK",
  "Anthropic",
  "ElizaOS",
  "Custom via REST API",
] as const;

export function MarketingBuilders() {
  return (
    <section className="border-t border-white/[0.06] py-8 sm:py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionEyebrow>{"// for_builders.md"}</SectionEyebrow>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Works with what you already use.
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <span
              key={c}
              className="font-mono text-xs text-white/60 px-2 py-1 border border-white/20 rounded"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
          10 minutes to first verified event.
          <br />
          No infrastructure changes.
          <br />
          Drop in our webhook. Everything else is automatic.
        </p>
        <Link
          href="/changelog"
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "mt-4 inline-flex min-h-[48px] text-[#67e8f9] hover:text-white",
          )}
        >
          View integration docs →
        </Link>
      </div>
    </section>
  );
}
