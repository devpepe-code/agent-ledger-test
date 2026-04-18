"use client";

import { createContext, useContext } from "react";

export const Web3ReadyContext = createContext(false);

export function useWeb3Ready() {
  return useContext(Web3ReadyContext);
}
