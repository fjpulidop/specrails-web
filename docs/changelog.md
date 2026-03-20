# Changelog

All notable changes to SpecRails are listed here, newest first.

---

## [1.4.0](https://github.com/fjpulidop/specrails-core/compare/v1.3.0...v1.4.0) — 2026-03-20

### New commands

- **`/sr:vpc-drift`** — Detects when your VPC personas have drifted from what your product actually delivers. Compares persona Jobs/Pains/Gains against the backlog and agent memory; produces per-persona alignment scores and concrete update recommendations.
- **`/sr:memory-inspect`** — Inspect and manage agent memory directories. Shows per-agent stats, recent entries, and stale file detection with optional pruning.

---

## [1.3.0](https://github.com/fjpulidop/specrails-core/compare/v1.2.0...v1.3.0) — 2026-03-20

### New commands

- **`/sr:retry`** — Smart failure recovery. Resumes a failed `/sr:implement` pipeline from the last successful phase without restarting from scratch. Reads saved pipeline state to identify what completed, then re-executes only the remaining phases.

### Agents

- **Agent personality customization** — Edit agent prompts after installation to tune tone, priorities, and decision-making for your team's style. See [Customization](customization.md).

---

## [1.2.0](https://github.com/fjpulidop/specrails-core/compare/v1.1.0...v1.2.0) — 2026-03-20

### Improvements

- **`/sr:health-check` extended with static code analysis** — Now includes complexity metrics, dead code detection, and architectural pattern analysis in addition to test coverage and dependency health.

---

## [1.1.0](https://github.com/fjpulidop/specrails-core/compare/v1.0.1...v1.1.0) — 2026-03-20

### Agents

- **Doc Sync agent enhanced** — Added drift detection with severity levels. The agent now classifies documentation drift as `critical`, `major`, or `minor` and prioritizes accordingly.
- **Test Writer wired into `/setup`** — New installations now include the Test Writer agent by default.
- **Security Reviewer wired into `/setup`** — New installations now include the Security Reviewer agent by default.

### Onboarding

- **Onboarding v1 (RFC-001)** — Formalized the setup wizard flow and agent installation sequence.

---

## [1.0.1](https://github.com/fjpulidop/specrails-core/compare/v1.0.0...v1.0.1) — 2026-03-19

### Bug fixes

- Updated README and CLAUDE.md for the `specrails-core` rename.

---

## [1.0.0](https://github.com/fjpulidop/specrails-core/releases/tag/v1.0.0) — 2026-03-19

Initial stable release.

### ⚠ Breaking changes

All commands renamed from `/<name>` to `/sr:<name>`. All agent files renamed from `<name>.md` to `sr-<name>.md`. Existing installations are auto-migrated by `update.sh`.

### What shipped in 1.0

**12 specialized agents**
- Product Manager, Architect, Developer, Backend Developer, Frontend Developer
- Test Writer, Reviewer, Backend Reviewer, Frontend Reviewer
- Security Reviewer, Doc Sync, Product Analyst

**11 commands**
- `/sr:implement` — full 8-phase pipeline (architecture → code → tests → docs → review → PR)
- `/sr:batch-implement` — parallel multi-feature orchestrator using git worktrees
- `/sr:health-check` — codebase quality dashboard with regression detection
- `/sr:compat-check` — backwards compatibility analyzer and migration guide generator
- `/sr:product-backlog` — VPC-scored backlog view with safe implementation ordering
- `/sr:update-product-driven-backlog` — AI-powered product discovery via personas
- `/sr:refactor-recommender` — tech debt scanner ranked by impact/effort
- `/sr:why` — semantic search over agent decision records
- `/sr:retry` — smart failure recovery (added in 1.3)
- `/sr:vpc-drift` — persona drift detection (added in 1.4)
- `/sr:propose-spec` — structured feature proposal generator

**Pipeline Monitor (web-manager)**
- Real-time job queue dashboard
- Live log streaming via WebSocket
- Analytics: daily throughput, status breakdown, job history
- Chat panel for in-context help

**Update system**
- Content-aware selective updates — only changed files are overwritten
- Customizations (agent prompts, personas, layer rules) are preserved across updates
- `update.sh` auto-migrates command namespace changes

**Distribution**
- `npx specrails@latest init`
- `curl | bash` installer
- `--root-dir` flag for monorepo support
- `--yes` flag for non-interactive CI installs

---

[← Updating](updating.md)
