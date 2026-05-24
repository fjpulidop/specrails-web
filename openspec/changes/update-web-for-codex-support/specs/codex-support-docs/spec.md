## ADDED Requirements

### Requirement: Codex getting-started documentation page
The system SHALL serve a Codex getting-started page at `/docs/codex-getting-started` containing first-time setup instructions for using the OpenAI Codex CLI with specrails-hub. The page SHALL NOT carry a "Coming Soon" or "in Lab" banner.

#### Scenario: User reaches the Codex doc
- **WHEN** the user navigates to `/docs/codex-getting-started`
- **THEN** the DocPage renders the Codex getting-started content
- **AND** the page contains no "Coming Soon", "🧪", or "in Lab" text

#### Scenario: Prerequisites are listed
- **WHEN** the user reads the Codex doc
- **THEN** the prerequisites section names: codex CLI version ≥ 0.128.0, an authentication option (`codex login` OR setting `OPENAI_API_KEY`), and specrails-core ≥ 4.6.0

#### Scenario: Add-project flow is documented
- **WHEN** the user reads the "Adding a Codex project" section
- **THEN** it instructs the user to open the hub UI, click Add Project, pick a path, and select the Codex provider in the AI provider row
- **AND** it lists what gets created on disk: `.codex/config.toml`, `.codex/skills/`, `AGENTS.md`

#### Scenario: Differences vs Claude are explicit
- **WHEN** the user reads the "Differences vs Claude" section
- **THEN** the section states that cost is estimated for Codex (not reported natively by the CLI)
- **AND** it states that switching provider after project creation is not supported
- **AND** it states that plugins require `providerSupport.codex` in their manifest to apply to Codex projects
- **AND** it states that codex session resume re-feeds prior context, causing input-token accumulation on long sessions

#### Scenario: Doc links out to canonical hub source
- **WHEN** the user finishes reading the web Codex doc
- **THEN** the doc contains a link to `specrails-hub/docs/codex.md` (or the rendered hub doc URL) for architecture/deep-dive material

### Requirement: Codex provider mentioned in landing copy
The system SHALL update landing-page surfaces that currently mention "Claude Code" alone to mention both Claude Code and Codex as supported providers, using the phrasing "Claude Code & Codex" (or equivalent dual-mention form).

#### Scenario: Hero section mentions both providers
- **WHEN** the user loads the landing page (`/`)
- **THEN** the hero copy references both Claude Code and Codex as supported AI providers

#### Scenario: Features section mentions both providers
- **WHEN** the user views the Features section on the landing page
- **THEN** the feature item that previously read "Built on Claude Code" / "Native Claude Code integration" now references both Claude Code and Codex

#### Scenario: Core page mentions both providers
- **WHEN** the user navigates to the Core product page
- **THEN** the headline that previously read "Works with Claude Code" now references both Claude Code and Codex

#### Scenario: HTML meta description mentions both providers
- **WHEN** a crawler reads `index.html`
- **THEN** the meta description names both Claude Code and Codex
- **AND** the description remains under 160 characters

### Requirement: README accurately describes Codex support
The system SHALL update the repository `README.md` so it no longer states that Codex support is upcoming or pending shipment.

#### Scenario: README states Codex is supported
- **WHEN** a reader opens `README.md`
- **THEN** the text reflects that specrails currently supports both Claude Code and Codex
- **AND** no sentence says "when Codex support ships" or equivalent future-tense wording
