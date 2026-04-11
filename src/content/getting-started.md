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

## Configure Your Team

Open Claude Code in your project and run:

```
/specrails:enrich
```

`/specrails:enrich` launches the **interactive TUI installer** — select your agents, choose your model, and configure your workflow in a step-by-step terminal UI.

| Step | What happens |
|------|-------------|
| **1. Detect** | Reads your stack, CI config, and conventions automatically |
| **2. Select agents** | TUI checklist — pick which agents to enable for your project |
| **3. Select model** | Choose the Claude or Codex model each agent will use |
| **4. Configure** | Backlog provider, git workflow, and PR settings |
| **5. Generate** | Writes `install-config.yaml` and project data files to `.specrails/` |

**In a hurry?** Run `/specrails:enrich --quick` for the fast path: three questions, sensible defaults, done in under a minute.

| Question | What it configures |
|----------|-------------------|
| What is this project? | Agent context and CLAUDE.md |
| Who are the target users? | Persona stubs for product discovery |
| Git access — read-only or read-write? | Whether agents can commit |

Quick mode installs the four core agents (architect, developer, reviewer, product manager), all workflow commands, and local ticket storage. You can re-run `/specrails:enrich` at any time to change agent selection or model settings.

**Already have an `install-config.yaml`?** Run `/specrails:enrich --from-config` to apply it non-interactively — ideal for team onboarding or CI environments.

After any mode, your project data files are ready to use and your `/specrails:*` commands are live.

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
