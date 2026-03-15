# Context Bundle: The specrails Playbook

This bundle contains everything the Developer needs to implement this change without reading the broader codebase.

---

## Key files to read before implementing

| File | Why |
|------|-----|
| `src/lib/docs-registry.ts` | The registry to extend — understand `DocEntry` interface and `DOC_ENTRIES` array |
| `src/components/DocsSidebar.tsx` | The sidebar to modify — understand how it maps `DOC_ENTRIES` to links |
| `src/components/DocsDropdown.tsx` | Read-only reference — confirm it reads `DOC_ENTRIES` and needs no changes |
| `src/pages/DocPage.tsx` | Read-only reference — confirms `MarkdownRenderer` usage and prev/next pattern |
| `src/components/MarkdownRenderer.tsx` | Read-only reference — confirms `?raw` markdown is rendered via `ReactMarkdown` |
| `docs/customization.md` | Read for content reference — cross-linked from playbook guides |
| `docs/workflows.md` | Read for content reference — source of truth for command names and flags |
| `docs/concepts.md` | Read for content reference — source of truth for phase names, agent names |

---

## Architecture decisions relevant to this change

### Why not a new `/playbook` route?

The existing `/docs/:slug` system already handles arbitrary slugs. Adding a dedicated `/playbook` route would require:
- A new layout component (or shared DocsLayout)
- A new page component (or reuse DocPage)
- A new registry or data source
- Navigation entries in two places

The incremental cost is high and the user experience benefit is negligible — the docs URL structure (`/docs/playbook-*`) is clean and unambiguous. The slug prefix `playbook-` namespaces the guides within the flat registry.

### Why not a separate playbook registry?

A single `DOC_ENTRIES` array keeps `getAdjacentDocs` working correctly across sections without special-casing. The `section` field is a display annotation, not a data separation.

### Section header approach

`DocsSidebar` uses a render-time `let currentSection` variable that mutates as the `.map()` proceeds. This is intentional — it's not React state, just a loop-local accumulator for a static, synchronous render. The alternative (pre-processing `DOC_ENTRIES` into grouped sections before rendering) adds complexity without benefit since `DOC_ENTRIES` is a static module-level constant.

---

## Exact interface change

```ts
// BEFORE (src/lib/docs-registry.ts):
export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  content: string;
}

// AFTER:
export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  content: string;
  section?: string;
}
```

---

## Exact registry additions

Append after the `updatingRaw` entry in `DOC_ENTRIES`. Also add these imports at the top of `docs-registry.ts`:

```ts
import playbookProductDiscoveryRaw from "../../docs/playbook-product-discovery.md?raw";
import playbookParallelDevRaw from "../../docs/playbook-parallel-dev.md?raw";
import playbookOssMaintainerRaw from "../../docs/playbook-oss-maintainer.md?raw";
```

New entries:

```ts
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

---

## Exact sidebar change

Current `DocsSidebar.tsx` render (abbreviated):

```tsx
<nav className="p-4">
  <div className="font-mono text-xs uppercase tracking-wider text-dracula-comment mb-4 px-3">
    Documentation
  </div>
  <ul className="space-y-1">
    {DOC_ENTRIES.map((entry) => {
      // ... link rendering
    })}
  </ul>
</nav>
```

Updated render pattern:

```tsx
<nav className="p-4">
  <div className="font-mono text-xs uppercase tracking-wider text-dracula-comment mb-4 px-3">
    Documentation
  </div>
  <ul className="space-y-1">
    {(() => {
      let currentSection: string | undefined = undefined;
      return DOC_ENTRIES.map((entry) => {
        const showSectionHeader =
          entry.section !== undefined && entry.section !== currentSection;
        if (showSectionHeader) currentSection = entry.section;

        const href = entry.slug === "" ? "/docs" : `/docs/${entry.slug}`;
        const isActive =
          entry.slug === ""
            ? location.pathname === "/docs" || location.pathname === "/docs/"
            : location.pathname === href;

        return (
          <li key={entry.slug}>
            {showSectionHeader && (
              <div className="font-mono text-xs uppercase tracking-wider text-dracula-comment mb-2 mt-4 px-3">
                {entry.section}
              </div>
            )}
            <Link
              to={href}
              onClick={onNavigate}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "border-l-2 border-dracula-purple text-dracula-purple bg-dracula-current/50 pl-[calc(0.75rem_-_2px)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-dracula-current/30"
              )}
            >
              {entry.title}
            </Link>
          </li>
        );
      });
    })()}
  </ul>
