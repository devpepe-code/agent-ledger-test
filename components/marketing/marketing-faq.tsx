"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { SectionEyebrow } from "./section-eyebrow";

const faqs = [
  {
    q: "Do I need to understand crypto to use this?",
    a: "No. The verification layer is invisible to you. You see a dashboard with plain-language event logs and Trust Scores. Cryptographic receipts sit underneath — you never need to interact with them directly. We handle the complexity.",
  },
  {
    q: "How is this different from just storing logs in a database?",
    a: "Logs in a database can be modified, deleted, or selectively shown. Anyone — including us — could alter them. AgentLedger commits a cryptographic fingerprint of every event before storing it. That means any third party can independently verify that the record you're showing them matches what was originally committed — without trusting us. That's the difference between a note and a notarized document.",
  },
  {
    q: "What AI agent frameworks does AgentLedger support?",
    a: "Any agent that can make an HTTP request can log to AgentLedger. We have native SDKs and documented integration patterns for LangChain, AutoGen, CrewAI, the OpenAI Agents SDK, Anthropic's agent tooling, and ElizaOS. If your agent can call a webhook, it works with AgentLedger in under 10 minutes.",
  },
  {
    q: "What does the Trust Score actually measure?",
    a: "Five behavioral dimensions, each scored 0–100 and combined into a single grade (A–F): (1) Stays within mandate — does the agent respect its defined guardrails? (2) Completes what it starts — task success rate. (3) Behaves predictably — consistency. (4) Keeps full records — completeness. (5) Knows when to escalate — human override rate. The score updates in real time as new events arrive.",
  },
  {
    q: "Is this ready for EU AI Act compliance?",
    a: "AgentLedger is designed around the August 2026 enforcement requirements. Every record includes the traceability, logging, and audit documentation that Articles 12 and 13 of the EU AI Act require for high-risk AI systems. We can generate a compliance export package on demand for any time period.",
  },
  {
    q: "What happens to my records if AgentLedger shuts down?",
    a: "Nothing. Because records are committed to a public verification layer, they exist independently of our infrastructure. You can export all your records at any time. The proofs remain verifiable forever, with or without us.",
  },
] as const;

export function MarketingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-white/5 bg-[var(--bg-base)] py-8 sm:py-10"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <SectionEyebrow>{"// faq.md"}</SectionEyebrow>
        </div>
        <p className="mt-1.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">
          Common questions
        </p>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white sm:text-4xl">
          Straight answers.
        </h2>
        <div className="mt-6 space-y-2">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
              >
                <button
                  type="button"
                  className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-white sm:px-5 sm:text-base"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="min-w-0 break-words pr-2">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-white/45 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-white/10 px-4 py-4 text-sm leading-relaxed text-white/65 sm:px-5">
                    {item.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
