## 1. WaitlistSection Component

- [x] 1.1 Create `src/components/WaitlistSection.tsx` with email input, submit button, and loading/success/error states
- [x] 1.2 Implement Formspree POST integration with placeholder endpoint `https://formspree.io/f/REPLACE_ME` and TODO comment
- [x] 1.3 Add mobile-first responsive layout (column on mobile, row on sm+)
- [x] 1.4 Apply Dracula theme tokens and `section-darker` background

## 2. Landing Page Integration

- [x] 2.1 Import and render `WaitlistSection` in `src/pages/Index.tsx` between `RoadmapSection` and `FooterSection`
- [x] 2.2 Add `waitlist` to the `SectionNav` ids array in `Index.tsx`

## 3. Tests

- [x] 3.1 Create `src/test/WaitlistSection.test.tsx` with tests for: initial render, disabled submit when empty, enabled submit with email, success state on 200, error state on failure