</nav>
```

Note: the IIFE `(() => { ... })()` pattern is used to introduce `let currentSection` inside JSX without extracting a helper function. If preferred, extract to a helper:

```tsx
function renderSidebarEntries(entries: DocEntry[], location: Location, onNavigate?: () => void) {
  let currentSection: string | undefined = undefined;
  return entries.map((entry) => { ... });
}
```

Either approach is acceptable; prefer the helper if the component grows.

---

## Playbook content reference

The three markdown files must be created at `docs/`. Below are the complete content specifications. Write these accurately — content is the primary user value of this feature.

### `docs/playbook-product-discovery.md` — full content spec

The file should cover:

**Title:** `# Product Discovery`

**Intro callout:** Who this is for (OSS maintainers using specrails with OpenSpec).

**Section: Why spec quality determines implementation quality**
- The Architect reads specs before writing a single task. Vague input = vague design = vague code.
- The difference between "add authentication" and a 3-paragraph proposal with a clear design artifact.

**Section: Anatomy of a good OpenSpec proposal**
Show a side-by-side:
- Bad: "Add a dashboard page showing user stats"
- Good: A proposal with "What", "Why", "Non-goals", "Success criteria" — 4 concrete sentences each

**Section: Writing GitHub Issues that the Product Analyst can parse**
- The `Prerequisites:` field and why it matters for the dependency DAG (`/sr:product-backlog`)
- VPC-aligned descriptions: mention which persona benefits and how
- Effort labels: Low / Medium / High — the Product Analyst reads these

**Section: Choosing your entry point**
- `/opsx:ff` — use when you know the solution and want all artifacts generated at once
- `/opsx:new` + `/opsx:continue` — use when requirements are unclear and you want to review each artifact before proceeding
- Rule of thumb: if you'd approve the design without reading it, use `ff`. If you want to review the architecture before code is written, step through.

**Section: The context bundle matters**
- The context bundle is what the Developer reads. A thin context bundle means the Developer makes assumptions.
- Include: files to read, key interfaces, exact API contracts, architectural decisions and their reasons.

**Section: Patterns & Anti-patterns**

| Pattern | Why it works |
|---------|-------------|
| Proposal includes explicit Non-goals | Prevents scope creep during implementation |
| Design artifact describes the approach per layer | Developer has no ambiguity about which files to touch |
| Context bundle includes exact TypeScript interfaces | Developer doesn't invent types that conflict with existing ones |
| Success criteria are binary (pass/fail) | Easier to verify at review time |

| Anti-pattern | Why it fails |
|-------------|-------------|
| Skipping the design artifact and going straight to tasks | Tasks without design rationale produce code that passes tests but breaks the architecture |
| Spec written after implementation | Spec becomes documentation, not a contract — the pipeline can't use it |
| Vague acceptance criteria ("looks good", "works correctly") | Reviewer can't determine done-ness |
| Missing cross-references in context bundle | Developer reads wrong version of a file or misses a constraint |

**Footer:** links to `concepts.md`, `workflows.md`, `customization.md`

---

### `docs/playbook-parallel-dev.md` — full content spec

**Title:** `# Parallel Development`

**Intro callout:** Who this is for (maintainers shipping multiple features in a sprint).

**Section: How specrails parallelizes work**
- `/sr:batch-implement` spawns one git worktree per feature
- Each worktree has its own branch, its own agent pipeline, its own CI run
- Features run truly concurrently — not queued

**Section: What's safe to parallelize**
Criteria for a feature being safe to run in parallel:
1. It touches different files from the other features in the batch
2. It does not depend on a migration or new table that another feature in the batch introduces
3. Its spec is complete and approved before the batch runs (not "in flight")
4. It is a Wave 1 feature per the dependency DAG (no unimplemented prerequisites)

**Section: What's not safe**
- Two features that both modify the same schema file
- A feature that requires a utility extracted by another feature in the same batch
- Features with a `Prerequisites:` relationship to each other
- Any feature where the spec says "depends on the outcome of X"

