# Proposal: Update Repository References from specrails to specrails-core

## What

Update all GitHub repository references from `fjpulidop/specrails` to `fjpulidop/specrails-core` across the entire codebase. The main specrails repository has been renamed/moved to `specrails-core`.

## Why

The specrails repository has moved from `github.com/fjpulidop/specrails` to `github.com/fjpulidop/specrails-core`. All references in the website (links, clone URLs, API endpoints, documentation) currently point to the old URL and need to be updated to prevent broken links and confusion.

## Non-goals

- No changes to `specrails-web` references (this repo stays the same)
- No functional or UI changes — purely a URL find-and-replace
- No changes to page layout, components, or logic

## Scope

**Files modified:** 12 files across docs, components, and project files

- `CLAUDE.md` — project description link
- `README.md` — multiple repo links
- `docs/getting-started.md` — git clone URL
- `docs/installation.md` — git clone and curl URLs
- `docs/updating.md` — curl URL
- `src/components/RoadmapSection.tsx` — GitHub API and issues URLs
- `src/components/FooterSection.tsx` — GitHub links
- `src/components/DemoSection.tsx` — demo PR URL
- `src/components/Navbar.tsx` — GitHub link
- `src/components/HeroSection.tsx` — clone URL and link
- `src/components/InstallSection.tsx` — clone URL and link

## Success criteria

- All references to `fjpulidop/specrails` (excluding `specrails-web` and `specrails-core`) are updated to `fjpulidop/specrails-core`
- No broken links remain
- `npm run build` passes
- `npx tsc --noEmit` passes
- `npm run lint` passes
