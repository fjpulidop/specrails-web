# Specrails (Desktop) Features

Reference guide to every feature inside Specrails (Desktop).

---

## Two sidebars

The app uses two collapsible sidebars.

**ArcSidebar (left)** — app-level navigation.

- Lists every registered project — click to switch active project.
- **+ Add project** button at the bottom of the project list.
- Bottom section: Docs · Analytics · Settings.
- Hover to expand, pin icon at the top to lock open.

**ProjectRightSidebar (right)** — per-project navigation.

- Dashboard · Jobs · Analytics · Settings for the active project.
- Same hover-to-expand + pin behaviour as the left sidebar.
- Hidden while a project is still in the setup wizard.

---

## Desktop app

The native macOS app (Tauri) bundles the server as a sidecar — launch the app and the server is up. Windows and Linux builds are on the roadmap.

macOS: native traffic lights with a custom drag region replace the standard titlebar; a centred search pill lives where the URL would go.

If you prefer npm, `specrails-desktop start` opens the same UI in the browser at `http://127.0.0.1:4200`.

---

## Home (per project)

The landing page for the active project. Two panels.

### Specs

A **Spec** is the unit of work and the source of truth: what to build, why it matters to a real user, and acceptance criteria. Specs are stored locally in `.specrails/local-tickets.json` — you never hand-write them, you generate them with specrails and then let the agents build from them.

- **+ Add Spec** — create with a title, description, priority, labels.
- List, Grid (Kanban), and Post-it view modes.
- Real-time sync — changes from CLI agents or file edits appear instantly via WebSocket.
- Click any spec to edit. Drag cards in Grid view to change status.
- Spec-generation state persists across page refreshes via localStorage — in-progress generation is not lost on navigation.

### Rails

Execution lanes. Drag a spec into a Rail and click **Play** to run the pipeline against that spec.

Phases: **Architect → Developer → Reviewer → Ship**. Each phase spawns a dedicated Claude Code agent in your project directory, all working from the same spec as their source of truth.

Rails give you parallelism: each Rail runs independently inside its own git worktree, so two features implement side by side without touching each other's files.

---

## Jobs (per project)

Every pipeline run. Filterable by status (queued / running / completed / failed).

- Real-time log streaming — output appears as Claude writes it.
- Cost tracking — tokens + USD per job, per agent, per phase.
- Duration, exit code, timestamps.
- Click any job to open the detail view with the full log, pipeline progress, and a Re-execute button.

---

## Analytics (per project)

Per-project dashboard:

- **KPI cards** — total jobs, success rate, average duration, total cost.
- **Jobs over time** — daily/weekly bar chart.
- **Cost breakdown** — tokens and USD per feature, per agent, per phase.
- **Success-rate trend** — line chart over time.
- **Agent performance** — which agents produce the best results and at what cost.

All data stays local in SQLite. Nothing leaves your machine.

---

## Desktop Analytics

Cross-project roll-up. Same shape as the per-project analytics page but aggregates every project Specrails (Desktop) manages.

---

## Activity feed

Live stream of everything happening across Specrails (Desktop):

- Job starts, completions, failures.
- Pipeline phase transitions.
- Ticket created / updated / deleted.
- Command executions.

Filter by project, event type, or time range.

---

## Command launcher

Run specrails commands from the dashboard instead of opening a terminal:

- `implement` — the full implementation pipeline.
- `batch-implement` — multiple features in parallel.
- `get-backlog-specs` — view and prioritise the backlog.
- `auto-propose-backlog-specs` — AI product discovery.

Jobs queue and execute sequentially per project. Monitor progress on the Jobs page.

---

## Keyboard shortcuts

Full keyboard navigation across the app.

| Shortcut | Action |
|----------|--------|
| `⌘K` | Command palette |
| `⌘1`–`⌘5` | Switch between main views |
| `⌘P` | Switch project |
| `⌘L` | Focus log search |
| `⌘N` | Create ticket |
| `Esc` | Close modal / back |

The command palette (`⌘K`) is the fastest path to every action — navigate, create, search, execute.

---

## Data layout

```
~/.specrails/
  desktop.sqlite              # project registry
  manager.pid                 # server PID
  desktop.token               # Bearer token used by the CLI
  projects/<slug>/jobs.sqlite # per-project jobs + events
```

> Upgrading from a pre-rebrand install? The old `hub.sqlite` / `hub.token` files are migrated to the new names automatically on first start.

Per-project state stays in your repo:

```
.specrails/
  local-tickets.json          # specs
  backlog-config.json         # optional issue-tracker config
```

---

## Authentication

Specrails (Desktop) generates a Bearer token at `~/.specrails/desktop.token` on first start. Every `/api/*` request requires it. The CLI reads the token automatically — nothing to configure.

---

## Next steps

- [Install Hub](/docs/hub-installation)
- [Core vs Hub](/docs/core-vs-hub)
- [Install specrails-core](/docs/installation) — terminal-first alternative
