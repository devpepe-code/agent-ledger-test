/** Short display for EVM (0x…) addresses. */
export function shortenAddress(addr: string, edge = 4): string {
  const t = addr.trim();
  if (!t) return "";
  if (t.startsWith("0x") && t.length > 2 + edge * 2)
    return `${t.slice(0, 2 + edge)}…${t.slice(-edge)}`;
  if (t.length > edge * 2) return `${t.slice(0, edge)}…${t.slice(-edge)}`;
  return t;
}
