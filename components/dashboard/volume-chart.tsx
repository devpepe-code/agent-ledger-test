"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Point = { day: string; count: number };

function formatDay(ts: number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(ts * 1000));
}

export function VolumeChart({
  data,
}: {
  data: { dayStartUnix: number; count: number }[];
}) {
  const chartData: Point[] = data.map((d) => ({
    day: formatDay(d.dayStartUnix),
    count: d.count,
  }));

  return (
    <div className="h-full min-h-[320px]">
      <Card className="h-full border-white/10 bg-gradient-to-br from-[#1A1A2E]/80 to-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Activity at a glance
          </CardTitle>
          <p className="text-sm text-white/50">
            How much your agents did over the last couple of weeks — each point is
            real economic activity that was recorded.
          </p>
        </CardHeader>
        <CardContent className="h-[260px] min-h-0 pb-4">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillLedger" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="#7C3AED"
                    stopOpacity={0.45}
                  />
                  <stop
                    offset="100%"
                    stopColor="#06B6D4"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 8"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={36}
                label={{
                  value: "Actions",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "rgba(255,255,255,0.35)", fontSize: 10 },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1A2E",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#fff",
                }}
                labelStyle={{ color: "rgba(255,255,255,0.65)" }}
                formatter={(value) => [
                  typeof value === "number"
                    ? `${value.toLocaleString("en-US")} things recorded`
                    : "—",
                  "That day",
                ]}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#7C3AED"
                strokeWidth={2}
                fill="url(#fillLedger)"
                name="Recorded actions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
