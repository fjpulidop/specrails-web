# Context Bundle: Agent Skills & Model Comparison Matrix

**Change:** agent-comparison-matrix
**Date:** 2026-03-15

This bundle collects all codebase context a developer needs to implement this change without re-reading the full repo.

---

## 1. Existing Agent Data (source of truth for migration)

Located in `src/components/AgentsSection.tsx` lines 7–19. The current array has 7 fields per agent:

```ts
{ name, model, desc, icon, color, border, glow }
```

The `model` field is one of: `"Opus"`, `"Sonnet"`, `"Haiku"`.

Current model distribution:
- **Opus**: Product Manager, Security Reviewer
- **Haiku**: Product Analyst
- **Sonnet**: all other 8 agents

The existing `modelColors` record maps model → badge class:
```ts
const modelColors: Record<string, string> = {
  Opus: "bg-dracula-purple/20 text-dracula-purple",
  Sonnet: "bg-dracula-cyan/20 text-dracula-cyan",
  Haiku: "bg-dracula-green/20 text-dracula-green",
}
```

This record stays in `AgentsSection.tsx` (it is only used there).

---

## 2. Routing

**App.tsx** registers routes:
```tsx
<Route path="/" element={<Index />} />
<Route path="/docs" element={<DocsLayout />}>
  <Route index element={<DocPage />} />
  <Route path=":slug" element={<DocPage />} />
</Route>
{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
<Route path="*" element={<NotFound />} />
```

New route `/agents` goes in the marked position.

---

## 3. Page Structure Reference

**Index.tsx** (landing page) — renders Navbar, sections in order, FooterSection, SectionNav, AnimatedLogo.

**DocsLayout.tsx** — renders Navbar + sidebar (DocsSidebar) + Outlet. The `/agents` page does NOT use DocsLayout — it is a standalone page with only Navbar + main content + FooterSection.

---

## 4. Navbar

`src/components/Navbar.tsx` — desktop links are plain `<a>` tags pointing to hash routes. The new "Compare" link points to `/agents`. Using `<a href="/agents">` is consistent with the existing link pattern (no `<NavLink>` active-state logic in use).

Mobile nav: only shows the Docs link + GitHub icon. The new link is desktop-only.

---

## 5. Available shadcn/ui Components

All of these already exist in `src/components/ui/`:

| Component | File |
|---|---|
| Table + sub-components | `table.tsx` |
| Input | `input.tsx` |
| Select + sub-components | `select.tsx` |
| Badge | `badge.tsx` |
| Button | `button.tsx` |
| Separator | `separator.tsx` |

Use the path alias: `@/components/ui/<name>`.

---

## 6. CSS Custom Properties (Dracula theme)

All color tokens available as Tailwind classes:

```
text-dracula-purple   bg-dracula-purple   bg-dracula-purple/20
text-dracula-pink     bg-dracula-pink
text-dracula-cyan     bg-dracula-cyan     bg-dracula-cyan/20
text-dracula-green    bg-dracula-green    bg-dracula-green/20
text-dracula-orange   bg-dracula-orange   bg-dracula-orange/20
text-dracula-yellow   bg-dracula-yellow   bg-dracula-yellow/20
text-dracula-red      bg-dracula-red      bg-dracula-red/20
text-dracula-comment  bg-dracula-comment  bg-dracula-comment/20
bg-dracula-current                        (dark background surface)
```

Never use hardcoded hex, rgb, or hsl values.

---

## 7. `cn()` Utility

```ts
import { cn } from "@/lib/utils"
// Uses tailwind-merge + clsx
cn("base-class", condition && "conditional-class", "override-class")
```

---

## 8. Existing Glass Card Style

`AgentsSection` cards use `className="glass-card p-5 ..."`. The `glass-card` utility class is defined in the global CSS. Reuse `glass-card` for the mobile card stack in `AgentComparisonMatrix` for visual consistency with the landing page.

---

## 9. Scroll Animation Hook

`useScrollAnimation` from `@/hooks/useScrollAnimation` — returns `{ ref, isVisible }`. Used in `AgentsSection` for entrance animations. The new `AgentComparisonMatrix` and `AgentsPage` do not need entrance animations (the page is the primary destination, not a landing scroll section).

---

## 10. Test Patterns

Existing test in `src/test/MarkdownRenderer.test.tsx` shows the standard pattern:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe("ComponentName", () => {
  it("does something", () => {
    renderWithRouter(<Component />)
    expect(screen.getBy...).to...
  })
})
```

For interaction tests (typing, clicking), import `userEvent`:
```ts
import userEvent from "@testing-library/user-event"
// inside test:
const user = userEvent.setup()
await user.type(screen.getByRole("textbox"), "search term")
```

---

## 11. Docs Registry (reference only — not modified)

`src/lib/docs-registry.ts` contains `DOC_ENTRIES`. The existing entry with `slug: "agents"` maps to `/docs/agents` and renders `docs/agents.md`. All "Learn more" links from the matrix point to `/docs/agents`.

---

## 12. Complete Agent Data Reference

The new fields to add per agent:

| name | stage | category | primaryJob |
|---|---|---|---|
| Product Manager | discovery | strategy | Analyzes market fit and prioritizes features |
| Product Analyst | audit | audit | Audits spec-vs-code divergence (read-only) |
| Architect | design | architecture | Translates specs into tasks and risk assessments |
| Developer | implementation | engineering | Full-stack polyglot, 4-phase implementation |
| Backend Developer | implementation | engineering | Server-side specialist for parallel pipelines |
| Frontend Developer | implementation | engineering | UI/UX specialist with pixel-perfect focus |
| Test Writer | testing | quality | Generates test suites targeting >80% coverage |
| Reviewer | review | quality | Final quality gate with confidence scoring |
| Frontend Reviewer | review | quality | UI code review for accessibility and patterns |
| Backend Reviewer | review | quality | API and security review for server code |
| Security Reviewer | review | security | OWASP scan, credential audit, deployment block |

All `docsSlug` values: `"agents"`
