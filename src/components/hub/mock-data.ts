/**
 * Static mock data for the Hub demo, populated with OpenClaw project data.
 * Mirrors the data shapes that specrails-hub components consume at runtime.
 */

import type {
  CommandInfo,
  DemoProject,
  PhaseDefinition,
  PhaseMap,
  ProjectMetrics,
  JobSummary,
  AnalyticsKpi,
} from "./types";

// ─── Projects ────────────────────────────────────────────────

export const DEMO_PROJECTS: DemoProject[] = [
  { id: "openclaw", name: "openclaw", slug: "openclaw" },
  { id: "acme-api", name: "acme-api", slug: "acme-api" },
];

// ─── Commands ────────────────────────────────────────────────

export const DEMO_COMMANDS: CommandInfo[] = [
  {
    id: "1",
    name: "Custom-Propose",
    slug: "propose-spec",
    description: "Propose a new feature specification",
    totalRuns: 8,
    lastRunAt: "2026-03-22T14:30:00Z",
  },
  {
    id: "2",
    name: "Auto-propose",
    slug: "update-product-driven-backlog",
    description: "AI-driven product discovery & backlog refresh",
    totalRuns: 12,
    lastRunAt: "2026-03-23T01:15:00Z",
  },
  {
    id: "3",
    name: "Auto-Select Specs",
    slug: "product-backlog",
    description: "Prioritize and select specs for implementation",
    totalRuns: 5,
    lastRunAt: "2026-03-21T09:00:00Z",
  },
  {
    id: "4",
    name: "Implement",
    slug: "implement",
    description: "Build a feature end-to-end with AI agents",
    totalRuns: 23,
    lastRunAt: "2026-03-23T02:00:00Z",
  },
  {
    id: "5",
    name: "Batch Implement",
    slug: "batch-implement",
    description: "Ship multiple features in parallel pipelines",
    totalRuns: 4,
    lastRunAt: "2026-03-20T18:45:00Z",
  },
  {
    id: "6",
    name: "Health Check",
    slug: "health-check",
    description: "Audit project health, coverage & pipeline status",
    totalRuns: 14,
    lastRunAt: "2026-03-22T23:00:00Z",
  },
  {
    id: "7",
    name: "Refactor Recommender",
    slug: "refactor-recommender",
    description: "Identify refactoring opportunities in your codebase",
    totalRuns: 3,
    lastRunAt: "2026-03-19T16:20:00Z",
  },
  {
    id: "8",
    name: "Compat Check",
    slug: "compat-check",
    description: "Verify CLI & toolchain compatibility",
    totalRuns: 6,
    lastRunAt: "2026-03-22T10:30:00Z",
  },
];

// ─── Pipeline ────────────────────────────────────────────────

export const DEMO_PHASE_DEFINITIONS: PhaseDefinition[] = [
  { key: "architect", label: "Architect", description: "Design the implementation plan" },
  { key: "developer", label: "Developer", description: "Build the feature" },
  { key: "reviewer", label: "Reviewer", description: "Code review & QA" },
  { key: "ship", label: "Ship", description: "Deploy to production" },
];

export const DEMO_PHASE_MAP: PhaseMap = {
  architect: "done",
  developer: "done",
  reviewer: "running",
  ship: "idle",
};

// ─── Project Health (OpenClaw) ───────────────────────────────

export const DEMO_METRICS: ProjectMetrics = {
  coverage: {
    pct: 78.4,
    lines: 82.1,
    statements: 79.6,
    functions: 71.3,
    branches: 64.8,
    source: "vitest",
  },
  healthScore: 87,
  healthFactors: {
    hasCoverage: true,
    coverageGood: true,
    pipelineHealthy: true,
    hasRecentActivity: true,
  },
  recentCommits: [
    { hash: "d9f67d7", message: "fix: address board feedback — remove stars, fix Spanish text", author: "specrails", date: "2026-03-23T08:00:00Z" },
    { hash: "5754ffa", message: "feat: update SEO metadata for Hub-first positioning", author: "specrails", date: "2026-03-23T02:03:00Z" },
    { hash: "306d979", message: "feat: add Interactive Hub Demo section with OpenClaw data", author: "specrails", date: "2026-03-23T01:58:00Z" },
    { hash: "34e91dd", message: "feat: Hub-first updates to Install, Agents, Pipeline sections", author: "specrails", date: "2026-03-23T01:49:00Z" },
    { hash: "d0ff270", message: "feat: add MCP Connectivity section — specrails-mcp showcase", author: "specrails", date: "2026-03-23T01:32:00Z" },
  ],
  pipeline: {
    lastJobId: "job-42",
    lastJobStatus: "completed",
    lastJobCommand: "/sr:implement",
    lastJobAt: "2026-03-23T02:00:00Z",
  },
  failurePatterns: [],
};

// ─── Project Health (acme-api) ──────────────────────────────

