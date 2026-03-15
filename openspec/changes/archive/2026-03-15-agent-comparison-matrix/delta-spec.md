# Delta Spec: Agent Skills & Model Comparison Matrix

**Change:** agent-comparison-matrix
**Date:** 2026-03-15
**Type:** additive (new route, new component, data refactor)

---

## New Entities

### AgentEntry (type)
```
src/data/agents.ts :: AgentEntry
```
Extends the existing implicit agent shape with:
- `primaryJob: string` — ≤60-char action phrase for table display
- `stage: PipelineStage` — pipeline stage when the agent runs
- `category: JobCategory` — job function bucket
- `docsSlug: string` — target path for "Learn more" link

### PipelineStage (union type)
```
"discovery" | "design" | "implementation" | "testing" | "review"
```

### JobCategory (union type)
```
"strategy" | "architecture" | "engineering" | "quality" | "security" | "audit"
```

### AGENTS (constant)
```
src/data/agents.ts :: AGENTS
```
Replaces the local `agents` array in `AgentsSection.tsx`. Single source of truth for all agent data. Exported as a readonly array typed `AgentEntry[]`.

---

## New Routes

| Path | Component | Layout |
|---|---|---|
| `/agents` | `AgentsPage` | Standalone (Navbar + Footer, no sidebar) |

---

## New Components

### AgentComparisonMatrix
```
src/components/AgentComparisonMatrix.tsx
```
Props: none (reads directly from `AGENTS` constant)

Renders:
1. Filter toolbar (search Input + three Select filters + clear Button)
2. Desktop table (shadcn/ui Table, hidden below md)
3. Mobile card stack (shown below md)
4. Zero-state message when filtered result is empty

### AgentsPage
```
src/pages/AgentsPage.tsx
```
Page wrapper. No props. Composes `Navbar`, page header, `AgentComparisonMatrix`, `FooterSection`.

---

## Modified Entities

### AgentsSection
```
src/components/AgentsSection.tsx
```
- Remove local `agents` array definition
- Add import: `import { AGENTS } from "@/data/agents"`
- Replace `agents.map(...)` with `AGENTS.map(...)`
- Add `Link` to `/agents` beneath section heading (new: "Compare all agents →")
- No changes to card rendering logic

### App.tsx
```
src/App.tsx
```
- Add import: `import AgentsPage from "./pages/AgentsPage"`
- Add route: `<Route path="/agents" element={<AgentsPage />} />`
- Inserted above the catch-all `*` route

### Navbar.tsx
```
src/components/Navbar.tsx
```
- Add entry to `links` array: `{ label: "Compare", href: "/agents" }`
- Positioned after `{ label: "Commands", href: "/#commands" }`
- No changes to Navbar rendering logic

---

## Unchanged

- `DocsLayout.tsx` — agents page does not use the docs sidebar
- `DocPage.tsx`, `DocsSidebar.tsx`, `docs-registry.ts` — no new doc entries added
- All existing `/docs/*` routes and markdown content — untouched
- `AgentsSection` card grid appearance — visually identical to current
