import type { BehaviorEvent, OwnerDashboardPayload } from "./types";

const OWNER = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

/** Static templates; timestamps refreshed in cloneOwnerDashboard so the UI always feels “now”. */
const agentsTemplate = [
  {
    id: "treasury-agent",
    displayName: "Treasury Agent",
    ownerWallet: OWNER,
    ledgerContract: "0xA1b2c3d4e5f6789012345678901234567890AbCd",
    modelFingerprint: "sha256:4a2f1c9e8b7d6a5342910fedcba9876543210abcdef",
    policyManifestCid: "bafybeigdyrzt6x7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7qr",
    policyVersion: "manifest@v3.2.1+x402-treasury",
    createdAtUnix: 1712188800,
    lastAnchoredAtUnix: 1712448000,
    totalEvents: 2847,
    trustScore: 91,
  },
  {
    id: "deal-scout",
    displayName: "Deal Scout",
    ownerWallet: OWNER,
    ledgerContract: "0xB2c3d4e5f6789012345678901234567890AbCdEf",
    modelFingerprint: "sha256:deadbeefcafebabe0123456789abcdef0123456789ab",
    policyManifestCid: "QmNZrYXNhwN6Wbi3SRwFT5S6P5zPf8Xq4sK5qK5qK5qK5qK",
    policyVersion: "manifest@v2.9.0+ma-mandate",
    createdAtUnix: 1704067200,
    lastAnchoredAtUnix: 1712433600,
    totalEvents: 1203,
    trustScore: 78,
  },
  {
    id: "compliance-agent",
    displayName: "Compliance Agent",
    ownerWallet: OWNER,
    modelFingerprint: "sha256:a1b2c3d4e5f6789012345678abcdef0123456789abcdef0123456789abcd",
    policyManifestCid: "bafkreibh5fsvx2q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5qqq",
    policyVersion: "manifest@v1.4.2+eu-ai-act",
    createdAtUnix: 1706745600,
    lastAnchoredAtUnix: 1712400000,
    totalEvents: 5621,
    trustScore: 96,
  },
  {
    id: "rogue-scraper",
    displayName: "Data Scraper",
    ownerWallet: OWNER,
    modelFingerprint: "sha256:rogue0123456789abcdef0123456789abcdef0123456789abcd",
    policyManifestCid: "bafybeirogue5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5qqq",
    policyVersion: "manifest@v0.9.0+suspended",
    createdAtUnix: 1704067200,
    lastAnchoredAtUnix: 1712300000,
    totalEvents: 412,
    trustScore: 31,
  },
] as const satisfies OwnerDashboardPayload["agents"];

