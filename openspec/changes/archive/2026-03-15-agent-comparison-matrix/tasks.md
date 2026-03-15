# Tasks: Agent Skills & Model Comparison Matrix

**Change:** agent-comparison-matrix
**Date:** 2026-03-15

Tasks are ordered by dependency. Each task is self-contained within its layer.

---

## Task 1 — Create shared agent data module [frontend]

**Title:** Extract and extend agent data into `src/data/agents.ts`

**Description:**
Move the `agents` array out of `AgentsSection.tsx` and into a new file `src/data/agents.ts`. Extend each entry with `primaryJob`, `stage`, `category`, and `docsSlug` fields. Export typed constants and union types.

**Files involved:**
- `src/data/agents.ts` (create)

**Implementation notes:**
- Define `PipelineStage` union: `"discovery" | "design" | "implementation" | "testing" | "review"`
- Define `JobCategory` union: `"strategy" | "architecture" | "engineering" | "quality" | "security" | "audit"`
- Define `AgentEntry` interface — all 9 fields, all required, no `any`
- Export `AGENTS: AgentEntry[]` as a `const` array
- Agent-to-stage-and-category mapping per the design doc table in `design.md §2.1`
- `docsSlug` for all 11 agents is `"agents"` (maps to `/docs/agents`)
- Keep `icon`, `color`, `border`, `glow` from the existing array verbatim
- Import `LucideIcon` type from `lucide-react`

**Acceptance criteria:**
- `npx tsc --noEmit` passes with zero errors
- All 11 agents present with all required fields populated
- No `any` types used

**Dependencies:** none

---

## Task 2 — Migrate AgentsSection to shared data [frontend]

**Title:** Update `AgentsSection.tsx` to import from `@/data/agents`

**Description:**
Replace the local `agents` array in `AgentsSection.tsx` with an import of `AGENTS` from the new data module. Add a "Compare all agents →" link below the section heading. Visual output of the card grid must be identical to before.

**Files involved:**
- `src/components/AgentsSection.tsx` (modify)

**Implementation notes:**
- Remove the local `agents` array and `modelColors` record (move `modelColors` logic into the component or keep it local — it is not needed in the data module)
- Add: `import { AGENTS } from "@/data/agents"`
- Replace `agents.map(...)` with `AGENTS.map(...)`
- Add a `Link` (React Router) beneath the `<p>` description paragraph: `<Link to="/agents" className="text-sm text-dracula-purple hover:text-dracula-pink transition-colors">Compare all agents →</Link>`
- `modelColors` can remain as a local const in `AgentsSection.tsx` since it is only used there

**Acceptance criteria:**
- Landing page renders identically to before (11 cards, correct colors, same text)
- "Compare all agents →" link visible and navigates to `/agents`
- `npx tsc --noEmit` passes
- `npm run lint` passes

**Dependencies:** Task 1

---

## Task 3 — Build AgentComparisonMatrix component [frontend]

**Title:** Create `src/components/AgentComparisonMatrix.tsx`

**Description:**
The core component of this feature. Renders a filterable, searchable table on desktop and a card stack on mobile. All 11 agents are shown by default; filters narrow the set client-side.

**Files involved:**
- `src/components/AgentComparisonMatrix.tsx` (create)

