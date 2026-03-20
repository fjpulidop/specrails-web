## 1. index.html updates

- [x] 1.1 Update `<title>` to "specrails — AI Coding Assistant for Dev Teams" (60 chars, keyword-optimized)
- [x] 1.2 Update `<meta name="description">` to include "AI coding assistant" keyword
- [x] 1.3 Update `og:title` and `og:description` to match new title/description
- [x] 1.4 Update `twitter:title` and `twitter:description` to match
- [x] 1.5 Add `<link rel="canonical" href="https://specrails.dev/" />`
- [x] 1.6 Add `<meta name="robots" content="index, follow" />`
- [x] 1.7 Add JSON-LD `<script type="application/ld+json">` block with SoftwareApplication schema

## 2. useSeo hook

- [x] 2.1 Create `src/hooks/useSeo.ts` with `useSeo({ title, description, canonical })` hook
- [x] 2.2 Hook updates `document.title`, `meta[name="description"]`, and `link[rel="canonical"]` via `useEffect`

## 3. Page updates

- [x] 3.1 Update `src/pages/Index.tsx` — call `useSeo` with home page title/description/canonical
- [x] 3.2 Update `src/pages/DocsIndex.tsx` — call `useSeo` with docs index title/description/canonical
- [x] 3.3 Update `src/pages/DocPage.tsx` — call `useSeo` with doc-specific title (from registry), description, and canonical
- [x] 3.4 Update `src/pages/AgentsPage.tsx` — call `useSeo` with agents page title/description/canonical

## 4. Static assets

- [x] 4.1 Create `public/sitemap.xml` with all 17 URLs: `/`, `/docs`, `/agents`, plus 14 doc slugs
- [x] 4.2 Update `public/robots.txt` to add `Sitemap: https://specrails.dev/sitemap.xml`

## 5. Tests

- [x] 5.1 Create `src/test/useSeo.test.ts` — verify hook sets `document.title`, meta description, and canonical link element
- [x] 5.2 Run full test suite (`npm test`) — all tests pass (104/104)
- [x] 5.3 Run type-check (`npx tsc --noEmit`) — no errors
- [x] 5.4 Run lint (`npm run lint`) — no new errors introduced (4 pre-existing errors in shadcn/ui, unrelated to this change)
