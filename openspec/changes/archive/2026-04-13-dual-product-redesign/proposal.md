## Why

specrails has evolved from a single CLI tool (specrails-core) into a two-product platform with the addition of specrails-hub — a full-featured local dashboard for multi-project AI pipeline orchestration. The current website only showcases specrails-core, leaving specrails-hub (v1.25.0, production-ready) completely invisible to users. This redesign positions "specrails" as an umbrella brand with two complementary products, dramatically expanding the value proposition and addressable audience — CLI-first developers get Core, visual-first teams get Hub, power users get both.

## What Changes

- **Hero Section**: Updated messaging to position specrails as a platform, with dual CTAs for Core ("Start with Core") and Hub ("Try the Hub")
- **New Products Section**: Side-by-side comparison introducing Core as "The Engine" and Hub as "The Control Center", explaining how they complement each other
- **New Hub Showcase Section**: Interactive demo of the real specrails-hub UI embedded via iframe — a static build of the hub client with mock data showing Dashboard, Kanban tickets, Analytics charts, and Pipeline visualization (read-only)
- **Features Section**: Refactored with tabs to show Core Features, Hub Features, and how they work Together
- **Navigation**: Add Hub dropdown to navbar with links to Hub features, demo, and installation
- **Documentation**: Add hub-specific docs to the docs registry (installation, features, comparison)
- **Roadmap Section**: Expand to show GitHub issues from both specrails-core and specrails-hub repos
- **Footer**: Add specrails-hub links
- **Existing sections preserved**: Problem, Agents, Pipeline, Demo (terminal), CLI Compatibility, Commands, Principles all remain with minor contextual updates

## Capabilities

### New Capabilities
- `products-section`: Side-by-side product comparison section (Core vs Hub) with visual identity for each product
- `hub-showcase`: Interactive iframe-embedded demo of specrails-hub using a static build of the real hub client with hardcoded mock data, deployed as /hub-demo/ subdirectory
- `hub-navigation`: Hub dropdown in navbar with feature links, demo link, and install CTA
- `hub-docs`: Hub documentation pages added to docs registry (installation, features, core-vs-hub comparison)
- `features-tabs`: Tabbed features section splitting Core Features / Hub Features / Together

### Modified Capabilities
<!-- No existing specs to modify — this is a greenfield spec setup -->

## Impact

- **Components affected**: HeroSection, FeaturesSection, Navbar, FooterSection, RoadmapSection, Index page (new section ordering + new components)
- **New components**: ProductsSection, HubShowcase, HubDropdown, FeaturesTabs
- **New static assets**: Hub demo build in public/hub-demo/ (isolated iframe target)
- **Data files**: docs-registry.ts (new hub doc entries), agents.ts (no change)
- **Build**: Hub demo requires a separate build pipeline (script in specrails-hub repo to generate static demo build with mock data)
- **Dependencies**: No new npm dependencies for specrails-web itself; hub demo is self-contained
- **SEO**: Updated meta tags, OG image, sitemap to reflect dual-product positioning
- **Routes**: No new routes needed (hub docs use existing /docs/:slug pattern); hub demo served as static files