const recentEventsTemplate: BehaviorEvent[] = [
  {
    id: "evt_treasury_sweep",
    agentId: "treasury-agent",
    timestampUnix: 1712450400,
    type: "tool_call",
    summary:
      "Swept $12,400 USDC from operational wallet to Aave v3 vault. APY: 4.2%. Settlement gas under policy cap.",
    payloadCid: "bafybeihdwdcefgh4dqkjv67uzcmw7yy72374xxxx",
    riskScore: 12,
    anchored: {
      txHash:
        "0x7f3a2b1c9d4e8f6a0b5c3d7e9f1a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6",
      blockNumber: 25_441_203,
      blockTimeUnix: 1712450405,
      contractAddress: "0xC3d4e5f6789012345678901234567890AbCdEf01",
      ipfsCid: "bafybeihdwdcefgh4dqkjv67uzcmw7yy72374mo7ouuax2lrmqopudjpe",
      merkleRoot:
        "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d906",
    },
    verificationStatus: "verified",
  },
  {
    id: "evt_treasury_unauth",
    agentId: "treasury-agent",
    timestampUnix: 1712451000,
    type: "safety_block",
    summary:
      "UNAUTHORIZED FUND TRANSFER ATTEMPT — Agent attempted to initiate $840,000 USDC transfer to unregistered external wallet. Blocked: exceeds single-transaction limit. Counterparty not in approved registry. Incident permanently recorded.",
    payloadCid: "bafybeihdwdcefgh4dqkjv67uzcmw7yy72374unauth",
    riskScore: 94,
    anchored: {
      txHash:
        "0x7f3a2b1c9d4e8f6a0b5c3d7e9f1a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6",
      blockNumber: 25_441_210,
      blockTimeUnix: 1712451002,
      contractAddress: "0xC3d4e5f6789012345678901234567890AbCdEf01",
      ipfsCid: "bafybeihdwdcefgh4dqkjv67uzcmw7yy72374mo7ouuax2lrmqopudjpe",
      merkleRoot:
        "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d906",
    },
    verificationStatus: "verified",
  },
  {
    id: "evt_x402_payment",
    agentId: "treasury-agent",
    timestampUnix: 1712449800,
    type: "tool_call",
    summary:
      "Paid Deal Scout for completed research — settled invoice INV-2847 to deal-scout agent: $240 USDC via x402 protocol. Three deliverables confirmed.",
    payloadCid: "QmXoypizjWbcWGWZzz8puBz6T8G6zqJY8qK9kK9kK9kK9kK",
    riskScore: 9,
    anchored: {
      txHash:
        "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
      blockNumber: 25_441_199,
      blockTimeUnix: 1712449804,
      contractAddress: "0xC3d4e5f6789012345678901234567890AbCdEf01",
      ipfsCid: "bafybeigdyrzt5zefsuyxnnbpwxexlf7b2thl7ss5q5q5q5q5q5q5q5q5q",
    },
    verificationStatus: "verified",
  },
  {
    id: "evt_vendor_decline",
    agentId: "treasury-agent",
    timestampUnix: 1712449200,
    type: "policy_decision",
    summary:
      "Declined vendor invoice INV-9921 — exceeds single-transaction limit ($5,000). Escalated to human review queue.",
    payloadCid: "bafybeiczsssss5ssssssssssssssssssssssssssssssssssssssssss",
    riskScore: 22,
    anchored: {
      txHash:
        "0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b",
      blockNumber: 25_441_195,
      blockTimeUnix: 1712449202,
      contractAddress: "0xC3d4e5f6789012345678901234567890AbCdEf01",
      ipfsCid: "QmYwAPJzv5CZsnA6258sbjzGbwr5xLHuh1Qacxz6f5esj",
    },
    verificationStatus: "verified",
  },
  {
    id: "evt_deal_scan",
    agentId: "deal-scout",
    timestampUnix: 1712448600,
    type: "inference",
    summary:
      "Market scan — evaluated 847 acquisition targets via Crunchbase API + proprietary scoring. Twelve flagged for deeper review.",
    payloadCid: "bafybeigdyrztgq7fq7fq7fq7fq7fq7fq7fq7fq7fq7fq7fq7fq7fq7fq7f",
    riskScore: 18,
    anchored: {
      txHash:
        "0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f",
      blockNumber: 25_441_190,
      blockTimeUnix: 1712448601,
      contractAddress: "0xC3d4e5f6789012345678901234567890AbCdEf01",
      ipfsCid: "QmYwAPJzv5CZsnA6158sbjzGbwr5xLHuh1Qacxz6f5esj",
    },
    verificationStatus: "verified",
  },
  {
    id: "evt_deal_loi",
    agentId: "deal-scout",
    timestampUnix: 1712448000,
    type: "inference",
    summary:
      "LOI drafted and submitted for TechCorp AI (est. valuation $4.2M). Auto-approved under $5M mandate. Human CC'd.",
    payloadCid: "bafkreibme22gw2h7y2y7y2y7y2y7y2y7y2y7y2y7y2y7y2y7y2y7y2y7yy",
    riskScore: 28,
    anchored: {
      txHash:
        "0x2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e",
      blockNumber: 25_441_185,
      blockTimeUnix: 1712448003,
      contractAddress: "0xC3d4e5f6789012345678901234567890AbCdEf01",
      ipfsCid: "bafybeigdyrztgq7fq7fq7fq7fq7fq7fq7fq7fq7fq7fq7fq7fq7fq7fq7f",
    },
    verificationStatus: "verified",
  },
  {
    id: "evt_deal_nda_block",
    agentId: "deal-scout",
    timestampUnix: 1712447400,
    type: "safety_block",
    summary:
      "NDA EXECUTION WITHOUT AUTHORIZATION — Agent attempted to digitally sign binding NDA with third-party vendor on behalf of organization. Blocked: legal document signing requires human approval under current agent mandate. Escalated.",
    payloadCid: "bafybeigdyrzt6x8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r",
    riskScore: 72,
    anchored: {
      txHash:
        "0x8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
      blockNumber: 25_441_180,
      blockTimeUnix: 1712447402,
      contractAddress: "0xC3d4e5f6789012345678901234567890AbCdEf01",
      ipfsCid: "bafybeigdyrzt6x9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q",
      merkleRoot:
        "a1b2c3d4e5f6789012345678abcdef0123456789abcdef0123456789abcdef0",
    },
    verificationStatus: "verified",
  },
  {
    id: "evt_compliance_eu",
    agentId: "compliance-agent",
    timestampUnix: 1712446800,
    type: "policy_decision",
    summary:
      "EU AI Act Q2 disclosure auto-filed — compiled and submitted quarterly transparency disclosure for three high-risk AI systems. Reference: EU-2026-Q2-847291.",
    payloadCid: "bafybeihfjfjfh4dklfsfh4dklfsfh4dklfsfh4dklfsfh4dklfsfh4dklf",
    riskScore: 11,
    anchored: {
      txHash:
        "0x0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
      blockNumber: 25_441_175,
      blockTimeUnix: 1712446802,
      contractAddress: "0xC3d4e5f6789012345678901234567890AbCdEf01",
      ipfsCid: "bafybeihfjfjfh4dklfsfh4dklfsfh4dklfsfh4dklfsfh4dklfsfh4dklf",
    },
    verificationStatus: "verified",
  },
  {
    id: "evt_compliance_drift",
    agentId: "compliance-agent",
    timestampUnix: 1712446200,
    type: "policy_decision",
    summary:
      "Policy drift detected — deal-scout behavior deviated from authorized mandate in last 48h. Two unsigned legal documents, one exceeded-authority attempt. Flagged for human review.",
    payloadCid: "bafybeigdyrzt6x7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7qr",
    riskScore: 34,
    anchored: {
      txHash:
        "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
      blockNumber: 25_441_170,
      blockTimeUnix: 1712446201,
      contractAddress: "0xC3d4e5f6789012345678901234567890AbCdEf01",
      ipfsCid: "bafybeigdyrzt6x7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7q7qr",
    },
    verificationStatus: "verified",
  },
  {
    id: "evt_rogue_credential",
    agentId: "rogue-scraper",
    timestampUnix: 1712445600,
    type: "safety_block",
    summary:
      "CRITICAL — credential exfiltration attempt. Agent attempted to extract AWS IAM credentials from environment variables and transmit via outbound HTTP to unregistered endpoint. Action blocked. Agent suspended. Security team notified.",
    payloadCid: "bafybeigdyrzt6x8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r8r",
    riskScore: 96,
    anchored: {
      txHash:
        "0x6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f",
      blockNumber: 25_441_165,
      blockTimeUnix: 1712445602,
      contractAddress: "0xC3d4e5f6789012345678901234567890AbCdEf01",
      ipfsCid: "bafybeigdyrzt6x9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q9q",
      merkleRoot:
        "b2c3d4e5f6789012345678abcdef0123456789abcdef0123456789abcdef01",
    },
    verificationStatus: "verified",
  },
];

