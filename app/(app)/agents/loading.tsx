export default function AgentsLoading() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "#f8fafc",
        minHeight: "100vh",
      }}
      aria-busy
      aria-label="Loading agents"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#7C3AED]" />
      <p className="text-sm text-white/50">Loading agents…</p>
    </div>
  );
}
