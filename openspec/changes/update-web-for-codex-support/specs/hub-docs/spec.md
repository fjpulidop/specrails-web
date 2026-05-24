## ADDED Requirements

### Requirement: Codex doc entry in docs registry
The system SHALL include a Codex getting-started entry in `src/lib/docs-registry.ts` whose title and description present the page as a first-class supported topic, not as a future or experimental one.

#### Scenario: Title has no "Coming Soon" suffix
- **WHEN** the Docs sidebar or dropdown lists doc entries
- **THEN** the Codex entry title reads as a plain "Getting Started with OpenAI Codex" (or equivalent) with no "(Coming Soon)" suffix and no 🧪 emoji

#### Scenario: Description has no lab/coming-soon language
- **WHEN** the docs registry entry for the Codex page is read
- **THEN** the `description` field does not contain the strings "Coming Soon", "in Lab", or 🧪

### Requirement: Installation doc treats Codex as supported
The system SHALL render the installation doc (`/docs/installation`) without a "Coming Soon — in Lab" banner for Codex. The Codex CLI SHALL be listed as a peer prerequisite of Claude Code.

#### Scenario: No lab banner on installation doc
- **WHEN** the user navigates to `/docs/installation`
- **THEN** the page contains no "🧪 Codex (OpenAI) Support — Coming Soon (in Lab)" header
- **AND** no Codex line item is suffixed with "Coming Soon" or "in lab"

#### Scenario: Codex CLI listed as prerequisite
- **WHEN** the user reads the prerequisites section of the installation doc
- **THEN** the Codex CLI is listed as an installable AI provider option alongside Claude Code, with a version constraint (≥ 0.128.0) and a link to the Codex CLI install page

### Requirement: Core-vs-Hub doc treats Codex as supported
The system SHALL render the core-vs-hub comparison doc (`/docs/core-vs-hub`) without a "Coming Soon — in Lab" banner for Codex.

#### Scenario: No lab banner on core-vs-hub doc
- **WHEN** the user navigates to `/docs/core-vs-hub`
- **THEN** the page contains no "🧪 Codex (OpenAI) Support — Coming Soon (in Lab)" header

#### Scenario: Interface row mentions both CLIs
- **WHEN** the user reads the comparison table on the core-vs-hub doc
- **THEN** the Interface row continues to read "Claude Code / Codex CLI" (unchanged)

### Requirement: Getting-started doc cross-link to Codex doc is unqualified
The system SHALL update the getting-started doc (`/docs/getting-started`) so that the cross-link to the Codex variant does not advertise Codex as "Coming Soon".

#### Scenario: Codex cross-link wording
- **WHEN** the user reads the section that points to the Codex variant of getting started
- **THEN** the link text or surrounding sentence does not contain "Coming Soon" or any equivalent future-tense qualifier
