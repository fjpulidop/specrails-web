## Why

specrails.dev currently lacks proper on-page SEO infrastructure — no canonical URLs, no structured data, no sitemap, and the primary keyword "AI coding assistant" (18.1K monthly searches) is absent from titles and descriptions. Addressing this now unlocks organic discovery during early product growth.

## What Changes

- Update `index.html` with canonical URL, optimized title/description targeting "AI coding assistant", and JSON-LD structured data (SoftwareApplication schema)
- Create `useSeo` hook for per-page meta tag management (title, description, canonical)
- Apply `useSeo` in all route pages: `/`, `/docs`, `/docs/:slug`, `/agents`
- Add `public/sitemap.xml` covering all known static and doc routes
- Update `public/robots.txt` to reference sitemap
- Add Vitest unit tests for the `useSeo` hook

## Capabilities

### New Capabilities
- `on-page-seo`: SEO infrastructure — canonical URLs, JSON-LD structured data, per-page meta tags, sitemap.xml, and robots.txt configuration for specrails.dev

### Modified Capabilities
<!-- No existing specs require requirement-level changes -->

## Impact

- `index.html`: updated meta title, description, OG tags, Twitter tags; new canonical link and JSON-LD script
- `src/hooks/useSeo.ts`: new hook (no existing code modified)
- `src/pages/Index.tsx`, `DocPage.tsx`, `DocsIndex.tsx`, `AgentsPage.tsx`: each calls `useSeo`
- `public/sitemap.xml`: new static file
- `public/robots.txt`: add Sitemap directive
- No new npm dependencies required
