---
name: common-failures
description: CI failure patterns, pre-existing lint baseline, and recurring issues in this repo
type: project
---

## Pre-existing lint errors (as of 2026-03-14, branch feat/landing-polish)

The repo has 32 lint errors / 7 warnings that pre-date any feature work. These are NOT regressions:

**Files with pre-existing errors:**
- `.claude/web-manager/server/hooks.test.ts` — `@typescript-eslint/no-explicit-any`
- `.claude/web-manager/server/index.test.ts` — `@typescript-eslint/no-explicit-any`
- `.claude/web-manager/server/index.ts` — `@typescript-eslint/no-require-imports`
- `.claude/web-manager/server/spawner.test.ts` — `@typescript-eslint/no-explicit-any`
- `src/components/ui/command.tsx` — `@typescript-eslint/no-empty-object-type`
- `src/components/ui/textarea.tsx` — `@typescript-eslint/no-empty-object-type`
- `tailwind.config.ts` — `@typescript-eslint/no-require-imports`
- Several `src/components/ui/*.tsx` — `react-refresh/only-export-components` warnings

**How to apply:** When running lint, confirm new files introduce 0 new errors. Use `git stash` / `git stash pop` to compare against base if in doubt.

## Docs section pattern (add-docs-section, 2026-03-14)

- `?raw` Vite imports require a declaration file at `src/types/raw-imports.d.ts`
- `MarkdownRenderer` tests require `MemoryRouter` wrapper since the component uses React Router `<Link>`
- `highlight.js` token colors in CSS must use `hsl(var(--dracula-*))` — never raw hex/rgb
- `DocsLayout` uses nested React Router `<Route>` with `<Outlet>` pattern correctly
- All CI checks passed with zero issues introduced by the feature
