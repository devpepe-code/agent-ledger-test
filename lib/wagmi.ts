import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  baseAccount,
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http } from "viem";
import { base } from "wagmi/chains";

import { env, isWalletConnectConfigured } from "@/lib/env";

if (
  process.env.NODE_ENV === "production" &&
  !isWalletConnectConfigured()
) {
  console.warn(
    "[AgentLedger] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set — WalletConnect (mobile QR) disabled; browser wallets still work.",
  );
}

/**
 * RainbowKit default list uses WalletConnect for the generic “WalletConnect” option.
 * That connector requires a Cloud project ID. Without it, swap in Coinbase Wallet so
 * MetaMask / Coinbase / Base Account / Safe still connect on Base.
 */
const popularWallets = isWalletConnectConfigured()
  ? [safeWallet, rainbowWallet, baseAccount, metaMaskWallet, walletConnectWallet]
  : [safeWallet, rainbowWallet, baseAccount, metaMaskWallet, coinbaseWallet];

export const wagmiConfig = getDefaultConfig({
  appName: "AgentLedger",
  projectId: env.walletConnectProjectId,
  chains: [base],
  wallets: [{ groupName: "Popular", wallets: popularWallets }],
  transports: {
    [base.id]: http(env.baseRpcUrl),
  },
  ssr: false,
});
