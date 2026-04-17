## MODIFIED Requirements

### Requirement: Hub entries in navbar navigation
The system SHALL update the Navbar to reflect the Hub-first landing structure. The navbar SHALL include a visible Download pill button and a Core link. The legacy `Hub` link that scrolled to `#hub-showcase` SHALL be removed (the hero is now the Hub) or repointed to `#hero`. DocsDropdown hub documentation entries are unchanged.

#### Scenario: Desktop navbar order
- **WHEN** the user views the navbar on desktop (>= 768px)
- **THEN** the visible navigation items, from left to right, are: Problem, Agents, Pipeline, Features, Commands, Core, Docs, Download pill, GitHub icon

#### Scenario: Core link
- **WHEN** the user clicks the Core entry in the navbar
- **THEN** the application navigates to `/core`

#### Scenario: Download pill triggers direct download
- **WHEN** the user clicks the Download pill in the navbar
- **THEN** the browser initiates a download of the `.dmg` referenced by `manifest.platforms["darwin-arm64"].url` (same URL used by the hero Download CTA)

#### Scenario: Download pill fallback when manifest is unavailable
- **WHEN** the manifest fetch has failed or not yet completed and the user clicks the Download pill
- **THEN** the browser opens `https://github.com/fjpulidop/specrails-hub/releases/latest` in a new tab

#### Scenario: Legacy Hub nav link is absent
- **WHEN** the user views the navbar
- **THEN** there is no nav link whose `href` is `#hub-showcase`

#### Scenario: DocsDropdown includes hub documentation
- **WHEN** the user opens the Docs dropdown in the navbar
- **THEN** hub documentation entries appear in a "Hub" group: Hub Installation, Hub Features, Core vs Hub

### Requirement: Updated hero section with dual CTAs
The system SHALL render a Hub-first HeroSection whose primary content is an embedded, product-identical iframe of the hub-demo build framed by browser chrome. The hero SHALL include a Download for Mac CTA and a View on GitHub CTA. The hero SHALL surface the current released version and platform constraint beneath the Download CTA by reading from `manifest.json`. Core is represented by a single text link at the bottom of the hero.

#### Scenario: Hero embeds the hub-demo iframe on desktop
- **WHEN** the hero renders on a viewport >= 1024px
- **THEN** the system renders a browser-chrome frame at the focal point of the hero
- **AND** an iframe whose `src` is `/hub-demo/index.html` is lazy-loaded (IntersectionObserver) into that frame once the hero is visible
- **AND** the iframe fills the chrome area at a 16:10 aspect ratio

#### Scenario: Hero shows static screenshot on mobile
- **WHEN** the hero renders on a viewport < 1024px
- **THEN** no iframe is mounted
- **AND** the browser-chrome frame contains a static hero screenshot image (e.g. `/public/hero-hub-screenshot.webp`)
- **AND** a small caption reads (or equivalent): "Download for Mac to see the real thing"

#### Scenario: Download CTA is an anchor with download attribute
- **WHEN** the hero renders with a successfully loaded manifest
- **THEN** the Download for Mac CTA is an `<a>` element whose `href` equals `manifest.platforms["darwin-arm64"].url` and whose `download` attribute is present
- **AND** the button label contains the text "Download for Mac"

#### Scenario: Version pill under Download CTA
- **WHEN** the hero renders with a successfully loaded manifest whose `version` is `X`
- **THEN** immediately under the Download CTA a small pill is rendered whose text contains both `vX` and the phrase "Apple Silicon only"

#### Scenario: Download CTA loading state
- **WHEN** the hero renders before the manifest fetch has completed
- **THEN** the Download CTA is present, visually muted, and non-interactive, with no `href` attribute or a `disabled` prop equivalent

#### Scenario: Download CTA fallback on fetch failure
- **WHEN** the hero renders and the manifest fetch has failed
- **THEN** the Download CTA's `href` equals `https://github.com/fjpulidop/specrails-hub/releases/latest`
- **AND** the version pill renders without a `v…` version string, showing only "Apple Silicon only"

#### Scenario: View on GitHub CTA
- **WHEN** the hero renders
- **THEN** a "View on GitHub" CTA is visible next to the Download CTA whose `href` equals `https://github.com/fjpulidop/specrails-hub`

#### Scenario: Core text link at bottom of hero
- **WHEN** the hero renders
- **THEN** a small, muted text link whose label contains "Core" (e.g. "Prefer the CLI? → specrails-core") appears near the bottom of the hero and navigates to `/core`

#### Scenario: No dual-product switcher
- **WHEN** the hero renders
- **THEN** no toggle / switcher component for selecting between Core and Hub is rendered

#### Scenario: Premium polish layers
- **WHEN** the hero renders with `prefers-reduced-motion: no-preference`
- **THEN** the hero composites the following animated layers, in z-order from back to front: particle background canvas, radial ambient glow with a breathing opacity cycle, subtle noise texture overlay, browser-chrome frame with a purple glow ring, iframe/screenshot content, and a shimmer sweep animation on the Download CTA

#### Scenario: Reduced motion disables decorative animations
- **WHEN** the hero renders with `prefers-reduced-motion: reduce`
- **THEN** the glow breathing, shimmer sweep, and any other decorative motion are static; the iframe still loads and displays its content

#### Scenario: Legacy `#hub-showcase` anchor is not present
- **WHEN** the hero (or any other section of the landing page) renders
- **THEN** no element has `id="hub-showcase"`

### Requirement: Updated footer with hub links
The system SHALL continue to render the FooterSection with both Hub and Core links. Hub links SHALL remain as described. Core links SHALL include an entry pointing to `/core`.

#### Scenario: Footer links include /core
- **WHEN** the footer renders
- **THEN** a link with `href="/core"` is present in the Core section of the footer

#### Scenario: Footer links include Hub GitHub
- **WHEN** the footer renders
- **THEN** a link to `https://github.com/fjpulidop/specrails-hub` is present in the Hub section of the footer

## ADDED Requirements

### Requirement: Release manifest hook
The system SHALL expose a React hook `useReleaseManifest()` that fetches `https://specrails.dev/downloads/specrails-hub/latest/manifest.json` once per page load and returns a discriminated state of `loading`, `ready` (with the parsed manifest), or `error`. The hook SHALL NOT persist the manifest to localStorage or any other durable storage.

#### Scenario: Fetch happens once
- **WHEN** the hook is mounted by multiple components on the same page
- **THEN** exactly one network request is issued to the manifest URL for the lifetime of that page load

#### Scenario: Loading state before resolution
- **WHEN** the hook is mounted and the fetch has not yet resolved
- **THEN** the hook returns a state whose discriminator is `loading`

#### Scenario: Ready state after successful fetch
- **WHEN** the fetch resolves with HTTP 200 and a parseable JSON body whose `schemaVersion` is `1`
- **THEN** the hook returns a state whose discriminator is `ready` and whose payload contains `version`, `releasedAt`, `releaseUrl`, and `platforms`

#### Scenario: Error state on fetch failure
- **WHEN** the fetch fails (network error, non-200 status, or malformed JSON)
- **THEN** the hook returns a state whose discriminator is `error`

#### Scenario: Unknown schemaVersion falls through to error
- **WHEN** the fetch resolves successfully but `schemaVersion` is not `1`
- **THEN** the hook returns a state whose discriminator is `error`
