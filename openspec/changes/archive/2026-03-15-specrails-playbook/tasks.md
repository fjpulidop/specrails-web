# Tasks: The specrails Playbook

Ordered implementation tasks. Execute sequentially — each task builds on the previous.

---

## Task 1 — Extend DocEntry interface with optional section field [frontend]

**File:** `src/lib/docs-registry.ts`

**Description:**
Add an optional `section?: string` field to the `DocEntry` interface. This field is used by the sidebar to render section group headers. Existing entries without the field are unaffected.

```ts
export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  content: string;
  section?: string;   // ← add this
}
```

**Acceptance criteria:**
- `DocEntry` interface has `section?: string`
- TypeScript strict mode: no errors (`npx tsc --noEmit` passes)
- No existing entries need to be modified

**Dependencies:** None

---

## Task 2 — Create the three playbook markdown files [frontend]

**Files:**
- `docs/playbook-product-discovery.md`
- `docs/playbook-parallel-dev.md`
- `docs/playbook-oss-maintainer.md`

**Description:**
Write the three guide files. Each file uses standard markdown with GFM tables, fenced code blocks, and `##` section headings (these are picked up by `SectionNav` via `rehype-slug`). All cross-references use relative `.md` links (the `MarkdownRenderer.transformUrl` function handles the conversion to `/docs/slug`).

### `docs/playbook-product-discovery.md`

Sections:
- Overview: why spec quality determines implementation quality
- What a good spec looks like: side-by-side examples (vague vs. precise OpenSpec proposal)
- Writing issue bodies for the Product Analyst: `Prerequisites:` field, persona fit, effort estimate
- Choosing between `/opsx:ff` and `/opsx:new` + `/opsx:continue`
- The context bundle: what to include so the Developer has everything it needs
- Patterns & Anti-patterns table (at least 4 rows each)
- What's next: links to `concepts.md`, `workflows.md`, `customization.md`

### `docs/playbook-parallel-dev.md`

Sections:
- Overview: how git worktrees enable true parallel agent pipelines
- What's safe to parallelize: criteria (file isolation, no shared migrations, independent specs)
- What's not safe: shared schema changes, sequential dependencies, large refactors
- Reading the dependency DAG: using `/sr:product-backlog` to find Wave 1 candidates
- Running a parallel batch: example with 3 issues, one deferred
- When auto-merge fails: what to do, the recovery path
- Patterns & Anti-patterns table
- What's next: links to `workflows.md`

### `docs/playbook-oss-maintainer.md`

Sections:
- Overview: the OSS review burden problem and how specrails changes it
- Setting confidence thresholds: `.claude/confidence-config.json` structure, warn/block/override modes
- Layer convention files as policy: what to put in `.claude/rules/frontend.md` vs. ESLint
- The Failure Learning Loop: how failures accumulate, how Developers read them as guardrails
- PR review checklist: what CI+confidence+security doesn't cover (business logic, product intent)
- Trust signals: a list of conditions under which a specrails PR is safe to merge without deep review
- Patterns & Anti-patterns table
- What's next: links to `customization.md`, `concepts.md`

**Content requirements:**
- Reference only real specrails artifacts: exact command names, phase labels, config file paths, agent names
- No invented commands, flags, or config keys
- Each guide: 600–1000 words of prose content (excluding code blocks and tables)
- Cross-doc links use relative `.md` format: `[Customization](customization.md)`

**Acceptance criteria:**
- All three `.md` files exist under `docs/`
- Content compiles without errors (Vite `?raw` import test — verified in Task 3)
- Internal links use relative `.md` format
- No invented specrails commands or config keys

**Dependencies:** None (can be written in parallel with Task 1)

---

## Task 3 — Register playbook entries in docs-registry.ts [frontend]

**File:** `src/lib/docs-registry.ts`

**Description:**
Import the three markdown files and append three new `DocEntry` objects to `DOC_ENTRIES`. Set `section: "Playbook"` on all three entries.

```ts
import playbookProductDiscoveryRaw from "../../docs/playbook-product-discovery.md?raw";
import playbookParallelDevRaw from "../../docs/playbook-parallel-dev.md?raw";
import playbookOssMaintainerRaw from "../../docs/playbook-oss-maintainer.md?raw";

// Append to DOC_ENTRIES after the "updating" entry:
{
  slug: "playbook-product-discovery",
  title: "Product Discovery",
  description: "Write specs that produce reliable implementations",
  content: playbookProductDiscoveryRaw,
  section: "Playbook",
},
{
  slug: "playbook-parallel-dev",
  title: "Parallel Development",
  description: "Run multiple features in parallel without merge conflicts",
  content: playbookParallelDevRaw,
  section: "Playbook",
},
{
  slug: "playbook-oss-maintainer",
  title: "OSS Maintainer Workflow",
  description: "Review gates, confidence thresholds, and convention enforcement",
  content: playbookOssMaintainerRaw,
  section: "Playbook",
},
```

