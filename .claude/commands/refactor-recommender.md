---
name: "Refactor Recommender"
description: "Scan the codebase for refactoring opportunities ranked by impact/effort ratio. Optionally creates GitHub Issues for tracking."
category: Workflow
tags: [workflow, refactoring, code-quality, tech-debt]
---

Scan the codebase for refactoring opportunities, score each by impact/effort ratio, and optionally create GitHub Issues for the top findings.

**Input:** `$ARGUMENTS` — optional: comma-separated paths to scope the analysis. Flags: `--dry-run` (print findings without creating issues).

---

## Phase 0: Pre-flight

```bash
gh auth status 2>&1
```

Set `GH_AVAILABLE=true/false`. Parse `--dry-run` flag.

---

## Phase 1: Scope

Parse paths from `$ARGUMENTS`. Default: entire repository. Always exclude: `node_modules/`, `.git/`, `.claude/`, `vendor/`, `dist/`, `build/`.

---

## Phase 2: Analysis

Analyze scoped files across six categories:

### Duplicate Code
Find code blocks >10 lines that are substantially similar across files.

### Long Functions
Find functions exceeding 50 lines.

### Large Files
Find files exceeding 300 lines.

### Dead Code
Find unused exports, unreferenced functions, commented-out blocks.

### Outdated Patterns
Find deprecated APIs, `var` instead of `let`/`const`, callbacks instead of async/await.

### Complex Logic
Find deeply nested conditionals (>3 levels) and high cyclomatic complexity.

For each finding, record: file, line_range, current_snippet, proposed_snippet, rationale.

---

## Phase 3: Score and Rank

Score each finding: **Impact** (1-5) and **Effort** (1-5).
Composite score: `impact * 2 + (6 - effort)`. Sort descending.

---

## Phase 4: Create GitHub Issues

Skip if `GH_AVAILABLE=false` or `DRY_RUN=true`.

Create issues for top 5 findings with label `refactor-opportunity`.

---

## Phase 5: Output Summary

Print ranked table with top 3 detailed recommendations including current and proposed code.
