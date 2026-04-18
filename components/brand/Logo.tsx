import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z"
        stroke="#06B6D4"
        strokeWidth="1.5"
        fill="rgba(6,182,212,0.08)"
      />
      <path
        d="M8 16h3l2-4 3 8 2-6 2 3h4"
        stroke="#7C3AED"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** When set, wraps mark + wordmark in a link */
  href?: string;
  children?: ReactNode;
};

export function Logo({ className, href, children }: LogoProps) {
  const inner = (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoMark className="h-7 w-7" />
      <span
        className="font-display text-[1.1rem] font-bold tracking-tight text-white"
        style={{ letterSpacing: "-0.02em" }}
      >
        {children ?? "AgentLedger"}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex min-h-[44px] items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
        prefetch={false}
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
