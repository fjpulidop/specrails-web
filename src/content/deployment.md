# Deployment

specrails is designed to run **locally** — in your dev environment, not on a production server. This page covers the places the pipeline typically runs and how to wire them up.

## Where specrails runs

| Environment | Who uses it | Notes |
|-------------|-------------|-------|
| **Developer laptop** | You, day to day | Default. Hub app or CLI + Claude Code. |
| **Hub desktop app** | Team, visual workflows | Wraps the same CLI in a native app. macOS today; Windows + Linux on the roadmap. |
| **CI pipeline** | Automated bots | Run `/specrails:implement` in GitHub Actions (or similar) for backlog triage or nightly refactors. |
| **Server / container** | Rare | Needs a credentialed Claude Code (or Codex) runtime. Treat like any other AI bot — one set of credentials, scoped permissions, sandboxed filesystem. |

## Local setup

This is the common path. Install Hub and/or Core and you're done:

- [Install Hub](/docs/hub-installation) — download the `.dmg` or run `npm install -g specrails-hub`.
- [Install specrails-core](/docs/installation) — `npx specrails-core@latest init`.

Data is written to `~/.specrails/` (hub) and `.specrails/` inside each repo (core). Nothing leaves the machine.

## Running in CI

Use the same CLI you'd use locally, plus your AI provider credential:

```yaml
# .github/workflows/specrails-triage.yml
jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm install -g @anthropic-ai/claude-code
      - run: npx specrails-core@latest init --yes
      - run: claude -p "/specrails:auto-propose-backlog-specs"
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

`--yes` uses defaults for every TUI question so the install is non-interactive.

## Cost controls

Every agent call counts against your provider credential. Guardrails:

- Set a daily budget per project in Hub → **Settings → Daily Budget**. Jobs auto-pause when hit.
- Use Quick tier agents for simple specs; the Full tier (Opus product-manager) is only needed for product-discovery work.
- `/specrails:implement --dry-run` runs the pipeline without touching git or spending on the ship phase — good for previewing scope.

## Security

- specrails reads **your local files only**. No source upload to external servers beyond the model provider you authenticated.
- Agents run with the same filesystem permissions as your user. Don't run the pipeline as root.
- The Hub binds to `127.0.0.1` only. Don't expose port 4200 to the network.
- The `sr-security-reviewer` agent scans every pipeline run for secrets and OWASP violations before shipping.

## Data that stays local

- Prompts sent to the model include selected code snippets — that traffic is provider-side (Claude or Codex).
- All metadata (tickets, pipeline state, agent memory, job logs, analytics) lives on disk. SQLite databases under `~/.specrails/` and a JSON ticket file in your repo.

If your organisation restricts AI tooling, talk to your security team about the provider credential separately — specrails itself sends nothing to external services.

## Next steps

- [Hub Features](/docs/hub-features) — budget controls and analytics details.
- [Core Concepts](/docs/concepts) — how the pipeline decides what to run.
