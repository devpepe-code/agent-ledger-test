/** Fake-but-plausible chain activity strip — monospace, marquee */
const SEGMENTS = [
  "0x7f3a…2b4c anchored 2s ago",
  "Block 25,441,203",
  "Verified ✓",
  "Permanent record",
  "0x8ba1…f44e anchored 14s ago",
  "Block 25,441,198",
  "Verified ✓",
] as const;

export function MarketingTrustMarquee() {
  const line = SEGMENTS.join(" · ");
  const loop = `${line} · ${line} · `;

  return (
    <div className="mt-6 flex w-full max-w-4xl justify-center overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
      <p className="marketing-marquee inline-block whitespace-nowrap font-mono text-[11px] text-white/30 sm:text-xs">
        {loop}
      </p>
    </div>
  );
}
