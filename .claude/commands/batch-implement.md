# Batch Implementation Orchestrator

Macro-orchestrator above `/implement`. Accepts a set of feature references, computes a dependency-aware wave execution plan, invokes `/implement` per wave, and produces a batch-level progress dashboard and final report. All per-feature pipeline work (architect, developer, reviewer, git, CI) is fully delegated to `/implement`.

**MANDATORY: Always follow this pipeline exactly as written. NEVER skip, shortcut, or "optimize away" any phase — even if the batch seems small enough to handle directly. The orchestrator MUST compute waves, confirm with the user, and invoke `/implement` per wave as specified. Do NOT implement any feature yourself in the main conversation. No exceptions.**

**Input:** $ARGUMENTS — one or more feature references with optional flags:

- **Feature refs**: `#85 #71 #63` (GitHub issue numbers) — required, at least two
- **`--deps "<spec>"`**: inline dependency spec, e.g. `"#71 -> #85, #63 -> #85"` (meaning #71 and #63 must complete before #85)
- **`--concurrency N`**: max features running in parallel across waves (default: 3)
- **`--wave-size N`**: max features per wave regardless of concurrency (default: unlimited)
- **`--dry-run` / `--preview`**: passed through to each `/implement` invocation; no git or backlog operations will run

**IMPORTANT:** Before running, ensure Read/Write/Bash/Glob/Grep permissions are set to "allow" — background agents cannot request permissions interactively.

---

## Phase 0: Parse Input

### Step 1: Extract feature refs

Scan `$ARGUMENTS` for issue references (e.g. `#85`, `#71`). If fewer than 2 refs are found, stop and print:

```
[batch-implement] Error: at least 2 feature refs are required. For a single feature, use /implement directly.
```

### Step 2: Extract flags

- `--dry-run` / `--preview`: set `DRY_RUN=true`, forward to every `/implement` call
- `--deps "<spec>"`: capture dependency spec
- `--concurrency N`: set max parallelism (default: 3)
- `--wave-size N`: set max per-wave (default: unlimited)

### Step 3: Fetch issue titles

```bash
gh issue view {number} --json number,title
```

---

## Phase 1: Wave Planning

1. Parse dependency graph from `--deps` spec
2. Detect circular dependencies (stop if found)
3. Compute waves via Kahn's algorithm
4. Print execution plan and ask for confirmation

---

## Phase 2: Wave Execution Loop

Execute waves sequentially. Within each wave, invoke `/implement` for features in parallel (up to `CONCURRENCY`).

Print a progress dashboard before each wave. Apply failure isolation: a failed feature blocks only its transitive dependents.

---

## Phase 3: Batch Report

Print final summary with per-feature results, merge conflicts, and next steps.

---

## Error Handling

- If an `/implement` invocation fails: record failure, apply failure isolation, continue remaining waves
- Never block the entire batch on a single feature failure. Always produce a final report.
