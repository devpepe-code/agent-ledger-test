"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { DASHBOARD_LINK_NEW_TAB, DASHBOARD_MAIN_HREF } from "@/lib/auth";
import type { MarketingNavLink } from "@/lib/marketing-nav-links";
import { cn } from "@/lib/utils";

type MarketingNavClientProps = {
  links: readonly MarketingNavLink[];
};

export function MarketingNavClient({ links }: MarketingNavClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-white/[0.08] bg-[var(--bg-base)]/95 backdrop-blur-xl transition-shadow duration-300",
          scrolled ? "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.65)]" : "",
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo href="/" />

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link">
                {l.label}
              </Link>
            ))}
            <Button asChild variant="primary" className="group min-h-10 px-5">
              <Link
                href={DASHBOARD_MAIN_HREF}
                prefetch={false}
                {...DASHBOARD_LINK_NEW_TAB}
              >
                Open Dashboard
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <Button asChild variant="primary" size="sm" className="min-h-10 px-3 text-xs">
              <Link
                href={DASHBOARD_MAIN_HREF}
                prefetch={false}
                {...DASHBOARD_LINK_NEW_TAB}
              >
                Dashboard
              </Link>
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          role="presentation"
          aria-hidden
        />
      ) : null}

      {open ? (
        <nav
          className="fixed bottom-0 left-0 right-0 top-14 z-40 flex flex-col border-b border-white/10 bg-[var(--bg-base)]/98 backdrop-blur-xl lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-1 flex-col gap-0 overflow-y-auto px-4 py-4 pb-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex min-h-[48px] items-center rounded-lg px-3 text-sm text-white/85 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-white/10 p-4">
            <Button asChild variant="primary" className="h-12 w-full">
              <Link
                href={DASHBOARD_MAIN_HREF}
                prefetch={false}
                {...DASHBOARD_LINK_NEW_TAB}
                onClick={() => setOpen(false)}
              >
                Open Dashboard →
              </Link>
            </Button>
          </div>
        </nav>
      ) : null}
    </>
  );
}
