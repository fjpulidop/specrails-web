# Contributing to specrails-web

Thank you for your interest in contributing to specrails-web — the public website and documentation site for SpecRails.

## Prerequisites

- **Node.js** >= 18 (or **Bun** >= 1.0)
- **npm** >= 9 (or **bun**)

## Local Setup

```bash
git clone https://github.com/fjpulidop/specrails-web.git
cd specrails-web
npm install
```

## Development Server

```bash
npm run dev
```

The site runs at `http://localhost:8080` (configured in `vite.config.ts`).

## Project Structure

```
specrails-web/
├── src/           # Application source (React + TypeScript)
├── public/        # Static assets
├── docs/          # Content and documentation source
└── openspec/      # OpenSpec specs for this project
```

## Running Tests

```bash
# Unit tests
npm test

# End-to-end tests (requires dev server running)
npx playwright test
```

## Building

```bash
npm run build
```

The output goes to `dist/`. Preview the production build with `npm run preview`.

## Making Changes

1. Fork the repository and create a branch from `main`.
2. Make your changes. Keep PRs focused — one concern per PR.
3. Run `npm test` to verify nothing broke.
4. Build locally to catch any TypeScript or bundling errors.

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add pricing page
fix: correct mobile nav overflow
docs: update installation guide
chore: upgrade Tailwind to v4
```

## Submitting a Pull Request

- Target the `main` branch.
- Write a clear PR description: what changed and why.
- For visual changes, include a screenshot or screen recording.
- Tag your PR with the appropriate label (`feat`, `fix`, `docs`, `chore`).

## Reporting Issues

Use [GitHub Issues](https://github.com/fjpulidop/specrails-web/issues). Include:
- Your browser and OS version
- Steps to reproduce the issue
- Screenshots if applicable

## Developer Certificate of Origin (DCO)

This project uses the [Developer Certificate of Origin](https://developercertificate.org/) (DCO). By submitting a pull request, you certify that you have the right to submit the code and that it can be distributed under the project's MIT License.

Sign off your commits with the `-s` flag:

```bash
git commit -s -m "feat: add pricing page"
```

## Code of Conduct

This project is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
