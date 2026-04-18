import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactElement, ReactNode } from "react";

import "./globals.css";

import { env } from "@/lib/env";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.appUrl),
  title: {
    default: "AgentLedger — Trust Layer for the Agentic Economy",
    template: "%s | AgentLedger",
  },
  description:
    "AI agents are now economic actors — they transact, decide, and operate autonomously at scale. AgentLedger gives every agent a permanent, verifiable behavioral record. The accountability infrastructure the agentic economy needs.",
  keywords: [
    "agentic economy",
    "AI agents",
    "agent accountability",
    "onchain AI",
    "agent identity",
    "Know Your Agent",
    "AI governance",
    "agent monitoring",
    "behavioral ledger",
    "AI agent economy",
    "autonomous agents",
    "agent trust score",
    "EU AI Act",
    "multi-agent systems",
  ],
  authors: [{ name: "AgentLedger" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.appUrl,
    siteName: "AgentLedger",
    title: "AgentLedger — Trust Layer for the Agentic Economy",
    description:
      "Permanent, verifiable behavioral records for AI agents in the agentic economy. Trust infrastructure for autonomous systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentLedger — Trust Layer for the Agentic Economy",
    description:
      "Accountability infrastructure for AI agents — behavioral records, trust scores, and proof for the agentic economy.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${mono.variable}`}
      style={{ backgroundColor: "var(--bg-void)", minHeight: "100%" }}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="/ledger-tailwind.css" />
      </head>
      <body
        className="min-h-screen min-w-0 overflow-x-hidden font-sans antialiased"
        style={{
          backgroundColor: "var(--bg-base)",
          color: "#f8fafc",
          minHeight: "100vh",
          fontFamily:
            "var(--font-display), ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
