# Agents

SpecRails ships with **10 specialized agents**. Each has a clear role, a dedicated AI model, and knows exactly when to stay in its lane.

## Why specialized agents?

A single "do everything" prompt gets mediocre results. By splitting responsibilities, each agent:

- Has a **focused system prompt** optimized for its task
- Uses the **right model** for the job (Opus for creative work, Sonnet for implementation, Haiku for analysis)
- Maintains **its own memory** across sessions
- Loads only the **relevant conventions** for its scope

The result: better quality at every stage, with clear accountability.

## Agent roster

### Product Manager

| | |
|-|-|
| **Color** | Blue |
| **Model** | Opus (creative reasoning) |
| **Trigger** | `/opsx:explore`, `/update-product-driven-backlog` |
| **Role** | Feature ideation and product strategy |

The Product Manager is the **starting point** of the pipeline. It researches your competitive landscape (via web search), evaluates ideas against your user personas using the VPC framework, and produces prioritized feature recommendations.

**Why Opus?** Product thinking requires creative reasoning and nuanced judgment — weighing user needs, market trends, and technical feasibility simultaneously. Opus excels at this kind of open-ended analysis.

**What it produces:**
- Feature ideas organized by area
- VPC scores per persona (0–5)
- Effort estimates
- Competitive inspiration sources

---

### Product Analyst

| | |
|-|-|
| **Color** | Cyan |
| **Model** | Haiku (fast, read-only) |
| **Trigger** | `/product-backlog` |
| **Role** | Backlog analysis and reporting |

The Product Analyst is a **read-only** agent. It reads your backlog, specs, and archived changes to produce structured reports. It never writes code or makes decisions — it just gives you the data.

**Why Haiku?** Analysis tasks need speed, not deep reasoning. Haiku is fast and cheap, perfect for reading and summarizing large amounts of data.

**What it produces:**
- Prioritized backlog tables grouped by area
- Top 3 recommendations ranked by VPC score / effort ratio
- Spec gap analysis (what's specified vs. what's implemented)

---

### Architect

| | |
|-|-|
| **Color** | Green |
| **Model** | Sonnet |
| **Trigger** | `/opsx:ff`, `/opsx:continue`, `/implement` (Phase 3a) |
| **Role** | System design and task breakdown |

The Architect translates **what to build** into **how to build it**. It reads the relevant specs, analyzes the codebase, and produces a detailed implementation design with ordered tasks.

**Why it matters:** Without architecture, developers write code that works locally but breaks the system. The Architect considers cross-cutting concerns, API contracts, data flows, and migration needs before a single line of code is written.

**What it produces:**
- Change summary and impact analysis
- Implementation design (technical approach per layer)
- Ordered task breakdown with dependencies
- Risks and considerations

---

### Developer

| | |
|-|-|
| **Color** | Purple |
| **Model** | Sonnet |
| **Trigger** | `/opsx:apply`, `/implement` (Phase 3b) |
| **Role** | Full-stack implementation |

The Developer is the **workhorse**. It reads the Architect's design, loads the relevant layer conventions, and writes production-quality code across all layers. It follows a strict process: understand, plan, implement, verify.

**What it produces:**
- Production code across all affected layers
- Follows existing patterns and conventions
- Runs CI-equivalent checks before declaring "done"

---

### Backend Developer & Frontend Developer

| | |
|-|-|
| **Colors** | Purple (backend), Blue (frontend) |
| **Model** | Sonnet |
| **Trigger** | `/implement` with parallel pipeline |
| **Role** | Layer-specific implementation |

For large full-stack features, SpecRails can split work between **Backend Developer** and **Frontend Developer** running in **parallel git worktrees**. Each has a lighter prompt focused on their stack and runs only the relevant CI checks.

**Why split?** A backend API and a React component have nothing in common. Splitting them lets each developer focus on their domain, and the work happens concurrently instead of sequentially.

---

### Test Writer

| | |
|-|-|
| **Color** | Cyan |
| **Model** | Sonnet |
| **Trigger** | `/implement` (Phase 3c) |
| **Role** | Automated test generation |

After the Developer finishes, the Test Writer generates comprehensive tests for the new code. It auto-detects your test framework, reads 3 existing tests to learn your patterns, and targets >80% coverage of new code.

**Why a separate agent?** Developers writing their own tests tend to test what they built, not what could break. A separate Test Writer approaches the code fresh, testing edge cases and failure modes the developer might miss.

**What it produces:**
- Test files following your project's conventions
- Coverage targeting >80% of new code
- Never modifies implementation files

**Supported frameworks:** Jest, Vitest, Mocha, pytest, RSpec, Go test, cargo test, PHPUnit

---

### Doc Sync

| | |
|-|-|
| **Color** | Yellow |
| **Model** | Sonnet |
| **Trigger** | `/implement` (Phase 3d) |
| **Role** | Keep documentation in sync with code |

Doc Sync detects and updates your project's documentation after implementation:

- **Changelog** — adds entries in Keep-a-Changelog format
- **README** — updates feature lists, usage sections, API references
- **API docs** — updates docs in `docs/` or `docs/api/`

**Why automate docs?** Because nobody updates them manually. Docs drift from code within days. By running Doc Sync in the pipeline, documentation stays accurate by default.

---

### Security Reviewer

| | |
|-|-|
| **Color** | Orange |
| **Model** | Sonnet |
| **Trigger** | `/implement` (Phase 4) |
| **Role** | Security audit |

The Security Reviewer scans new code for:

- **Secrets** — AWS keys, API tokens, database URLs, private keys, hardcoded passwords
- **OWASP vulnerabilities** — SQL injection, XSS, insecure deserialization, command injection, path traversal

Findings are graded by severity (Critical → High → Medium → Info). Critical findings **block the pipeline**.

**Important:** This agent scans and reports only — it never fixes code. Fixes are the Developer's responsibility, triggered by the Reviewer if issues are found.

You can suppress known false positives via `.claude/security-exemptions.yaml`.

---

### Reviewer

| | |
|-|-|
| **Color** | Red |
| **Model** | Sonnet |
| **Trigger** | `/implement` (Phase 4b), after all developers complete |
| **Role** | Final quality gate |

The Reviewer is the **last agent before ship**. It:

1. Runs **every CI check** in the exact order your CI pipeline runs them
2. **Fixes failures** autonomously (up to 3 retry cycles per issue)
3. Reviews **code quality**, test quality, and consistency
4. Produces a final report

**Why not just run CI?** Because the Reviewer can _fix_ what it finds. A lint error, a missing import, a flaky test setup — the Reviewer patches them and re-runs. By the time it creates the PR, CI will pass.

**What it produces:**
- CI check results table (pass/fail per check)
- List of issues found and fixed
- Files modified during fixes

---

## Agent memory

Every agent stores observations in `.claude/agent-memory/<agent>/MEMORY.md`. This memory persists across sessions, so agents get smarter over time:

```
.claude/agent-memory/
├── architect/MEMORY.md
├── developer/MEMORY.md
├── reviewer/MEMORY.md
└── ...
```

Memory is automatic — you don't need to manage it. Agents read relevant memories at the start of each task and write new observations as they work.

## What's next?

See how agents work together in the pipeline:

- [Workflows & Commands](workflows.md) — the commands that orchestrate agent collaboration
- [Customization](customization.md) — tweak agent prompts, add new agents

---

[← Core Concepts](concepts.md) · [Workflows & Commands →](workflows.md)
