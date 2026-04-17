<p align="center">
  <img src="public/favicon.ico" alt="specrails" width="80" />
</p>

<h1 align="center">specrails-web</h1>

<p align="center">
  Landing page and documentation site for <a href="https://github.com/fjpulidop/specrails-core">specrails</a> — a chained AI agent system that works with Claude Code and OpenAI Codex to build a complete software development team.
</p>

<p align="center">
  <a href="https://specrails.dev">Live Site</a> ·
  <a href="https://github.com/fjpulidop/specrails-core">specrails gem</a> ·
  <a href="#contributing">Contributing</a>
</p>

---

## About specrails

[specrails](https://github.com/fjpulidop/specrails-core) is a CLI-agnostic AI agent pipeline that automates the journey from idea to production code. It orchestrates a team of specialized AI agents — Product Manager, Architect, Developer, Reviewer, Security Reviewer, and more — running on Claude Code or OpenAI Codex.

This repository contains the **landing page** at [specrails.dev](https://specrails.dev), which showcases the agent team, the development pipeline, live terminal demos, and a dynamic roadmap pulled from GitHub issues.

## Tech Stack

| Category | Tools |
|----------|-------|
| **Framework** | [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| **Build** | [Vite](https://vite.dev) with SWC |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) with Dracula color theme |
| **Components** | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) |
| **Icons** | [Lucide](https://lucide.dev) |
| **Testing** | [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 18
- npm

### Development

```sh
# Clone the repository
git clone https://github.com/fjpulidop/specrails-core-web.git
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
| `npm run build` | Production build |
| `npm run build:dev` | Development build (with source maps) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

### End-to-End Tests

```sh
# Requires the dev server running on port 8080
npm run dev &
npx playwright test
```

## Project Structure

```
src/
├── components/
│   ├── AgentComparisonMatrix.tsx  # Side-by-side agent capability comparison
│   ├── AgentsDropdown.tsx         # Agents navigation dropdown
│   ├── AgentsSection.tsx          # AI agent team showcase
│   ├── AnimatedLogo.tsx           # Animated SpecRails logo
│   ├── CliCompatibilitySection.tsx # CLI feature parity comparison table
│   ├── CommandsSection.tsx        # CLI commands reference
│   ├── DemoSection.tsx            # Animated terminal demo
│   ├── DocsDropdown.tsx           # Docs navigation dropdown
│   ├── DocsSidebar.tsx            # Documentation sidebar nav
│   ├── FeaturesSection.tsx        # Key features grid
│   ├── FooterSection.tsx          # Footer with links
│   ├── GitHubStarsButton.tsx      # Live GitHub star count button
│   ├── HeroSection.tsx            # Hero with particle animation
│   ├── HubSection.tsx             # specrails-hub product section
│   ├── InstallSection.tsx         # Installation instructions
│   ├── MarkdownRenderer.tsx       # Syntax-highlighted markdown renderer
│   ├── Navbar.tsx                 # Navigation bar
│   ├── NavLink.tsx                # Styled navigation link
│   ├── PipelineSection.tsx        # Development pipeline timeline
│   ├── PrinciplesSection.tsx      # Core principles
│   ├── ProblemSection.tsx         # Problem statement
│   ├── RoadmapSection.tsx         # Live roadmap from GitHub issues
│   ├── SectionNav.tsx             # In-page section navigation
│   └── ui/                        # shadcn/ui component library
├── hooks/
│   ├── use-mobile.tsx             # Mobile viewport detection
│   ├── use-toast.ts               # Toast notification hook
│   ├── useScrollAnimation.ts      # Intersection Observer scroll animations
│   └── useSeo.ts                  # SEO meta tag management
├── lib/
│   ├── docs-registry.ts           # Documentation content registry
│   └── utils.ts                   # Shared utilities (cn, etc.)
└── pages/
    ├── AgentsPage.tsx             # Full agents reference page
    ├── DocPage.tsx                # Individual documentation page
    ├── DocsIndex.tsx              # Documentation index
    ├── DocsLayout.tsx             # Docs section layout
    ├── Index.tsx                  # Landing page (home)
    └── NotFound.tsx               # 404 page
```

## Features

- **Dracula Theme** — Dark color scheme with glassmorphism effects and gradient accents
- **Animated Terminal Demo** — Realistic line-by-line simulation of the `/specrails:implement` command
- **Particle Background** — Canvas-based particle network animation in the hero section
- **Scroll Animations** — Intersection Observer-based fade-in and slide-up transitions
- **Live Roadmap** — Dynamically fetches open issues from the specrails GitHub repository
- **Fully Responsive** — Mobile-first design across all sections

## Contributing

Contributions are welcome! Whether it's fixing a typo, improving animations, or adding new sections — feel free to open a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feat/your-feature`)
5. Open a Pull Request

## Support

If specrails is useful to you, you can donate on [Ko-fi](https://ko-fi.com/D1D81Y002C) ☕ to support ongoing development.

[![Donate on Ko-fi](https://img.shields.io/badge/Donate-Ko--fi-FF5E5B?logo=kofi&logoColor=white&style=flat-square)](https://ko-fi.com/D1D81Y002C)

## License

This project is open source. See the specrails [repository](https://github.com/fjpulidop/specrails-core) for license details.

---

<p align="center">
  Built with 🧛 Dracula vibes for <a href="https://github.com/fjpulidop/specrails-core">specrails</a>
</p>
