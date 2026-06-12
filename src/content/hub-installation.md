# Install specrails-desktop

specrails-desktop is a local desktop app for running and visualising AI development pipelines. Ships as a signed macOS `.dmg` today; Windows and Linux builds are in the roadmap.

> Want the CLI-only workflow instead? Head to [Install specrails-core](/docs/installation).

---

## Option 1 — Download the macOS app (recommended)

The fastest path. One signed `.dmg`, no Node required.

[**↓ Download for Mac (Apple Silicon)**](https://specrails.dev/#hero) — the homepage "Download for Mac" button resolves the newest build from the public release channel automatically.

1. Open the `.dmg`.
2. Drag **Specrails** into `/Applications`.
3. Launch the app. The Specrails server starts as a bundled sidecar — no extra terminal needed.

macOS Gatekeeper may ask for confirmation the first time. The app is notarised by Apple; if you see a warning, right-click → **Open**.

> Apple Silicon build only today. Intel Mac, Windows and Linux builds are on the roadmap.

---

## Option 2 — Install via npm (cross-platform)

If you're on Linux, Intel Mac, or prefer to run the hub as a plain CLI, install from npm:

```bash
npm install -g specrails-desktop
specrails-desktop start
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
specrails-desktop add /path/to/your/project
specrails-desktop list
```

---

## Dashboard at a glance

The app has **two sidebars** — a narrow one on the left for switching between projects, and a right-hand panel for navigating inside the active project.

```
┌────┬─────────────────────────────────────────────────┬──────┐
│    │                                                 │      │
│ A  │                                                 │  R   │
│ R  │                                                 │  I   │
│ C  │             Main content                        │  G   │
│    │             (Dashboard / Jobs / Analytics / …)  │  H   │
│ ●  │                                                 │  T   │
│ ●  │                                                 │      │
│ ●  │                                                 │  Dsh │
│ +  │                                                 │  Job │
│    │                                                 │  Ana │
│ 📄 │                                                 │  Set │
│ ⚙  │                                                 │      │
└────┴─────────────────────────────────────────────────┴──────┘
  ▲                                                       ▲
  │ ArcSidebar (left)                                     │ ProjectRightSidebar (right)
  │ • project switcher (●)                                │ • Dashboard
  │ • + add project                                       │ • Jobs
  │ • Docs · Analytics · Settings                         │ • Analytics
                                                          │ • Settings
```

- **ArcSidebar (left)** — collapsed to a narrow strip by default. Hover to expand and see project names; pin it open with the pin icon at the top. Lists every registered project plus the app-level entries (Docs, Analytics, Settings).
- **ProjectRightSidebar (right)** — page-level nav for the active project. Dashboard (Specs + Rails), Jobs (pipeline runs with live logs), Analytics (per-project KPIs + cost), Settings (project-specific config).
- **Main content** — whichever page the right sidebar points to. Default landing is the Dashboard (Specs panel + Rails).

---

## Install specrails-core inside the project

Before you can run a pipeline, the project needs specrails-core. The hub makes this one click.

1. In the ArcSidebar (left), the project you just added appears with a setup badge.
2. Click it — a setup wizard opens.
3. Pick **Quick Install** — this is the **recommended path**: the default agents + all workflow commands land in `.claude/`, and `.specrails/` is initialised. Zero questions, ~30 s.
4. Wait for the wizard to finish. Your repo's working tree now has `.claude/` + `.specrails/` ready to inspect and commit.

> Feeling adventurous? The wizard also exposes the **Full Install** tier (runs `/specrails:enrich` — stack detection, VPC personas, competitive research) and a custom agent picker. Start with Quick to confirm the pipeline works end to end, then re-run the wizard later to experiment with the extra agents and model presets. See [Install specrails-core](/docs/installation) for the full tier reference.

## Run your first pipeline

1. On **Dashboard**, click **+ Add Spec** to create a spec — give it a title and a short description.
2. Drag the spec card into **Rail 1**.
3. Hit **Play** on the Rail.

You'll see the pipeline phases (Architect → Developer → Reviewer → Ship) animate as each agent runs. Click the rail's **Logs** icon to open the job page and watch output stream in.

---

## CLI quick reference

```bash
specrails-desktop start                              # Start the Specrails server
specrails-desktop add <path>                         # Register a project
specrails-desktop list                               # List registered projects
specrails-desktop remove <project-id>                # Unregister a project
specrails-desktop implement "#42"                    # Queue an implement job (cwd project)
specrails-desktop --project my-app implement "#42"   # Target a project by name
```

---

## Data layout

Everything local, nothing phones home:

```
~/.specrails/
  desktop.sqlite              # project registry
  manager.pid                 # server PID
  desktop.token               # Bearer token used by the CLI
  projects/<slug>/jobs.sqlite # per-project jobs + events
```

Project-scoped state lives inside each repo:

```
your-project/
  .specrails/
    local-tickets.json        # specs
    backlog-config.json       # optional issue-tracker config
```

---

## Next steps

- [Hub Features](/docs/hub-features) — deep dive into every capability
- [Core vs Hub](/docs/core-vs-hub) — when to use each product
- [Install specrails-core](/docs/installation) — the terminal-first CLI
