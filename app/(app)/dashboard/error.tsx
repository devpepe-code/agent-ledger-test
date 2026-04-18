"use client";

import { useEffect } from "react";

import { logger } from "@/lib/logger";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--bg-base)] px-6 text-center text-white">
      <p className="text-lg font-semibold">Something went wrong loading the dashboard</p>
      <p className="max-w-md text-sm text-white/55">
        {error.message || "Try refreshing the page. If it keeps happening, run a clean dev server."}
      </p>
      <button
        type="button"
        className="rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#6d31d4]"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
