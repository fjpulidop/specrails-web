# Core vs Hub

specrails is two products that work better together. Here's how they compare and when to use each.

## Overview

**specrails-core** is the **engine** — a system of 14 specialized AI agents that transforms Claude Code (or OpenAI Codex) into a complete development team. It runs in your terminal, inside your repo.

**specrails-hub** is the **control center** — a local dashboard for managing multiple specrails-core projects, visualizing pipeline progress, tracking tickets, and monitoring analytics.

## Feature Comparison

| Capability | Core | Hub |
|---|---|---|
| AI agent pipeline | 14 agents (architect → developer → reviewer → ship) | — |
| Spec-driven development | OpenSpec workflow | Specs board visualization |
| Parallel execution | Isolated git worktrees | Job queue management |
| Institutional memory | Per-agent persistent memory | — |
| Confidence scoring | Configurable quality gates | Analytics dashboard |
| Security scanning | Built-in credential + OWASP scan | — |
| Multi-project management | — | Manage all projects from one interface |
| Pipeline visualization | — | Real-time phase indicators |
| Ticket management | — | List, Kanban, and Post-it views |
| Analytics & cost tracking | — | KPIs, charts, cost per feature |
| Streaming logs | Terminal output | Browser-based log viewer with search |
| Command execution | CLI commands | GUI command launcher |
| Chat interface | — | Per-project chat |
| Keyboard shortcuts | — | Full keyboard nav + Cmd+K palette |

## When to Use Each

### Core Only

Use specrails-core alone when you:

- Work on a **single project**
- Prefer a **terminal-first** workflow
- Want the AI pipeline without any dashboard overhead
- Are getting started and want the **simplest setup**

### Hub Only

specrails-hub requires at least one project with specrails-core installed. It doesn't run agents — it provides the UI layer on top.

### Core + Hub (Recommended)

Use both when you:

- Manage **multiple projects** with specrails
- Want to **visualize** pipeline progress in real time
- Need **ticket management** for tracking features
- Want **analytics** on agent performance and costs
- Prefer a **browser-based** interface alongside CLI

## How They Work Together

```
You ──→ specrails-hub (dashboard) ──→ specrails-core (per project)
              │                              │
              ├─ Visualize pipeline           ├─ Run AI agents
              ├─ Manage tickets               ├─ Write code
              ├─ Track analytics              ├─ Review & test
              └─ Stream logs                  └─ Ship PRs
```

1. **Core implements, Hub visualizes** — Core's agents do the work; Hub shows you what's happening
2. **Core learns, Hub reports** — Core accumulates institutional memory; Hub surfaces insights in analytics
3. **Core ships PRs, Hub tracks progress** — Core creates branches and PRs; Hub tracks every feature from idea to merge
4. **Core runs agents, Hub streams logs** — Core orchestrates agents; Hub streams their output in real time

## Installation

### Install Core

```bash
npx specrails-core@latest init
```

### Install Hub

```bash
npm install -g specrails-hub
specrails-hub start
specrails-hub add /path/to/your/project
```

## Next Steps

- [Getting Started with Core](/docs/claude-getting-started) — Set up specrails-core
- [Hub Installation](/docs/hub-installation) — Set up specrails-hub
- [Hub Features](/docs/hub-features) — Deep dive into hub capabilities
