"use client";

import { logger } from "@/lib/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  logger.error("[AgentLedger] root error:", error);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#0a0a0f",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
          AgentLedger hit a fatal error
        </h1>
        <p style={{ opacity: 0.75, maxWidth: 480, lineHeight: 1.5 }}>
          Restart dev with a clean cache from the project folder:{" "}
          <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px" }}>
            npm run dev:clean
          </code>
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: 16,
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            background: "#7C3AED",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
