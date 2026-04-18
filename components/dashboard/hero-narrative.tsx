"use client";

import { ArrowDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroNarrative({
  headline,
  tone,
  highlight,
  primaryLink,
}: {
  headline: string;
  tone: "calm" | "watch" | "critical";
  highlight?: string;
  primaryLink?: { href: string; label: string };
}) {
  const scrollToDigest = () => {
    document.getElementById("todays-summary")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="space-y-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#06B6D4]/90">
        Right now
      </p>
      <div
        className={`rounded-2xl border px-6 py-8 sm:px-8 sm:py-10 ${
          tone === "critical"
            ? "border-[#EF4444]/35 bg-[#EF4444]/[0.07]"
            : tone === "watch"
              ? "border-amber-500/25 bg-amber-500/[0.07]"
              : "border-white/10 bg-white/[0.04]"
        }`}
      >
        <p
          className={`max-w-3xl text-2xl font-medium leading-snug tracking-tight sm:text-[1.65rem] sm:leading-snug ${
            tone === "watch" || tone === "critical"
              ? "text-white"
              : "text-white/95"
          }`}
        >
          {headline}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {primaryLink ? (
            <Button
              asChild
              size="lg"
              className="min-h-[48px] bg-[#7C3AED] hover:bg-[#6d31d4] sm:min-h-10"
            >
              <Link href={primaryLink.href} prefetch={false}>
                {primaryLink.label}
              </Link>
            </Button>
          ) : null}
          {primaryLink ? (
            <Button
              type="button"
              variant="ghost"
              className="min-h-[48px] text-white/60 hover:text-white sm:min-h-10"
              onClick={scrollToDigest}
            >
              Today&apos;s activity summary
              <ArrowDown className="h-4 w-4 opacity-70" />
            </Button>
          ) : null}
          {!primaryLink && (highlight || tone === "watch" || tone === "critical") ? (
            <Button
              type="button"
              variant={
                tone === "watch" || tone === "critical" ? "default" : "outline"
              }
              className={`min-h-[48px] gap-2 sm:min-h-10 ${
                tone === "critical"
                  ? "bg-[#DC2626] hover:bg-[#B91C1C]"
                  : undefined
              }`}
              onClick={scrollToDigest}
            >
              {highlight ?? "See today’s summary"}
              <ArrowDown className="h-4 w-4 opacity-80" />
            </Button>
          ) : null}
          {!primaryLink && tone === "calm" && !highlight ? (
            <Button
              type="button"
              variant="ghost"
              className="min-h-[48px] text-white/60 hover:text-white sm:min-h-10"
              onClick={scrollToDigest}
            >
              What happened today
              <ArrowDown className="h-4 w-4 opacity-70" />
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
