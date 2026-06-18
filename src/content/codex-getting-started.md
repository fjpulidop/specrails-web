# Getting Started with OpenAI Codex

specrails works with both Claude Code and **OpenAI Codex**. You can run the full agent pipeline from either CLI, and Specrails (Desktop) lets you pick the provider per project at Add Project time.

This page covers first-time setup for both surfaces:

1. The **core CLI** workflow (run specrails inside Codex directly).
2. The **Specrails (Desktop)** workflow (Add a Codex project from the desktop app).

If you want the deep architecture / adapter pointers, head to the canonical reference at [`specrails-desktop/docs/codex.md`](https://github.com/fjpulidop/specrails-desktop/blob/main/docs/codex.md).

---

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | 20+ | [nodejs.org](https://nodejs.org) |
| **Git** | any | Your project must be a git repo |
| **OpenAI Codex CLI** | ≥ 0.128.0 | `brew install codex` (macOS) · winget / [developers.openai.com/codex](https://developers.openai.com/codex) (Windows / Linux) |
| **Authentication** | — | Run `codex login` (ChatGPT OAuth) **or** set `OPENAI_API_KEY` |
| **specrails-core** | ≥ 4.6.0 | The Codex provider requires this version of core. Specrails (Desktop) installs it automatically. |

> Earlier Codex versions (< 0.128.0) don't support the `exec --json` + `exec resume` semantics the agent pipeline relies on. The adapter pins the minimum version.

---

## Option A — Core CLI

From your project directory:

```bash
npx specrails-core@latest init --provider codex --quick
```

The installer creates:

- `.codex/config.toml` — model, reasoning effort, sandbox mode, approval policy (top-level keys per codex 0.128.0+ schema).
- `.codex/skills/sr-*/SKILL.md` — general specrails skills (implement, batch-implement, why, compat-check, …).
- `.codex/skills/rails/sr-{architect,developer,reviewer,merge-resolver}/SKILL.md` — the four pipeline rails.
- `.codex/skills/{enrich,doctor}/SKILL.md` — lifecycle commands.
- `AGENTS.md` — top-level instructions file with a sentinel-protected managed block. Anything outside the sentinels is preserved on updates.

Then start Codex in your project root and enrich:

```bash
cd <your-project>
codex
> /specrails:enrich
```

Run your first task:

```
> /specrails:implement "add a health check endpoint"
```

The full pipeline runs: Architect → Developer → Security Reviewer → Reviewer → PR. Each agent works from a **Spec** — a structured source of truth that captures what to build, why it matters, and the acceptance criteria. The pipeline generates and validates the Spec before any code is written.

---

## Option B — Specrails (Desktop)

1. Open Specrails (Desktop) and click **Add Project**.
2. Pick the project's path.
3. In the **AI provider** row, click **Codex**.
4. Submit.

Specrails (Desktop) runs `npx specrails-core@latest init --provider codex --quick` under the hood. The Add Project dialog runs a live prerequisites check — it disables the Codex button with a "not found" hint when the binary isn't on `PATH`, and shows install commands if you click "More info".

> You can't switch a project from Claude to Codex (or vice versa) after creation — the on-disk layouts (`.claude/` vs `.codex/`) are disjoint. Create a new project if you need to swap providers.

---

## Differences vs Claude

Codex is a fully supported provider, but a few behaviours diverge from Claude Code. Be aware of these before you wire it into your workflow.

| Surface | Claude | Codex |
|---|---|---|
| **CLI binary** | `claude` | `codex` |
| **Project dir** | `.claude/` | `.codex/` |
| **Instructions file** | `CLAUDE.md` | `AGENTS.md` |
| **Cost report (Analytics)** | Native (`total_cost_usd` from stream-json) | **Estimated** by Specrails (Desktop) from `turn.completed.usage` × a local rate-card. Displayed as `~$X.XX` with a tooltip. |
| **Switch provider post-create** | n/a | Not supported — create a new project. |
| **Plugins** | All apply | Only plugins whose manifest declares `providerSupport.codex` apply to Codex projects. Others show as `not-applicable` on the Plugins page. |
| **Session resume** | `--resume <session_id>` | `exec resume <thread_id>` — each turn **re-feeds prior context**, so long Explore sessions accumulate input-token cost. |
| **MCP registration** | Surgical merge of `<project>/.mcp.json` | `codex mcp add` against a per-project `CODEX_HOME` (isolated; global `codex mcp add` from your terminal is not visible to Desktop spawns). |
| **Telemetry** | `OTEL_EXPORTER_OTLP_*` env vars consumed by claude itself | Synthesised by Specrails (Desktop) from `codex exec --json` events. Export ZIP works identically. |

**Estimated cost in detail.** Codex doesn't report `total_cost_usd` natively. Specrails (Desktop) computes an estimate from captured `usage` (input / output / cached input tokens × the local pricing table at `server/pricing.ts`) and stores it with `total_cost_usd_estimated = 1`. The Analytics page shows a `~` prefix on these cells, a hero footnote when the active window contains any estimated rows, and a "By provider" card splitting authoritative vs estimated cost. The pricing table is reviewed quarterly.

---

## Troubleshooting

**"codex binary not found" when adding a project.** Install the Codex CLI and restart Specrails (Desktop) so PATH refreshes. The Desktop's `/api/setup-prerequisites` endpoint surfaces the absolute path it resolved, useful for diagnosing Homebrew-vs-npm install collisions.

**"codex 0.120.0 is older than required 0.128.0".** Upgrade Codex. The adapter pins the minimum because earlier versions don't support `exec --json` or `exec resume`.

**"codex mcp add serena failed: auth missing".** Run `codex login` or set `OPENAI_API_KEY`. Specrails (Desktop) doesn't proxy auth.

**Cost shows as `—` for Codex jobs even though tokens are non-zero.** The spawned model isn't in `server/pricing.ts` (e.g. a brand-new model OpenAI shipped after the last review). Update the pricing table and reload the page.

**Cost on the Analytics hero looks too high after a long Explore session.** Codex Explore uses real `exec resume`, so every turn re-feeds the prior conversation. Long sessions accumulate input-token cost the same way Claude's `--resume` does. The hero footnote calls this out.

---

## FAQ

**Can I run specrails on both Claude Code and Codex in the same repo?**
Yes — but each project is bound to one provider on disk. If you want both, create two project entries (or two checkouts) and pick a different provider per entry.

**Do agents use the same model on both CLIs?**
No. Agents inherit the model of the CLI running them. Codex agents use OpenAI models; Claude agents use Claude models. The specrails agent prompts are model-agnostic and work well with both.

**How do I run diagnostics with Codex?**
```bash
npx specrails-core doctor
```
`doctor` is a standalone tool — it runs independently of the AI CLI and works for either install.

---

*Something not working? Open an issue at [github.com/fjpulidop/specrails-core/issues](https://github.com/fjpulidop/specrails-core/issues) or [github.com/fjpulidop/specrails-desktop/issues](https://github.com/fjpulidop/specrails-desktop/issues).*
