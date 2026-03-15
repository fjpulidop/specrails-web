---
paths:
  - "src/**"
---

# Frontend Conventions

## File Naming
- PascalCase for component files (`HeroSection.tsx`, `AgentsDropdown.tsx`)
- camelCase for hooks (`useScrollAnimation.ts`, `use-mobile.tsx`)
- camelCase for utilities (`docs-registry.ts`)
- lowercase for shadcn/ui components (`button.tsx`, `card.tsx`)

## Imports
- Always use `@/` path alias for all `src/` imports
- Group: React → third-party → `@/components/ui` → `@/components` → `@/hooks` → `@/lib`

## Styling
- Tailwind utility classes only — no inline styles, no CSS modules
- Dracula theme CSS custom properties for all colors
- Use `cn()` from `@/lib/utils` for conditional class merging
- Never use arbitrary Tailwind values for colors — use theme tokens

## Components
- shadcn/ui primitives for all standard UI elements (Button, Card, Dialog, etc.)
- Functional components only — no class components
- Props interfaces defined inline or in the same file
- Use Lucide React for all icons

## Testing
- Vitest + @testing-library/react for unit tests
- Test files: `*.test.tsx` in `src/test/`
- Test behavior, not implementation details
- Radix UI: test user interactions, not DOM structure (jsdom limitations)
- Mock IntersectionObserver, canvas, matchMedia for jsdom

## React Patterns
- React Router v6 for routing (`useNavigate`, `Link`, `Routes`)
- @tanstack/react-query for async state
- Custom hooks in `src/hooks/` for reusable logic
- Prefer composition over prop drilling
