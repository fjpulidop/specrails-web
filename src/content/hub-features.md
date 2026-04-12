# Hub Features

A complete guide to every capability in specrails-hub v1.25.0.

## Dashboard

The main dashboard gives you a bird's-eye view of each project:

- **Specs Board** — See all specs (proposals, designs, tasks) for the active project
- **Rails** — Visual representation of your development pipeline phases
- **Pipeline** — Real-time pipeline phase indicator showing which agent is active
- **Jobs** — History of all Claude CLI invocations with status, duration, token usage, and cost

Switch between projects using the **project selector** in the top navigation bar.

## Ticket Management

Three complementary views for managing development work:

### List View
A sortable, filterable table of all tickets. Columns include title, status, priority, labels, and creation date. Supports bulk operations and inline status changes.

### Kanban View
Drag-and-drop board with columns for each status (Backlog, In Progress, Review, Done). Cards show title, priority badge, and labels. Move tickets between columns to update status.

### Post-it View
Freeform sticky-note layout for brainstorming. Create, move, and color-code notes. Ideal for product discovery and early-stage ideation.

All three views share the same underlying data — changes in one view are immediately reflected in the others.

## Analytics & Cost Tracking

The analytics dashboard provides:

- **KPI Cards** — Total jobs, success rate, average duration, total cost
- **Jobs Over Time** — Bar chart showing daily/weekly job counts
- **Cost Breakdown** — Token usage and cost per feature, per agent, per project
- **Success Rate Trends** — Line chart tracking improvement over time
- **Agent Performance** — Which agents produce the best results and at what cost

All data is stored locally in SQLite — nothing leaves your machine.

## Activity Feed

A real-time stream of everything happening across your projects:

- Job starts, completions, and failures
- Pipeline phase transitions
- Ticket status changes
- Command executions

Filter by project, event type, or time range.

## Streaming Logs

Watch agent output in real time as jobs execute:

- **Live streaming** via WebSocket — see output as it's produced
- **Filter** by agent name, log level, or pipeline phase
- **Search** across all log output with full-text search
- **Replay** completed job logs from the job history

## Command Launcher

Execute specrails commands directly from the dashboard:

- `implement` — Run the full implementation pipeline
- `batch-implement` — Process multiple features in parallel
- `get-backlog-specs` — View and prioritize the backlog
- `auto-propose-backlog-specs` — Generate new feature ideas

Jobs are queued and executed sequentially per project. Monitor progress in real time.

## Keyboard-First UX

Full keyboard navigation throughout the dashboard:

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Open command palette |
| `Cmd+1-5` | Switch between main views |
| `Cmd+P` | Switch project |
| `Cmd+L` | Focus log search |
| `Cmd+N` | Create new ticket |
| `Esc` | Close modal / go back |

The command palette (`Cmd+K`) provides access to every action — navigate, create, search, and execute without touching the mouse.

## Next Steps

- [Hub Installation](/docs/hub-installation) — Get specrails-hub running
- [Core vs Hub](/docs/core-vs-hub) — How the two products work together
