"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { isWalletConnectConfigured } from "@/lib/env";

/**
 * RainbowKit connect control — browser / Coinbase / Base Account work without env.
 * WalletConnect QR lists only when NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is set.
 */
export function WalletConnectPanel({ compact }: { compact?: boolean }) {
  const qrAvailable = isWalletConnectConfigured();

  return (
    <div
      className={
        compact
          ? "flex max-w-[min(85vw,26rem)] flex-col items-end gap-1.5 sm:max-w-none"
          : "flex flex-col items-stretch gap-3"
      }
    >
      <div
        className={
          compact
            ? "flex flex-wrap items-center justify-end gap-1.5"
            : "flex flex-col items-stretch gap-3"
        }
      >
        <ConnectButton />
      </div>
      {!qrAvailable && !compact ? (
        <p className="text-center text-xs leading-relaxed text-white/45">
          For{" "}
          <span className="text-white/55">WalletConnect</span> (QR / mobile wallets), add{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 text-[0.85em] text-white/70">
            NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
          </code>{" "}
          from{" "}
          <a
            href="https://cloud.walletconnect.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#7dd3fc] underline underline-offset-2 hover:text-white"
          >
            WalletConnect Cloud
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
