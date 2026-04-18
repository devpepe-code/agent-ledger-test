/**
 * Shapes mirror what a production EVM contract + IPFS / DA pipeline would return.
 */

export interface AnchoredAttestation {
  /** 0x-prefixed transaction hash for the anchoring transaction */
  txHash: string;
  blockNumber: number;
  blockTimeUnix: number;
  /** Contract that emitted the attestation log */
  contractAddress: string;
  /** IPFS CIDv1 (or CAR root) for the canonical payload */
  ipfsCid: string;
  /** Optional memo or contract-specific commitment */
  merkleRoot?: string;
}

export type BehaviorEventType =
  | "inference"
  | "tool_call"
  | "policy_decision"
  | "human_override"
  | "safety_block";

export interface BehaviorEvent {
  id: string;
  agentId: string;
  timestampUnix: number;
  type: BehaviorEventType;
  summary: string;
  payloadCid: string;
  /** Model- or policy-derived risk estimate, 0–100 */
  riskScore: number;
  anchored: AnchoredAttestation;
  verificationStatus: "verified" | "pending" | "challenge_open";
}

export interface AgentProfile {
  id: string;
  displayName: string;
  /** Optional UI avatar (URI or data URL) */
  avatarUri?: string;
  /** Owner wallet (EVM address) */
  ownerWallet: string;
  /** Optional on-chain ledger contract for this agent */
  ledgerContract?: string;
  modelFingerprint: string;
  policyManifestCid: string;
  policyVersion: string;
  createdAtUnix: number;
  lastAnchoredAtUnix: number;
  totalEvents: number;
  /** Composite trust score 0–100 from attestations + challenges */
  trustScore: number;
}

export interface OwnerDashboardPayload {
  ownerWallet: string;
  agents: AgentProfile[];
  recentEvents: BehaviorEvent[];
  /** Daily rollup for charts (unix day start, count) */
  eventVolumeByDay: { dayStartUnix: number; count: number }[];
}
