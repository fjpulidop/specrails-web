# Agent Memory: sr-frontend-developer

This file is loaded into context at the start of every session. Keep it under 200 lines.

## Feedback

- [h1-textcontent-br](./feedback_h1_br_textcontent.md) — H1 text split by `<br/>` collapses to no space in jsdom; regex assertions must not assume a space at the split point.
- [multiple-elements-getbytext](./feedback_multiple_elements.md) — When a text pattern appears in both a prose block and a capabilities list, use `getAllByText(...).length > 0` instead of `getByText`.

## Project

- [section-order-2026](./project_section_order.md) — Homepage section order after landing-spec-first-narrative: hero → pipeline → demo → problem → products → footer (6 sections).
