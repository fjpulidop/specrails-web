# Proposal: landing-spec-first-narrative

## Why

The current landing page is a feature catalog, not a story. It opens with a subhead that mentions "14 specialized agents" before the visitor has any idea what specrails is. It lists AgentsSection, HubShowcaseSection, FeaturesSection, CommandsSection, ApiMcpSection, and PrinciplesSection below the fold — sections that each make sense to a converted developer but confuse a newcomer. The result is a wall of detail that interrupts comprehension rather than building it.

The brand has a strong point of view it hasn't yet expressed: **a prompt is a wish; a spec is a contract.** That thesis belongs in the hero and should govern every scroll from there. The agent count, the feature catalog, and the API reference all belong on subpages — they're earned, not given.

Product direction is also cleaner now: specrails-desktop (download) is the primary entry point, specrails-core (npx init) is the CLI-first path, and the companion app is live (PWA at specrails.dev/companion-app) — not coming soon. The landing should reflect all three truthfully.

## What Changes

**Information architecture:** Index.tsx collapses from 12 sections to 6. Six sections are demoted to existing subpages (/agents, /core, /docs, /download) where they already live:
- AgentsSection → /agents
- HubShowcaseSection → already removed in hero-redesign-hub-primary
- FeaturesSection → /core
- CommandsSection → /docs/cli-reference
- ApiMcpSection → /docs
- PrinciplesSection → /core

**Section order rewritten** around comprehension → desire → download:
1. Hero — category-first H1, agentic-system subhead, CTA trio, DemoVideo placeholder
2. How it works — spec-first explainer + PipelineSection reframed (spec is the star, agents execute)
3. Demo proof — DemoSection with tie-in headline "Describe it. Watch it ship."
4. Why specrails — ProblemSection reframed as raw-CLI vs specrails 2-column contrast; model-agnostic line
5. The ecosystem — ProductsSection extended to 3 layers (core → desktop → companion)
6. Footer — desire hook + "Describe it. Watch it ship." closing CTA

**Component-level changes:**
- `HeroSection.tsx` — new H1 ("Describe it. A team of agents ships it."), new subhead (agentic system framing), CTA trio (Download primary + npx copy secondary + scroll tertiary), DemoVideo caption updated; no agent count
- `PipelineSection.tsx` — label/heading rewrite to "How it works / It starts with a spec, not a prompt." + spec explainer block above the stations diagram; agent framing below as subordinate to the spec
- `DemoSection.tsx` — header rewrite to "Describe it. Watch it ship." + updated caption tying to pipeline stations; body unchanged
- `ProblemSection.tsx` — eyebrow/heading/body rewrite to "Why specrails / Raw AI guesses. specrails commits." contrast layout; model-agnostic line added
- `ProductsSection.tsx` — heading/framing rewrite to "Three ways to ride the rails." + third layer: specrails-companion (Open the companion CTA, WebRTC DTLS, zero-knowledge mailbox copy)
- `FooterSection.tsx` — brand pitch paragraph replaced with desire hook; sticky closing CTA added
- `Index.tsx` — SECTION_IDS reduced to 6 IDs, 6 component imports removed, section order updated

**No design-system changes.** Colors, typography, spacing, and shadcn/ui primitives are untouched. This is a content + IA change only.

## Goals / Non-Goals

**Goals:**
- Visitor can understand what specrails is within the first two visible lines — no scrolling required.
- Each scroll introduces one new idea. Six blocks, not twelve.
- CTA architecture: Download (primary) → npx copy (secondary) → "See how it works" scroll (tertiary).
- ProductsSection reveals all three products truthfully, with the companion app live (not "coming soon").
- Model-agnostic framing consistent throughout: Claude, Codex, and Gemini via API key.
- All Vitest tests updated to match new copy; lint, tsc, and build all pass.

**Non-Goals:**
- Design system changes (colors, type, spacing, shadcn/ui primitives).
- Backend changes. companion-signal.php and /companion-app are already hosted; only link to them.
- Building the demo video (DemoVideo ships with ready={false} placeholder).
- Changing the docs, agents, or core subpages beyond what already lives there.
- Adding new routes or modifying App.tsx routing.

## Capabilities

### Modified Capabilities
- `hero-narrative`: H1 becomes the category statement ("Describe it. A team of agents ships it."), replacing the current product tagline. CTA trio replaces current CTA pair.
- `landing-ia`: 6-block narrative replaces 12-section feature catalog. Section order: Hero → How it works → Demo → Why specrails → Ecosystem → Footer.
- `spec-explainer`: New content block inserted above PipelineSection stations — explains what a spec is before the pipeline diagram, making the diagram comprehensible to first-time visitors.
- `ecosystem-section`: ProductsSection extended from 2 products to 3, with companion app as the third layer.
- `problem-contrast`: ProblemSection reframed from pain-then-payoff list to 2-column raw-CLI vs specrails comparison table, with model-agnostic closing line.
- `footer-conversion`: FooterSection brand pitch replaced with desire hook; sticky CTA "Describe it. Watch it ship." added.

### Removed Capabilities
- `agents-section-on-landing`: AgentsSection removed from Index.tsx. Content lives at /agents.
- `features-section-on-landing`: FeaturesSection removed. Content covered on /core.
- `commands-section-on-landing`: CommandsSection removed. Content covered in /docs/cli-reference.
- `api-mcp-section-on-landing`: ApiMcpSection removed. Content covered in /docs.
- `principles-section-on-landing`: PrinciplesSection removed. Content covered on /core.
- `hub-showcase-on-landing`: HubShowcaseSection import removed (already deleted in hero-redesign-hub-primary, import may still be present).

## Impact

- **Files modified:**
  - `src/pages/Index.tsx`
  - `src/components/HeroSection.tsx`
  - `src/components/PipelineSection.tsx`
  - `src/components/DemoSection.tsx`
  - `src/components/ProblemSection.tsx`
  - `src/components/ProductsSection.tsx`
  - `src/components/FooterSection.tsx`
- **Tests updated:**
  - `src/test/HeroSection.test.tsx` — assertions on H1 copy, subhead, CTA trio, DemoVideo caption; remove agent-count assertion
  - `src/test/Index.test.tsx` — SECTION_IDS list reduced to 6
  - `src/test/CorePage.test.tsx` — no changes expected (CorePage content unchanged)
- **No new routes, dependencies, or assets.**
- **Conflict surface with in-flight changes:** see design.md § Conflict Analysis.
