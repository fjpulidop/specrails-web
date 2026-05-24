# Install specrails-core

The CLI half of specrails. If you want the desktop app, see [Install Hub](/docs/hub-installation).

## Prerequisites

specrails works with either Claude Code **or** the OpenAI Codex CLI — pick whichever you have. Both are supported.

| Tool | Required | Why |
|------|----------|-----|
| **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** | One of these | Anthropic model runtime |
| **[Codex CLI](https://developers.openai.com/codex)** (≥ 0.128.0) | One of these | OpenAI model runtime. Authenticate with `codex login` or set `OPENAI_API_KEY`. |
| **Git** | Yes | specrails operates on git repositories |
| **Node.js 18+** | Yes | Needed for the `npx` installer |
| **GitHub CLI** (`gh`) | Optional | Auto-create PRs, manage issues |
| **JIRA CLI** (`jira`) | Optional | Backlog sync to JIRA — skip if you use local tickets (the default) |

## Install

```bash
npx specrails-core@latest init
```

Run it from inside your project directory. The installer:

1. Checks prerequisites (Git, Claude Code or Codex) and offers to install missing ones.
2. Launches an interactive TUI.
3. Copies `.claude/agents/`, `.claude/commands/specrails/`, `.claude/commands/opsx/` and `.specrails/` into your repo.

### Tier selection

| Tier | What you get | Time |
|------|--------------|------|
| **Quick** (default) | 8 of 14 agents + all workflow commands + local tickets. No AI interaction during install. | ~30 s |
| **Full** | Quick + `/specrails:enrich` runs automatically — stack detection, VPC personas, competitive research. | ~5 min |

Run Quick if you want to kick the tyres; upgrade to Full later by running:

```bash
/specrails:enrich
```

## What gets installed

Everything lands in your repo — nothing phones home, nothing auto-updates:

```
.claude/
  agents/                          # 14 specialised agents (Claude / Codex)
  commands/specrails/              # 17 workflow commands (/specrails:*)
  commands/opsx/                   # OpenSpec skills (/opsx:*)
  security-exemptions.yaml         # security-scanner config

.specrails/
  config.yaml                      # stack, CI commands, git workflow
  personas/*.md                    # VPC user profiles
  rules/*.md                       # per-layer coding conventions
  agent-memory/                    # persistent knowledge across sessions
  pipeline/                        # in-flight feature state
  local-tickets.json               # built-in ticket storage
```

All of this is yours to edit and commit.

## Updating

Re-run the installer. It refreshes agents and commands without touching your `.specrails/` data:

```bash
npx specrails-core@latest init
```

## First commands

From inside your repo, in Claude Code:

```
/specrails:enrich                         # re-run wizard to tune agents/model
/specrails:get-backlog-specs              # show the prioritised backlog
/specrails:implement "add dark mode"      # full pipeline from a description
/specrails:implement #42                  # from a ticket ID
/specrails:why "why did we pick X?"       # search agent explanation records
```

## Using Codex instead of Claude

Same install path. The TUI detects Codex and adjusts agent configuration:

```bash
npx specrails-core@latest init --root-dir .
```

See [Getting Started with OpenAI Codex](/docs/codex-getting-started) for provider-specific notes.

## Uninstall

Delete the two directories the installer created:

```bash
rm -rf .claude/ .specrails/
```

Your code is untouched — these directories are the entirety of specrails' footprint.

## Next steps

- [Getting Started with Claude Code](/docs/claude-getting-started) — your first pipeline run.
- [Core Concepts](/docs/concepts) — how the pipeline thinks.
- [Install Hub](/docs/hub-installation) — desktop app that drives the same pipeline visually.
