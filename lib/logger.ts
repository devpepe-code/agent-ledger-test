const isDev = process.env.NODE_ENV === "development";
const { log: consoleLog } = console;

export const logger = {
  log: (...args: unknown[]): void => {
    if (isDev) consoleLog("[AgentLedger]", ...args);
  },
  warn: (...args: unknown[]): void => {
    console.warn("[AgentLedger]", ...args);
  },
  error: (...args: unknown[]): void => {
    console.error("[AgentLedger]", ...args);
  },
};
