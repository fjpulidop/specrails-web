## ADDED Requirements

### Requirement: Hub showcase section with interactive iframe demo
The system SHALL render a HubShowcase section on the home page after PipelineSection. The section SHALL embed an iframe pointing to `/hub-demo/index.html` which contains a static build of the real specrails-desktop client with mock data. The iframe SHALL be read-only (no write operations).

#### Scenario: Desktop renders interactive iframe with toolbar
- **WHEN** the user views the hub-showcase section on a viewport >= 1024px
- **THEN** the system renders a toolbar with navigation buttons: Dashboard, Tickets, Analytics, Activity
- **AND** below the toolbar, an iframe loads the hub demo at `/hub-demo/index.html`
- **AND** the iframe has a 16:10 aspect ratio with responsive width (max-width: 1200px)
- **AND** a browser chrome wrapper displays a fake address bar showing `localhost:4200`

#### Scenario: Toolbar navigation controls iframe
- **WHEN** the user clicks a toolbar button (e.g., "Tickets")
- **THEN** the system sends a postMessage to the iframe with the target route
- **AND** the iframe navigates to the corresponding view

#### Scenario: Iframe lazy-loads on scroll
- **WHEN** the hub-showcase section is not visible in the viewport
- **THEN** the iframe SHALL NOT load (no src attribute set)
- **WHEN** the section enters the viewport (IntersectionObserver)
- **THEN** the iframe src is set and loading begins with a skeleton placeholder

#### Scenario: Mobile shows screenshot carousel instead of iframe
- **WHEN** the user views the hub-showcase section on a viewport < 1024px
- **THEN** the system renders a horizontal carousel of curated hub screenshots instead of the iframe
- **AND** the carousel has swipe navigation and dot indicators

#### Scenario: Section heading and context
- **WHEN** the hub-showcase section renders
- **THEN** a heading "The Control Center" with gradient text is displayed
- **AND** a subtitle explains "See your AI pipeline in action — real specrails-desktop interface with live data visualization"
- **AND** a "Powered by specrails-desktop" badge appears

### Requirement: Hub demo static build
The system SHALL include a self-contained static build of the specrails-desktop client in `public/hub-demo/`. This build SHALL use mock data fixtures instead of a backend API. All mutation operations (create, update, delete) SHALL be disabled with a tooltip "Available in full installation".

#### Scenario: Demo loads without backend
- **WHEN** the hub demo iframe loads
- **THEN** it renders the hub dashboard UI using static JSON fixtures
- **AND** no network requests to port 4200 or any backend are made

#### Scenario: Demo shows realistic data
- **WHEN** the hub demo renders the dashboard
- **THEN** it shows mock projects (e.g., "acme-api", "dashboard-v2"), mock tickets, mock job history, and mock analytics data
- **AND** the Pipeline phase indicator shows a realistic state

#### Scenario: Mutation buttons are disabled
- **WHEN** the user clicks a create/edit/delete button in the demo
- **THEN** a tooltip appears: "Available in full installation"
- **AND** no state changes occur

#### Scenario: Demo navigation works
- **WHEN** the user clicks navigation elements within the demo iframe
- **THEN** React Router navigates between Dashboard, Tickets, Analytics, and Activity views
- **AND** the URL inside the iframe updates but does not affect the parent page URL
