"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { useState, type ReactElement, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";

import { Web3ReadyContext } from "@/components/web3-ready-context";
import { wagmiConfig } from "@/lib/wagmi";

import "@rainbow-me/rainbowkit/styles.css";

export function Web3ProvidersInner({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000 },
        },
      }),
  );

  return (
    <Web3ReadyContext.Provider value={true}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <RainbowKitProvider
            initialChain={base}
            theme={darkTheme({
              accentColor: "#0052FF",
              accentColorForeground: "white",
              borderRadius: "medium",
              overlayBlur: "none",
            })}
          >
            {children}
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </Web3ReadyContext.Provider>
  );
}
