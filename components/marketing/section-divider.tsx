export function SectionDivider() {
  return (
    <div className="my-2 flex items-center gap-3 sm:my-3">
      <div className="h-px flex-1 bg-white/[0.08]" />
      <span className="font-mono text-xs text-white/20" aria-hidden>
        ◆
      </span>
      <div className="h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}
