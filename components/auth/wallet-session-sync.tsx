"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";

/**
 * When the user connects an EVM wallet in the dashboard shell, POST to session API
 * and reload. Mounted once under `(app)` Web3 providers.
 */
export function WalletSessionSync() {
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    const evm = isConnected && address ? address : null;
    if (!evm) return;
    if (busy.current) return;
    busy.current = true;
    setError(null);
    setSyncing(true);
    void (async () => {
      try {
        const res = await fetch("/api/auth/wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ evmAddress: evm }),
        });
        if (res.ok) {
          window.location.assign("/dashboard");
          return;
        }
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error ?? "Could not start session");
        busy.current = false;
        setSyncing(false);
      } catch {
        setError("Network error — try again");
        busy.current = false;
        setSyncing(false);
      }
    })();
  }, [isConnected, address]);

  if (!syncing && !error) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-[10001] max-w-sm -translate-x-1/2 px-4 text-center"
      role="status"
      aria-live="polite"
    >
      {syncing && !error ? (
        <p className="rounded-lg border border-white/10 bg-[#1a1c2e]/95 px-4 py-2 text-sm text-white/80 shadow-lg">
          Opening your dashboard…
        </p>
      ) : error ? (
        <p className="rounded-lg border border-red-500/30 bg-[#1a1c2e]/95 px-4 py-2 text-sm text-[#fca5a5] shadow-lg">
          {error}
        </p>
      ) : null}
    </div>
  );
}
