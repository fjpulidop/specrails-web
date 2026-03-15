# Design: The specrails Playbook

## Change Summary

Add three Playbook guide pages to specrails.dev — best-practices content for OSS maintainers using specrails. The pages reuse the existing `/docs/:slug` infrastructure (DocsLayout, DocPage, MarkdownRenderer, DocsSidebar, DocsDropdown) with two mechanical additions: three markdown files under `docs/`, new entries in `docs-registry.ts`, and a section header in the sidebar.

No new routes, no new page components, no new layout components. The entire effort is approximately 20% infrastructure wiring and 80% content.

---

## Impact Analysis

### Files modified
- `src/lib/docs-registry.ts` — add 3 new DocEntry records, add section grouping concept to sidebar data
- `src/components/DocsSidebar.tsx` — add "Playbook" section header above the 3 playbook entries
- `src/components/DocsDropdown.tsx` — playbook entries appear automatically (reads DOC_ENTRIES)

### Files created
- `docs/playbook-product-discovery.md`
- `docs/playbook-parallel-dev.md`
- `docs/playbook-oss-maintainer.md`
- `src/test/playbook-registry.test.ts`

### Files not touched
- `src/pages/DocsLayout.tsx` — no changes needed
- `src/pages/DocPage.tsx` — no changes needed
- `src/components/MarkdownRenderer.tsx` — no changes needed
- `src/App.tsx` — no changes needed; `/docs/:slug` already handles arbitrary slugs

---

## Implementation Design

### 1. Docs registry extension

`DOC_ENTRIES` in `docs-registry.ts` is a flat array. The three playbook entries are appended after the existing 8 docs entries:

```ts
{
  slug: "playbook-product-discovery",
  title: "Product Discovery",
  description: "Write specs that produce reliable implementations",
  content: playbookProductDiscoveryRaw,
},
{
  slug: "playbook-parallel-dev",
  title: "Parallel Development",
  description: "Run multiple features in parallel without merge conflicts",
  content: playbookParallelDevRaw,
},
{
  slug: "playbook-oss-maintainer",
  title: "OSS Maintainer Workflow",
  description: "Review gates, confidence thresholds, and convention enforcement",
  content: playbookOssMaintainerRaw,
},
```

Placement at the end of the array preserves existing prev/next navigation for current pages. The last existing doc ("Updating") gets "Product Discovery" as its `next`, and "OSS Maintainer Workflow" has no `next` — correct behavior.

### 2. Sidebar section header

`DocsSidebar` currently renders a single flat list under the "Documentation" header. We need a "Playbook" section header above the 3 playbook entries.

**Approach:** Add a `section?: string` field to `DocEntry`. Entries with the same section string are grouped. The sidebar renders a section header when the section label changes.

```ts
// In DocEntry interface:
section?: string;

// In playbook entries:
section: "Playbook",
```

The sidebar maps over `DOC_ENTRIES` and tracks the current section label, emitting a `<div>` header whenever the section changes. This is a minimal, non-breaking addition — existing entries without `section` set render as before (no header).

**Why this approach over a separate registry:** A single registry is easier to keep in sync. `getAdjacentDocs` works correctly across sections without special-casing. The sidebar section label is purely a display concern.

### 3. DocsDropdown

No changes required. The dropdown renders all `DOC_ENTRIES` entries. The three new entries appear automatically. If the dropdown becomes visually crowded (11 entries total), that is a pre-existing UX concern outside this change's scope.

### 4. Markdown content design

Each guide follows a consistent structure:

```
# Title

> One-sentence summary of who this is for and what they'll get.

## Overview
[2-3 paragraphs of context — why this matters, what problem it solves]

## [Core section 1]
[Concrete guidance with examples, commands, config snippets]

## [Core section 2]
...

## Patterns & Anti-patterns
| Pattern | Why it works |
| Anti-pattern | Why it fails |

## What's next?
[Links to related docs]
```

Content must reference real specrails artifacts: actual command names (`/sr:implement`, `/opsx:ff`), real phase names (Phase 3a, Phase 4b-conf), real config keys (`.claude/confidence-config.json`), real agent names.

#### Guide 1: Product Discovery (`playbook-product-discovery.md`)

Covers:
- What a "good spec" looks like vs. a vague one (side-by-side examples)
- How OpenSpec proposal/design artifacts shape implementation quality
- Writing issue bodies that the Product Analyst can parse (Prerequisites: field, VPC fields)
- When to use `/opsx:ff` vs. `/opsx:new` + `/opsx:continue`
- Spec anti-patterns: ambiguous acceptance criteria, missing context bundles, specs that skip the design artifact

#### Guide 2: Parallel Development (`playbook-parallel-dev.md`)

Covers:
- How `sr:batch-implement` uses git worktrees (each feature = isolated worktree)
- What to parallelize: features that touch different files/layers
- What NOT to parallelize: features sharing a migration, shared utility refactors, sequential dependencies
- Reading the dependency DAG from `/sr:product-backlog` to plan safe parallel batches
- Merge conflict resolution: the auto-merge strategy, when it fails, how to recover
- Practical example: 3 features, 1 safe to run in parallel, 1 that must wait

#### Guide 3: OSS Maintainer Workflow (`playbook-oss-maintainer.md`)

Covers:
- Confidence gate setup: `.claude/confidence-config.json` thresholds, warn vs. block vs. override
- Layer convention files as review gates: `.claude/rules/frontend.md` etc.
- The Failure Learning Loop: how failure records accumulate and guard future runs
- PR review checklist for AI-generated PRs: what to check that specrails doesn't catch
- Convention enforcement patterns: what belongs in `.claude/rules/`, what belongs in ESLint/TypeScript
- Reducing review burden: trust signals (confidence score, CI green, security scan clean)

### 5. Tests

A single test file `src/test/playbook-registry.test.ts` verifies:
- The three playbook slugs exist in `DOC_ENTRIES`
- `getDocBySlug` returns a non-null result for each slug
- `getAdjacentDocs("playbook-product-discovery")` has a valid prev (the "Updating" entry)
- `getAdjacentDocs("playbook-oss-maintainer")` has next === null

---

## Compatibility Impact

Compatibility: No contract surface changes detected.

The change adds entries to an internal data array and a visual section label to the sidebar. No CLI flags, command names, agent names, placeholder keys, or config keys are modified, added, or removed.

---

## Risks & Considerations

**Content accuracy:** The biggest risk is playbook content that describes specrails behavior incorrectly. Mitigation: write content that references only documented, observable behavior (commands, phase names, config files) — no speculation about internal agent logic.

**Sidebar length:** After this change the sidebar has 11 entries. Not a regression, but worth noting for future sidebar redesign planning.

**DocsDropdown width:** The dropdown is currently `w-80`. 11 entries will render but may feel long. Out of scope for this change.

**`section` field on DocEntry:** Adding an optional field to a TypeScript interface is non-breaking. Existing call sites that construct `DocEntry` objects (only `docs-registry.ts`) don't need updating since the field is optional.

---

## Dependencies & Prerequisites

- All existing docs infrastructure must be working (it is, per current codebase)
- No new npm packages required
- Vite `?raw` imports for `.md` files are already configured (confirmed by existing usage)
