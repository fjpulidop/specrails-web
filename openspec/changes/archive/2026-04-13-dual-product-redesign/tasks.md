## 1. Hub Demo Static Build

- [x] 1.1 Create `client/src/demo-mode/demo-fixtures/` in specrails-hub with mock JSON data (projects, jobs, tickets, analytics, activity)
- [x] 1.2 Create `client/src/demo-mode/demo-api.ts` in specrails-hub — intercepts fetch calls and returns static fixtures instead of hitting backend
- [x] 1.3 Create `client/src/demo-mode/demo-entry.tsx` in specrails-hub — alternative React entry that boots app in read-only demo mode
- [x] 1.4 Create `client/vite.demo.config.ts` in specrails-hub — Vite config that builds the demo client to `dist-demo/`
- [x] 1.5 Add `build:demo` npm script to specrails-hub `client/package.json`
- [x] 1.6 Build the demo and copy output to `specrails-web/public/hub-demo/`
- [x] 1.7 Verify hub demo loads standalone at `/hub-demo/index.html` in a browser without backend

## 2. Products Section

- [x] 2.1 Create `src/components/ProductsSection.tsx` with side-by-side Core vs Hub cards
- [x] 2.2 Add product data (icon, tagline, capabilities, CTA) for Core ("The Engine") and Hub ("The Control Center")
- [x] 2.3 Add connecting visual element between cards indicating products work together
- [x] 2.4 Implement responsive layout (side-by-side on desktop, stacked on mobile)
- [x] 2.5 Add scroll animation with useScrollAnimation hook
- [x] 2.6 Insert ProductsSection in Index.tsx between ProblemSection and AgentsSection

## 3. Hub Showcase Section

- [x] 3.1 Create `src/components/HubShowcase.tsx` with section heading, subtitle, and "Powered by specrails-hub" badge
- [x] 3.2 Implement iframe container with 16:10 aspect ratio, browser chrome wrapper (fake address bar showing localhost:4200), and dracula-purple border glow
- [x] 3.3 Implement toolbar with navigation buttons (Dashboard, Tickets, Analytics, Activity) that send postMessage to iframe
- [x] 3.4 Add IntersectionObserver-based lazy loading for the iframe (skeleton placeholder until visible)
- [x] 3.5 Implement postMessage listener in hub demo to handle navigation commands from parent
- [x] 3.6 Implement mobile fallback: screenshot carousel with swipe navigation and dot indicators instead of iframe
- [x] 3.7 Insert HubShowcase in Index.tsx after PipelineSection

## 4. Features Section Refactor

- [x] 4.1 Define hub feature cards data array (8 cards: Multi-Project Dashboard, Real-time Pipeline, Ticket Management, Analytics, Streaming Logs, Command Launcher, Chat, Keyboard-First UX)
- [x] 4.2 Define "Together" feature cards data array (4 cards showing combined Core+Hub value)
- [x] 4.3 Refactor FeaturesSection.tsx to use shadcn/ui Tabs with three tabs: Core, Hub, Together
- [x] 4.4 Add smooth fade transition between tab content
- [x] 4.5 Ensure tab state persists across scroll (no reset on viewport exit/entry)

## 5. Navigation Updates

- [x] 5.1 Add "Hub" link to Navbar desktop navigation that scrolls to `#hub-showcase`
- [x] 5.2 Add hub doc entries to DocsDropdown under a "Hub" group heading
- [x] 5.3 Update HeroSection tagline to dual-product messaging ("Your AI Development Team")
- [x] 5.4 Add dual CTA buttons below hero terminal: "Get Started with Core" + "Explore the Hub"
- [x] 5.5 Update FooterSection with specrails-hub links (GitHub repo, docs, installation)
- [x] 5.6 Update SectionNav in Index.tsx to include `hub-showcase` and `products` section IDs

## 6. Hub Documentation

- [x] 6.1 Create hub installation documentation content (markdown)
- [x] 6.2 Create hub features documentation content (markdown)
- [x] 6.3 Create core-vs-hub comparison documentation content (markdown)
- [x] 6.4 Add three new entries to `src/lib/docs-registry.ts`: hub-installation, hub-features, core-vs-hub
- [x] 6.5 Update DocsSidebar to show hub docs under a "Hub" section group

## 7. Roadmap Section Update

- [x] 7.1 Update RoadmapSection to fetch issues from both `fjpulidop/specrails-core` and `fjpulidop/specrails-hub`
- [x] 7.2 Add product badge ("Core" / "Hub") to each issue card with accent colors
- [x] 7.3 Add filter buttons (All / Core / Hub) to toggle between repos

## 8. Contextual Updates to Existing Sections

- [x] 8.1 Add "Powered by specrails-core" subtle badge to AgentsSection heading
- [x] 8.2 Add "Powered by specrails-core" subtle badge to PipelineSection heading
- [x] 8.3 Update SEO meta tags in Index.tsx useSeo to reflect dual-product positioning

## 9. Testing & Verification

- [x] 9.1 Add Vitest tests for ProductsSection (renders, responsive, CTAs)
- [x] 9.2 Add Vitest tests for HubShowcase (renders, lazy loading, toolbar buttons)
- [x] 9.3 Add Vitest tests for FeaturesSection tabs (tab switching, content rendering)
- [x] 9.4 Run `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm test` — all green
- [x] 9.5 Visual verification: start dev server, test full page flow on desktop and mobile viewports
