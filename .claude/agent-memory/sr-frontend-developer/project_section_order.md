---
name: section-order-2026
description: Homepage section order of the mission-first landing (current as of 2026-09-25).
metadata:
  type: project
---

The homepage (`src/pages/Index.tsx`) renders the mission-first landing from `src/components/ProductLanding.tsx` and `ProductRecordings.tsx`:

1. `#hero` — ProductHero
2. `#product` — ProductRecordings (Mission Control, Board and Loop Builder recordings)
3. `#companion` — CompanionShowcase
4. `#specs` — ProductWorkflow (contains `#loops`)
5. `#engineering` — ProductFeatures
6. DocumentationShowcase (no id)
7. `#footer` — FooterSection (outside `<main>`)

**Why:** The site presents one product, Specrails Desktop, plus Companion. Earlier iterations (the spec-first narrative with a core/desktop/companion ProductsSection, the dual-product Core/Hub landing) are superseded. Specrails Core is Desktop's built-in engine: it never gets its own section, card or install CTA (`openspec/specs/product-narrative/spec.md`).

**How to apply:** `src/test/SectionVisibility.test.tsx` checks these ids and their order. Section components that Index.tsx no longer imports are dead code; do not bring back Core cards or `npx specrails-core` CTAs.
