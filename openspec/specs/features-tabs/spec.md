## ADDED Requirements

### Requirement: Tabbed features section
The system SHALL replace the current single-grid FeaturesSection with a tabbed interface using shadcn/ui Tabs component. Three tabs SHALL be available: "Core", "Hub", and "Together".

#### Scenario: Core tab displays existing feature cards
- **WHEN** the Features section renders
- **THEN** the "Core" tab is selected by default
- **AND** it displays the existing 12 feature cards: CLI Agnostic, VPC, Parallel Execution, Spec-Driven Development, Institutional Memory, Security Gate, Multi-Stack, Smart Setup, Confidence Scoring, Failure Learning Loop, Layer-Specific Reviews, Dependency-Aware Ordering

#### Scenario: Hub tab displays hub feature cards
- **WHEN** the user clicks the "Hub" tab
- **THEN** it displays hub feature cards: Multi-Project Dashboard, Real-time Pipeline Visualization, Ticket Management, Analytics & Cost Tracking, Streaming Logs, Command Launcher, Chat per Project, Keyboard-First UX
- **AND** each card has an icon, title, description, and accent color consistent with existing card design

#### Scenario: Together tab displays combined value cards
- **WHEN** the user clicks the "Together" tab
- **THEN** it displays cards showing combined value propositions: "Core implements, Hub visualizes", "Core learns, Hub reports", "Core ships PRs, Hub tracks progress", "Core runs agents, Hub streams logs"
- **AND** each card references both products with their respective accent colors (cyan for Core, purple for Hub)

#### Scenario: Tab transitions are animated
- **WHEN** the user switches between tabs
- **THEN** the card grid transitions with a smooth fade animation
- **AND** the tab indicator slides to the active tab

#### Scenario: Tab state persists during scroll
- **WHEN** the user selects a tab and scrolls away from the features section
- **AND** then scrolls back
- **THEN** the previously selected tab remains active

### Requirement: Updated roadmap section with dual repos
The system SHALL update the RoadmapSection to display GitHub issues from both specrails-core and specrails-desktop repositories.

#### Scenario: Roadmap shows issues from both repos
- **WHEN** the Roadmap section renders
- **THEN** it fetches issues from both `fjpulidop/specrails-core` and `fjpulidop/specrails-desktop`
- **AND** each issue card displays a product badge ("Core" or "Hub") with the respective accent color

#### Scenario: Roadmap allows filtering by product
- **WHEN** the user clicks a filter button (All / Core / Hub)
- **THEN** the issue list filters to show only issues from the selected repo
- **AND** "All" is selected by default
