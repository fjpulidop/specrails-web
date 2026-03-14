# Persona: The UX Craftsperson

> "If the interaction doesn't feel right, the feature isn't done. I bridge the gap between design intent and production code."

## Profile

| Field | Value |
|-------|-------|
| **Name** | "Dana" — The UX Craftsperson |
| **Age** | 28-42 |
| **Role** | UX engineer, design-focused frontend developer, or design system lead |
| **Projects** | Works on 1-2 products with high polish expectations (SaaS, consumer apps, agency work) |
| **Experience** | 5-12 years; deep frontend expertise, strong design sensibility, often Figma-fluent |
| **Tools today** | Figma, Storybook, shadcn/ui, Tailwind CSS, Framer Motion, Radix UI, v0.dev, Chrome DevTools |
| **Spending** | $50-200/month on design and dev tools combined |
| **Tech comfort** | Very high in frontend; moderate in backend; opinionated about component architecture |

## Behaviors

- Obsesses over interaction details: hover states, transitions, loading skeletons, micro-animations
- Maintains or contributes to a design system with strict token usage and component APIs
- Reviews PRs primarily through the lens of UI consistency and accessibility
- Frustrated by AI-generated code that "works" but violates spacing, color, and typography conventions
- Tests across browsers, screen sizes, and assistive technologies
- Uses Storybook or similar tools to develop components in isolation before integration
- Reads Smashing Magazine, CSS-Tricks, and follows design engineering thought leaders

## Value Proposition Canvas

### Customer Jobs

| Type | Job |
|------|-----|
| Functional | Implement designs with pixel-perfect fidelity to Figma specs |
| Functional | Maintain design system consistency across all features and pages |
| Functional | Build accessible, performant UI components that work across devices |
| Functional | Translate design tokens (colors, spacing, typography) into production code reliably |
| Social | Earn trust from design team that implementation matches their vision |
| Emotional | Feel pride in the craft quality of shipped interfaces |
| Emotional | Avoid the frustration of AI-generated UI that ignores the design system |

### Pains

| Severity | Pain |
|----------|------|
| Critical | AI code generation ignores design systems — outputs hardcoded colors, wrong spacing, inconsistent component usage |
| Critical | The "last 10%" of UI polish (animations, transitions, edge cases) takes 50% of the time |
| High | No AI tool understands component architecture — they generate flat JSX instead of composing existing primitives |
| High | Responsive design for complex layouts requires tedious manual testing and adjustment |
| Medium | Accessibility (ARIA, keyboard nav, screen reader) is bolted on as an afterthought by most AI tools |
| Medium | Design-to-code handoff is lossy — Figma intent doesn't fully translate to implementation without design judgment |
| Medium | Dark mode and theming doubles the design QA surface area |
| Low | Performance optimization (bundle size, lazy loading) conflicts with rich visual experiences |

### Gains

| Impact | Gain |
|--------|------|
| High | AI that respects the existing design system — uses correct tokens, components, and patterns |
| High | Convention-aware code generation that matches the project's component architecture (not generic JSX) |
| High | Automated review that catches design system violations, not just linting errors |
| Medium | Pre-built, accessible animation patterns that respect `prefers-reduced-motion` |
| Medium | Per-layer coding rules that enforce frontend-specific conventions automatically |
| Medium | Implementation pipeline that includes visual QA as a review step |
| Low | Component memory — AI learns which primitives exist and how they compose |
| Low | Figma-to-code acceleration that preserves design intent |

## Key Insight

> UX developers don't reject AI coding tools — they reject AI that **ignores the design system**. The core frustration is that current AI generates code that is functionally correct but visually and architecturally wrong: wrong tokens, wrong components, wrong patterns. An AI system with per-layer conventions, component-aware generation, and design-system-enforcing review would be the first tool that UX engineers actually trust to touch their UI code.

## Sources

- Reddit r/UXDesign, r/Frontend — recurring frustration with AI code quality in UI contexts
- Smashing Magazine — "The State of Design Engineering" (2025)
- shadcn/ui GitHub Discussions — community requests for opinionated theming and design tokens
- v0.dev user feedback — excitement for AI-generated UI, frustration with lack of design system awareness
- Storybook blog — "Design Systems and AI: The Missing Integration" (2024)
