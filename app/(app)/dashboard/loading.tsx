export default function DashboardLoading() {
  return (
    <div
      className="mx-auto min-h-[70vh] max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8"
      aria-busy
      aria-label="Loading dashboard"
    >
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
        <div className="h-9 w-32 animate-pulse rounded-lg bg-white/10" />
      </div>
      <div className="space-y-4">
        <div className="h-5 w-2/3 max-w-xl animate-pulse rounded bg-white/10" />
        <div className="h-24 max-w-3xl animate-pulse rounded-xl bg-white/[0.06]" />
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl border border-white/10 bg-white/[0.04]"
          />
        ))}
      </div>
      <div className="mt-10 h-40 animate-pulse rounded-xl border border-white/10 bg-white/[0.04]" />
      <p className="mt-8 text-center text-sm text-white/40">Loading dashboard…</p>
    </div>
  );
}
