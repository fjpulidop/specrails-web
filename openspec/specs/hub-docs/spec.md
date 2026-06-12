## ADDED Requirements

### Requirement: Hub documentation pages in docs registry
The system SHALL add hub documentation entries to `src/lib/docs-registry.ts` so they are accessible via the existing `/docs/:slug` route. Three new doc entries SHALL be added: hub-installation, hub-features, and core-vs-hub.

#### Scenario: Hub installation doc is accessible
- **WHEN** the user navigates to `/docs/hub-installation`
- **THEN** the DocPage renders hub installation documentation covering: prerequisites, installation command (`npm install -g specrails-desktop`), starting the server, adding projects, and first-run experience

#### Scenario: Hub features doc is accessible
- **WHEN** the user navigates to `/docs/hub-features`
- **THEN** the DocPage renders hub features documentation covering: Dashboard (Specs Board, Rails, Pipeline, Jobs), Ticket Management (List, Kanban, Post-it views), Analytics (KPIs, charts, cost tracking), Activity Feed, Chat, multi-project management, and keyboard shortcuts

#### Scenario: Core vs Hub comparison doc is accessible
- **WHEN** the user navigates to `/docs/core-vs-hub`
- **THEN** the DocPage renders a comparison page with a feature table showing what Core does vs what Hub does, when to use each, and how they work together

#### Scenario: Hub docs appear in sidebar navigation
- **WHEN** the user views any documentation page
- **THEN** the DocsSidebar includes a "Hub" section with links to the three hub docs
- **AND** the hub section is visually grouped (heading or separator)

#### Scenario: Hub docs appear in DocsDropdown
- **WHEN** the user opens the Docs dropdown from the Navbar
- **THEN** hub doc entries appear grouped under a "Hub" label

### Requirement: Hub documentation content files
The system SHALL include markdown content for hub documentation either as static files in the docs infrastructure or as inline content in the docs registry, consistent with how existing docs are handled.

#### Scenario: Documentation content is accurate
- **WHEN** any hub documentation page renders
- **THEN** the content accurately reflects specrails-desktop v1.25.0 features and installation process
- **AND** code examples use current CLI commands and configuration syntax
