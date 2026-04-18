import { Card, CardContent } from "@/components/ui/card";

import { SectionEyebrow } from "./section-eyebrow";

const quotes = [
  {
    quote:
      "I can finally show clients an actual proof of what our agent did — not just a log file I made myself. That distinction matters when you're handling their data.",
    name: "Marcus T.",
    role: "Co-founder, AI ops startup",
    initial: "M",
  },
  {
    quote:
      "Our compliance team asked for AI agent audit logs for our SOC2 review. Before AgentLedger we had nothing credible. Now we have a signed, on-chain record for every production event.",
    name: "Priya S.",
    role: "Head of AI Infrastructure, Series B fintech",
    initial: "P",
  },
  {
    quote:
      "The Trust Score gave us something we didn't expect: a way to compare agents and improve them. We optimized our best agent from a B to an A just by reviewing what the ledger surfaced.",
    name: "Daniel R.",
    role: "AI Product Lead",
    initial: "D",
  },
];

export function MarketingTestimonials() {
  return (
    <section className="border-t border-white/5 bg-[#0D1117] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <SectionEyebrow>{"// testimonials.md"}</SectionEyebrow>
        </div>
        <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4]">
          What teams are saying
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-extrabold text-white sm:text-4xl">
          From the people building with AI agents today.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <Card
              key={q.name}
              className="border-white/10 bg-white/[0.04] backdrop-blur-sm"
            >
              <CardContent className="flex h-full flex-col p-6">
                <p className="text-sm leading-relaxed text-white/80">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-sm font-bold text-white"
                    aria-hidden
                  >
                    {q.initial}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{q.name}</p>
                    <p className="text-xs text-white/50">{q.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
