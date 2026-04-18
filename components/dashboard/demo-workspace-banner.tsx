"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DASHBOARD_CONNECT_HREF } from "@/lib/auth";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "al_demo_banner_dismissed";

export function DemoWorkspaceBanner() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      setHidden(sessionStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  if (hidden) return null;

  return (
    <div
      className="mb-6 flex flex-col gap-3 rounded-xl border border-[#7C3AED]/30 bg-[#7C3AED]/[0.12] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
      role="status"
    >
      <p className="text-sm text-white/90">
        You&apos;re in preview mode — exploring sample agents from the agentic
        economy. Connect your wallet to monitor your own agent fleet.
      </p>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          className="bg-[#7C3AED] hover:bg-[#6d31d4]"
          asChild
        >
          <Link href={DASHBOARD_CONNECT_HREF}>Connect wallet →</Link>
        </Button>
        <button
          type="button"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white",
          )}
          aria-label="Dismiss"
          onClick={() => {
            try {
              sessionStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* ignore */
            }
            setHidden(true);
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
