# Hub Installation

Get specrails-hub running in under 5 minutes — a local dashboard for managing your AI development pipeline.

## What is specrails-hub?

specrails-hub is a **local dashboard and CLI** for managing multiple specrails-core projects from a single interface. It provides real-time pipeline visualization, ticket management, analytics, streaming logs, and multi-project orchestration.

Think of it as the **control center** for your AI development team.

## Prerequisites

- **Node.js** 18+
- **npm** 9+
- **Claude Code** CLI on your PATH ([install](https://claude.ai/claude-code))
- At least one project with specrails-core installed

## Install

```bash
npm install -g specrails-hub
```

## Quick Start

### 1. Start the hub

```bash
specrails-hub start
```

This starts the Express server and dashboard on `http://localhost:4200`.

### 2. Register a project

```bash
specrails-hub add /path/to/your/project
```

Or use the dashboard's **Add Project** button on first launch.

### 3. Open the dashboard

```bash
open http://localhost:4200
```

You'll see your project dashboard with specs, pipeline status, and job history.

## What you get

Once running, you have access to:

| Feature | Description |
|---------|-------------|
| **Dashboard** | Specs board, pipeline visualization, job history per project |
| **Tickets** | Three views — List, Kanban, and Post-it — for managing development work |
| **Analytics** | KPIs, token usage charts, cost per feature, success rates |
| **Activity Feed** | Real-time log of everything happening across your projects |
| **Chat** | Per-project chat interface for interacting with your codebase |
| **Command Launcher** | Execute specrails commands directly from the browser |

## Multi-Project Management

specrails-hub manages multiple projects simultaneously. Each project gets its own:

- Isolated SQLite database
- Job queue
- Chat history
- Setup state

Switch between projects using the project selector in the top navigation.

## Configuration

The hub stores its data in `~/.specrails/`:

```
~/.specrails/
├── projects/
│   ├── my-app/
│   │   └── jobs.sqlite
│   └── api-server/
│       └── jobs.sqlite
└── hub.json          # Global hub config
```

## Next Steps

- [Hub Features](/docs/hub-features) — Deep dive into every hub capability
- [Core vs Hub](/docs/core-vs-hub) — Understand how the two products complement each other
- [Getting Started with Core](/docs/claude-getting-started) — Set up specrails-core in your project
