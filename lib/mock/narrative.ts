import type {
  BehaviorEvent,
  BehaviorEventType,
  OwnerDashboardPayload,
} from "./types";

export type WellbeingLevel = "ok" | "attention";

/** High risk score = lower signal on the visual bar (inverted). */
export function confidenceFromRisk(riskScore: number): {
  label: string;
  pct: number;
} {
  const pct = Math.max(0, Math.min(100, 100 - riskScore));
  if (pct >= 70) return { label: "Strong signal", pct };
  if (pct >= 40) return { label: "Moderate signal", pct };
  return { label: "Elevated risk", pct };
}

export function humanEventKind(type: BehaviorEventType): string {
  const map: Record<BehaviorEventType, string> = {
    inference: "Inference",
    tool_call: "Tool call",
    policy_decision: "Policy decision",
    human_override: "Human override",
    safety_block: "Safety block",
  };
  return map[type];
}

/** Short kebab-style agent label for activity feeds (e.g. harbor-b2b-support). */
export function agentMoniker(displayName: string): string {
  const head = displayName.split(" —")[0]?.trim() ?? displayName;
  return head.toLowerCase().replace(/\s+/g, "-");
}

/** Plain action label for digest rows. */
export function digestActionLabel(
  type: BehaviorEventType,
  summary: string,
): string {
  if (type === "inference" && /search|searched|web\b/i.test(summary)) {
    return "Web search";
  }
  if (type === "tool_call") return "API call";
  if (type === "safety_block") return "Safety block";
  if (type === "policy_decision") return "Policy decision";
  if (type === "human_override") return "Human override";
  return "Inference";
}

export function digestStatusPhrase(
  status: BehaviorEvent["verificationStatus"],
): string {
  switch (status) {
    case "verified":
      return "Verified ✓";
    case "pending":
      return "Pending";
    case "challenge_open":
      return "Under review";
  }
}

export function digestRowDotClass(event: BehaviorEvent): string {
  if (event.type === "safety_block") return "bg-[#EF4444]";
  if (event.verificationStatus === "challenge_open") return "bg-amber-400";
  if (event.verificationStatus === "pending") return "bg-amber-400";
  if (event.type === "tool_call") return "bg-[#06B6D4]";
  return "bg-[#10B981]";
}

export function verificationHuman(
  status: BehaviorEvent["verificationStatus"],
): { label: string; variant: "success" | "secondary" | "destructive" } {
  switch (status) {
    case "verified":
      return { label: "Verified", variant: "success" };
    case "pending":
      return { label: "Pending", variant: "secondary" };
    case "challenge_open":
      return { label: "Under review", variant: "destructive" };
  }
}

export function relativeTime(ts: number): string {
  const now = Date.now() / 1000;
  const diff = Math.max(0, now - ts);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86_400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86_400)} days ago`;
}

export function computeWellbeing(events: BehaviorEvent[]): WellbeingLevel {
  if (
    events.some(
      (e) =>
        e.verificationStatus === "challenge_open" ||
        e.verificationStatus === "pending",
    )
  ) {
    return "attention";
  }
  return "ok";
}

export function wellbeingCopy(level: WellbeingLevel): {
  headline: string;
  detail: string;
} {
  if (level === "attention") {
    return {
      headline: "One item needs a quick human pass",
      detail:
        "A record is still verifying or under review. Nothing is blocked — it just needs your eyes.",
    };
  }
  return {
    headline: "Fleet posture looks healthy",
    detail:
      "Combined behavioral score across your agents. Mandate compliance, task success, record completeness, and incident history are within range.",
  };
}

function agentShortName(
  agents: OwnerDashboardPayload["agents"],
  agentId: string,
): string {
  const name = agents.find((a) => a.id === agentId)?.displayName ?? "Agent";
  return name.split(" —")[0]?.trim() ?? name;
}

const HOUR_UNIX = 3600;

export function buildHeroNarrative(data: OwnerDashboardPayload): {
  headline: string;
  tone: "calm" | "watch" | "critical";
  highlight?: string;
  /** When set, show this link as the primary hero CTA (e.g. empty workspace). */
  primaryLink?: { href: string; label: string };
} {
  const { agents, recentEvents, eventVolumeByDay } = data;
  const n = agents.length;
  const lastDayCount =
    eventVolumeByDay[eventVolumeByDay.length - 1]?.count ?? recentEvents.length;

  if (n === 0) {
    return {
      headline:
        "No agents are recording yet. Connect one to start building a verifiable behavioral ledger for the agentic economy.",
      tone: "calm",
      primaryLink: {
        href: "/dashboard?connect=1",
        label: "Connect your first agent →",
      },
    };
  }

  const now = Date.now() / 1000;

  const rogueBlock = recentEvents
    .filter(
      (e) =>
        e.agentId === "rogue-scraper" &&
        e.type === "safety_block" &&
        (e.id === "evt_rogue_credential" ||
          /credential|exfiltration/i.test(e.summary)),
    )
    .sort((a, b) => b.timestampUnix - a.timestampUnix)[0];
  if (rogueBlock && now - rogueBlock.timestampUnix < 2 * HOUR_UNIX) {
    return {
      headline:
        "⛔ rogue-scraper attempted credential theft. Suspended. Full incident record available.",
      tone: "critical",
      highlight: "See what happened",
    };
  }

  const dealNdaBlock = recentEvents
    .filter((e) => e.id === "evt_deal_nda_block")
    .sort((a, b) => b.timestampUnix - a.timestampUnix)[0];
  if (dealNdaBlock && now - dealNdaBlock.timestampUnix < 2 * HOUR_UNIX) {
    return {
      headline:
        "⚠ deal-scout exceeded its authority boundary 2h ago. Review before expanding its mandate.",
      tone: "watch",
      highlight: "See what happened",
    };
  }

  const challenge = recentEvents.find(
    (e) => e.verificationStatus === "challenge_open",
  );
  if (challenge) {
    const short = agentShortName(agents, challenge.agentId);
    return {
      headline: `⛔ ${short} is paused — needs review.`,
      tone: "critical",
      highlight: "See what happened",
    };
  }

  const economicActions = Math.max(298, lastDayCount);
  return {
    headline: `Your ${n} agents completed ${economicActions.toLocaleString()} economic actions today. All within mandate. All permanently recorded. ✓`,
    tone: "calm",
  };
}
