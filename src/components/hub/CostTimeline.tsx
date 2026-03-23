/**
 * CostTimeline — inspired by specrails-hub/client/src/components/analytics/CostTimeline.tsx
 *
 * Line chart showing cost over time using Recharts.
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CostTimelineProps {
  data: Array<{ date: string; costUsd: number }>;
}

export function CostTimeline({ data }: CostTimelineProps) {
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `$${v.toFixed(2)}`}
            width={40}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 6,
              fontSize: 11,
            }}
            formatter={(value: number) => [`$${value.toFixed(4)}`, "Cost"]}
          />
          <Line
            type="monotone"
            dataKey="costUsd"
            stroke="hsl(135, 94%, 65%)"
            strokeWidth={2}
            dot={{ r: 3, fill: "hsl(135, 94%, 65%)" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
