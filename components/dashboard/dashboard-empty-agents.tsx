import Link from "next/link";

import { Bot } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { DASHBOARD_CONNECT_HREF, DASHBOARD_MAIN_HREF } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function DashboardEmptyAgents() {
  return (
    <section
      className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-14 text-center sm:px-10"
      aria-labelledby="empty-agents-heading"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#1A1A2E]/80">
        <Bot className="h-8 w-8 text-[#06B6D4]" aria-hidden />
      </div>
      <h2
        id="empty-agents-heading"
        className="mt-6 text-xl font-semibold text-white sm:text-2xl"
      >
        No agents connected yet.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
        Connect your first AI agent to start recording a permanent, verifiable
        behavioral history. Works with any agent framework in under 10 minutes.
        Records are permanent — you never need to interact with the verification
        layer directly.
      </p>
      <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Link
          href={DASHBOARD_CONNECT_HREF}
          prefetch={false}
          className={cn(
            buttonVariants(),
            "min-h-[48px] w-full justify-center bg-[#7C3AED] hover:bg-[#6d31d4] sm:w-auto",
          )}
        >
          Connect your first agent →
        </Link>
        <Link
          href={DASHBOARD_MAIN_HREF}
          prefetch={false}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "min-h-[48px] w-full justify-center border-white/20 bg-transparent sm:w-auto",
          )}
        >
          View the dashboard workspace instead
        </Link>
      </div>
    </section>
  );
}
