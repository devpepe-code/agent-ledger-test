export function MarketingHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% -5%, rgba(124,58,237,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 100%)",
        }}
      />
      <div
        className="animate-float-orb-1 pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-float-orb-2 pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-base)]/40 to-[var(--bg-base)]" />
    </div>
  );
}
