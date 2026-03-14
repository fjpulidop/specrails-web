---
paths:
  - "src/**"
---

# Frontend Conventions

## Language & Framework
- TypeScript strict mode — no `any` types, explicit return types on exported functions
- React 18 functional components only — no class components
- React Router DOM v6 for routing

## Naming
- **Component files**: PascalCase (`HeroSection.tsx`, `PipelineSection.tsx`)
- **Component exports**: PascalCase, matching filename
- **Hook files**: camelCase (`useScrollAnimation.ts`, `use-mobile.tsx`)
- **Utility files**: camelCase (`utils.ts`)
- **shadcn/ui components**: lowercase (`button.tsx`, `card.tsx`) — these are third-party, do not rename
- **Test files**: `*.test.ts` or `*.test.tsx`

## Imports
- Use `@/` path alias for all `src/` imports (e.g., `import { Button } from "@/components/ui/button"`)
- Group imports: React/external libs first, then `@/` internal imports
- No barrel exports — import directly from the file

## Styling
- Tailwind CSS utility classes exclusively — no inline styles, no CSS modules
- Dracula theme colors via CSS custom properties: `hsl(var(--primary))`, `hsl(var(--background))`, etc.
- Never hardcode hex, rgb, or hsl color values — always use theme variables
- Use `cn()` from `@/lib/utils` for conditional class merging (tailwind-merge + clsx)
- Mobile-first responsive design with Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`)

## Components
- Use shadcn/ui components for all standard UI elements (Button, Card, Badge, etc.)
- Props must be typed with explicit TypeScript interfaces
- Destructure props in function signature
- Use `useScrollAnimation` hook for scroll-triggered entrance animations

## State & Effects
- `useState` for local component state
- `useRef` for DOM references and mutable values
- `useEffect` with proper cleanup functions
- `@tanstack/react-query` for server state (API calls)

## Testing
- Vitest as test runner
- `@testing-library/react` for component tests
- Test files in `src/test/` directory
- `describe`/`it`/`expect` pattern from vitest

## Performance
- Lazy load heavy components and images
- Use `loading="lazy"` on images below the fold
- Minimize bundle size — import only what you need from libraries
- Canvas animations (particle background) should respect `requestAnimationFrame` lifecycle
