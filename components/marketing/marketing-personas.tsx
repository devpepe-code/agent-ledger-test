import { Card, CardContent } from "@/components/ui/card";

import { SectionEyebrow } from "./section-eyebrow";

const personas = [
  {
    tag: "// operators",
    title: "You run agents as your workforce.",
    body:
      "Your agents are making decisions, handling customers, and executing transactions — autonomously. AgentLedger is the behavioral record that proves they're operating correctly to every stakeholder who asks.",
    bottom: "LangChain · AutoGen · CrewAI · OpenAI Agents",
  },
  {
    tag: "// builders",
    title: "Your agents transact with other agents.",
    body:
      "In the x402 world, agents pay agents. When your agent is a counterparty in machine-to-machine commerce, its behavioral history is its reputation. AgentLedger builds that reputation automatically.",
    bottom: "x402 · Agent-to-Agent · USDC · MCP",
  },
  {
    tag: "// compliance",
    title: "Your regulators are asking questions.",
    body:
      "EU AI Act. SOC2. Client audits. The question is always the same: prove what your AI did and why. AgentLedger generates that proof — for every agent action, every time, automatically.",
    bottom: "EU AI Act · GDPR · SOC2 · Audit ready",
  },
] as const;

export function MarketingPersonas() {
  return (
    <section className="border-t border-white/5 bg-[var(--bg-base)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionEyebrow>{"// use_cases.md"}</SectionEyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          Built for every layer of the agentic economy.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {personas.map((p) => (
            <Card
              key={p.title}
              className="card border-white/10 bg-[var(--bg-surface)]"
            >
              <CardContent className="flex h-full flex-col p-6">
                <p className="font-mono text-[11px] text-cyan-400/70">{p.tag}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                  {p.body}
                </p>
                <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/45">
                  {p.bottom}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
