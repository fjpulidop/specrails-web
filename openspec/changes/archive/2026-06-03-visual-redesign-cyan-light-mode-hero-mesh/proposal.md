# Proposal: Visual Redesign — Cyan Palette, Light Mode, Hero Mesh, Logo, Agents Update

## Change Name
`visual-redesign-cyan-light-mode-hero-mesh`

## Problem

The specrails.dev marketing site has four compounding issues that make it feel unpolished and inconsistent with the product's current state:

1. **Palette mismatch.** The dominant brand accent is Dracula purple (`#BD93F9`) and pink (`#FF79C6`). The prototype and design handoff define cyan (`#00C3D2`) as the brand accent — closer to the product's aesthetic and more distinctive in the developer-tools market. Every section that uses purple/pink as the "brand color" needs updating.

2. **Dark-only.** There is no light mode. Users who prefer light themes on their OS or browser get no accommodation. The absence also reduces the site's accessibility surface.

3. **Static hero background.** The current hero uses a simple particle canvas with 50 dots and connecting lines. The design handoff specifies a procedural rails-mesh canvas that is thematically tied to the product (specs traveling on rails, agents descending as lightning), making the hero memorable and self-explanatory.

4. **Outdated logo and agents section.** The navbar renders a text wordmark in purple/pink. The agents section lacks structural clarity — it does not distinguish core agents from optional specialists, and the Developer/Reviewer behavioral rules (dynamic dispatch, sub-specialization) are undocumented.

## Solution Summary

A four-part visual and content redesign shipped as a single epic in dependency order:

1. **Cyan palette + light/dark toggle** — introduce `--accent-cyan` token, shift `--primary`, `--gradient-primary`, `hero-glow`, and all brand-accent references from purple/pink to cyan. Add a full `:root[data-theme="light"]` token set. Add `useTheme` hook (localStorage persisted, `documentElement.dataset.theme` effect). Add Sun/Moon toggle button to both Navbar clusters.

2. **Hero mesh canvas** — replace the particle background in `HeroSection` with `HeroMesh`: a full-bleed procedural canvas showing a perspective-distorted grid, horizontal spec beams, and agent lightning bolts descending along grid edges. All mutable state in refs/closure. RAF suspended via `IntersectionObserver` + `visibilitychange`. `prefers-reduced-motion`: one static frame.

3. **SVG rails logo + favicon** — swap the text wordmark in `Navbar` and `AnimatedLogo` for the inline SVG rails lockup from `specrails-logo.svg`. Replace `public/favicon.svg` with `specrails-icon.svg`. Inline SVG ensures theme-color inheritance.

4. **Agents content update** — extend `AgentEntry` with `core?: boolean` and `note?: string`. Mark Architect, Developer, Reviewer as `core: true`. Add dispatch/sub-specialization notes to Developer and Reviewer. Render Core badge, stronger border, and note line in `AgentsSection`. Add Core column to `AgentComparisonMatrix`. Update section intro copy.

## Acceptance Criteria

### Palette
- [ ] `--accent-cyan: 187 100% 41%` is defined in `:root` of `src/index.css`
- [ ] `--primary` resolves to the cyan token (not purple)
- [ ] `--gradient-primary` is a cyan-based gradient
- [ ] `hero-glow` uses `--accent-cyan` as its dominant hue
- [ ] `gradient-btn:hover` box-shadow references cyan, not purple
- [ ] Hard-wired `text-dracula-purple` / `text-dracula-pink` brand-accent usages in non-per-item contexts are replaced with cyan equivalents
- [ ] Per-item intentional hues (e.g. agent cards with purple, pink, orange as their individual accent) are unchanged

### Light/Dark Mode
- [ ] `:root[data-theme="light"]` defines all base tokens with light values matching the handoff
- [ ] `localStorage` key `sr-theme` is the sole persistence source
- [ ] `documentElement.dataset.theme` is set on mount and on every toggle
- [ ] Default is dark (no `sr-theme` in localStorage = dark)
- [ ] `body` has `transition-colors duration-300` for smooth switching
- [ ] Terminal blocks (`terminal`, `docs-prose pre`) remain dark in both modes
- [ ] Sun icon shown in dark mode (clicking switches to light); Moon icon shown in light mode
- [ ] Toggle button present in both desktop and mobile Navbar clusters

### Hero Mesh
- [ ] `HeroMesh` component is created at `src/components/HeroMesh.tsx`
- [ ] Canvas is absolutely positioned behind hero copy
- [ ] `computePositions` signature matches contract: `(nodes: Node[], mouseX: number, mouseY: number, out: NP[]): void`
- [ ] `HeroMesh` props interface is `{}`
- [ ] Spec beams travel left-to-right; agent bolts descend top-to-bottom along grid edges
- [ ] At most one `AgentBolt` per `AGENT_NAMES` entry active at any time
- [ ] Collision: spec lights up and stays lit for ~3 s after agent overlap
- [ ] RAF pauses when `IntersectionObserver` reports `isIntersecting=false` or `document.hidden=true`
- [ ] `prefers-reduced-motion`: single static frame drawn, no RAF loop started
- [ ] Canvas accent palette read from `getComputedStyle` at runtime (recolors on theme switch)
- [ ] `ParticleBackground` component (old) is removed or replaced by `HeroMesh`

### Logo
- [ ] Navbar wordmark is an inline SVG (not `<img>`, not text) with rails lockup
- [ ] SVG center rail uses `fill="hsl(var(--foreground))"`; knockout text uses `fill="hsl(var(--background))"`; thin rails use `fill="hsl(var(--foreground))"` with `opacity="0.16"`
- [ ] Logo height ~40–42 px in the 64 px navbar
- [ ] `public/favicon.svg` contains the specrails icon (square rails motif)
- [ ] `AnimatedLogo` animates the SVG mark rather than the text wordmark

### Agents
- [ ] `AgentEntry` type has `core?: boolean` and `note?: string` fields
- [ ] `AGENTS` array has `core: true` on exactly Architect, Developer, Reviewer
- [ ] Developer `note` text matches spec verbatim
- [ ] Reviewer `note` text matches spec verbatim
- [ ] `AgentsSection` renders a filled cyan "Core" pill badge on core agent cards
- [ ] Core cards have a visibly stronger border (e.g. `border-accent/40` vs `border-border/20`)
- [ ] `note` line rendered at bottom of Developer and Reviewer cards in accent color
- [ ] Section intro copy updated to the handoff's exact wording
- [ ] `AgentComparisonMatrix` has a "Core" column showing a checkmark for core agents

## Out of Scope
- Sections outside Hero, Navbar, Agents, and global CSS tokens
- Raster image assets or third-party icon libraries
- Space Grotesk font adoption (keep Inter)
- Backend or build pipeline changes
