/**
 * KpiCards — ported from specrails-hub/client/src/components/analytics/KpiCards.tsx
 *
 * 4 metric cards showing cost, jobs, success rate, and avg duration.
 * Adapted for specrails-web demo: simplified to use AnalyticsKpi type.
 */

import type { AnalyticsKpi } from "./types";

function formatCost(usd: number) {
  return `$${usd.toFixed(4)}`;
}

function formatDuration(ms: number | null): string {
  if (ms === null) return "\u2014";
  const totalSecs = Math.round(ms / 1000);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

function formatSuccessRate(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}

function formatTokens(tokens: number): string {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`;
  if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(1)}K`;
  return String(tokens);
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/40 bg-card/50 p-4 space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

interface KpiCardsProps {
  kpi: AnalyticsKpi;
}

export function KpiCards({ kpi }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      <KpiCard label="Total Cost" value={formatCost(kpi.totalCostUsd)} />
      <KpiCard label="Total Jobs" value={String(kpi.totalJobs)} />
      <KpiCard label="Success Rate" value={formatSuccessRate(kpi.successRate)} />
      <KpiCard label="Avg Duration" value={formatDuration(kpi.avgDurationMs)} />
      <KpiCard label="Total Tokens" value={formatTokens(kpi.totalTokens)} />
    </div>
  );
}
