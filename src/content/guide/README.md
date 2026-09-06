# Maintaining the current product guide

The public guide is curated from the Desktop implementation and its internal documentation. The navigation index contains metadata only; article bodies are loaded separately by `docs-content.ts`. Navbar's Docs menu must not import Markdown eagerly.

## Update an article

1. Verify the behavior against the corresponding Desktop source and current capability contract. Useful starting points are Desktop `README.md` and `docs/multi-repo-projects.md`, `docs/agent-live-steering.md`, and `docs/internals/browser-login-popups.md`, plus the mobile gateway and process-history implementation.
2. Update the matching English and Spanish files. Preserve existing route keys when changing the title. Put `<!-- guide-revision: mission-first-v1 -->` on the first line only when that article describes the current workflow.
3. Translate the changed essential journeys in French, German, Portuguese, Italian, Chinese and Japanese. For other articles, remove the current revision marker from a translation that has become stale: the reader will receive the current English article with an explicit notice. Never mark an old translation current just to remove that notice.
4. Run `npm run docs:sync`, `npm run docs:check`, `npm run test:docs-sync` and the documentation tests. Commit `docs-generated.json`, `docs-loaders.ts` and `public/sitemap.xml` with the articles.

English and Spanish currently cover all 37 articles. The other six languages cover the overview, first mission and delivery review. Older translated files remain preserved in source but are excluded from the current catalog unless their revision marker matches. Interface text is localized independently in `lib/docs-copy.ts`.

## Routes and synchronization

`node scripts/sync-guide.mjs` deterministically generates the lightweight search index and sitemap from current article metadata. `--check` detects stale outputs without writing. Both production and development builds run that guard. The sitemap includes the public landing, downloads, Companion, privacy and guide routes; it excludes redirected legacy product pages.

The historical `update-docs.yml` workflow updates a Core dependency. It does **not** synchronize this product guide or prove that a feature is shipped. Do not replace current product text with old Core documentation during dependency updates.

The guide describes current source behavior; visitors must check installed-version availability. Keep provider charges, cross-repository delivery limits, mobile grants, native/browser differences and network boundaries explicit. Demo or illustrative UI must not be described as a live execution.
