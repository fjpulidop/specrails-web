# Design: Agent Skills & Model Comparison Matrix

**Change:** agent-comparison-matrix
**Date:** 2026-03-15

---

## 1. Overview

This feature introduces a new `/agents` route containing `AgentComparisonMatrix` — a filterable, searchable table of all 11 specrails agents. The agent data currently living as a local array in `AgentsSection.tsx` is extracted into a shared data module so both the card grid and the matrix draw from a single source of truth.

---

## 2. Data Layer

### 2.1 Shared agent data module

**File:** `src/data/agents.ts`

The existing `agents` array in `AgentsSection.tsx` is moved here and extended with three new fields:

```ts
export type PipelineStage =
  | "discovery"
  | "design"
  | "implementation"
  | "testing"
  | "review";

export type JobCategory =
  | "strategy"
  | "architecture"
  | "engineering"
  | "quality"
  | "security"
  | "audit";

export interface AgentEntry {
  name: string;
  model: "Opus" | "Sonnet" | "Haiku";
  primaryJob: string;        // ≤ 60 chars — concise action phrase for table cell
  desc: string;              // existing long description — kept for cards
  stage: PipelineStage;
  category: JobCategory;
  docsSlug: string;          // links to /docs/<slug>#<anchor> or /docs/agents
  icon: LucideIcon;
  color: string;
  border: string;
  glow: string;
}
```

**Why `primaryJob` is separate from `desc`:** `desc` runs 15–25 words and wraps badly inside a table cell at 1024px. `primaryJob` is a ≤60-character action phrase optimized for dense tabular display. `desc` stays for the card view.

**Agent data additions** (all 11 agents get `stage`, `category`, `primaryJob`, `docsSlug`):

| Agent | stage | category | primaryJob |
|---|---|---|---|
| Product Manager | discovery | strategy | Analyzes market fit and prioritizes features |
| Product Analyst | audit | audit | Audits spec-vs-code divergence (read-only) |
| Architect | design | architecture | Translates specs to tasks and risk assessments |
| Developer | implementation | engineering | Full-stack polyglot, 4-phase implementation |
| Backend Developer | implementation | engineering | Server-side specialist (parallel pipelines) |
| Frontend Developer | implementation | engineering | UI/UX specialist with pixel-perfect focus |
| Test Writer | testing | quality | Generates test suites targeting >80% coverage |
| Reviewer | review | quality | Final quality gate with confidence scoring |
| Frontend Reviewer | review | quality | UI code review for a11y and component patterns |
| Backend Reviewer | review | quality | API and security review for server code |
| Security Reviewer | review | security | OWASP scan, credential audit, deployment block |

All `docsSlug` values point to `/docs/agents` (the existing agents doc page, which covers all agents). No new docs pages are required.

### 2.2 AgentsSection migration

`AgentsSection.tsx` is updated to import `AGENTS` from `@/data/agents` rather than defining the array locally. The rendered JSX is unchanged — the card grid still uses `name`, `model`, `desc`, `icon`, `color`, `border`, `glow`.

---

## 3. New Route & Page

### 3.1 Route

`App.tsx` gains one new route:

```tsx
<Route path="/agents" element={<AgentsPage />} />
```

Placed above the catch-all `*` route, consistent with the existing comment marker.

### 3.2 AgentsPage

**File:** `src/pages/AgentsPage.tsx`

A standalone page (not nested under DocsLayout) that renders `Navbar`, the `AgentComparisonMatrix` component, and `FooterSection`. It does not use the docs sidebar — the matrix is a self-contained reference page.

```tsx
export default function AgentsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-6 pt-28 pb-24">
        <h1 ...>Agent Comparison Matrix</h1>
        <AgentComparisonMatrix />
      </main>
      <FooterSection />
    </div>
  );
}
```

---

## 4. AgentComparisonMatrix Component

**File:** `src/components/AgentComparisonMatrix.tsx`

### 4.1 Filter state

Three independent filter dimensions and one search string, managed with `useState`:

```ts
const [search, setSearch] = useState("");
const [modelFilter, setModelFilter] = useState<"all" | "Opus" | "Sonnet" | "Haiku">("all");
const [stageFilter, setStageFilter] = useState<PipelineStage | "all">("all");
const [categoryFilter, setCategoryFilter] = useState<JobCategory | "all">("all");
```

Filtering is client-side derived state (no `useEffect`):