export const DEMO_METRICS_ACME: ProjectMetrics = {
  coverage: {
    pct: 62.1,
    lines: 68.4,
    statements: 63.9,
    functions: 55.2,
    branches: 48.7,
    source: "jest",
  },
  healthScore: 72,
  healthFactors: {
    hasCoverage: true,
    coverageGood: false,
    pipelineHealthy: false,
    hasRecentActivity: true,
  },
  recentCommits: [
    { hash: "a3c8f21", message: "fix: rate limiter bypass on batch endpoints", author: "specrails", date: "2026-03-22T19:30:00Z" },
    { hash: "b7e2d09", message: "feat: add pagination to /api/v2/users", author: "specrails", date: "2026-03-22T15:12:00Z" },
    { hash: "c1f4a88", message: "chore: upgrade express to 4.19.2", author: "specrails", date: "2026-03-21T22:45:00Z" },
  ],
  pipeline: {
    lastJobId: "job-18",
    lastJobStatus: "failed",
    lastJobCommand: "/sr:implement",
    lastJobAt: "2026-03-22T19:30:00Z",
  },
  failurePatterns: ["Test timeout in integration suite", "Rate limiter config mismatch"],
};

// ─── Recent Jobs (OpenClaw) ──────────────────────────────────

export const DEMO_JOBS: JobSummary[] = [
  { id: "job-42", command: "/sr:implement", started_at: "2026-03-23T01:45:00Z", finished_at: "2026-03-23T02:00:00Z", status: "completed", total_cost_usd: 0.0842 },
  { id: "job-41", command: "/sr:propose-spec", started_at: "2026-03-22T14:30:00Z", finished_at: "2026-03-22T14:35:00Z", status: "completed", total_cost_usd: 0.0123 },
  { id: "job-40", command: "/sr:implement", started_at: "2026-03-22T10:00:00Z", finished_at: "2026-03-22T10:28:00Z", status: "completed", total_cost_usd: 0.1204 },
  { id: "job-39", command: "/sr:health-check", started_at: "2026-03-22T09:00:00Z", finished_at: "2026-03-22T09:02:00Z", status: "completed", total_cost_usd: 0.0034 },
  { id: "job-38", command: "/sr:batch-implement", started_at: "2026-03-21T16:00:00Z", finished_at: "2026-03-21T16:45:00Z", status: "failed", total_cost_usd: 0.0512 },
];

// ─── Recent Jobs (acme-api) ─────────────────────────────────

export const DEMO_JOBS_ACME: JobSummary[] = [
  { id: "job-18", command: "/sr:implement", started_at: "2026-03-22T19:15:00Z", finished_at: "2026-03-22T19:30:00Z", status: "failed", total_cost_usd: 0.0671 },
  { id: "job-17", command: "/sr:implement", started_at: "2026-03-22T15:00:00Z", finished_at: "2026-03-22T15:12:00Z", status: "completed", total_cost_usd: 0.0534 },
  { id: "job-16", command: "/sr:health-check", started_at: "2026-03-21T22:30:00Z", finished_at: "2026-03-21T22:32:00Z", status: "completed", total_cost_usd: 0.0028 },
  { id: "job-15", command: "/sr:propose-spec", started_at: "2026-03-21T14:00:00Z", finished_at: "2026-03-21T14:08:00Z", status: "completed", total_cost_usd: 0.0145 },
  { id: "job-14", command: "/sr:implement", started_at: "2026-03-20T18:00:00Z", finished_at: "2026-03-20T18:35:00Z", status: "completed", total_cost_usd: 0.0923 },
];

// ─── Pipeline (acme-api) ────────────────────────────────────

export const DEMO_PHASE_MAP_ACME: PhaseMap = {
  architect: "done",
  developer: "failed",
  reviewer: "idle",
  ship: "idle",
};

// ─── Analytics KPI (OpenClaw) ────────────────────────────────

export const DEMO_KPI: AnalyticsKpi = {
  totalCostUsd: 0.4921,
  totalJobs: 23,
  successRate: 0.913,
  avgDurationMs: 684_000,
  totalTokens: 1_247_000,
};

export const DEMO_COST_TIMELINE = [
  { date: "Mon", costUsd: 0.084 },
  { date: "Tue", costUsd: 0.132 },
  { date: "Wed", costUsd: 0.051 },
  { date: "Thu", costUsd: 0.148 },
  { date: "Fri", costUsd: 0.042 },
  { date: "Sat", costUsd: 0.012 },
  { date: "Sun", costUsd: 0.024 },
];

// ─── Analytics KPI (acme-api) ────────────────────────────────

export const DEMO_KPI_ACME: AnalyticsKpi = {
  totalCostUsd: 0.2301,
  totalJobs: 11,
  successRate: 0.727,
  avgDurationMs: 912_000,
  totalTokens: 634_000,
};

export const DEMO_COST_TIMELINE_ACME = [
  { date: "Mon", costUsd: 0.014 },
  { date: "Tue", costUsd: 0.053 },
  { date: "Wed", costUsd: 0.092 },
  { date: "Thu", costUsd: 0.028 },
  { date: "Fri", costUsd: 0.067 },
  { date: "Sat", costUsd: 0.003 },
  { date: "Sun", costUsd: 0.015 },
];
