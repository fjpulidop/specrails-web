---
agent: architect
feature: visual-redesign-cyan-light-mode-hero-mesh
tags: [canvas, css-tokens, theme, runtime]
date: 2026-06-03
---

## Decision

The canvas engine reads Dracula color tokens via `getComputedStyle(document.documentElement)` at runtime on each frame rather than accepting a palette as React props.

## Why This Approach

The canvas must recolor immediately when the user toggles the theme. If the palette were passed as props, the component would need to re-render on every theme change, which triggers a full effect teardown and re-mount of the canvas engine — resetting all animation state (beam positions, bolt progress, active agent names). Reading from `getComputedStyle` per-frame is cheap (the browser caches the result between paints) and keeps the canvas engine completely detached from React's render cycle. This matches the prototype's approach (`--ar/--ag/--ab` variables read at draw time) and is consistent with the project's pattern of keeping all canvas state in refs/closures.

## Alternatives Considered

- Props-based palette: would cause engine re-mount on every theme switch, resetting animation state
- React context subscription: adds complexity for a case where per-frame polling is already acceptable
- CSS variable mutation via JS: overly complex and would bypass the repo's token system

## See Also

- `src/components/HeroMesh.tsx` — `readPalette()` function called at draw time
- `design_handoff_specrails_web/SpecRails Redesign.html` line 837 — `PALETTE` array and `--ar/--ag/--ab` variables
