# Tasks: Update Repository References from specrails to specrails-core

All tasks are tagged `[frontend]`.

---

## Task 1 — Update documentation files [frontend]

**Description:** Update all GitHub URLs in markdown documentation files.

**Files involved:**
- `CLAUDE.md`
- `README.md`
- `docs/getting-started.md`
- `docs/installation.md`
- `docs/updating.md`

**Changes:** Replace all occurrences of `fjpulidop/specrails` (not `specrails-web` or `specrails-core`) with `fjpulidop/specrails-core` in these files. This includes:
- Git clone URLs (`github.com/fjpulidop/specrails.git` → `github.com/fjpulidop/specrails-core.git`)
- Raw content URLs (`raw.githubusercontent.com/fjpulidop/specrails/` → `raw.githubusercontent.com/fjpulidop/specrails-core/`)
- Markdown links to the repo

**Acceptance criteria:**
- No remaining references to `fjpulidop/specrails` (except `-web` and `-core` suffixed variants)
- Files render correctly

**Dependencies:** None

---

## Task 2 — Update React component files [frontend]

**Description:** Update all GitHub URLs in React component source files.

**Files involved:**
- `src/components/RoadmapSection.tsx` — API URL and issues URL
- `src/components/FooterSection.tsx` — footer GitHub links
- `src/components/DemoSection.tsx` — demo PR URL
- `src/components/Navbar.tsx` — navbar GitHub link
- `src/components/HeroSection.tsx` — clone URL and GitHub link
- `src/components/InstallSection.tsx` — clone URL and GitHub link

**Changes:** Replace all occurrences of `fjpulidop/specrails` (not `-web` or `-core`) with `fjpulidop/specrails-core`.

**Acceptance criteria:**
- No remaining references to `fjpulidop/specrails` in component files (except `-web` and `-core` suffixed variants)
- `npx tsc --noEmit` passes
- `npm run lint` passes
- `npm run build` passes

**Dependencies:** None

---

## Task 3 — Verification [frontend]

**Description:** Run full verification to ensure no references were missed and the build is clean.

**Verification checklist:**
1. `grep -r "fjpulidop/specrails[^-]" --include="*.tsx" --include="*.ts" --include="*.md"` returns no results
2. `npm run lint` — 0 errors
3. `npx tsc --noEmit` — 0 errors
4. `npm run build` — succeeds

**Dependencies:** Tasks 1, 2
