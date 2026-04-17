# Getting Started with Claude Code

Get specrails running in your project in under 5 minutes.

> Want the visual option? [Install Hub](/docs/hub-installation) to run the pipeline from a desktop app instead of the terminal.

## What is specrails?

specrails installs a **product-driven development workflow** into any repository. It gives Claude Code a team of **14 specialised AI agents** — architect, developers, layer reviewers, a reviewer, a product manager — that work together to go from idea to shipped PR automatically.

Think of it as hiring a full engineering team that lives inside your CLI.

## Prerequisites

You need:

- **Git** — your project must be a git repository.
- **[Claude Code](https://claude.ai/claude-code)** — Anthropic's CLI tool.
- **Node.js 18+** — for the installer.

Optional (recommended):

- **[GitHub CLI](https://cli.github.com/)** (`gh`) — for automatic PR creation and issue tracking.

> Using OpenAI Codex instead of Claude Code? See [Getting Started with OpenAI Codex](/docs/codex-getting-started).

## Install

Scaffolds the workflow files directly into your project:

```bash
npx specrails-core@latest init
```

The TUI asks you to pick a tier:

- **Quick** (default) — 8 of 14 agents and the core commands, ready to use immediately. No AI interaction during install.
- **Full** — same as Quick plus `/specrails:enrich` (5-phase deep analysis: stack detection, VPC personas, competitive research). ~5 min.

See [Installation & Setup](/docs/installation) for the full option reference.

## Configure your team

If you chose Quick above and want to deepen the config, run:

```
/specrails:enrich
```

`/specrails:enrich` launches the **interactive TUI installer** — select your agents, choose your model, configure your workflow.

| Step | What happens |
|------|-------------|
| **1. Detect** | Reads your stack, CI config, and conventions automatically |
| **2. Select agents** | TUI checklist — pick which agents to enable for your project |
| **3. Select model** | Choose the Claude or Codex model each agent will use |
| **4. Configure** | Backlog provider, git workflow, PR settings |
| **5. Generate** | Writes `install-config.yaml` and project data files to `.specrails/` |

**In a hurry?** Run `/specrails:enrich --quick` for the fast path: three questions, sensible defaults, done in under a minute.

**Already have an `install-config.yaml`?** Run `/specrails:enrich --from-config` to apply it non-interactively — ideal for team onboarding or CI environments.

## Your first feature

Pick a ticket from your backlog, or describe a feature:

```
/specrails:implement "add a health check endpoint"
```

specrails will:

1. **Architect** analyses the request and designs the implementation.
2. **Developer** writes the code across all layers.
3. **Test Writer** generates tests for the new code.
4. **Doc Sync** updates your changelog and docs.
5. **Security Reviewer** scans for secrets and vulnerabilities.
6. **Reviewer** runs your full CI suite and fixes any issues.
7. Creates a **Pull Request** ready for human review.

That's it. One command, full pipeline.

## Useful commands for newcomers

- `/specrails:why "question"` — search agent explanation records in plain language. Ask why a design decision was made, why a library was chosen, or why a particular pattern is used.
- `/specrails:get-backlog-specs` — see your prioritised backlog with safe implementation ordering.
- `/specrails:compat-check #N` — check whether an issue's implementation would break existing API consumers before you commit to it.

## Want a dashboard?

Install [Hub](/docs/hub-installation) to drive the same pipeline from a desktop app with real-time log streaming, analytics, and a visual spec + rail board. Hub uses the Core you just installed under the hood.

## What's next?

- [Core Concepts](/docs/concepts) — pipeline architecture and product-driven approach.
- [Agents](/docs/agents) — meet each agent and its role.
- [Core vs Hub](/docs/core-vs-hub) — when to use each product.
