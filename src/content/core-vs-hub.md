# Hub vs Core — which should I use?

**specrails** ships as two products that share the same pipeline. Pick one, or use both.

## TL;DR

- **Hub** — download the macOS app, manage projects visually, see every pipeline run in real time. **Start here if you're new.**
- **Core** — install the CLI in your repo, drive the pipeline from your terminal, zero GUI. **For terminal-first devs.**

You can install Core alone. You can install Hub alone — the Hub's setup wizard runs `npx specrails-core@latest init` for any project that doesn't have Core yet. Everything composes.

---

## Side by side

|  | specrails-desktop | specrails-core |
|---|---|---|
| What you download | `.dmg` (macOS app) or `npm i -g specrails-desktop` | `npx specrails-core@latest init` (per-project) |
| Interface | Desktop app + web dashboard at `localhost:4200` | Claude Code / Codex CLI |
| Best for | Visual overview, multiple projects, non-dev stakeholders | Keyboard-heavy solo devs |
| Manages multiple projects | ✅ Out of the box | ⚠️ One project per repo install |
| Real-time log streaming | ✅ | Through Claude CLI stdout |
| Local ticket board (Specs) | ✅ List / Kanban / Post-it | ✅ JSON file + slash commands |
| Pipeline visualisation | ✅ Animated phases | Through log lines |
| Analytics & cost tracking | ✅ Charts + KPI cards | Raw data in SQLite |
| Keyboard shortcuts | ✅ `⌘K` palette, full nav | CLI-native |
| Platform | macOS today; Windows + Linux coming soon | Any OS with Node 18+ |
| License | MIT | MIT |

---

## How they relate

Hub **uses** Core under the hood. When you click **Play** on a Rail, the hub spawns a Claude Code process running Core's pipeline commands inside your project directory. The agents, rules, personas and config all come from Core.

```
Hub (desktop app)                Core (per-project)
┌──────────────────┐             ┌───────────────────────────┐
│  Sidebar         │   spawns →  │  .claude/agents/          │
│  Specs + Rails   │ ←─ logs ──  │  .claude/commands/        │
│  Jobs · Analytics│             │  .specrails/ (tickets,    │
└──────────────────┘             │    personas, rules,       │
                                 │    agent-memory)          │
                                 └───────────────────────────┘
```

If you only use Core, you still get:
- the 14 agents
- the `/specrails:*` slash commands
- the local-tickets board (through `/specrails:get-backlog-specs`)

If you only use Hub, the Hub auto-bootstraps Core in each project the first time you add it.

---

## Recommended path

1. **Download the Hub** — [Install Hub](/docs/hub-installation).
2. Add your repo as a project. The Hub's setup wizard runs `npx specrails-core@latest init` for you if Core isn't there yet.
3. Click **Play**. Watch the pipeline run.
4. Once comfortable, open a terminal and use Core's commands directly if you prefer keyboard-first.

---

## Next steps

- [Install Hub](/docs/hub-installation)
- [Install specrails-core](/docs/installation)
- [Hub Features](/docs/hub-features)
