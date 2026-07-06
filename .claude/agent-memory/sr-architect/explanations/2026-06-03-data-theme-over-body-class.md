---
agent: architect
feature: visual-redesign-cyan-light-mode-hero-mesh
tags: [theme, css, tailwind, dark-mode]
date: 2026-06-03
---

## Decision

Use `data-theme="light"/"dark"` on `documentElement` rather than `body.light` class (as the prototype does).

## Why This Approach

The prototype uses `body.light` because it is vanilla JS/CSS. The repo uses shadcn/ui and Tailwind, whose dark-mode convention targets `html` — Tailwind's `dark:` variants require the `.dark` class on `<html>` (the same element as `:root`). Using `data-theme` on `documentElement` avoids a collision with Tailwind's class-based dark mode while still being a first-class CSS attribute selector: `:root[data-theme="light"]` is directly supported in CSS and does not require JavaScript-side class manipulation. It is also more semantically explicit than a bare class and easier to read in devtools.

## Alternatives Considered

- `body.light` class (prototype approach): would work visually but conflicts with Tailwind's dark mode convention on `html` and splits the theme signal across two elements
- `.dark` / `.light` class on `<html>`: would shadow Tailwind's own dark-mode class, risking unexpected behavior if Tailwind dark variants are ever adopted

## See Also

- `src/hooks/useTheme.ts` — sets `document.documentElement.dataset.theme`
- `src/index.css` — `:root[data-theme="light"]` selector
