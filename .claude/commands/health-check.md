---
name: "Health Check Dashboard"
description: "Run a comprehensive codebase health check — tests, linting, coverage, complexity, and dependency audit. Compare with previous runs to detect regressions."
category: Workflow
tags: [workflow, health, quality, dashboard]
---

Run a full health check for **specrails-web**: detect available tools, execute each quality check, compare results against the previous run, detect regressions, compute a health grade, and store a snapshot for future comparison.

**Input:** $ARGUMENTS — optional flags:
- `--since <date>` — use the report from this date as baseline
- `--only <checks>` — comma-separated subset: `tests`, `coverage`, `lint`, `complexity`, `deps`, `perf`
- `--save` — always save the snapshot even for partial runs

---

## Phase 0: Argument Parsing

Parse `$ARGUMENTS` to set `COMPARE_DATE`, `CHECKS_FILTER`, and `SAVE_SNAPSHOT`.

---

## Phase 1: Toolchain Detection

Detect available tools for each check category:

- **tests:** Vitest (`npx vitest run`)
- **coverage:** c8 (if available) or Vitest coverage
- **lint:** ESLint (`npx eslint .`)
- **complexity:** lizard or estimated from lint output
- **deps:** `npm audit`
- **perf:** custom script if present

---

## Phase 2: Load Previous Report

Read `.claude/health-history/` for comparison baseline.

---

## Phase 3: Run Checks

Run checks sequentially: tests, coverage, lint, complexity, deps, perf.

---

## Phase 4: Build Health Report

Compute per-metric deltas, detect regressions, assign health grade (A-F).

---

## Phase 5: Display Report and Store Snapshot

Render the health report and optionally store to `.claude/health-history/`.
