# Getting Started with specrails-hub (OpenAI Codex)

Set up specrails-hub with OpenAI Codex to manage multiple specrails-core projects from a single dashboard.

---

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org) |
| **npm** | 9+ | Bundled with Node.js |
| **OpenAI Codex CLI** | latest | Install with `npm install -g @openai/codex` |
| **OpenAI API key** | — | Set `OPENAI_API_KEY` in your environment |
| **specrails-core** | installed | At least one project with specrails-core configured |

---

## Step 1 — Install specrails-hub

```bash
npm install -g specrails-hub
```

---

## Step 2 — Start the hub

```bash
specrails-hub start
```

The hub launches a local server at `http://localhost:4200`.

---

## Step 3 — Register your first project

```bash
specrails-hub add /path/to/your/specrails-core-project
```

You can register as many projects as you want. Each project appears as a tab in the dashboard.

---

## Step 4 — Open the dashboard

```bash
open http://localhost:4200
```

You will see your project dashboard with:

- **Discovery** — propose specs, auto-propose, auto-select
- **Delivery** — implement tasks, batch implement
- **Recent Jobs** — history of all agent runs with cost and token tracking

---

## Step 5 — Run your first task from the Hub

From the dashboard, click **Implement →** and select a spec or enter a task description. The Hub dispatches the work to Codex agents running specrails-core in your project.

Alternatively, use Codex directly in your project:

```
> /sr:implement "add user avatar upload"
```

The Hub tracks the job in real-time — you can monitor progress, costs, and results from the dashboard.

---

## Claude Code and Codex are interchangeable

The Hub works identically with both CLIs. specrails-core is CLI-agnostic — the same installation, configuration, and specs work with either Claude Code or OpenAI Codex. You can even switch between CLIs for different projects registered in the same Hub.

---

## Next steps

| What to explore | Where to go |
|-----------------|-------------|
| Full feature reference | [Features](hub-features.md) |
| Dashboard workflows | [Workflows](hub-workflows.md) |
| OpenSpec lifecycle | [OpenSpec Workflow](hub-openspec-workflow.md) |
| Hub configuration | [Configuration](hub-configuration.md) |
| API endpoints | [API Reference](hub-api-reference.md) |

---

*Something not working? Run `npx specrails-core doctor` in your project directory, or open an issue at [github.com/fjpulidop/specrails-core/issues](https://github.com/fjpulidop/specrails-core/issues).*
