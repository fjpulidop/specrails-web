## Context

- specrails-core 6.0.0 ("make Core a thin, Desktop-only engine") removed the standalone surface: no `update`, `doctor` or interactive installer, integration contract 5.0 and three roles. Desktop 2.57.0 bundles Core 6.0.0. Its settings dialog shows the engine under **Updates → Specrails Core** with the labels "Included in Desktop" and "Managed by Desktop", and applies Core updates to all projects.
- The native Desktop app includes Core. The `specrails-desktop` npm distribution does not declare Core as a dependency; it fetches the matching `specrails-core@^6` itself during project setup.
- The live site was already Desktop-first (mission-first landing; `/core`, `/desktop` and `/agents` redirected to `/`), but the repository still held the Core narrative in unrouted components, unpublished Markdown, OpenSpec specs and changes, a devDependency and a release-triggered workflow. The guide used "Core" without defining it.

## Goals / Non-Goals

**Goals:**
- Wherever a visitor or an agent meets "Core" on specrails.dev, it is described as Desktop's built-in engine.
- Remove source that would bring back the old narrative if someone revived it.
- Keep the change to content, routing and tooling: no new dependencies, no visual redesign.

**Non-Goals:**
- Re-translating stale guide translations. Outside English and Spanish only three articles per language are current; the rest stay excluded by the revision marker, as `src/content/guide/README.md` prescribes, even though some still mention old Core commands.
- Removing other unused components from earlier landing iterations that do not mention Core (HeroSection, ProblemSection, DemoSection, ProductsSection, PipelineSection, HubShowcaseSection, SectionNav and their helpers).
- Changes in specrails-core or specrails-desktop.

## Decisions

### D1: Call it "Specrails Core, the engine built into Desktop"
Desktop's interface already uses "Specrails Core" and "Included in Desktop", and job evidence mentions Core acceptance, so the guide keeps the name and ties it to Desktop. Alternative: never name Core — rejected, because people meet the name in Desktop settings, in job evidence and on npm and need to know what it refers to.

### D2: Explain Core in the overview article under its own heading
The docs search indexes titles, descriptions and headings, not article bodies. A "Core is built into Desktop" heading makes the explanation findable by searching "core", and the overview is one of the articles translated into all eight languages. Alternative: a new standalone article — rejected; it would need eight new translations to explain two paragraphs.

### D3: Redirect `/core` to the guide section
Old links to the former Core page now land on `/docs/getting-started#core-is-built-into-desktop`. The anchor exists in English; other languages open the same short article at the top.

### D4: Delete unrouted Core-narrative code and unpublished docs
Nothing reachable from `src/main.tsx` imports them, and their tests asserted the old story (for example "identifying specrails-core as the open-source CLI"). Git history keeps them. Alternative: rewrite them — rejected, since no route renders them.

### D5: Delete stale specs and superseded changes
The main specs are stored in delta format and report 0 requirements, so REMOVED deltas cannot apply to them. The superseded changes target files that no longer exist and would recreate a `/core` page. The new `product-narrative` spec replaces them as the source of truth for this topic.

### D6: Put the product facts in `llms.txt`
AI assistants are a likely source of outdated `npx specrails-core init` advice. The facts live in the generator (`scripts/sync-agent-docs.mjs`), so `npm run docs:check` keeps the published file in sync.

## Risks / Trade-offs

- [Desktop renames a settings label] → Paths match the Desktop 2.57 locale files; the guide maintenance README asks maintainers to verify behavior against Desktop source.
- [The redirect anchor only scrolls in English] → The overview is short and the section is on the first screens.
- [Stale translations keep old Core commands in source] → They are not published; they are replaced when the articles are translated again.
- [Core's release workflow still notifies the website] → The event has no listener and no effect; removing the step is a Core follow-up.
