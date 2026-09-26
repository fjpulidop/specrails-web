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
| D5/D6 + Implement/Batch | Update factory graph examples, nested components, bounded parallel branches and role permissions |
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
