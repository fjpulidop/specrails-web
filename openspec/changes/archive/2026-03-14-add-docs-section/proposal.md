# Proposal: Add Docs Section with Navigation and Markdown Rendering

## What

Add a `/docs/*` section to specrails.dev that renders the existing `docs/*.md` files as polished, Dracula-themed web pages. Include a "Docs" dropdown in the Navbar and a sidebar layout for navigating between doc pages.

## Why

The documentation already exists as markdown files in the repo but is only accessible on GitHub, where it receives default styling and no branding. Visitors to specrails.dev who want to learn how to use SpecRails have no in-product documentation experience. A proper docs section improves discoverability, perceived quality, and enables future SEO for docs-related searches.

## Non-goals

- No server-side rendering or static generation — docs are imported as raw strings at build time via Vite's `?raw` suffix
- No search functionality in this change
- No versioned docs
- No external CMS or content pipeline — the `docs/` folder in the repo remains the source of truth

## Scope

**Pages added:** 8 routes (`/docs`, `/docs/getting-started`, `/docs/concepts`, `/docs/installation`, `/docs/agents`, `/docs/workflows`, `/docs/customization`, `/docs/updating`)

**Components added:** `DocsDropdown`, `DocsSidebar`, `MarkdownRenderer`

**Pages added:** `DocsLayout`, `DocPage`

**Modified:** `Navbar.tsx`, `App.tsx`, all `docs/*.md` files (internal link transformation)

**New dependencies:** `react-markdown`, `remark-gfm`, `rehype-highlight`, `highlight.js`

## Success criteria

- All 8 doc routes render correctly with Dracula-themed typography
- Code blocks are syntax-highlighted with Dracula colors
- ASCII diagrams and tables render cleanly
- Sidebar collapses on mobile, accessible via a toggle
- "Docs" item appears in the navbar with a dropdown listing all pages
- Internal markdown links navigate within the SPA without full-page reload
- TypeScript strict mode passes, lint passes, build passes
