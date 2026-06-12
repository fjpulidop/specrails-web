## ADDED Requirements

### Requirement: Hub entries in navbar navigation
The system SHALL add hub-related navigation entries to the existing Navbar component. A "Hub" link SHALL appear in the desktop navbar that scrolls to the hub-showcase section. Hub documentation entries SHALL appear in the DocsDropdown component.

#### Scenario: Desktop navbar shows Hub link
- **WHEN** the user views the navbar on desktop (>= 768px)
- **THEN** a "Hub" link appears in the navigation links between "Commands" and "Docs"
- **AND** clicking "Hub" scrolls to the `#hub-showcase` section on the home page

#### Scenario: DocsDropdown includes hub documentation
- **WHEN** the user opens the Docs dropdown in the navbar
- **THEN** hub documentation entries appear in a "Hub" group: Hub Installation, Hub Features, Core vs Hub

#### Scenario: Hub link active state
- **WHEN** the hub-showcase section is in the viewport
- **THEN** the "Hub" nav link shows an active/highlighted state

### Requirement: Updated hero section with dual CTAs
The system SHALL update the HeroSection to reflect the dual-product positioning. The hero SHALL include two primary CTAs: one for Core installation and one for Hub.

#### Scenario: Hero displays dual-product messaging
- **WHEN** the hero section renders
- **THEN** the tagline reflects the umbrella brand: "Your Agentic Development Team"
- **AND** a subtitle mentions both products: "From idea to production code with specrails-core. Visualize everything with specrails-desktop."

#### Scenario: Dual CTA buttons
- **WHEN** the hero section renders
- **THEN** two CTA buttons are visible below the install terminal
- **AND** the primary CTA "Get Started with Core" scrolls to the install terminal
- **AND** the secondary CTA "Explore the Hub" scrolls to the hub-showcase section

### Requirement: Updated footer with hub links
The system SHALL update the FooterSection to include specrails-desktop links alongside existing specrails-core links.

#### Scenario: Footer shows both product links
- **WHEN** the footer renders
- **THEN** it includes a "Hub" column or section with links to: Hub GitHub repo, Hub documentation, Hub installation guide
- **AND** existing Core links remain unchanged
