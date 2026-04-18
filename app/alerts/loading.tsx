import type { ReactElement } from "react";

export default function AlertsLoading(): ReactElement {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-3 bg-[var(--bg-base)] px-4"
      aria-busy
      aria-label="Loading safety feed"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#7C3AED]" />
      <p className="text-sm text-white/50">Loading safety feed…</p>
    </div>
  );
}
