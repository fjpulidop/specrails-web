---
name: section-order-2026
description: Homepage section order after landing-spec-first-narrative change (2026-06-18).
metadata:
  type: project
---

After the `landing-spec-first-narrative` change, the homepage renders exactly 6 sections in this order:

1. `#hero` — HeroSection
2. `#pipeline` — PipelineSection ("How it works")
3. `#demo` — DemoSection ("Demo proof")
4. `#problem` — ProblemSection ("Why specrails")
5. `#products` — ProductsSection ("The ecosystem", 3 cards: core/desktop/companion)
6. `#footer` — FooterSection (outside `<main>`)

**Why:** Spec-first narrative: comprehension → desire → download. Demoted: AgentsSection, HubShowcaseSection, FeaturesSection, CommandsSection, ApiMcpSection, PrinciplesSection.

**How to apply:** SectionVisibility tests and SECTION_IDS must reflect these 6 ids only. Navbar links to demoted sections may need updating separately.
