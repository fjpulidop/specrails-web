/**
 * Types ported from specrails-hub/client/src/types.ts
 * Subset needed for the interactive demo on /demo.
 */

export type JobStatus = "queued" | "running" | "completed" | "failed" | "canceled";

export interface PhaseDefinition {
  key: string;
  label: string;
  description: string;
}

export type PhaseState = "idle" | "running" | "done" | "error";

export type PhaseMap = Record<string, PhaseState>;

export interface CommandInfo {
  id: string;
  name: string;
  description: string;
  slug: string;
  totalRuns?: number;
  lastRunAt?: string | null;
}

export interface JobSummary {
  id: string;
  command: string;
  started_at: string;
  finished_at?: string | null;
  status: JobStatus;
  total_cost_usd?: number | null;
}

export interface ProjectMetrics {
  coverage: {
    pct: number | null;
    lines: number | null;
    statements: number | null;
    functions: number | null;
    branches: number | null;
    source: string | null;
  };
  healthScore: number;
  healthFactors: {
    hasCoverage: boolean;
    coverageGood: boolean;
    pipelineHealthy: boolean;
    hasRecentActivity: boolean;
  };
  recentCommits: Array<{
    hash: string;
    message: string;
    author: string;
    date: string;
  }>;
  pipeline: {
    lastJobId: string | null;
    lastJobStatus: string | null;
    lastJobCommand: string | null;
    lastJobAt: string | null;
  };
  failurePatterns: Array<{
    command: string;
    count: number;
    lastFailedAt: string;
  }>;
}

export interface DemoProject {
  id: string;
  name: string;
  slug: string;
}

export type SectionId = "spec" | "rails" | "jobs" | "health";

export interface AnalyticsKpi {
  totalCostUsd: number;
  totalJobs: number;
  successRate: number;
  avgDurationMs: number | null;
  totalTokens: number;
}
