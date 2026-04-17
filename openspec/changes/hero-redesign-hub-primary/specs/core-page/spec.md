## ADDED Requirements

### Requirement: Dedicated Core page at /core
The system SHALL expose a dedicated page at the `/core` route that presents specrails-core (the CLI) as the terminal-first option for developers. The page SHALL reuse the existing Navbar and FooterSection components unchanged and SHALL use the same Tailwind theme tokens as the rest of the site.

#### Scenario: Route resolves
- **WHEN** a user navigates to `/core`
- **THEN** the Core page renders without error and includes the shared Navbar at the top and FooterSection at the bottom

#### Scenario: Unknown `/core/*` subroutes show not-found
- **WHEN** a user navigates to `/core/does-not-exist`
- **THEN** the existing NotFound component renders (no new 404 handling introduced by this change)

### Requirement: Core page structure
The Core page SHALL render the following sections in order:

1. A banner / header identifying the page as "specrails-core · the CLI behind specrails-hub".
2. An install block with Quick Setup and Full Setup tabs, using the same tabbed-terminal UI pattern as the legacy hero.
3. An architecture section covering agents, pipeline, and rails.
4. An agents catalog teaser with a link to `/agents`.
5. A customisation section covering user-authored agents and commands.
6. An integration examples section (CI, pre-commit).
7. A "View on GitHub" call to action.
8. A link back to the Hub landing (`"Want the dashboard? → /"`).

#### Scenario: Sections render in order on desktop
- **WHEN** the Core page renders on a viewport >= 1024px
- **THEN** the eight sections above appear in the listed order, each as a distinct landmark

#### Scenario: Mobile layout collapses to a single column
- **WHEN** the Core page renders on a viewport < 768px
- **THEN** all multi-column sections collapse to a single column and all content remains reachable by scrolling

### Requirement: Install tabs on Core page
The install block SHALL reuse the Quick Setup and Full Setup tab contents from the legacy hero Core tabs. Both tabs SHALL continue to render as animated typewriter terminals.

#### Scenario: Quick Setup tab
- **WHEN** the user opens the Quick Setup tab
- **THEN** the system animates a terminal showing `npx specrails-core@latest init` followed by the abbreviated install lines from the legacy hero Quick Setup

#### Scenario: Full Setup tab
- **WHEN** the user opens the Full Setup tab
- **THEN** the system animates a terminal showing `npx specrails-core@latest init` followed by the enrich step from the legacy hero Full Setup

### Requirement: Core page links back to Hub
The Core page SHALL include at least one link back to the Hub landing page (`/`).

#### Scenario: Back-to-Hub link in page footer section
- **WHEN** the Core page renders
- **THEN** a link with text along the lines of "Want the dashboard? →" appears near the bottom of the content area and navigates to `/`

### Requirement: Core page has SEO metadata
The Core page SHALL set a descriptive `<title>`, `<meta name="description">`, and SHALL be listed in `public/sitemap.xml` so it can be crawled by search engines.

#### Scenario: Document title is specific
- **WHEN** the Core page renders
- **THEN** `document.title` contains both "specrails-core" and a dev-oriented descriptor (e.g. "CLI", "terminal", or "developers")

#### Scenario: Sitemap entry exists
- **WHEN** `public/sitemap.xml` is inspected
- **THEN** it contains a `<url>` entry for `/core`
