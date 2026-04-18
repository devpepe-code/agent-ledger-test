const QUOTES = [
  'My agent sent 400 emails before I noticed',
  'We had zero audit trail for our Series A due diligence',
  'I had no idea my bot was calling that API 3x/minute',
  'Showed clients the proof. Closed the deal.',
  'Trust Score went from C to A in two weeks',
] as const;

export function MarketingSocialTicker() {
  const line = QUOTES.map((q) => `" ${q} "`).join(' ◆ ');
  const doubled = `${line} ◆ ${line} ◆ `;

  return (
    <div className="border-y border-white/[0.06] bg-white/[0.03] py-2">
      <div
        className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
        aria-hidden
      >
        <p className="marketing-marquee inline-block whitespace-nowrap font-mono text-sm text-white/50">
          {doubled}
        </p>
      </div>
    </div>
  );
}
