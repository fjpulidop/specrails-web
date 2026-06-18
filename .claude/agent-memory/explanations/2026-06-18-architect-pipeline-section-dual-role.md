---
agent: architect
feature: landing-spec-first-narrative
tags: [pipeline, spec-explainer, content-block]
date: 2026-06-18
---

## Decision

PipelineSection was chosen as the host for the spec-explainer content block (Block ②) rather than creating a new standalone section between Hero and PipelineSection.

## Why This Approach

The brief's IA table maps Block ② directly to PipelineSection with the note "reuse, reframe." Adding a new section would require a new component file, a new SECTION_ID, and changes to the SectionNav — all for content that is thematically inseparable from the pipeline diagram. The spec explainer is the setup; the 5-station track is the payoff. Keeping them in one section respects the "one new idea per scroll" rule because the idea (spec-driven pipeline) and its visualization appear together.

## Alternatives Considered

- New `SpecExplainerSection` inserted between Hero and PipelineSection — rejected; adds a component and a section ID for content that belongs with the pipeline diagram it introduces.
- Put the spec explainer in HeroSection below the DemoVideo — rejected; the hero's job is category declaration and CTA, not mechanism explanation.

## See Also

- `/Users/javi/repos/specrails-web/openspec/landing-rebuild-brief.md` §② How it works
