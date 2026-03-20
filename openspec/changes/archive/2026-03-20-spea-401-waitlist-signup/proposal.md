## Why

specrails.dev needs to capture interested developer leads before the public launch. Without a waitlist mechanism, we have no way to communicate the launch date or build a community of early adopters. This is identified as a critical pre-launch priority in the product roadmap (SPEA-26).

## What Changes

- Add a new `WaitlistSection` component to the landing page
- Place the section between `RoadmapSection` and `FooterSection`
- Integrate with Formspree for email collection (static SPA, no backend)
- Show a success state after successful form submission
- Register `waitlist` as a new section in `SectionNav`

## Capabilities

### New Capabilities

- `waitlist-signup`: Email capture form with success state for pre-launch waitlist on specrails.dev

### Modified Capabilities

<!-- No existing spec-level requirements are changing -->

## Impact

- **New file**: `src/components/WaitlistSection.tsx`
- **New test**: `src/test/WaitlistSection.test.tsx`
- **Modified**: `src/pages/Index.tsx` — add `WaitlistSection` import and render, add `waitlist` to `SectionNav` ids
- **External dependency**: Formspree (https://formspree.io) for form submission — endpoint URL is a placeholder (`REPLACE_ME`) requiring project owner configuration