```ts
const filtered = AGENTS.filter((a) => {
  const matchesSearch =
    search === "" ||
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.primaryJob.toLowerCase().includes(search.toLowerCase());
  const matchesModel = modelFilter === "all" || a.model === modelFilter;
  const matchesStage = stageFilter === "all" || a.stage === stageFilter;
  const matchesCategory = categoryFilter === "all" || a.category === categoryFilter;
  return matchesSearch && matchesModel && matchesStage && matchesCategory;
});
```

### 4.2 Filter controls

Rendered as a flex-wrap toolbar above the table:

- `Input` (shadcn/ui) for text search — placeholder "Search agents..."
- Three `Select` components (shadcn/ui) for Model, Stage, Category
- A "Clear filters" `Button` (ghost variant) that appears when any filter is active

### 4.3 Table (desktop ≥ md)

Uses `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` from `@/components/ui/table`.

Columns:
1. **Agent** — icon + name, styled with agent's `color` class
2. **Model** — `Badge` with model-specific Dracula background color (reusing `modelColors` logic from existing cards)
3. **Primary Job** — plain text, `text-sm`
4. **Stage** — `Badge` variant, stage-colored (see § 4.5)
5. **Category** — `Badge`, category-colored
6. **Docs** — `Link` to `/docs/agents`, text "Learn more →"

### 4.4 Mobile card stack (< md)

On `sm` and below, the table is hidden (`hidden md:table`) and replaced with a stacked card list (`md:hidden`). Each agent renders as a compact card:

```
[Icon] Agent Name    [Model badge]
Primary Job
Stage badge · Category badge
Learn more →
```

This avoids horizontal scroll on narrow viewports while keeping all information accessible. This is consistent with the existing AgentsSection card pattern.

### 4.5 Stage color mapping

Stage badges use Dracula CSS custom properties only — no hardcoded hex:

| Stage | Color class |
|---|---|
| discovery | `bg-dracula-purple/20 text-dracula-purple` |
| design | `bg-dracula-orange/20 text-dracula-orange` |
| implementation | `bg-dracula-green/20 text-dracula-green` |
| testing | `bg-dracula-yellow/20 text-dracula-yellow` |
| review | `bg-dracula-cyan/20 text-dracula-cyan` |

Category badges use a secondary muted style:
- `strategy` / `audit`: `bg-dracula-comment/20 text-dracula-comment`
- `architecture`: `bg-dracula-orange/20 text-dracula-orange`
- `engineering`: `bg-dracula-green/20 text-dracula-green`
- `quality`: `bg-dracula-cyan/20 text-dracula-cyan`
- `security`: `bg-dracula-red/20 text-dracula-red`

---

## 5. Navigation Integration

### 5.1 Navbar

The existing `links` array in `Navbar.tsx` gains a new entry pointing to `/agents`:

```ts
{ label: "Agents", href: "/agents" }
```

This entry is placed after the existing "Agents" anchor link (`/#agents`) — but note: the current navbar links to the landing section via `/#agents`. The new entry is a distinct page link with label "Compare Agents" to disambiguate:

```ts
{ label: "Compare", href: "/agents" }
```

On the desktop nav this appears between "Commands" and the DocsDropdown.

### 5.2 AgentsSection on landing page

A subtle "Compare all agents →" link is added below the card grid heading, linking to `/agents`. It uses `Link` from `react-router-dom` and is styled as `text-sm text-dracula-purple hover:text-dracula-pink`.

---

## 6. Zero-state

When no agents match the current filters, the table/card area displays a centered empty state:

```
No agents match your filters.
[Clear filters] button
```

---

## 7. Accessibility

- `Input` has an `aria-label="Search agents"`
- Each `Select` has an associated visible label via `<label>` + `htmlFor`
- Table `<caption>` is visually hidden but present for screen readers: "specrails agent comparison matrix"
- The mobile card list is `<ul>` with `<li>` items

---

## 8. Files Changed / Created

| Action | File |
|---|---|
| Create | `src/data/agents.ts` |
| Modify | `src/components/AgentsSection.tsx` |
| Create | `src/components/AgentComparisonMatrix.tsx` |
| Create | `src/pages/AgentsPage.tsx` |
| Modify | `src/App.tsx` |
| Modify | `src/components/Navbar.tsx` |
| Create | `src/test/AgentComparisonMatrix.test.tsx` |