**Section: Reading the dependency DAG**
Explain how `/sr:product-backlog` outputs the safe implementation order. Show example output (from workflows.md). The Wave 1 column is your parallel batch.

**Section: Practical example**
Three issues: #85 (health check), #71 (rate limiting), #63 (GraphQL migration).
- #85 requires #71 (cannot parallelize)
- #71 and #63 are independent → safe to batch
- Correct invocation: `/sr:batch-implement #71, #63` then `/sr:implement #85`

**Section: When auto-merge fails**
- Symptom: merge conflict in the worktree merge step
- Cause: two features edited the same region of a file
- Recovery: specrails surfaces the conflict; maintainer resolves manually; rerun from Phase 5
- Prevention: use the safe parallelization criteria above

**Section: Patterns & Anti-patterns**

**Footer:** link to `workflows.md`

---

### `docs/playbook-oss-maintainer.md` — full content spec

**Title:** `# OSS Maintainer Workflow`

**Intro callout:** For maintainers who want to merge AI-generated PRs quickly without sacrificing quality.

**Section: The review burden problem**
- Without guardrails, AI-generated code requires the same review depth as human code
- specrails adds observable quality signals: confidence score, CI status, security scan, reviewer annotations
- The goal: define the conditions under which you can trust those signals and reduce manual review to intent verification

**Section: Setting confidence thresholds**
Explain `.claude/confidence-config.json`:
```json
{
  "threshold": 85,
  "on_below_threshold": "block",
  "aspects": {
    "security": { "threshold": 90, "on_below_threshold": "block" },
    "correctness": { "threshold": 80, "on_below_threshold": "warn" }
  }
}
```
- `block` — pipeline stops, requires explicit override
- `warn` — pipeline continues, PR description flags the low score
- `override` — maintainer adds a comment to the issue to bypass

Recommended starting thresholds for OSS: overall 85, security 90.

**Section: Layer convention files as policy**
- `.claude/rules/frontend.md` is read by the Frontend Reviewer before every review pass
- Put rules you'd enforce in code review here: naming conventions, forbidden imports, required patterns
- What doesn't belong here: style preferences that ESLint/Prettier already enforce, rules that require runtime context

**Section: The Failure Learning Loop**
- When the Reviewer finds a non-trivial issue, it writes to `.claude/agent-memory/failures/`
- Before implementing, the Developer reads failure records matching the current domain
- Over time, systematic mistakes stop appearing in PRs
- As a maintainer: when you reject a PR for a repeating issue, add a failure record manually

**Section: What CI + specrails doesn't catch**
The confidence gate and CI verify quality — not intent. A maintainer still needs to verify:
- Does this implementation match the product intent from the original issue?
- Does the UX feel right (for UI features)?
- Are there business logic edge cases the spec didn't cover?
- Does the PR description accurately describe the change?

**Section: The safe-to-merge checklist**
A PR from specrails is safe to merge without deep review when:
- [ ] Overall confidence score ≥ threshold
- [ ] Security aspect score ≥ threshold
- [ ] CI green (lint + typecheck + tests)
- [ ] No `TODO` or `FIXME` introduced by the implementation
- [ ] PR description matches the original issue intent
- [ ] No new dependencies added without justification in the PR body

**Section: Patterns & Anti-patterns**

**Footer:** links to `customization.md`, `concepts.md`

---

## Vite `?raw` import verification

All existing docs use this pattern. Vite resolves `../../docs/*.md?raw` as a raw string import. No vite.config changes are needed. This is confirmed by the 8 existing imports in `docs-registry.ts`.

---

## Test file skeleton

```ts
// src/test/playbook-registry.test.ts
import { describe, it, expect } from "vitest";
import {
  DOC_ENTRIES,
  getDocBySlug,
  getAdjacentDocs,
} from "@/lib/docs-registry";

describe("playbook registry entries", () => {
  it("has 11 total entries in DOC_ENTRIES", () => {
    expect(DOC_ENTRIES).toHaveLength(11);
  });

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
    const playbookEntries = DOC_ENTRIES.filter((e) => e.section === "Playbook");
    expect(playbookEntries).toHaveLength(3);
  });
});
```
