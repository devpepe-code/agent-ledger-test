import Link from "next/link";

import { DASHBOARD_LAUNCH_HREF } from "@/lib/auth";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 font-sans"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#06B6D4]/90">
        AgentLedger
      </p>
      <h1 className="text-center text-2xl font-semibold text-white">
        Page not found
      </h1>
      <p className="max-w-md text-center text-sm text-white/55">
        Confirm the URL, or from the{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5">agent-ledger</code>{" "}
        folder run{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5">npm run dev:clean</code>{" "}
        (stop other dev servers first) if routes look broken.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-[#7C3AED] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#6d31d4]"
        >
          Home
        </Link>
        <Link
          href={DASHBOARD_LAUNCH_HREF}
          prefetch={false}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10"
        >
          Launch app
        </Link>
      </div>
    </div>
  );
}
