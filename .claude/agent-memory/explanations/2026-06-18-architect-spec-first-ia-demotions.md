---
agent: architect
feature: landing-spec-first-narrative
tags: [landing, ia, section-demotion, narrative]
date: 2026-06-18
---

## Decision

Demoted 6 sections (AgentsSection, HubShowcaseSection, FeaturesSection, CommandsSection, ApiMcpSection, PrinciplesSection) from Index.tsx and reordered the remaining 5 blocks into a comprehension → desire → download narrative sequence.

## Why This Approach

The brief mandates a pedagogical rule: one new idea per scroll, simplest/biggest first. A 12-section feature catalog violates this rule structurally — the visitor encounters agent counts and API docs before they understand the product category. The 6-block IA introduces the category (Hero), teaches the mechanism (Pipeline), proves it (Demo), contrasts it against the status quo (Problem), reveals the product family (Ecosystem), then converts (Footer). Each section earns the next.

## Alternatives Considered

- Keep all 12 sections but reorder them — rejected because density itself is the problem, not just order. Even a perfectly ordered catalog overwhelms a first-time visitor.
- Hide sections behind a "show more" toggle — rejected as a UX anti-pattern for a marketing landing; the visitor should never need to ask for more content.

## See Also

- `/Users/javi/repos/specrails-web/openspec/landing-rebuild-brief.md` — authoritative IA and copy deck
- `/Users/javi/repos/specrails-web/openspec/changes/landing-spec-first-narrative/design.md` — conflict analysis with hero-redesign-hub-primary
