import { env } from "@/lib/env";

/** Basescan (or compatible explorer) URL for an EVM transaction hash */
export function baseTxUrl(txHash: string): string {
  return `${env.basescanUrl}/tx/${txHash}`;
}
