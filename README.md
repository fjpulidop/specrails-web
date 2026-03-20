<p align="center">
  <img src="public/favicon.ico" alt="specrails" width="80" />
</p>

<h1 align="center">specrails-web</h1>

<p align="center">
  Landing page and documentation site for <a href="https://github.com/fjpulidop/specrails-core">specrails</a> — a chained AI agent system that transforms Claude Code into a complete software development team.
</p>

<p align="center">
  <a href="https://specrails.dev">Live Site</a> ·
  <a href="https://github.com/fjpulidop/specrails-core">specrails gem</a> ·
  <a href="#contributing">Contributing</a>
</p>

---

## About specrails

[specrails](https://github.com/fjpulidop/specrails-core) is a full-stack AI agent pipeline that automates the journey from idea to production code. It orchestrates a team of specialized AI agents — Product Manager, Architect, Developer, Reviewer, Security Reviewer, and more — each powered by the right Claude model for the job.

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
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── components/
│   ├── AgentsSection.tsx       # AI agent team showcase
│   ├── CommandsSection.tsx     # CLI commands reference
│   ├── DemoSection.tsx         # Animated terminal demo
│   ├── FeaturesSection.tsx     # Key features grid
│   ├── FooterSection.tsx       # Footer with links
│   ├── HeroSection.tsx         # Hero with particle animation
│   ├── InstallSection.tsx      # Installation instructions
│   ├── Navbar.tsx              # Navigation bar
│   ├── PipelineSection.tsx     # Development pipeline timeline
│   ├── PrinciplesSection.tsx   # Core principles
│   ├── ProblemSection.tsx      # Problem statement
│   ├── RoadmapSection.tsx      # Live roadmap from GitHub issues
│   └── ui/                     # shadcn/ui component library
├── hooks/                      # Custom React hooks
├── lib/                        # Utilities
└── pages/                      # Route pages
```

## Features

- **Dracula Theme** — Dark color scheme with glassmorphism effects and gradient accents
- **Animated Terminal Demo** — Realistic line-by-line simulation of the `/sr:implement` command
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

## License

This project is open source. See the specrails [repository](https://github.com/fjpulidop/specrails-core) for license details.

---

<p align="center">
  Built with 🧛 Dracula vibes for <a href="https://github.com/fjpulidop/specrails-core">specrails</a>
</p>
