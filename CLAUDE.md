# specrails-web

Landing page and documentation site for [specrails](https://github.com/fjpulidop/specrails-core) — a chained AI agent system that transforms Claude Code into a complete software development team. Hosted at [specrails.dev](https://specrails.dev).

## Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 + TypeScript (strict mode) |
| Build | Vite + SWC |
| Styling | Tailwind CSS with Dracula color theme |
| Components | shadcn/ui + Radix UI |
| Icons | Lucide React |
| Routing | React Router DOM v6 |
| State | @tanstack/react-query |
| Testing | Vitest + @testing-library/react + Playwright |

## Repo layout

```
src/
├── components/        # Page sections (HeroSection, PipelineSection, etc.)
│   └── ui/            # shadcn/ui primitives (button, card, etc.)
├── hooks/             # Custom React hooks (useScrollAnimation, use-mobile)
├── lib/               # Utilities (cn helper)
├── pages/             # Route pages (Index, NotFound)
└── test/              # Test files
public/                # Static assets (favicon, OG images)
index.html             # Entry point
```

## Dev commands

```bash
npm run dev          # Start dev server (localhost:8080)
npm run build        # Production build (vite build)
npm run lint         # ESLint
npm test             # Vitest run
npx tsc --noEmit     # Type check
```

## Environment

- Node.js >= 18, npm
- No backend — static SPA deployed to static hosting
- No CI/CD pipeline configured yet
- GitHub Issues used for backlog (label: `product-driven-backlog`)
- Open-source project (public repo)

## Architecture

```
React 18 + TypeScript SPA (Vite + SWC)
├── src/components/     → Page sections + shadcn/ui primitives
├── src/hooks/          → Custom React hooks
├── src/lib/            → Utilities
├── src/pages/          → Route pages
├── public/             → Static assets
└── index.html          → Entry point
```

## Conventions

Layer-specific conventions are in `.claude/rules/` (loaded conditionally per layer).

- **File naming**: PascalCase for components, camelCase for hooks/utils, lowercase for shadcn/ui
- **Imports**: `@/` path alias for all src/ imports
- **Styling**: Tailwind utility classes only, Dracula theme CSS custom properties
- **Components**: shadcn/ui for standard elements, `cn()` for class merging
- **Commits**: conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **Branches**: `feat/<name>`, `fix/<name>`, `docs/<name>`

## Warnings

- Dracula color theme is mandatory — all new UI must use CSS custom properties
- shadcn/ui components must be used where applicable — no custom reimplementations
- No backend — this is a static SPA, do not add server-side code
- Test coverage is minimal — include basic Vitest tests for new features
- No CI/CD yet — verify manually with lint, type check, build, and test commands

## OpenSpec

- **Specs**: `openspec/specs/` is the source of truth. Read relevant specs before implementing.
- **Changes**: `openspec/changes/<name>/`. Use `/opsx:ff` -> `/opsx:apply` -> `/opsx:archive`.

## Scoped context

- Layer rules: `.claude/rules/frontend.md`
