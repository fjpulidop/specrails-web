## Context

specrails-web is a React 18 + TypeScript SPA (Vite, Tailwind v3, shadcn/ui) currently structured as a single-product marketing site for specrails-core. The homepage flows: Hero > Problem > Agents > Pipeline > Demo > Features > CLI Compat > Commands > Principles > Roadmap > Footer. A `HubSection.tsx` component exists but is not rendered in Index.tsx.

specrails-hub is a separate product (React 19, Tailwind v4, Express backend, SQLite) at v1.25.0 with Dashboard, Tickets (3 views), Analytics, Activity Feed, Chat, and multi-project management.

The challenge: present two products with different tech stacks as a unified brand while embedding a real interactive demo of the hub.

## Goals / Non-Goals

**Goals:**
- Position "specrails" as an umbrella brand with Core (Engine) and Hub (Control Center)
- Embed a real, interactive specrails-hub demo (not a mockup) in the marketing site
- Maintain premium UX with Dracula theme consistency across all new sections
- Keep existing content that works (Problem, Agents, Pipeline, Demo, Commands, etc.)
- Make the site conversion-oriented: users should want to install Core, Hub, or both

**Non-Goals:**
- Full specrails-hub functionality in the demo (read-only, no write ops)
- Rewriting existing sections that work well (minimal touch)
- Adding a backend to specrails-web (remains a static SPA)
- Hub documentation completeness (start with installation + features + comparison)
- Pricing page (both products are free/open-source)

## Decisions

### D1: Hub Demo Architecture — Static Build with Mock API Layer

**Decision:** Create a demo build mode in specrails-hub that replaces the Express API layer with static JSON fixtures and renders in read-only mode. Deploy as `public/hub-demo/` in specrails-web, embed via iframe.

**Alternatives considered:**
- *Screenshot gallery* — Too static, doesn't showcase interactivity (rejected)
- *Rebuild hub UI in specrails-web* — Duplicates work, different React/Tailwind versions make this impractical (rejected)
- *Run hub server and proxy* — Requires backend, violates static SPA constraint (rejected)
- *Micro-frontend with module federation* — Over-engineered for a demo, React version mismatch (rejected)

**Rationale:** The hub client already uses `getApiBase()` for all API calls. By replacing this with a mock layer that returns static JSON, we get the real UI components with zero backend dependency. The iframe boundary isolates React 19 + Tailwind v4 from the host site's React 18 + Tailwind v3.

**Implementation approach:**
1. In specrails-hub repo, create `client/src/demo-mode/` with:
   - `demo-api.ts` — intercepts fetch calls, returns static fixtures
   - `demo-fixtures/` — JSON files with realistic mock data (jobs, tickets, analytics)
   - `demo-entry.tsx` — Alternative entry point that boots in read-only mode
2. Add Vite config `client/vite.demo.config.ts` for demo build (outputs to `dist-demo/`)
3. Build script: `npm run build:demo` produces self-contained static files
4. Copy `dist-demo/` into specrails-web's `public/hub-demo/`
5. Demo shows: Dashboard view, Kanban tickets, Analytics charts, Pipeline phases
6. Navigation within demo is real (React Router) but scoped to demo routes
7. All mutation buttons (create ticket, run command, etc.) are visually present but disabled with tooltip "Available in full installation"

### D2: New Homepage Section Order

**Decision:** Insert two new sections and refactor one:

```
Hero (updated)          — Dual-product pitch + dual CTAs
Problem                 — Keep as-is
Products (NEW)          — Side-by-side Core vs Hub
Agents                  — Keep, add "Powered by Core" badge
Pipeline                — Keep, add "Powered by Core" badge
Hub Showcase (NEW)      — Interactive iframe demo
Demo                    — Keep (terminal demo for Core)
Features (refactored)   — Tabbed: Core / Hub / Together
CLI Compat              — Keep
Commands                — Keep
Principles              — Keep
Roadmap (updated)       — Dual-repo issues
Footer (updated)        — Add Hub links
```

**Rationale:** Products section comes early to establish the dual-product mental model. Hub Showcase follows Pipeline to create the natural progression: "Here's the pipeline (Core) → Here's how you visualize it (Hub)". Terminal demo stays after Hub showcase for CLI users.

### D3: Products Section — Card-Based Comparison

