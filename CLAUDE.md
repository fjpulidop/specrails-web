# specrails-web

Website and product guide for [Specrails Desktop](https://github.com/fjpulidop/specrails-desktop) — a local workspace for agentic software development — and its mobile Companion. Hosted at [specrails.dev](https://specrails.dev).

## Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 + TypeScript |
| Build | Vite 7 + SWC |
| Styling | Tailwind CSS, light and dark themes on the `--dracula-*` tokens in `src/index.css` |
| Components | shadcn/ui + Radix UI |
| Icons | Lucide React |
| Routing | React Router 7 (declarative) |
| State | @tanstack/react-query |
| Guide | Markdown in `src/content/guide/<language>/`, rendered with react-markdown |
| Testing | Vitest + @testing-library/react + Playwright |

## Repo layout

```
src/
├── App.tsx            # Routes: /, /download, /companion, /privacy, /docs/:slug and redirects
├── pages/             # Index, DownloadPage, CompanionPage, PrivacyPage, DocsLayout, DocsIndex, DocPage, NotFound
├── components/        # Landing sections, Navbar, FooterSection, docs UI
│   └── ui/            # shadcn/ui primitives
├── content/
│   ├── guide/         # Product guide articles per language (see its README.md)
│   └── for-agents/    # Agent runbook copied from Desktop's docs/agents
├── hooks/             # useReleaseManifest, useSeo, useTheme, useScrollAnimation, ...
├── lib/               # Per-language copy, i18n, docs registry and generated guide index
└── test/              # Vitest suites
scripts/               # Guide/agent-doc generators, audit gate, Companion build, recordings
public/                # Static assets, product recordings, Companion web app, llms.txt, for-agents/
docs/                  # Contributor notes (release verification)
openspec/              # Specs and change history
```

## Dev commands

```bash
npm run dev            # Dev server (localhost:8080)
npm run build          # Production build (prebuild runs docs:check and test:product-assets)
npm run lint           # ESLint
npm run check:types    # Type check
npm test               # Vitest run
npm run test:coverage  # Vitest with 80% thresholds (as in CI)
npm run docs:sync      # Regenerate guide index, loaders, sitemap and agent files
npm run docs:check     # Verify generated guide and agent files are current
npm run test:docs-sync # Generator and audit-gate tests
```

## Environment

- Node.js 22.22.3 (the CI version), npm with `package-lock.json`
- No backend: a static SPA uploaded by FTP by the Release workflow
- CI (`.github/workflows/ci.yml`) runs the audit gate, types, generator tests, coverage and build; DCO sign-off is checked on PRs. See `docs/release-verification.md`
- GitHub Issues used for backlog (label: `product-driven-backlog`)
- Open-source project (public repo)

## Conventions

Layer-specific conventions are in `.claude/rules/` (loaded conditionally per layer).

- **File naming**: PascalCase for components, camelCase for hooks/utils, lowercase for shadcn/ui
- **Imports**: `@/` path alias for all src/ imports
- **Styling**: Tailwind utility classes only, Dracula theme CSS custom properties
- **Components**: shadcn/ui for standard elements, `cn()` for class merging
- **Commits**: conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **Branches**: `feat/<name>`, `fix/<name>`, `docs/<name>`

## Product narrative

- Specrails is one app: Specrails Desktop, plus Companion on the phone. Download, source and issue links point to `fjpulidop/specrails-desktop`.
- Specrails Core (`specrails-core`) is the engine built into Desktop. Mention it only as part of Desktop — never as a product, CLI or package that people install, run or update: no `npx specrails-core` commands, no Core page, no Core-vs-Desktop comparison. Its version and updates live in Desktop Settings → Updates → Specrails Core.
- Requirement: `openspec/specs/product-narrative/spec.md`. `/core` redirects to the guide section "Core is built into Desktop".

## Warnings

- Colors come from the theme's CSS custom properties, in both light and dark themes
- shadcn/ui components must be used where applicable — no custom reimplementations
- No backend — this is a static SPA, do not add server-side code
- CI enforces 80% coverage — include Vitest tests for new behavior
- Guide changes must be followed by `npm run docs:sync`; commit the generated files with the articles

## OpenSpec

- **Specs**: `openspec/specs/` is the source of truth. Read relevant specs before implementing.
- **Changes**: `openspec/changes/<name>/`. Use `/opsx:ff` -> `/opsx:apply` -> `/opsx:archive`.

## Scoped context

- Layer rules: `.claude/rules/frontend.md`
