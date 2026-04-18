import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { DASHBOARD_LINK_NEW_TAB, DASHBOARD_MAIN_HREF } from "@/lib/auth";

const footerProduct = [
  { href: DASHBOARD_MAIN_HREF, label: "Open Dashboard" },
  { href: "/#faq", label: "FAQ" },
] as const;

const footerCompany = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
  { href: "mailto:pilots@agentledger.dev", label: "Contact", mailto: true },
] as const;

const footerLegal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export function MarketingFooter() {
  return (
    <footer
      className="border-t border-white/10 py-10"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-1 font-mono text-xs text-white/30">───────────────</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
              The trust layer for the agentic economy.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              {footerProduct.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="hover:text-white"
                    {...(item.href === DASHBOARD_MAIN_HREF
                      ? DASHBOARD_LINK_NEW_TAB
                      : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Company
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              {footerCompany.map((item) => (
                <li key={item.href}>
                  {"mailto" in item && item.mailto ? (
                    <a href={item.href} className="hover:text-white">
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              {footerLegal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-white/40">
            © 2026 AgentLedger · pilots@agentledger.dev
          </p>
          <p className="mt-3 font-mono text-[10px] text-white/25">
            {"// every_agent_record_is_permanent."}
            <br />
            {"// so_is_this_footer."}
          </p>
        </div>
      </div>
    </footer>
  );
}
