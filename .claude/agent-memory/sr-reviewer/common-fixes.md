---
name: common-fixes
description: Recurring patterns and known CI gotchas observed during reviews in specrails-web
metadata:
  type: feedback
---

## Canvas in jsdom (HeroMesh, ParticleBackground)

When components that render `<canvas>` and call `getContext('2d')` in a `useEffect` are rendered in
tests (e.g. Index.test.tsx), jsdom emits:

  Error: Not implemented: HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)

Tests still pass because the error is non-fatal — the `if (!ctx) return;` guard exits the effect.
However, the error output is noisy. The fix is to add a global mock in `src/test/setup.ts`:

```ts
HTMLCanvasElement.prototype.getContext = vi.fn(() => null);
```

**Why:** jsdom does not implement canvas. Without the mock, every test that renders HeroMesh (or any
canvas component) will emit the error.

**How to apply:** When a new canvas component is added and mounted inside a page that already has tests,
add the canvas mock to the global test setup or the relevant test file's `beforeAll`.

---

## react-refresh/only-export-components warning in HeroMesh

`HeroMesh.tsx` exports both a component (`HeroMesh`) and a non-component (`computePositions`, `NP`).
This triggers a `react-refresh/only-export-components` lint warning. The warning is intentional —
`computePositions` must be exported for test isolation (Task 2.3). It is a warning, not an error,
and does not block CI.

**Why:** The same pattern exists in shadcn/ui files (`badge.tsx`, `button.tsx`) which also export
utilities alongside components.

**How to apply:** Do not add an eslint-disable comment. Leave the warning as accepted technical debt
documented here. If it becomes an error in a future ESLint config upgrade, extract `computePositions`
into `src/lib/heroMeshMath.ts` (pure utility file).

---

## `computePositions` signature: proposal vs delta-spec

The proposal acceptance criteria show a 4-param signature:
  `computePositions(nodes, mouseX, mouseY, out)`

The delta-spec and implementation use 6 params:
  `computePositions(nodes, mouseX, mouseY, out, W, H)`

The delta-spec is the authoritative implementation contract; the proposal entry is a summary.
Treat this as intentional when reviewing future changes.

---

## HeroMesh IntersectionObserver observation target

The `IntersectionObserver` is attached to `heroEl`, which is found via
`canvas.closest('[data-hero]') ?? canvas.parentElement`. For this to work, the hero root
`<section>` must carry the `data-hero` attribute. If the canvas ever stops observing (RAF
doesn't pause on scroll), check that `data-hero` is still present on the `<section>` element
in `HeroSection.tsx`.

---

## Product layer labels must be verbatim from approved brief

When implementing ProductsSection (or any section with named product tiers), the h3 subtitle
for each product card must be the exact layer label from the approved brief
(`openspec/landing-rebuild-brief.md`), not a paraphrase.

Pattern from brief: `specrails-X — <label>` → h3 = `<label>` exactly.

Example violation (2026-06-18): brief says "specrails-companion — your phone" but developer
implemented h3 as "The mobile remote". Fixed by changing h3 to "your phone" and updating the
corresponding test assertion.

**Why:** The brief is the founder-approved copy contract. Paraphrasing, even plausible paraphrasing,
breaks copy faithfulness and fails review.

**How to apply:** Before marking a content task done, do a side-by-side of every visible
label/heading against the brief. The failure record is at
`.claude/agent-memory/failures/2026-06-18-copy-deviation-from-brief.json`.