**Implementation notes:**
- Import `AGENTS`, `AgentEntry`, `PipelineStage`, `JobCategory` from `@/data/agents`
- Import shadcn/ui: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` from `@/components/ui/table`; `Input` from `@/components/ui/input`; `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` from `@/components/ui/select`; `Badge` from `@/components/ui/badge`; `Button` from `@/components/ui/button`
- Import `Link` from `react-router-dom`
- Import `cn` from `@/lib/utils`

Filter state:
```ts
const [search, setSearch] = useState("")
const [modelFilter, setModelFilter] = useState<"all" | "Opus" | "Sonnet" | "Haiku">("all")
const [stageFilter, setStageFilter] = useState<PipelineStage | "all">("all")
const [categoryFilter, setCategoryFilter] = useState<JobCategory | "all">("all")
```

Derived filtered list (no `useEffect`):
```ts
const filtered = AGENTS.filter((a) => {
  const matchSearch = search === "" || a.name.toLowerCase().includes(search.toLowerCase()) || a.primaryJob.toLowerCase().includes(search.toLowerCase())
  const matchModel = modelFilter === "all" || a.model === modelFilter
  const matchStage = stageFilter === "all" || a.stage === stageFilter
  const matchCat = categoryFilter === "all" || a.category === categoryFilter
  return matchSearch && matchModel && matchStage && matchCat
})
```

Active filter check:
```ts
const hasActiveFilter = search !== "" || modelFilter !== "all" || stageFilter !== "all" || categoryFilter !== "all"
```

**Filter toolbar layout:**
```
[Input: search]  [Select: Model]  [Select: Stage]  [Select: Category]  [Button: Clear (ghost, only when hasActiveFilter)]
```
Use `flex flex-wrap gap-3 mb-6` on toolbar container.

**Desktop table** (class `hidden md:table w-full`):
- Column 1 "Agent": `<td>` with flex row — `<a.icon className={cn("w-4 h-4 mr-2", a.color)} />` + agent name
- Column 2 "Model": `<Badge className={modelColors[a.model]}>{a.model}</Badge>`
- Column 3 "Primary Job": plain text, `text-sm text-muted-foreground`
- Column 4 "Stage": `<Badge className={stageColors[a.stage]}>{a.stage}</Badge>`
- Column 5 "Category": `<Badge className={categoryColors[a.category]}>{a.category}</Badge>`
- Column 6 "Docs": `<Link to="/docs/agents" className="text-xs text-dracula-purple hover:text-dracula-pink">Learn more →</Link>`

**Mobile card stack** (class `md:hidden space-y-3`):
Each card: `glass-card p-4` (consistent with existing `AgentsSection` card style)
```
row 1: [Icon] [Agent name]  [Model badge — right aligned]
row 2: primaryJob text (text-sm text-muted-foreground)
row 3: Stage badge · Category badge
row 4: Learn more → link
```

**Zero state** (shown when `filtered.length === 0`):
```tsx
<div className="text-center py-16 text-muted-foreground">
  <p className="mb-4">No agents match your filters.</p>
  <Button variant="ghost" onClick={clearFilters}>Clear filters</Button>
</div>
```

**Stage color map** (local const, Dracula vars only):
```ts
const stageColors: Record<PipelineStage, string> = {
  discovery: "bg-dracula-purple/20 text-dracula-purple border-0",
  design: "bg-dracula-orange/20 text-dracula-orange border-0",
  implementation: "bg-dracula-green/20 text-dracula-green border-0",
  testing: "bg-dracula-yellow/20 text-dracula-yellow border-0",
  review: "bg-dracula-cyan/20 text-dracula-cyan border-0",
}
```

**Category color map** (local const):
```ts
const categoryColors: Record<JobCategory, string> = {
  strategy: "bg-dracula-comment/20 text-dracula-comment border-0",
  audit: "bg-dracula-comment/20 text-dracula-comment border-0",
  architecture: "bg-dracula-orange/20 text-dracula-orange border-0",
  engineering: "bg-dracula-green/20 text-dracula-green border-0",
  quality: "bg-dracula-cyan/20 text-dracula-cyan border-0",
  security: "bg-dracula-red/20 text-dracula-red border-0",
}
```

**Accessibility:**
- `<Input aria-label="Search agents" />`
- Each `<Select>` preceded by a `<label htmlFor="...">` that is visually hidden (`sr-only`) or visible
- Table has `<caption className="sr-only">specrails agent comparison matrix</caption>`
- Mobile list uses `<ul>` + `<li>`

**Acceptance criteria:**
- All 11 agents render with correct data
- Search by name and by primaryJob text works
- Each Select filter narrows results correctly
- Combined filters narrow correctly (AND logic)
- "Clear filters" button appears when any filter is set and resets all filters
- Zero-state message shown when no agents match
- Desktop table visible at md+ screen width
- Mobile card stack visible below md
- `npx tsc --noEmit` passes
- `npm run lint` passes

**Dependencies:** Task 1

---

## Task 4 — Create AgentsPage route page [frontend]

**Title:** Create `src/pages/AgentsPage.tsx` and register route in `App.tsx`

**Description:**
Wrap `AgentComparisonMatrix` in a full page with Navbar and footer. Register the `/agents` route in App.tsx.

**Files involved:**
- `src/pages/AgentsPage.tsx` (create)
- `src/App.tsx` (modify)

**Implementation notes:**

`AgentsPage.tsx`:
```tsx
import Navbar from "@/components/Navbar"
import FooterSection from "@/components/FooterSection"
import AgentComparisonMatrix from "@/components/AgentComparisonMatrix"

