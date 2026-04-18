"use client";

import { Shield } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { WalletConnectPanel } from "./wallet-connect-panel";

/**
 * Demo gate overlay. Simulated session: POST `/api/auth/simulate` with
 * `Accept: application/json` so the handler sets the httpOnly cookie, then we
 * hard-navigate to `/dashboard` so the next request always includes the session
 * (works when a plain form POST is swallowed or blocked by nested UI).
 */
export function DashboardWalletOverlay() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startSimulatedSession() {
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/auth/simulate", {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      window.location.assign("/dashboard");
    } catch (e) {
      setPending(false);
      setError(
        e instanceof Error
          ? e.message
          : "Could not start demo session. Try again.",
      );
    }
  }

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg-base)]/96 px-4 py-8 font-sans antialiased"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dashboard-wallet-title"
    >
      <div className="relative z-10 w-full max-w-md">
        <Card className="border-2 border-white/15 bg-[#1a1c2e] font-sans shadow-2xl shadow-black/50">
          <CardHeader className="space-y-3 pb-2 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]">
              <Shield className="h-6 w-6 text-white" aria-hidden />
            </div>
            <CardTitle
              id="dashboard-wallet-title"
              className="font-display text-2xl font-bold tracking-tight text-white"
            >
              Connect wallet
            </CardTitle>
            <CardDescription className="text-white/50">
              Connect an Ethereum wallet (WalletConnect or browser wallet).
              Session is a demo gate — add SIWE / signatures when you ship.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <WalletConnectPanel />
            <div className="relative py-2 text-center text-xs text-white/40">
              <span className="relative z-10 bg-[#151525] px-2">or demo</span>
              <span className="absolute inset-x-0 top-1/2 z-0 h-px bg-white/10" />
            </div>
            <div className="w-full space-y-2">
              <Button
                type="button"
                variant="outline"
                disabled={pending}
                onClick={() => void startSimulatedSession()}
                className="h-12 w-full border-white/20 bg-white/5 text-base font-semibold text-white hover:bg-white/10"
              >
                {pending ? "Starting…" : "Continue without wallet (simulated)"}
              </Button>
              {error ? (
                <p className="text-center text-sm text-red-400/90">{error}</p>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
