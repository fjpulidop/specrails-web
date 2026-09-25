# Agent Memory: sr-architect

This file is loaded into context at the start of every session. Keep it under 200 lines.

## Project notes
- Stack: React 18 + TypeScript strict, Vite + SWC, Tailwind CSS, shadcn/ui, Dracula HSL token theme
- CSS tokens are HSL space-separated values in `src/index.css` under `@layer base :root`
- Theme system uses `data-theme` attribute on `documentElement` (not Tailwind `dark:` class)
- Canvas components: all mutable state in refs/closure, never React state; must mock IntersectionObserver and canvas in tests

## Landing IA (as of 2026-09-25)
- Index.tsx renders the mission-first landing from ProductLanding.tsx: hero → product recordings → Companion → workflow (`#specs`, `#loops`) → features (`#engineering`) → docs showcase → footer.
- Specrails Core is Desktop's built-in engine, not a product: no Core page, card, CLI reference, Core-vs-Desktop comparison or `npx specrails-core` CTA anywhere. Requirement: `openspec/specs/product-narrative/spec.md`.
- `/core` redirects to `/docs/getting-started#core-is-built-into-desktop`; `/agents` and `/desktop` redirect to `/`.
- The Core, former Desktop and Agents pages, the Agents/Commands/Features/Principles sections and `src/data/agents.ts` were removed in the `core-as-desktop-engine` change. The hero-redesign-hub-primary, landing-spec-first-narrative and update-web-for-codex-support changes were dropped as superseded.
- Agent counts must not appear on the site.

## Explanation records
- [2026-06-03-data-theme-over-body-class](./explanations/2026-06-03-data-theme-over-body-class.md) — why `data-theme` attribute was chosen over `body.light` class
- [2026-06-03-canvas-palette-runtime-tokens](./explanations/2026-06-03-canvas-palette-runtime-tokens.md) — why canvas reads CSS tokens at runtime rather than accepting props
- [2026-06-03-computepositions-exported](./explanations/2026-06-03-computepositions-exported.md) — why `computePositions` is the only exported function from HeroMesh
- [2026-06-18-architect-spec-first-ia-demotions](../../.claude/agent-memory/explanations/2026-06-18-architect-spec-first-ia-demotions.md) — why 6 sections demoted from Index.tsx
- [2026-06-18-architect-pipeline-section-dual-role](../../.claude/agent-memory/explanations/2026-06-18-architect-pipeline-section-dual-role.md) — why spec explainer lives inside PipelineSection
- [2026-06-18-architect-products-3-col-layout](../../.claude/agent-memory/explanations/2026-06-18-architect-products-3-col-layout.md) — why ProductsSection uses 5-column grid for 3 products