export default function AgentsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-6 pt-28 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Agent <span className="gradient-text">Comparison Matrix</span>
        </h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          All 11 specrails agents — filter by model, pipeline stage, or job category to find the agent that solves your problem.
        </p>
        <AgentComparisonMatrix />
      </main>
      <FooterSection />
    </div>
  )
}
```

`App.tsx` addition (above the `*` catch-all):
```tsx
import AgentsPage from "./pages/AgentsPage"
// ...
<Route path="/agents" element={<AgentsPage />} />
```

**Acceptance criteria:**
- Navigating to `/agents` renders the page with Navbar, heading, matrix, and footer
- No 404 on direct URL load (consistent with existing SPA redirect config)
- `npx tsc --noEmit` passes

**Dependencies:** Task 3

---

## Task 5 — Add Navbar entry for /agents [frontend]

**Title:** Add "Compare" link to desktop Navbar pointing to `/agents`

**Description:**
Extend the desktop navigation links array in `Navbar.tsx` with an entry for the new agents page so users can reach it from any page.

**Files involved:**
- `src/components/Navbar.tsx` (modify)

**Implementation notes:**
- Add to the `links` array: `{ label: "Compare", href: "/agents" }`
- Position after `{ label: "Commands", href: "/#commands" }`
- The existing mobile nav only shows "Docs" and Github icon; do not add the Compare link to the mobile condensed nav (avoid clutter — the link is reachable via the landing page AgentsSection)
- The existing links use plain `<a>` tags because they target hash routes. The new entry targets `/agents` — use React Router `<Link>` component for this entry only, OR convert the link to an `<a href="/agents">` which works correctly for same-origin navigation in this SPA
- Simplest approach: since all other links are `<a>` tags, keep consistency and use `<a href="/agents">` — React Router BrowserRouter handles this without a full page reload in development; for production it is resolved by the existing `.htaccess` SPA redirect rule

**Acceptance criteria:**
- "Compare" link visible in desktop nav (≥ md breakpoint)
- Link navigates to `/agents` page
- Active state styling consistent with other nav links (currently no active state on nav links, so no special handling needed)
- `npm run lint` passes

**Dependencies:** Task 4

---

## Task 6 — Write Vitest tests for AgentComparisonMatrix [frontend]

**Title:** Add `src/test/AgentComparisonMatrix.test.tsx`

**Description:**
Basic test coverage for the matrix component: data integrity, search behavior, filter behavior, and zero state.

**Files involved:**
- `src/test/AgentComparisonMatrix.test.tsx` (create)

**Implementation notes:**
Follow the existing test patterns in `src/test/MarkdownRenderer.test.tsx`:
- Use `describe`/`it`/`expect` from `vitest`
- Use `@testing-library/react` with `render`, `screen`
- Wrap in `<MemoryRouter>` (component contains `Link` elements)
- Import `userEvent` from `@testing-library/user-event` for interaction tests

Tests to write:
1. **renders all 11 agents by default** — `expect(screen.getAllByRole("row")).toHaveLength(12)` (11 data rows + 1 header)
2. **search by name filters results** — type "Security" into search input, expect only Security Reviewer row visible
3. **search by primaryJob filters results** — type "audit" into search input, expect Product Analyst row visible
4. **model filter narrows to correct agents** — select "Opus" model, expect 2 agent rows (Product Manager + Security Reviewer)
5. **clear filters button appears when filter active** — set any filter, expect "Clear filters" button to appear; click it, expect all 11 rows
6. **zero state shown when no match** — type "zzz" into search, expect "No agents match your filters" text

Note: the desktop table is hidden at md+ via Tailwind — in jsdom all elements are rendered; query by role rather than by visibility class.

**Acceptance criteria:**
- `npm test` passes with all 6 tests green
- No test uses `any` type
- Each test is independent (no shared mutable state between tests)

**Dependencies:** Task 3

---

## Task 7 — Manual verification [frontend]

**Title:** Run full verification pass (lint, type check, build, test)

**Description:**
Final gate before marking the change ready for archive.

**Files involved:** none (verification only)

**Commands:**
```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

**Acceptance criteria:**
- Zero lint errors
- Zero TypeScript errors
- All tests pass
- Build completes without warnings about unresolved imports

**Dependencies:** Tasks 1–6