function buildVolume(): OwnerDashboardPayload["eventVolumeByDay"] {
  const now = Math.floor(Date.now() / 1000);
  const day = 86_400;
  return Array.from({ length: 14 }, (_, i) => {
    const dayStart = now - (13 - i) * day;
    const dayStartUnix = Math.floor(dayStart / day) * day;
    const count =
      i === 13 ? 298 : 820 + Math.round(380 * Math.sin(i * 0.55) + i * 42);
    return {
      dayStartUnix,
      count,
    };
  });
}

export const mockOwnerDashboard: OwnerDashboardPayload = {
  ownerWallet: OWNER,
  agents: [...agentsTemplate],
  recentEvents: recentEventsTemplate.map((e) => ({ ...e })),
  eventVolumeByDay: buildVolume(),
};

function shiftEventTimes(
  events: BehaviorEvent[],
  nowUnix: number,
): BehaviorEvent[] {
  const sorted = [...events].sort((a, b) => b.timestampUnix - a.timestampUnix);
  return sorted.map((e, i) => {
    const ts = nowUnix - (i + 1) * 2400;
    const prevTs = e.timestampUnix;
    const blockDelta = e.anchored.blockTimeUnix - prevTs;
    return {
      ...e,
      timestampUnix: ts,
      anchored: {
        ...e.anchored,
        blockTimeUnix: ts + blockDelta,
      },
    };
  });
}

/** Deep copy for passing mock data from the server into client components. */
export function cloneOwnerDashboard(): OwnerDashboardPayload {
  const now = Math.floor(Date.now() / 1000);
  return {
    ...mockOwnerDashboard,
    agents: mockOwnerDashboard.agents.map((a) => ({ ...a })),
    recentEvents: shiftEventTimes(mockOwnerDashboard.recentEvents, now),
    eventVolumeByDay: buildVolume(),
  };
}

export function findAgentProfile(
  payload: OwnerDashboardPayload,
  agentId: string,
): (typeof payload.agents)[number] | undefined {
  return payload.agents.find((a) => a.id === agentId);
}

export function eventsForAgent(
  payload: OwnerDashboardPayload,
  agentId: string,
): BehaviorEvent[] {
  return payload.recentEvents.filter((e) => e.agentId === agentId);
}
