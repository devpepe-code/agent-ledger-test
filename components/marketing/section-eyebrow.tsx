import type { ReactNode } from "react";

/** Monospace file-path style section label — use sparingly per design brief */
export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-medium tracking-wide text-[#06B6D4]/80 sm:text-xs">
      {children}
    </p>
  );
}
