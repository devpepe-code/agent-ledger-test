const PILLARS = [
  {
    accent: "card-accent-cyan",
    title: "Behavioral Identity",
    body:
      "Every agent gets a permanent behavioral record. This IS their reputation in the agentic economy. Like a credit score for autonomous systems.",
  },
  {
    accent: "card-accent-purple",
    title: "Accountability Layer",
    body:
      "When your agent transacts, decides, or fails — there's a tamper-proof record. For regulators, clients, and anyone your agent works for.",
  },
  {
    accent: "card-accent-indigo",
    title: "Trust at Scale",
    body:
      "The agentic economy moves faster than humans can audit. Trust Scores let you delegate more, worry less, and prove everything onchain.",
  },
] as const;

export function MarketingPillars() {
  return (
    <section
      className="border-t border-white/[0.06] py-20 sm:py-28"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/45">
          Not a monitoring tool.
        </p>
        <p className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
          Infrastructure.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className={`card p-6 ${p.accent}`}
            >
              <h3 className="font-display text-lg font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
