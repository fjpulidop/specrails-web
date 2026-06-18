---
agent: architect
feature: visual-redesign-cyan-light-mode-hero-mesh
tags: [canvas, testing, exports, HeroMesh]
date: 2026-06-03
---

## Decision

Export only `computePositions` (and the `HeroMesh` default export) from `HeroMesh.tsx`; all other engine functions are private to the module closure.

## Why This Approach

`computePositions` is a pure projection math function with no canvas or DOM dependency — it takes nodes, mouse coords, a pre-allocated output array, and dimensions, then mutates `out` in place. This makes it trivially unit-testable in jsdom without mocking canvas, RAF, or IntersectionObserver. All other engine functions (`spawnBeam`, `makeBoltPath`, `drawBeams`, `drawBolts`, etc.) depend on the live canvas context, the `COLS`/`ROWS` grid, or the `beams`/`bolts` mutable arrays — none of these are sensibly testable in isolation. Exporting only the one function that is worth testing keeps the module's public surface minimal and avoids encouraging fragile white-box tests of internal engine state.

## Alternatives Considered

- Export all engine functions: creates a wide API surface, encourages brittle tests, and exposes mutable state
- Export nothing (HeroMesh only): cannot write any meaningful unit test for the projection math
- Separate utility module for `computePositions`: unnecessary indirection for a function that is only used inside HeroMesh

## See Also

- `src/components/HeroMesh.tsx` — exported `computePositions` signature
- `src/test/HeroMesh.test.ts` — unit tests that use only the exported function
