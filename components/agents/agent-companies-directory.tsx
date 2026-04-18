"use client";

import { Bot, Link2, Plug } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DASHBOARD_LINK_NEW_TAB, DASHBOARD_MAIN_HREF } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AgentCompany } from "@/lib/mock/agent-companies";

const STORAGE_KEY = "al_agent_connections_v1";

function loadConnected(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveConnected(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
}

export function AgentCompaniesDirectory({
  companies,
}: {
  companies: AgentCompany[];
}) {
  const [connected, setConnected] = useState<Set<string>>(new Set());

  useEffect(() => {
    setConnected(loadConnected());
  }, []);

  const toggle = useCallback((id: string) => {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveConnected(next);
      return next;
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#06B6D4]/90">
          Integrations
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Connect your agents
        </h1>
        <p className="text-base leading-relaxed text-white/55">
          Link the platforms where your AI agents run. This is a guided demo —
          production would use OAuth, API keys, or your VPC connector. Toggle
          below to simulate which providers you&apos;ve hooked up.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {companies.map((c) => {
          const isOn = connected.has(c.id);
          return (
            <li key={c.id}>
              <Card
                className={`h-full border bg-gradient-to-br from-[#1A1A2E]/90 to-transparent transition-colors ${
                  isOn
                    ? "border-[#10B981]/40 shadow-lg shadow-[#10B981]/10"
                    : "border-white/10"
                }`}
              >
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-bold text-white shadow-inner ${c.logoClass}`}
                    aria-hidden
                  >
                    <span className="text-sm tracking-tight">{c.initials}</span>
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <CardTitle className="text-lg font-semibold leading-tight text-white">
                      {c.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-white/50">
                      {c.tagline}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      className={
                        isOn
                          ? "border border-white/15 bg-white/10 text-white hover:bg-white/15"
                          : "bg-[#7C3AED] text-white hover:bg-[#6d31d4]"
                      }
                      variant={isOn ? "outline" : "default"}
                      onClick={() => toggle(c.id)}
                    >
                      {isOn ? (
                        <>
                          <Link2 className="mr-1.5 h-3.5 w-3.5" />
                          Connected
                        </>
                      ) : (
                        <>
                          <Plug className="mr-1.5 h-3.5 w-3.5" />
                          Connect
                        </>
                      )}
                    </Button>
                    {isOn ? (
                      <>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/15 px-2 py-0.5 text-xs font-medium text-[#6ee7b7]">
                          <Bot className="h-3 w-3" />
                          Ledger-ready
                        </span>
                        <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
                          <Link
                            href={DASHBOARD_MAIN_HREF}
                            {...DASHBOARD_LINK_NEW_TAB}
                          >
                            Open dashboard
                          </Link>
                        </Button>
                      </>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
