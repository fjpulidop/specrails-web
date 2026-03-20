## ADDED Requirements

### Requirement: Waitlist section renders on landing page
The landing page SHALL display a `WaitlistSection` component between `RoadmapSection` and `FooterSection`. The section SHALL have the id attribute `waitlist` and be included in the `SectionNav` ids list.

#### Scenario: Section is visible on landing page
- **WHEN** a user visits specrails.dev
- **THEN** the waitlist section is rendered between the roadmap and footer sections

#### Scenario: Section is navigable via SectionNav
- **WHEN** the SectionNav renders the landing page
- **THEN** `waitlist` is included in the list of section ids

### Requirement: Email capture form
The waitlist section SHALL contain an email input field and a submit button labeled "Join the Waitlist". The headline SHALL be ≤12 words and convey the value proposition.

#### Scenario: Form renders with headline and input
- **WHEN** the WaitlistSection component mounts
- **THEN** a heading, email input, and submit button are visible

#### Scenario: Submit button is disabled while email is empty
- **WHEN** the email input is empty
- **THEN** the submit button SHALL be disabled

#### Scenario: Submit button is enabled with valid email
- **WHEN** the user types a valid email address into the input
- **THEN** the submit button SHALL be enabled

### Requirement: Form submission via Formspree
On submit, the component SHALL POST the email to the configured Formspree endpoint (`https://formspree.io/f/REPLACE_ME`). The endpoint URL SHALL be documented with a TODO comment indicating it must be replaced before deployment.

#### Scenario: Loading state during submission
- **WHEN** the user submits the form
- **THEN** the button SHALL display a loading indicator and be disabled until the request resolves

#### Scenario: Success state after submission
- **WHEN** the Formspree endpoint returns a 200 response
- **THEN** the form SHALL be replaced by a success message confirming the email was received

#### Scenario: Error state after failed submission
- **WHEN** the Formspree endpoint returns a non-200 response or the request fails
- **THEN** an inline error message SHALL be displayed and the form SHALL remain interactive so the user can retry

### Requirement: Mobile-first responsive layout
The section SHALL render correctly on mobile (≥320px) and desktop (≥1024px). On mobile the email input and button SHALL stack vertically; on desktop they MAY render in a row.

#### Scenario: Mobile layout
- **WHEN** the viewport width is less than 640px
- **THEN** the input and button render in a column layout

#### Scenario: Desktop layout
- **WHEN** the viewport width is 640px or wider
- **THEN** the input and button render in a row layout

### Requirement: Dracula theme compliance
The section SHALL use only Dracula CSS custom property tokens for colors (no arbitrary Tailwind color values). The section background SHALL use the `section-darker` utility class consistent with the rest of the landing page.

#### Scenario: Dracula tokens used for all colors
- **WHEN** the component is rendered
- **THEN** no arbitrary color values (e.g., `bg-[#123456]`) SHALL appear in its class list
