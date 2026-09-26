<p align="center">
  <img src="public/favicon.ico" alt="specrails" width="80" />
</p>

<h1 align="center">specrails-web</h1>

<p align="center">
  Website and product guide for <a href="https://github.com/fjpulidop/specrails-desktop">Specrails Desktop</a> — a local workspace for agentic software development — and its mobile Companion.
</p>

<p align="center">
  <a href="https://specrails.dev">Live site</a> ·
  <a href="https://specrails.dev/download">Download</a> ·
  <a href="https://specrails.dev/docs">Guide</a> ·
  <a href="#contributing">Contributing</a>
</p>

---

## About Specrails

Specrails is one app: [Specrails Desktop](https://github.com/fjpulidop/specrails-desktop). You start a mission with the AI agent you already use (Claude, Codex, Gemini or Kimi), turn it into a spec, run it through implementation loops and review the result, across one or several repositories. [Companion](https://specrails.dev/companion) lets you follow and steer missions from your phone.

Desktop includes its engine, [Specrails Core](https://github.com/fjpulidop/specrails-core) (the `specrails-core` package). Desktop uses Core to prepare each project's workflow and to run implementations, and applies Core updates itself. Core is not a separate product: nobody installs, runs or updates it by hand, and this site never presents it that way — no Core product page, no CLI reference and no `npx specrails-core` instructions. The guide explains it in [Core is built into Desktop](https://specrails.dev/docs/getting-started#core-is-built-into-desktop).

This repository contains specrails.dev: the landing page, the download page, the Companion page and hosted web app, and the multilingual product guide.

## Tech Stack

| Category | Tools |
|----------|-------|
| **Framework** | [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| **Build** | [Vite](https://vite.dev) with SWC |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) with light and dark themes |
| **Components** | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) |
| **Icons** | [Lucide](https://lucide.dev) |
| **Testing** | [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 18 (CI uses Node 20)
- npm

### Development

```sh
# Clone the repository
git clone https://github.com/fjpulidop/specrails-web.git
cd specrails-web

# Install dependencies
npm install

# Start the dev server (http://localhost:8080)
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:8080) |
| `npm run build` | Production build (runs `docs:check` first) |
| `npm run build:dev` | Development build (with source maps) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run check:types` | Type-check the app |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage thresholds |
| `npm run docs:sync` | Regenerate the guide index, loaders, sitemap and agent files |
| `npm run docs:check` | Verify generated guide and agent files are current |
| `npm run test:docs-sync` | Test the guide and agent-doc generators |
| `npm run build:companion` | Build the Companion web app from a sibling `specrails-companion` checkout |

### End-to-End Tests

```sh
# Requires the dev server running on port 8080
npm run dev &
npx playwright test
```

## Project Structure

```
src/
├── App.tsx                 # Routes: /, /download, /companion, /privacy, /docs; /core redirects to the guide
├── pages/                  # Index (landing), DownloadPage, CompanionPage, PrivacyPage, docs pages, NotFound
├── components/             # Landing sections (ProductLanding, ProductRecordings), Navbar, FooterSection, docs UI
│   └── ui/                 # shadcn/ui primitives
├── content/
│   ├── guide/<language>/   # Product guide articles (see src/content/guide/README.md)
│   └── for-agents/         # Agent runbooks copied from Desktop's docs/agents
├── hooks/                  # useReleaseManifest, useSeo, useTheme and friends
└── lib/                    # Per-language copy (product, download, companion, docs, i18n) and the docs registry
scripts/                    # Guide and agent-doc generators, Companion build
public/                     # Static assets, Companion web app, llms.txt, for-agents/
openspec/                   # OpenSpec specs and change history for this site
```

## Features

- **Mission-first landing** — Real recordings of Desktop's Mission Control, Board and Loop Builder
- **Download page** — Installers and checksums read from Desktop's release manifest, with a GitHub fallback
- **Product guide** — 37 articles in English and Spanish, with the essential journeys in six more languages, search and a generated sitemap
- **Companion** — Product page plus the hosted Companion web app at `/companion-app/`
- **Agent-readable docs** — `/llms.txt` and `/for-agents/` as static files that need no JavaScript
- **Light and dark themes, eight interface languages**

## Contributing

Contributions are welcome! Whether it's fixing a typo, improving the guide or polishing a page — feel free to open a PR. See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, conventions and the DCO sign-off.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes with a sign-off (`git commit -s -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feat/your-feature`)
5. Open a Pull Request

## Support

If Specrails is useful to you, you can donate on [Ko-fi](https://ko-fi.com/D1D81Y002C) ☕ to support ongoing development.

[![Donate on Ko-fi](https://img.shields.io/badge/Donate-Ko--fi-FF5E5B?logo=kofi&logoColor=white&style=flat-square)](https://ko-fi.com/D1D81Y002C)

## License

[MIT](LICENSE)

## Documentation exclusively for agents

Agents asked to connect Claude, Codex, Kimi or Gemini to Specrails MCP should start at [the dedicated runbook](src/content/for-agents/mcp.md). The built site exposes `/llms.txt` (product facts for agents plus the runbook links), `/for-agents/index.html` and `/for-agents/mcp.md` as static files, without JavaScript. The docs index and MCP article link to this section.

The canonical runbook lives in Specrails Desktop's `docs/agents/`; this repository commits a reviewed copy in `src/content/for-agents/`. From this Web checkout, run `npm run docs:sync -- --desktop-source` followed by the quoted path to the Desktop checkout to import only that runbook and regenerate public outputs. Use `npm run docs:check -- --desktop-source` followed by the same path to verify parity without writing. `npm run docs:sync` alone regenerates from the local copy; `npm run docs:check` (also run before builds) detects stale public content. Run `npm run test:docs-sync` after changing the generator.

The human guide in `src/content/guide/` is maintained independently of Desktop's `docs/guide/`; `docs:sync` generates its index, loaders and sitemap, not a cross-repository article import. Do not copy Desktop's entire docs tree into the Web guide, and do not import documentation from specrails-core: the website does not track Core releases.

Coordinate Desktop and Web documentation PRs. A Desktop merge does not publish Web changes. Web deployment is a separate release/manual-dispatch workflow that uploads `dist/` to Hostinger. After an authorized deployment, check the three static URLs return their actual text/HTML rather than the SPA fallback. Until then, the committed sources and PRs are the reviewable result.

The [workflow engine documentation rollout](docs/core-engine-documentation-rollout.md)
tracks the staged guide updates for the paired Core/Desktop engine migration.
Only validated Desktop milestones become public guide instructions.