**Decision:** Two large cards side by side (Core left, Hub right) with:
- Product icon + name + tagline
- 4-5 key capabilities as bullet points
- Visual indicator of relationship ("Core powers the engine, Hub is the cockpit")
- Individual CTA buttons per product
- A connecting visual element between cards showing they work together

**Alternatives considered:**
- *Tab-based switcher* — Hides one product at a time, users may not explore both (rejected)
- *Full-width alternating sections* — Too long, loses the comparison aspect (rejected)

### D4: Features Section — Tab-Based Split

**Decision:** Replace the single grid with a 3-tab interface:
- **Core tab** — Current 12 feature cards (unchanged)
- **Hub tab** — New feature cards: Multi-project Dashboard, Real-time Pipeline, Ticket Management (3 views), Analytics & Cost Tracking, Streaming Logs, Command Launcher, Chat per Project, Keyboard-first UX
- **Together tab** — Cards showing combined value: "Core implements, Hub visualizes", "Core learns, Hub reports", "Core ships PRs, Hub tracks progress"

Use existing shadcn Tabs component for the tab UI.

### D5: Hub Navigation in Navbar

**Decision:** Add a "Hub" item to the navbar that links to `/#hub-showcase` (the new section). Add hub-related entries to the existing DocsDropdown component rather than creating a separate dropdown.

**Alternatives considered:**
- *Separate Hub dropdown* — Creates visual clutter in nav, unnecessary with only 2-3 hub doc pages initially (rejected)
- *Product switcher toggle* — Confusing for first-time visitors who don't know both products yet (rejected)

### D6: Hub Demo Iframe Integration

**Decision:** The HubShowcase section renders the iframe with:
- A toolbar above the iframe with navigation buttons (Dashboard, Tickets, Analytics, Activity)
- These buttons use `postMessage` to navigate within the iframe
- The iframe has a fixed aspect ratio (16:10) with responsive scaling
- A subtle border glow in dracula-purple to make it feel integrated
- A "browser chrome" wrapper (fake address bar showing `localhost:4200`) for context
- Loading skeleton while iframe loads

**Rationale:** The toolbar gives users guided exploration without requiring them to discover the hub's own navigation. The browser chrome wrapper helps users understand this is a real local app, not a custom widget.

### D7: Roadmap Section — Dual-Repo

**Decision:** Expand RoadmapSection to fetch issues from both `fjpulidop/specrails-core` and `fjpulidop/specrails-hub`. Add a small product badge (Core/Hub) on each issue card. Add a tab or filter to switch between repos.

### D8: Hub Documentation Pages

**Decision:** Add 3 new doc entries to `docs-registry.ts`:
1. `hub-installation` — How to install and start specrails-hub
2. `hub-features` — Overview of hub capabilities with screenshots
3. `core-vs-hub` — Comparison page explaining when to use each

These use the existing docs infrastructure (`/docs/:slug` route, MarkdownRenderer, DocsSidebar).

## Risks / Trade-offs

**[Hub demo build maintenance] → Mitigation:** The demo build is a separate Vite config in the hub repo. When hub UI changes, `npm run build:demo` must be re-run and the output copied to specrails-web. Automate with a GitHub Action or npm script.

**[React version mismatch in iframe] → Mitigation:** iframe completely isolates the hub's React 19 from the host's React 18. No shared state, no style leakage. The only communication is via postMessage for navigation.

**[Tailwind v3 vs v4 style conflicts] → Mitigation:** iframe boundary prevents CSS leakage. The hub demo uses its own Tailwind v4 build. No shared stylesheets.

**[Demo data becomes stale] → Mitigation:** Mock fixtures use generic but realistic data (project names like "acme-api", "dashboard-v2"). Not tied to specific versions. Update fixtures when major UI changes happen.

**[Page load performance] → Mitigation:** Hub demo iframe is lazy-loaded (only when section enters viewport). Demo build should be code-split and tree-shaken. Estimated bundle: ~300-500KB gzipped for the demo.

**[Mobile experience for iframe demo] → Mitigation:** On mobile, show a curated screenshot carousel instead of the iframe (iframe interactions don't work well on touch). Progressive enhancement: desktop gets interactive demo, mobile gets visual showcase.

## Open Questions

- **Q1:** Should the hub demo auto-play a guided tour (sequential view transitions) or let users explore freely? Recommendation: free exploration with a subtle "Explore Dashboard → Tickets → Analytics" hint.
- **Q2:** Should we add a "Get started" page that guides users through choosing Core vs Hub vs both? Deferred to future change.
