# Getting Started with Claude Code

Get SpecRails running in your project in under 5 minutes.

## What is SpecRails?

SpecRails installs a **product-driven development workflow** into any repository. It gives Claude Code a team of **12 specialized AI agents** — an architect, developers, layer reviewers, a reviewer, a product manager — that work together to go from idea to shipped PR automatically.

Think of it as hiring a full engineering team that lives inside your CLI.

## Prerequisites

You need:

- **Git** — your project must be a git repository
- **[Claude Code](https://claude.ai/claude-code)** — Anthropic's CLI tool

Optional (recommended):

- **[GitHub CLI](https://cli.github.com/)** (`gh`) — for automatic PR creation and issue tracking

> **Using OpenAI Codex instead of Claude Code?** See [Getting Started with OpenAI Codex](/docs/codex-getting-started) for Codex-specific setup.

## Install

### Option 1 — Claude Code Plugin (recommended)

No Node.js required. Installs directly through Claude Code:

```bash
claude plugin install specrails
```

### Option 2 — npx (for Codex users or offline control)

Scaffolds the workflow files directly into your project:

```bash
npx specrails-core@latest init --root-dir <your-project>
```

See [Installation & Setup](/docs/installation) for full details on both methods and when to use each.

## Installation Tiers

### Quick Install (default)

The TUI installer walks you through agent selection and model configuration. When you choose **Quick** tier, agents are placed directly — no AI interaction required:

1. **Select agents** — pick from 14 specialized agents
2. **Choose model preset** — balanced (recommended), budget, or max
3. **Quick context** — product description and target users

Agents, commands, rules, and settings are installed immediately. Open Claude Code and start working.

> Quick install excludes VPC personas and persona-dependent artifacts (sr-product-manager, sr-product-analyst). These require the full enrichment process.

### Full Install (via `/specrails:enrich`)

For deeper customization, choose **Full** tier or run `/specrails:enrich` after a Quick install:

```
/specrails:enrich
```

The full wizard analyzes your codebase, researches competitors, and generates adapted agents:

| Phase | What happens |
|-------|-------------|
| **1. Analyze** | Detects your tech stack, architecture, CI commands, and conventions |
| **2. Personas** | Researches competitive landscape and generates VPC user personas |
| **3. Configure** | Backlog provider, git workflow, and agent settings |
| **4. Generate** | Writes project-specific context to all agents and commands |
| **5. Cleanup** | Removes wizard scaffolding, leaving only your tailored files |

Full install adds VPC personas, sr-product-manager, sr-product-analyst, and persona-dependent commands (`/specrails:auto-propose-backlog-specs`, `/specrails:get-backlog-specs`).

**Already have an `install-config.yaml`?** Run `/specrails:enrich --from-config` to apply it non-interactively — ideal for team onboarding.

After either tier, your `/specrails:*` commands are live.

## Your first feature

Let's implement something. Pick an issue from your backlog, or describe a feature:

```
/specrails:implement "add a health check endpoint"
```

SpecRails will:

1. **Architect** analyzes the request and designs the implementation
2. **Developer** writes the code across all layers
3. **Test Writer** generates tests for the new code
4. **Doc Sync** updates your changelog and docs
5. **Security Reviewer** scans for secrets and vulnerabilities
6. **Reviewer** runs your full CI suite and fixes any issues
7. Creates a **Pull Request** ready for human review

That's it. One command, full pipeline.

## Useful commands for newcomers

Once you have a feature running, a few commands help you understand what's happening and why:

- `/specrails:why "question"` — search agent explanation records in plain language. Ask why a design decision was made, why a library was chosen, or why a particular pattern is used. Agents record their reasoning as they work.
- `/specrails:get-backlog-specs` — see your prioritized backlog with safe implementation ordering. Good first stop before picking what to build next.
- `/specrails:compat-check #N` — check whether an issue's implementation would break existing API consumers before you commit to it.

## What's next?

Now that you're running, learn how the system thinks:

- [Core Concepts](/docs/concepts) — understand the pipeline architecture and product-driven approach
- [Agents](/docs/agents) — meet each agent and understand their role
