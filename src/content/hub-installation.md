# Install specrails-hub

specrails-hub is a local desktop app for running and visualising AI development pipelines. Ships as a signed macOS `.dmg` today; Windows and Linux builds are in the roadmap.

> Want the CLI-only workflow instead? Head to [Install specrails-core](/docs/installation).

---

## Option 1 — Download the macOS app (recommended)

The fastest path. One signed `.dmg`, no Node required.

[**↓ Download for Mac (Apple Silicon)**](https://specrails.dev/#hero) — the homepage "Download for Mac" button resolves the newest build from the public release channel automatically.

1. Open the `.dmg`.
2. Drag **specrails-hub** into `/Applications`.
3. Launch the app. The hub server starts as a bundled sidecar — no extra terminal needed.

macOS Gatekeeper may ask for confirmation the first time. The app is notarised by Apple; if you see a warning, right-click → **Open**.

> Apple Silicon build only today. Intel Mac, Windows and Linux builds are on the roadmap.

---

## Option 2 — Install via npm (cross-platform)

If you're on Linux, Intel Mac, or prefer to run the hub as a plain CLI, install from npm:

```bash
npm install -g specrails-hub
specrails-hub start
```

Opens the dashboard at `http://127.0.0.1:4200`.

> Requires Node.js 18+ and at least one project with [specrails-core](/docs/installation) installed.

---

## Add your first project

Once the app is running:

1. Click **+** in the sidebar.
2. Paste the absolute path to your repo (e.g. `/Users/you/code/my-app`).
3. Click **Add**.

If specrails-core is not yet installed in that repo, a setup wizard appears and runs `npx specrails-core@latest init` for you.

From the CLI:

```bash
specrails-hub add /path/to/your/project
specrails-hub list
```

---

## Dashboard at a glance

```
┌──────────┬─────────────────────────────────────────────────────┐
│          │  ProjectNavbar: Home · Jobs · Analytics · Settings  │
│ Sidebar  │                                                     │
│          │  Page content (Dashboard / Jobs / Analytics / ...)  │
│ Projects │                                                     │
│ ──────── │                                                     │
│ Docs     │                                                     │
│ Analytics│                                                     │
│ Settings │                                                     │
└──────────┴─────────────────────────────────────────────────────┘
```

- **Sidebar** — hover to expand, pin to lock open. Lists all registered projects.
- **ProjectNavbar** — Home, Jobs, Analytics, Settings for the active project.
- **Home** — Specs panel (local tickets) and Rails (execution lanes).
- **Jobs** — every pipeline run, with real-time log streaming.

---

## Run your first pipeline

1. On **Home**, click **+ Add Spec** to create a spec.
2. Drag the spec into a Rail.
3. Hit **Play** on the Rail.

You'll see the pipeline phases (Architect → Developer → Reviewer → Ship) animate as each agent runs. Click the rail's **Logs** icon to open the job page and watch output stream in.

---

## CLI quick reference

```bash
specrails-hub start                              # Start the hub server
specrails-hub add <path>                         # Register a project
specrails-hub list                               # List registered projects
specrails-hub remove <project-id>                # Unregister a project
specrails-hub implement "#42"                    # Queue an implement job (cwd project)
specrails-hub --project my-app implement "#42"   # Target a project by name
```

---

## Data layout

Everything local, nothing phones home:

```
~/.specrails/
  hub.sqlite                  # project registry
  manager.pid                 # server PID
  hub.token                   # Bearer token used by the CLI
  projects/<slug>/jobs.sqlite # per-project jobs + events
```

Project-scoped state lives inside each repo:

```
your-project/
  .specrails/
    local-tickets.json        # specs
    changes/                  # OpenSpec change artefacts
    backlog-config.json       # optional issue-tracker config
```

---

## Next steps

- [Hub Features](/docs/hub-features) — deep dive into every capability
- [Core vs Hub](/docs/core-vs-hub) — when to use each product
- [Install specrails-core](/docs/installation) — the terminal-first CLI
