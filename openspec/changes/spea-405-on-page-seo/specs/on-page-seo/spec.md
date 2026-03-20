## ADDED Requirements

### Requirement: Canonical URL per page
Every page SHALL include a `<link rel="canonical">` element pointing to its canonical URL on `https://specrails.dev`.

#### Scenario: Home page canonical
- **WHEN** a crawler visits `https://specrails.dev/`
- **THEN** the page SHALL include `<link rel="canonical" href="https://specrails.dev/">`

#### Scenario: Agents page canonical
- **WHEN** a crawler visits `https://specrails.dev/agents`
- **THEN** the page SHALL include `<link rel="canonical" href="https://specrails.dev/agents">`

#### Scenario: Docs page canonical
- **WHEN** a crawler visits `https://specrails.dev/docs`
- **THEN** the page SHALL include `<link rel="canonical" href="https://specrails.dev/docs">`

#### Scenario: Doc slug canonical
- **WHEN** a crawler visits `https://specrails.dev/docs/getting-started`
- **THEN** the page SHALL include `<link rel="canonical" href="https://specrails.dev/docs/getting-started">`

### Requirement: Unique title per page
Every page SHALL have a unique `<title>` tag that includes the page name and the site name.

#### Scenario: Home page title contains primary keyword
- **WHEN** the home page renders
- **THEN** `document.title` SHALL contain the string "AI coding assistant" (case-insensitive)

#### Scenario: Agents page has unique title
- **WHEN** the `/agents` page renders
- **THEN** `document.title` SHALL differ from the home page title

#### Scenario: Doc page has content-specific title
- **WHEN** a doc page with slug "getting-started" renders
- **THEN** `document.title` SHALL include the doc's title and "specrails"

### Requirement: Unique meta description per page
Every page SHALL have a unique `<meta name="description">` tag relevant to page content.

#### Scenario: Home page description contains primary keyword
- **WHEN** the home page renders
- **THEN** the meta description SHALL contain "AI coding assistant" (case-insensitive)

#### Scenario: Agents page has unique description
- **WHEN** the `/agents` page renders
- **THEN** the meta description SHALL differ from the home page description

### Requirement: Open Graph tags on home page
The home page SHALL include Open Graph meta tags for social sharing.

#### Scenario: OG tags present on home page
- **WHEN** a social crawler fetches `https://specrails.dev/`
- **THEN** the static HTML SHALL include `og:title`, `og:description`, `og:image`, and `og:url` meta tags

### Requirement: Twitter Card tags on home page
The home page SHALL include Twitter Card meta tags for Twitter/X sharing.

#### Scenario: Twitter Card tags present on home page
- **WHEN** a Twitter crawler fetches `https://specrails.dev/`
- **THEN** the static HTML SHALL include `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` meta tags

### Requirement: Structured data JSON-LD
The home page SHALL include a JSON-LD `<script>` block with `SoftwareApplication` schema.

#### Scenario: JSON-LD present and parseable
- **WHEN** Google's structured data tool processes `https://specrails.dev/`
- **THEN** the page SHALL contain a valid `SoftwareApplication` JSON-LD block with `name`, `description`, `applicationCategory`, `operatingSystem`, and `offers` fields

### Requirement: sitemap.xml
The site SHALL expose a sitemap at `https://specrails.dev/sitemap.xml` listing all crawlable pages.

#### Scenario: Sitemap is accessible
- **WHEN** a crawler fetches `https://specrails.dev/sitemap.xml`
- **THEN** the response SHALL be valid XML with `<urlset>` root and at least one `<url>` entry per route

#### Scenario: Sitemap includes all static routes
- **WHEN** the sitemap is parsed
- **THEN** it SHALL include entries for `/`, `/docs`, and `/agents` plus all 14 doc slugs

### Requirement: robots.txt references sitemap
The `robots.txt` file SHALL include a `Sitemap:` directive.

#### Scenario: Sitemap directive present
- **WHEN** a crawler fetches `https://specrails.dev/robots.txt`
- **THEN** the file SHALL contain `Sitemap: https://specrails.dev/sitemap.xml`
