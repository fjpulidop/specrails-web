## Why

specrails-core 6.0.0 became a thin engine that ships only what Specrails Desktop drives: Desktop bundles a tested Core, uses it to prepare projects and applies its updates. specrails.dev still carried the earlier story in code, docs, specs and tooling — a Core page with `npx specrails-core@latest init`, a CLI reference, "Core vs Hub" docs, a Core agents catalogue and a workflow that followed Core releases — and the guide mentioned "Core" without saying what it is. Visitors and AI agents could conclude that Core is a separate product to install.

## What Changes

- The guide explains that Specrails Core is the engine included in Desktop: what it does for a project and a loop, that people never install, run or add it to repositories themselves, and that Desktop Settings → Updates → Specrails Core shows its version and applies updates. "What is Specrails" changes in all eight languages; the install, add-project, agent-roles and provider articles in English and Spanish.
- The download page states that the installer includes Specrails Core and that only an AI provider CLI is needed besides Desktop.
- `/core` redirects to the guide section "Core is built into Desktop" instead of the home page.
- `llms.txt` gives agents the product facts: Desktop is the only Specrails install; never suggest installing `specrails-core` or running `npx specrails-core`.
- **Removed**: the unrouted Core, former Desktop and Agents pages; the Commands, Features, Principles and Agents sections; the agents data file; the unpublished `src/content/*.md` docs (install, CLI reference, Core vs Hub, quickstart, deployment and others).
- **Removed**: the `specrails-core` devDependency, the `update-docs.yml` workflow triggered by Core releases and an unreferenced copy of Core's changelog.
- **Removed**: the stale main specs `features-tabs`, `hub-docs`, `hub-navigation`, `hub-showcase` and `products-section`, and the superseded changes `hero-redesign-hub-primary`, `landing-spec-first-narrative` and `update-web-for-codex-support`, which would reintroduce a `/core` page and Core-as-CLI docs.
- Repository docs (README, CLAUDE.md, guide maintenance notes, agent notes) describe the site as the home of Specrails Desktop and Companion and state the rule for describing Core.

## Capabilities

### New Capabilities
- `product-narrative`: how the website presents Specrails — Desktop as the only Specrails software to install and Specrails Core as its built-in engine — and where visitors and agents are told so.

### Modified Capabilities
None. The stale specs listed above are deleted instead of modified: they are stored in delta format, `openspec list --specs` reports 0 requirements for each, and every feature they describe is gone from the site.

## Impact

- Content: `src/content/guide/**` (eight languages), `src/content/guide/README.md`, `src/lib/docs-generated.json`, `public/llms.txt`.
- Code: `src/App.tsx` (redirect), `src/pages/DownloadPage.tsx`, `src/lib/download-copy.ts`, `scripts/sync-agent-docs.mjs`, `src/components/GitHubStarsButton.tsx` (default repository), plus the removed modules and their tests.
- Tooling: `package.json`, `package-lock.json`, `.github/workflows/update-docs.yml`.
- specrails-core's release workflow still dispatches `specrails-core-released` to this repository. Without a listener the event has no effect; removing that step belongs to Core.
- No new dependencies and no visual redesign.
