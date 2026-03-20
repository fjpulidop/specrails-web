## Context

specrails.dev is a static React 18 SPA (Vite + SWC) with no SSR. It has four routes: `/`, `/docs`, `/docs/:slug` (14 doc slugs), and `/agents`. The current `index.html` has basic OG and Twitter meta tags but is missing canonical URLs, structured data, and the primary keyword target. Googlebot renders JavaScript, so dynamic meta updates via JS hooks are indexed. Social crawlers (Facebook, Twitter) read static HTML only — hence the static meta tags in `index.html` remain authoritative for social sharing of the homepage.

## Goals / Non-Goals

**Goals:**
- Lighthouse SEO score ≥ 95 on all pages
- Structured data (SoftwareApplication) validated by Google Rich Results Test
- Unique `<title>` and meta description per page
- Canonical URL on every page
- sitemap.xml covering all routes
- robots.txt with Sitemap directive

**Non-Goals:**
- SSR or pre-rendering — out of scope, no infrastructure change
- Dynamic sitemap generation from CMS — docs slugs are hardcoded in `docs-registry.ts`
- Open Graph per-page customization for doc pages — homepage OG tags serve social sharing adequately
- Structured data for documentation pages — SoftwareApplication schema on homepage is sufficient

## Decisions

### 1. `useSeo` hook via `useEffect` (no third-party library)

`react-helmet-async` would require wrapping the entire app in `HelmetProvider` and adding a dependency. Since this is a static SPA with no SSR, direct DOM manipulation via `useEffect` is equivalent for Googlebot rendering. We avoid an external dependency and keep the bundle lean.

**Alternative considered:** `react-helmet-async` — rejected to avoid dependency overhead.

### 2. Static `sitemap.xml` in `public/`

Doc slugs are defined statically in `docs-registry.ts`. A static XML file is simpler than a Vite plugin-based generator. Any new doc added to the registry requires a manual sitemap update — acceptable given the low change frequency of the doc registry.

**Alternative considered:** `vite-plugin-sitemap` — adds dependency, overkill for 17 known URLs.

### 3. JSON-LD in `index.html` `<script>` tag

Structured data is static and tied to the product (not per-page content). Injecting it once in `index.html` is idiomatic and avoids runtime DOM manipulation. The `SoftwareApplication` schema is the most applicable Schema.org type for a developer tool SaaS.

### 4. Keyword-optimized title: "specrails — AI Coding Assistant for Dev Teams"

Targets the primary keyword "AI coding assistant" (Vol: 18.1K) while keeping the brand-first format. 60 chars — within the 50–60 char sweet spot for Google.

## Risks / Trade-offs

- **SPA canonical drift**: `useSeo` updates `<link rel="canonical">` dynamically. If JS is slow to render, crawlers may briefly see the homepage canonical. Mitigation: add a default canonical (`https://specrails.dev/`) in `index.html` as fallback.
- **Static sitemap staleness**: New doc pages added to the registry won't appear in sitemap until manually updated. Mitigation: note this in a comment inside `sitemap.xml`.
- **`useEffect` timing**: Dynamic title/meta updates happen after first paint. Google renders fully so this is acceptable; does not affect social sharing.

## Migration Plan

1. Update `index.html` (canonical, title, description, JSON-LD)
2. Create `useSeo` hook
3. Update four page components to call `useSeo`
4. Add `public/sitemap.xml`
5. Update `public/robots.txt`
6. Add Vitest test for `useSeo`
7. Run lint, type-check, tests; commit; push to PR

Rollback: revert commit — no database or infrastructure changes.

## Open Questions

None — all decisions resolved above.
