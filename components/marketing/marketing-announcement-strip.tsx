export function MarketingAnnouncementStrip() {
  return (
    <div className="flex w-full items-center justify-center gap-2 border-b border-white/5 bg-purple-500/5 px-4 py-2">
      <span className="status-dot live" />
      <span className="font-mono text-xs text-white/50">
        The agentic economy is live.
      </span>
      <span className="mx-2 font-mono text-xs text-white/30">·</span>
      <span className="font-mono text-xs text-cyan-400/70">
        AI agents executed 21,870 autonomous transactions today
      </span>
    </div>
  );
}
