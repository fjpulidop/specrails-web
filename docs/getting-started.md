# Getting Started

Get SpecRails running in your project in under 5 minutes.

## What is SpecRails?

SpecRails installs a **product-driven development workflow** into any repository. It gives Claude Code a team of specialized AI agents — an architect, developers, a reviewer, a product manager — that work together to go from idea to shipped PR automatically.

Think of it as hiring a full engineering team that lives inside your CLI.

## Prerequisites

You only need two things:

- **Git** — your project must be a git repository
- **[Claude Code](https://claude.ai/claude-code)** — Anthropic's CLI tool

Optional (recommended):

- **npm** — for installing the Pipeline Monitor dashboard
- **[GitHub CLI](https://cli.github.com/)** (`gh`) — for automatic PR creation and issue tracking

## Install

Run the installer from **your project's root directory**:

```bash
curl -sL https://raw.githubusercontent.com/fjpulidop/specrails/main/install.sh | bash
```

The installer will:

1. Check your prerequisites
2. Copy templates and commands into `.claude/`
3. Initialize OpenSpec (if available)
4. Track the installed version for future updates

> **Note:** Run this from the repo where you want SpecRails — not from the SpecRails source repo itself.

## Run the Setup Wizard

Open Claude Code in your project and run:

```
/setup
```

The wizard walks you through 5 phases:

| Phase | What happens |
|-------|-------------|
| **1. Analyze** | Detects your tech stack, architecture layers, CI commands, and conventions |
| **2. Personas** | Researches your competitive landscape and generates user personas (VPC profiles) |
| **3. Configure** | Asks about your backlog provider, git workflow, and which agents/commands to enable |
| **4. Generate** | Fills all templates with your project-specific context |
| **5. Cleanup** | Removes the wizard and templates, leaving only your tailored workflow files |

After setup, your `.claude/` directory contains fully adapted agents, commands, and rules — ready to use.

## Your first feature

Let's implement something. Pick an issue from your backlog, or describe a feature:

```
/implement "add a health check endpoint"
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

## What's next?

Now that you're running, learn how the system thinks:

- [Core Concepts](concepts.md) — understand the pipeline architecture and product-driven approach
- [Agents](agents.md) — meet each agent and understand their role
- [Workflows & Commands](workflows.md) — master the full command set

---

[← Back to Docs](README.md) · [Core Concepts →](concepts.md)
