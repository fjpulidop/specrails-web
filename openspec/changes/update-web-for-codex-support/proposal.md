## Why

specrails-hub now ships with OpenAI Codex CLI support (provider selectable per project, codex CLI ≥ 0.128.0, `.codex/` install, full pipeline rails). The website (landing + docs) still tells users Codex is "Coming Soon — in Lab" and that specrails works "on Claude Code", which is now incorrect and undersells the product. Update copy and docs to reflect dual-provider reality while being honest about the gaps where Codex trails Claude.

## What Changes

- Landing copy updated to "Works with Claude Code & Codex" across hero, products/core page, features, and `index.html` meta description.
- All "🧪 Coming Soon — in Lab" banners for Codex removed from docs (`installation.md`, `core-vs-hub.md`, `codex-getting-started.md`, `docs-registry.ts` title + description).
- `codex-getting-started.md` rewritten with real installation/usage content sourced from `specrails-hub/docs/codex.md`:
  - Prerequisites: codex CLI ≥ 0.128.0, `codex login` or `OPENAI_API_KEY`, specrails-core ≥ 4.6.0.
  - Add-project flow (pick Codex provider).
  - What's installed (`.codex/`, `AGENTS.md`, skills, rails).
  - Differences vs Claude (cost estimated `~$X`, no provider switch after create, plugin `providerSupport.codex` gate, session resume re-feeds context).
  - Troubleshooting + link to hub canonical doc.
- `installation.md` prereqs add codex CLI as a peer of Claude Code (no more "coming soon" suffix).
- `getting-started.md` cross-link to Codex variant no longer says "Coming Soon".
- `core-vs-hub.md` Interface row already lists "Claude Code / Codex CLI" — only the banner is dropped.
- `README.md` line "when Codex support ships" rephrased to "supports Codex".
- Agent comparison matrix is NOT changed (agent-level only, no provider column).
- Roadmap section is dynamic from GitHub Issues — no changes needed.

## Capabilities

### New Capabilities
- `codex-support-docs`: Codex getting-started documentation page with real content (prereqs, add-project flow, differences vs Claude, troubleshooting).

### Modified Capabilities
- `hub-docs`: docs-registry entries for Codex lose the "(Coming Soon)" suffix and Lab banner; Codex doc becomes a first-class entry.

## Impact

- Affected files:
  - `index.html` (meta description)
  - `src/components/HeroSection.tsx`, `src/components/FeaturesSection.tsx`, `src/pages/CorePage.tsx`
  - `src/lib/docs-registry.ts`
  - `src/content/codex-getting-started.md` (rewrite)
  - `src/content/installation.md`, `src/content/getting-started.md`, `src/content/core-vs-hub.md`
  - `README.md`
- No new dependencies. No runtime/code-path changes — copy + markdown only, plus the registry entry's `comingSoon`/description fields.
- Tests: existing Vitest suites for components touched (`HeroSection`, `FeaturesSection`) must still pass; update snapshots/string assertions if any reference the old copy.
