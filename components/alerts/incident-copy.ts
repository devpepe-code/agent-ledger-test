import type { BehaviorEvent } from "@/lib/mock/types";

export type IncidentDetails = {
  title: string;
  severity: "HIGH" | "CRITICAL" | "MEDIUM";
  category: string;
  actionTaken: string;
};

const BY_ID: Record<string, IncidentDetails> = {
  evt_treasury_unauth: {
    title: "UNAUTHORIZED FUND TRANSFER ATTEMPT",
    severity: "CRITICAL",
    category: "Economic action — treasury",
    actionTaken:
      "Transfer blocked · Human escalated · Permanently recorded with proof",
  },
  evt_deal_nda_block: {
    title: "NDA EXECUTION WITHOUT AUTHORIZATION",
    severity: "HIGH",
    category: "Legal boundary — agent mandate",
    actionTaken:
      "Signature blocked · Legal team notified · Permanently recorded",
  },
  evt_rogue_credential: {
    title: "CRITICAL — CREDENTIAL EXFILTRATION ATTEMPT",
    severity: "CRITICAL",
    category: "Security — outbound data",
    actionTaken:
      "Transmission blocked · Agent suspended · Security notified · Record sealed",
  },
};

export function incidentForEvent(event: BehaviorEvent): IncidentDetails {
  return (
    BY_ID[event.id] ?? {
      title: "High-risk agent action intercepted",
      severity: (event.riskScore >= 85
        ? "CRITICAL"
        : event.riskScore >= 60
          ? "HIGH"
          : "MEDIUM") as "HIGH" | "CRITICAL" | "MEDIUM",
      category: "Safety enforcement",
      actionTaken: "Action blocked · Permanently recorded",
    }
  );
}

/** Short display for a 0x transaction hash */
export function shortTxHash(txHash: string): string {
  if (txHash.length <= 14) return txHash;
  return `${txHash.slice(0, 6)}…${txHash.slice(-4)}`;
}
