# Agent Memory: sr-architect

This file is loaded into context at the start of every session. Keep it under 200 lines.

## Project notes
- Stack: React 18 + TypeScript strict, Vite + SWC, Tailwind CSS, shadcn/ui, Dracula HSL token theme
- CSS tokens are HSL space-separated values in `src/index.css` under `@layer base :root`
- Theme system uses `data-theme` attribute on `documentElement` (not Tailwind `dark:` class)
- Canvas components: all mutable state in refs/closure, never React state; must mock IntersectionObserver and canvas in tests
- `src/data/agents.ts` is the canonical agent data source; `AgentEntry` interface is shared across three components

## Landing IA (as of 2026-06-18, feat/companion-app-hosting branch)
- Index.tsx is in active flux: hero-redesign-hub-primary partially applied (useReleaseManifest, CorePage, DemoVideo in hero); landing-spec-first-narrative change will collapse from 12 to 6 sections
- SECTION_IDS target after landing-spec-first-narrative: ["hero", "pipeline", "demo", "problem", "products", "footer"]
- HubShowcaseSection is deleted (file gone); HubSection import may still exist in Index.tsx
- update-web-for-codex-support is fully applied (tasks all checked); Codex copy live in hero/features/core/docs
- Agent count ("14 specialized agents") must NOT appear on the landing — subpages only

## Explanation records
- [2026-06-03-data-theme-over-body-class](./explanations/2026-06-03-data-theme-over-body-class.md) — why `data-theme` attribute was chosen over `body.light` class
- [2026-06-03-canvas-palette-runtime-tokens](./explanations/2026-06-03-canvas-palette-runtime-tokens.md) — why canvas reads CSS tokens at runtime rather than accepting props
- [2026-06-03-computepositions-exported](./explanations/2026-06-03-computepositions-exported.md) — why `computePositions` is the only exported function from HeroMesh
- [2026-06-18-architect-spec-first-ia-demotions](../../.claude/agent-memory/explanations/2026-06-18-architect-spec-first-ia-demotions.md) — why 6 sections demoted from Index.tsx
- [2026-06-18-architect-pipeline-section-dual-role](../../.claude/agent-memory/explanations/2026-06-18-architect-pipeline-section-dual-role.md) — why spec explainer lives inside PipelineSection
- [2026-06-18-architect-products-3-col-layout](../../.claude/agent-memory/explanations/2026-06-18-architect-products-3-col-layout.md) — why ProductsSection uses 5-column grid for 3 products
