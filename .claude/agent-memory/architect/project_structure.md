---
name: project_structure
description: Codebase layout, routing structure, available shadcn/ui components, and key CSS tokens for specrails-web
type: project
---

## Routing

App.tsx uses React Router v6. Currently has only two routes: `/` and `*` (NotFound). New routes go above the `*` catch-all. The comment `{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}` marks the insertion point.

## Navbar

`src/components/Navbar.tsx` is a minimal component with no routing dependencies. It uses plain `<a>` tags for anchor-scroll links (not React Router `<Link>`). The desktop nav is `hidden md:flex`. There is no mobile menu — this is a pre-existing gap.

## shadcn/ui Components Installed

All standard shadcn/ui components are available in `src/components/ui/`. Key ones for new features:
- `navigation-menu` — use for site-level nav dropdowns
- `sheet` — use for mobile slide-in drawers
- `button`, `card`, `badge`, `separator`, `scroll-area`

## CSS Architecture

All theme tokens are in `src/index.css` as CSS custom properties under `:root`. Tailwind utility classes exist for all Dracula tokens: `.text-dracula-*`, `.bg-dracula-*`, `.border-dracula-*`. Key utility classes: `.glass-card`, `.terminal`, `.gradient-text`, `.gradient-btn`.

Fonts: Inter (body, `font-sans`), JetBrains Mono (code, `font-mono`).

## Testing

Tests live in `src/test/`. Runner is Vitest. Components use `@testing-library/react`. Any component using React Router hooks needs `MemoryRouter` wrapper in tests.

## Static Assets

`docs/` folder at repo root contains 8 markdown files. These are imported via Vite `?raw` suffix for the docs section. TypeScript declaration needed: `declare module "*.md?raw" { const content: string; export default content; }`.

## `@tailwindcss/typography` Status

Installed as devDependency but NOT actively used for styling. Custom `.docs-prose` class in `index.css` is the pattern for markdown typography (avoids light-mode color conflicts from `prose`).
