# Workflow engine documentation rollout

Contributor coordination for the paired `core-agent-engine` changes in Core and
Desktop. This file is not a product guide and is not loaded by a website route.
It tracks documentation gates; it does not announce engine v2 as available.

## Current scope

The first PRs establish legacy contract fingerprints (C0), runtime experiments
(C1), and additive Desktop runtime catalog readers (D0). These are foundations.
The existing Loop Builder and shipped execution paths remain the public behavior.
Core is the engine included in Desktop; readers continue to manage its version
through Desktop Settings → Updates → Specrails Core.

Keep the [product narrative spec](../openspec/specs/product-narrative/spec.md)
intact. Do not add a Core product page, installation instructions, a Core package
dependency, or workflows triggered by Core releases. Desktop's released behavior
is the publication gate for user-facing documentation.

## Documentation gates

| Validated Desktop milestone | Public guide changes after the milestone |
| --- | --- |
| D1/D2 + Quick SDD | Explain composing, publishing and launching Core-executed graphs in the Loop Builder; show node validation and per-step usage |
| D3/D4 + Freestyle | Explain human questions/approval, repeating from a step and explicit recovery after interrupted writes |
| D5/D6 + Implement | Update factory graph examples, nested components, bounded parallel branches and role permissions (Batch was removed; parallel work uses several rails) |
| D7 | Explain steering acceptance versus consumption at the next attempt; update run observation examples |
| D8/Core C10 | Remove obsolete runner/profile instructions only after migration parity and the two-release telemetry gate |

For every milestone, update the matching Desktop guide first or in a paired PR,
then revise Web's reviewed articles under `src/content/guide/`. English and
Spanish are required; update applicable current translations across the eight
supported languages. Examples must use the visible Desktop actions and actual
validated behavior. A plan, capability field or successful fixture alone does
not establish a released user flow.

The human guides are maintained independently: `docs:sync` rebuilds the Web
index, loaders and sitemap; it does not copy Desktop articles. Never copy the
whole Desktop docs tree or Core internals into `src/content`. Technical engine
architecture and recovery protocol details belong in Core and Desktop internals.
The MCP runbook remains an explicit allowlisted import from Desktop's `docs/agents`.

## Verification and delivery

After editing public guide articles:

```sh
npm run docs:sync
npm run docs:check
npm run test:docs-sync
npm run build
```

Review the generated index/loaders/sitemap diff and the affected guide routes.
Preserve existing redirects and guide links. Keep screenshots and walkthroughs
aligned with the released Desktop UI, and distinguish an unknown cost from zero.
A negative implementation review is a verdict, not necessarily a process error;
writing workflows require verified evidence before delivery to review.

Record the paired PRs, validated Desktop milestone and any remaining rollout gate
in each documentation PR. A merged documentation PR is not proof of deployment;
Web publication is a separate operation. Final initiative acceptance includes a
cross-repository documentation review after D8/C10, not merely this checklist.

## Paired draft updates — 26 September 2026

PR #218 now prepares Loop Builder and run-detail additions in all eight
languages. These cover validated graph authoring, least-privilege roles,
verification-aware outcomes, exact-attempt recovery, cancellation acknowledgement
and steering receipts. The paired implementation is Desktop PR #708 and Core
PR #389. The prose is staged in this draft branch; it is not evidence of a
released Desktop version or a Web deployment. Keep this PR unmerged until the
paired implementation gates and final user-flow review pass. Fork instructions,
custom-agent details and final migration/rollout guidance still require the
remaining implementation and cross-repository documentation pass.

Draft validation: `docs:sync`, `docs:check` (37 routes), `test:docs-sync`
(6 tests), and the production build passed on 26 September 2026. The generated
index adds only the new English/Spanish search headings; routes and redirects
are unchanged. The worktree uses the existing repository dependency tree through
an untracked symlink; no package or lockfile change was needed. PR #218 was
returned to draft because these paired changes are not released yet.

## Verification workflow — 27 September 2026

Release now calls CI at the same revision and deploys its verified artifact.
Types, guide generation tests, coverage and build are required alongside the
existing audit and secret gates. Manual force deployment now actually bypasses
release-please; non-main dispatches cannot deploy. Release serialization and
stale-main checks protect delivery ordering. See `release-verification.md`.

Local validation: actionlint passed; types passed; documentation generator tests
6/6; Web coverage 36 suites / 226 tests, statements/lines 88.36%, branches 87.25%,
functions 92.53%; build passed. Production audit passes the existing high-severity
gate but reports one low and three moderate advisories in the current lockfile.
No release, merge or deployment was triggered.

Dependency follow-up: patch-only audit repair updates the selector parser and
router 6 patch versions, but two React Router advisories require >=7.18.0.
Upgrade the Web-only declarative router to 7.18.4, retain React 18 and existing
routes, and verify navigation/redirect tests, full coverage and build using an
isolated dependency tree. This does not change Desktop's router dependencies.
References: GHSA-wrjc-x8rr-h8h6 and GHSA-337j-9hxr-rhxg.

Router validation completed: React Router 7.18.4 and selector-parser 6.1.4
resolve all production advisories (`npm audit --omit=dev --audit-level=low`: 0).
Removed the now-obsolete v7 future flags from one test wrapper. Types, all 226
tests with unchanged coverage thresholds, and production build passed against
the isolated installed lockfile. Existing routes and redirects remain covered.

Development toolchain acceptance (27 September 2026): Vite 7.3.6,
Vitest/coverage-v8 4.1.11, compatible transitive security updates and a constructor
mock correction. All 38 suites / 263 tests passed in 13.03s with two workers.
Coverage: statements 89.75%, branches 80.73%, functions 92.03%, lines 91.46%;
all existing 80% thresholds retained. Types and production build passed on Node
22.22.3. Full `npm audit --audit-level=low` reports zero vulnerabilities, including
development dependencies. CI now audits development dependencies as well.
The source-pair observation behavior remains capability-gated: recorded event
span IDs correlate with optional Core OTLP exports; absent IDs stay absent,
and presence does not imply delivery to a collector. A stalled decider follows
the failed edge, never the successful stop edge.
