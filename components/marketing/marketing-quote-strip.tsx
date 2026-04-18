export function MarketingQuoteStrip() {
  return (
    <div className="w-full border-y border-white/6 bg-purple-500/4 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 font-mono text-xs text-cyan-400/60">{"// context"}</p>
        <blockquote
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontWeight: 600,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "-0.01em",
          }}
        >
          &quot;AI agents now outnumber human financial services workers 96-to-1.
          The bottleneck isn&apos;t intelligence anymore. It&apos;s identity and
          accountability.&quot;
        </blockquote>
        <p className="mt-4 font-mono text-xs text-white/25">
          — a16z crypto, 2026 State of Crypto Report
        </p>
      </div>
    </div>
  );
}
