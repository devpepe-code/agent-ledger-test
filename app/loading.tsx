import type { ReactElement } from "react";

export default function RootLoading(): ReactElement {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[var(--bg-base)] px-4"
      aria-busy
      aria-label="Loading"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#7C3AED]" />
      <p className="text-sm text-white/50">Loading…</p>
    </div>
  );
}
