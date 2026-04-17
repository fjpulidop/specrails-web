## MODIFIED Requirements

### Requirement: Products comparison section
The system SHALL render a ProductsSection component between ProblemSection and AgentsSection on the home page. The section SHALL display two side-by-side cards: specrails-core ("The Engine") on the left and specrails-hub ("The Control Center") on the right. Each card SHALL include the product name, a tagline, an icon, and 4-5 key capability bullet points. Each card SHALL have an individual CTA button. A visual connector element between the cards SHALL indicate the products work together.

#### Scenario: Desktop layout displays two cards side by side
- **WHEN** the user views the home page on a viewport >= 1024px
- **THEN** the ProductsSection renders with two cards in a horizontal grid (2 columns)
- **AND** the left card shows specrails-core with Terminal icon, tagline "The Engine", and capabilities: 14 AI Agents, Structured Pipeline, Institutional Memory, Parallel Execution, Confidence Scoring
- **AND** the right card shows specrails-hub with LayoutDashboard icon, tagline "The Control Center", and capabilities: Multi-Project Dashboard, Real-time Pipeline Visualization, Ticket Management (3 views), Analytics & Cost Tracking, Streaming Logs

#### Scenario: Mobile layout stacks cards vertically
- **WHEN** the user views the home page on a viewport < 1024px
- **THEN** the two product cards stack vertically (Core on top, Hub below)

#### Scenario: Core CTA routes to /core
- **WHEN** the user clicks the Core CTA button
- **THEN** the application navigates to `/core`

#### Scenario: Hub CTA scrolls to hero
- **WHEN** the user clicks the Hub CTA button
- **THEN** the page smooth-scrolls to the top of the hero (`#hero`) so the embedded hub-demo iframe is visible

#### Scenario: Scroll animation on entry
- **WHEN** the ProductsSection enters the viewport
- **THEN** both cards animate in with a fade-up transition using useScrollAnimation
