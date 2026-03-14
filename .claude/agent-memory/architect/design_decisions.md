---
name: design_decisions
description: Recurring architectural decisions and rationale for specrails-web
type: project
---

## Markdown rendering approach

Use Vite `?raw` imports for static markdown — not runtime fetch. Requires a `declare module "*.md?raw"` TypeScript declaration. Registry pattern (centralized `DOC_ENTRIES` array) is mandatory because `?raw` imports must be static (no dynamic import with variable path).

## Docs typography

Do NOT use `@tailwindcss/typography`'s `prose` class — it assumes light mode and fights the Dracula theme. Use a custom `.docs-prose` CSS class with Dracula token overrides.

## Syntax highlighting

Use `rehype-highlight` + `highlight.js` (not Prism) because `highlight.js` has a native Dracula-compatible theme and the token CSS classes (`.hljs-keyword` etc.) can be overridden directly with Dracula CSS variables.

## NavigationMenu vs DropdownMenu

For site-level nav: use `NavigationMenu` (Radix). For contextual/action menus: use `DropdownMenu`. `NavigationMenu` has proper ARIA nav semantics.

## Nested routes for layouts with sidebars

Always use nested routes (`<Route element={<Layout />}><Route .../></Route>`) when a layout (navbar + sidebar) should persist across child navigation. Flat routes remount the entire layout on each navigation, losing sidebar scroll position.

## No mobile menu on Navbar

Current Navbar has no mobile menu — pre-existing gap. Do not add a mobile hamburger for the main nav links as a side effect of other features. Flag it as a known gap and leave it for a dedicated task.