**Acceptance criteria:**
- `DOC_ENTRIES` has 11 entries total
- All three playbook entries have `section: "Playbook"`
- `getDocBySlug("playbook-product-discovery")` returns a non-null entry
- `getAdjacentDocs("playbook-product-discovery").prev?.slug === "updating"`
- `getAdjacentDocs("playbook-oss-maintainer").next === null`
- TypeScript strict mode passes
- `npm run build` succeeds (Vite resolves the `?raw` imports)

**Dependencies:** Task 1 (DocEntry interface), Task 2 (markdown files must exist for Vite import)

---

## Task 4 — Add Playbook section header to DocsSidebar [frontend]

**File:** `src/components/DocsSidebar.tsx`

**Description:**
Update the sidebar to render a section group header ("Playbook") before the three playbook entries. The section header must visually match the existing "Documentation" header style.

Implementation approach: iterate over `DOC_ENTRIES`, track `currentSection`. When an entry's `section` field differs from `currentSection`, emit a section label `<div>` before the link, then update `currentSection`.

```tsx
let currentSection: string | undefined = undefined;

{DOC_ENTRIES.map((entry) => {
  const showSection = entry.section !== undefined && entry.section !== currentSection;
  if (showSection) currentSection = entry.section;
  // ...render section header then link
})}
```

Note: `let` mutation inside a `.map()` callback is a known React anti-pattern for state but is acceptable here because this is pure render-time derivation with no async or side effects — the array is static and deterministic.

The section header `<div>` should use the same Tailwind classes as the existing "Documentation" label:
```
font-mono text-xs uppercase tracking-wider text-dracula-comment mb-2 mt-4 px-3
```

**Acceptance criteria:**
- "Playbook" label appears in the sidebar above the three playbook links
- "Documentation" label remains above the original 8 entries
- Active link styling (`border-l-2 border-dracula-purple`) still works for playbook pages
- Mobile sidebar (Sheet) renders identically
- No TypeScript errors

**Dependencies:** Task 1 (section field on DocEntry), Task 3 (registry populated)

---

## Task 5 — Write Vitest tests for playbook registry [frontend]

**File:** `src/test/playbook-registry.test.ts`

**Description:**
Write a focused test suite covering the registry additions. Use the `describe`/`it`/`expect` pattern from Vitest.

Tests to include:

```ts
describe("playbook registry entries", () => {
  it("has 11 total entries in DOC_ENTRIES", () => { ... });

  it("getDocBySlug returns a result for each playbook slug", () => {
    expect(getDocBySlug("playbook-product-discovery")).toBeDefined();
    expect(getDocBySlug("playbook-parallel-dev")).toBeDefined();
    expect(getDocBySlug("playbook-oss-maintainer")).toBeDefined();
  });

  it("playbook-product-discovery prev is the updating entry", () => {
    const { prev } = getAdjacentDocs("playbook-product-discovery");
    expect(prev?.slug).toBe("updating");
  });

  it("playbook-oss-maintainer has no next entry", () => {
    const { next } = getAdjacentDocs("playbook-oss-maintainer");
    expect(next).toBeNull();
  });

  it("all playbook entries have section set to Playbook", () => {
    const playbook = DOC_ENTRIES.filter((e) => e.section === "Playbook");
    expect(playbook).toHaveLength(3);
  });
});
```

**Acceptance criteria:**
- `npm test` passes with all 5 new tests green
- No mocking required — these are pure data/function tests

**Dependencies:** Task 3 (registry populated)

---

## Task 6 — Manual QA checklist [frontend]

**Description:**
Before closing the change, verify the following manually:

- [ ] `npm run dev` — navigate to `/docs/playbook-product-discovery`, confirm content renders
- [ ] Sidebar shows "Documentation" section header and "Playbook" section header with correct entries
- [ ] Prev/Next nav at bottom of "Updating" links forward to "Product Discovery"
- [ ] Prev/Next nav at bottom of "OSS Maintainer Workflow" has no Next arrow
- [ ] DocsDropdown in navbar shows all 11 entries
- [ ] All three pages render on mobile (375px) without horizontal overflow
- [ ] SectionNav arrows detect `h2` headings on playbook pages
- [ ] `npm run lint` — no errors
- [ ] `npx tsc --noEmit` — no errors
- [ ] `npm run build` — succeeds
- [ ] `npm test` — all tests pass

**Acceptance criteria:** All checklist items pass

**Dependencies:** Tasks 1–5 complete
