# product-narrative Specification

## Purpose
Define how specrails.dev presents Specrails: Specrails Desktop, plus Companion, is the product people install, and Specrails Core is the engine built into Desktop rather than a separate package or CLI. These requirements cover every place a visitor or an agent can meet Core on the site — the guide, the download page, legacy links, the agent index — and keep the repository from following Core releases.

## Requirements
### Requirement: Desktop is the only Specrails software people install
The website SHALL present Specrails Desktop — the native installers or the `specrails-desktop` npm distribution — as the only Specrails software a person installs, besides the AI provider CLI they choose. The website MUST NOT publish install, update or run instructions for `specrails-core`, including `npx specrails-core` commands, and MUST NOT publish a standalone Core product page, CLI reference or Core-versus-Desktop comparison.

#### Scenario: Download page states what the installer includes
- **WHEN** a visitor opens `/download` in any supported language
- **THEN** the page states that the installer includes Specrails Core and that Core is not installed separately

#### Scenario: No published page tells people to install Core
- **WHEN** the site is built
- **THEN** no route, published guide article or static file tells people to install `specrails-core` or run `npx specrails-core`

### Requirement: The guide explains Specrails Core as Desktop's built-in engine
The overview article of the guide SHALL explain, in every supported language, that Specrails Core is the engine included in Desktop: Desktop uses it to prepare projects, and the built-in Implement and Batch Implement loops use it to plan, develop, verify and review changes. The overview SHALL contain a heading stating that Core is built into Desktop and SHALL point to Desktop Settings → Updates → Specrails Core for the version in use and its updates. Any guide article that mentions Core MUST describe it as part of Desktop, never as something people install, run or update by hand.

#### Scenario: Searching the docs for Core
- **WHEN** a visitor searches the documentation for "core"
- **THEN** the results include the overview article through its "Core is built into Desktop" heading

#### Scenario: Setup reports a Core problem
- **WHEN** the install article describes a missing runtime or a pending update
- **THEN** it tells people to resolve it in Desktop, from the Specrails Core section and its Finish updating action, instead of installing Core by hand

### Requirement: Legacy Core links resolve to the explanation
The route `/core` SHALL redirect to `/docs/getting-started#core-is-built-into-desktop`.

#### Scenario: Opening an old Core link
- **WHEN** a visitor opens `https://specrails.dev/core`
- **THEN** the site replaces the location with the guide overview anchored at "Core is built into Desktop"

### Requirement: The agent index states the product facts
`/llms.txt` SHALL state that Specrails Desktop is the only Specrails software to install, that Specrails Core (the `specrails-core` package) is the engine built into Desktop, and that agents must not suggest installing `specrails-core` or running `npx specrails-core`. It SHALL keep linking to the MCP connection runbooks.

#### Scenario: An agent reads llms.txt
- **WHEN** an agent fetches `/llms.txt`
- **THEN** it finds the product facts followed by the MCP connection instructions and runbook links

### Requirement: The website does not follow Core releases
The website repository MUST NOT depend on the `specrails-core` package or run workflows triggered by Core releases. Links to the product's source code and issue tracker SHALL point to the specrails-desktop repository.

#### Scenario: Core publishes a release
- **WHEN** specrails-core publishes a new version
- **THEN** no dependency update, pull request or deployment starts in the website repository

#### Scenario: Following a GitHub link on the site
- **WHEN** a visitor follows the GitHub link in the navigation, footer or download page
- **THEN** it opens the specrails-desktop repository

