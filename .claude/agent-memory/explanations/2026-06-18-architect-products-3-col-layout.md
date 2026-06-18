---
agent: architect
feature: landing-spec-first-narrative
tags: [products, companion, layout, grid]
date: 2026-06-18
---

## Decision

ProductsSection expands from `lg:grid-cols-[1fr_auto_1fr]` to `lg:grid-cols-[1fr_auto_1fr_auto_1fr]` to accommodate the third product (specrails-companion), with a second RailConnector between desktop and companion.

## Why This Approach

The RailConnector animation is core to the "spec traveling the rails" metaphor in ProductsSection. Removing the connectors to fit three equal columns (`lg:grid-cols-3`) would lose the metaphor at the exact moment the IA reveals all three products. The `[1fr_auto_1fr_auto_1fr]` template keeps both connectors narrow (`auto`) and the three product cards equal (`1fr`), preserving the visual flow on desktop while collapsing to a vertical stack on mobile unchanged.

## Alternatives Considered

- `lg:grid-cols-3` equal columns, connectors removed — rejected; loses the rails metaphor at the ecosystem reveal.
- Tabs (core / desktop / companion) — rejected; hides two products by default and requires interaction before the ecosystem is visible.
- Companion as a full-width card below the two-column layout — rejected; breaks the "three ways to ride" horizontal narrative the brief specifies.

## See Also

- `/Users/javi/repos/specrails-web/openspec/landing-rebuild-brief.md` §⑤ The ecosystem
- `/Users/javi/repos/specrails-web/src/components/ProductsSection.tsx` — current RailConnector implementation
