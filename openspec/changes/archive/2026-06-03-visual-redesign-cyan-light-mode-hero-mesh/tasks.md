# Tasks: Visual Redesign — Cyan Palette, Light Mode, Hero Mesh, Logo, Agents Update

## Conventions
- All tasks are tagged `[frontend]`
- Tasks must be executed in the numbered order within each phase; phases may overlap only as noted
- "Done" means: lint passes, tsc --noEmit passes, `npm test` passes, manual spot-check in browser

---

## Phase 1: Cyan Palette + Light/Dark Mode

### Task 1.1 — Add `--accent-cyan` and reassign brand-accent tokens [frontend]

**File:** `src/index.css`

**What to do:**
1. Add `--accent-cyan: 187 100% 41%;` to `:root` after `--dracula-yellow`.
2. Change `--primary` from `265 89% 78%` to `187 100% 41%`.
3. Change `--ring` from `265 89% 78%` to `187 100% 41%`.
4. Change `--sidebar-primary` from `265 89% 78%` to `187 100% 41%`.
5. Change `--sidebar-ring` from `265 89% 78%` to `187 100% 41%`.
6. Replace `--gradient-primary` with `linear-gradient(135deg, hsl(187 100% 41%), hsl(199 100% 38%))`.
7. Replace `--gradient-primary-hover` with `linear-gradient(135deg, hsl(187 100% 36%), hsl(199 100% 33%))`.
8. Update `.hero-glow` to use `--accent-cyan` as the primary stop (replace `--dracula-purple / 0.20`).
9. Update `.gradient-btn:hover` box-shadow from `--dracula-purple` to `--accent-cyan`.
10. Update `.docs-prose a, .docs-link` to use `text-primary hover:text-dracula-cyan` instead of `text-dracula-purple hover:text-dracula-pink`.

**Acceptance criteria:**
- `--accent-cyan` defined in `:root`
- `--primary` resolves to cyan (187 100% 41%) in browser devtools
- CTA buttons render in cyan, not purple
- Hero background glow is cyan-tinted
- No TypeScript errors

**Dependencies:** none

---

### Task 1.2 — Add `body` transition and `:root[data-theme="light"]` token set [frontend]

**File:** `src/index.css`

**What to do:**
1. Add `transition-colors duration-300` to the `body` rule in `@layer base`.
2. Add the full `:root[data-theme="light"]` block after the closing `}` of `:root`, inside `@layer base`. Token values are specified in `delta-spec.md` — copy exactly.
3. Add light-mode terminal overrides inside `@layer components`:
   ```css
   :root[data-theme="light"] .terminal,
   :root[data-theme="light"] .docs-prose pre {
     background-color: hsl(231 15% 18%) !important;
     border-color: hsl(225 27% 51% / 0.3) !important;
   }
   :root[data-theme="light"] .docs-prose pre code {
     color: hsl(60 30% 96%) !important;
   }
   ```

**Acceptance criteria:**
- Manually adding `data-theme="light"` to `<html>` in devtools makes the page switch to a light background with dark text
- Terminal blocks remain dark in light mode
- Background/color transition is smooth (0.3s) when toggling the attribute
- No TypeScript errors

**Dependencies:** Task 1.1

---

### Task 1.3 — Create `useTheme` hook [frontend]

**File:** `src/hooks/useTheme.ts` (new)

**What to do:**
Create the hook as specified in `delta-spec.md`. Key requirements:
- `Theme` enum type: `'light' | 'dark'`
- Default: `'dark'`
- Init from `localStorage.getItem('sr-theme')` (wrapped in try/catch)
- `useEffect` sets `document.documentElement.dataset.theme` and persists to localStorage
- `toggle` flips between `'light'` and `'dark'`
- Export: `useTheme()`, `Theme`

**Acceptance criteria:**
- Hook file exists at `src/hooks/useTheme.ts`
- `useTheme` exports `{ theme, toggle }`
- `theme` type is `'light' | 'dark'`
- `tsc --noEmit` passes

**Dependencies:** Task 1.2

---

### Task 1.4 — Add theme toggle button to Navbar [frontend]

**File:** `src/components/Navbar.tsx`

**What to do:**
1. Add `Sun, Moon` to the `lucide-react` import.
2. Import `useTheme` from `@/hooks/useTheme`.
3. Call `useTheme()` at the top of the component body.
4. Define a `ThemeToggle` snippet (inner component or inline JSX).
5. Insert `<ThemeToggle />` as the first element in the mobile cluster (`flex md:hidden`).
6. Insert `<ThemeToggle />` in the desktop cluster (`hidden md:flex`) between `DocsDropdown` and the Ko-fi anchor.

**Acceptance criteria:**
- Sun icon visible in dark mode; Moon icon visible in light mode
- Clicking the button toggles the site between dark and light themes with smooth transition
- Toggle is present and functional in both mobile and desktop viewports
- `localStorage` key `sr-theme` is updated on each toggle
- Refreshing the page restores the last chosen theme

**Dependencies:** Task 1.3

---

### Task 1.5 — Audit and fix brand-accent usage across section components [frontend]

**Files:** All section components that use `text-dracula-purple` / `text-dracula-pink` as the "brand color" (not as intentional per-item accents).

**What to do:**
1. Search for `text-dracula-purple` and `text-dracula-pink` across the codebase.
2. For each occurrence, determine context:
   - **Brand/accent** usage (link colors, generic highlights, "the accent"): replace with `text-primary` or `text-dracula-cyan`.
   - **Per-item intentional** usage (e.g. an agent card that is purposely purple, pink border on a specific badge): leave unchanged.
3. Apply replacements to `AgentsSection`, `AgentComparisonMatrix`, `DocsDropdown`, `FooterSection`, and any other files where purple/pink was used as the site's generic accent color.

**Acceptance criteria:**
- No `text-dracula-purple` / `text-dracula-pink` usages remain in brand/link/CTA contexts
- Per-item accents (specific agent colors, etc.) are unchanged
- Visual spot-check: links and highlighted text render in cyan, not purple
- `npm run lint` passes

**Dependencies:** Task 1.1

---

### Task 1.6 — Write Vitest test for `useTheme` [frontend]

**File:** `src/test/useTheme.test.tsx` (new)

**What to do:**
Write a Vitest + @testing-library/react test that:
1. Mocks `localStorage` (or uses the jsdom implementation).
2. Renders a component that uses `useTheme()`.
3. Asserts default theme is `'dark'`.
4. Asserts `document.documentElement.dataset.theme` is set to `'dark'` on mount.
5. Simulates a toggle and asserts theme becomes `'light'`, dataset updates.
6. Asserts `localStorage.getItem('sr-theme')` returns `'light'` after toggle.
7. Tests init from localStorage: pre-set `localStorage.setItem('sr-theme', 'light')` before render; assert initial theme is `'light'`.

**Acceptance criteria:**
- `npm test` passes with all cases green

**Dependencies:** Task 1.3

---

## Phase 2: Hero Mesh Canvas

### Task 2.1 — Create `HeroMesh` component [frontend]

**File:** `src/components/HeroMesh.tsx` (new)

**What to do:**
Port the canvas engine from `design_handoff_specrails_web/SpecRails Redesign.html` lines 826–1256 into the React component skeleton in `delta-spec.md`. Key implementation requirements:
1. All mutable state in refs/closures — never in React state.
2. `computePositions` function is exported (for testability).
3. Canvas palette read from `getComputedStyle` at runtime.
4. Light/dark rail color checked per-frame via `dataset.theme`.
5. `prefers-reduced-motion`: draw one static frame, skip RAF loop.
6. `IntersectionObserver` on the parent hero element (found via `canvas.closest('[data-hero]') ?? canvas.parentElement`).
7. `visibilitychange` event pauses/resumes RAF.
8. `AGENT_NAMES` constant matches exact list from prototype.
9. At most one bolt per agent name (`activeAgents` Set).
10. Spec lit for 3 s after agent collision.
11. Agent position smoothed with Gaussian average over 8 path steps.
12. Cleanup: cancel RAF, disconnect IntersectionObserver, remove all event listeners.

**Acceptance criteria:**
- Canvas renders and animates when browser opens `localhost:8080`
- Agent names appear with racing-beam box outline descending the grid
- Spec beams travel left-to-right; each "Spec N" label is colored and glowing
- Collision: spec label brightens and stays lit ~3 s after agent passes
- Canvas pauses when scrolled out of view; resumes when scrolled back
- `prefers-reduced-motion: reduce` in devtools: one static frame, no animation
- Switching theme (dark→light→dark) causes canvas line colors to adapt (light mode: dark grid lines on light bg)
- `tsc --noEmit` passes

**Dependencies:** Tasks 1.1, 1.2

---

### Task 2.2 — Mount `HeroMesh` in `HeroSection` and remove `ParticleBackground` [frontend]

**File:** `src/components/HeroSection.tsx`

**What to do:**
1. Delete the `ParticleBackground` component definition (the 50-dot canvas with connecting lines).
2. Delete the `<ParticleBackground />` usage in the hero JSX.
3. Import `HeroMesh` from `@/components/HeroMesh`.
4. Add `data-hero` attribute to the hero root element.
5. Render `<HeroMesh />` as the first child of the hero root div.
6. Wrap all existing hero copy (AnimatedLogo, headline, sub-copy, CTAs, terminal) in a `<div className="relative z-10">` if not already wrapped.
7. Keep `.hero-glow` and `.hero-noise` divs; place them at `z-index: 1` (between canvas at z=0 and copy at z=10).

**Acceptance criteria:**
- The old particle animation is gone
- The rails mesh canvas is visible behind the hero copy
- Hero copy (headline, buttons, terminal) is fully readable and sits above the canvas
- No layout regressions in the hero section (CTA buttons, terminal, spacing unchanged)
- `tsc --noEmit` passes

**Dependencies:** Task 2.1

---

### Task 2.3 — Write Vitest test for `computePositions` [frontend]

**File:** `src/test/HeroMesh.test.ts` (new)

**What to do:**
1. Import `computePositions` from `@/components/HeroMesh`.
2. Test with a small 3×3 node grid:
   - Mouse at center: verify projected positions are near original positions (z≈0).
   - Mouse at a node: verify node near mouse recedes (depth > 0, projected position shifts).
3. Mock `performance.now()` to return a fixed value.
4. Test that `out` array is mutated in-place (same object references).

Note: canvas, RAF, and IntersectionObserver are NOT needed for this test — `computePositions` is a pure math function.

**Acceptance criteria:**
- `npm test` passes with all cases green

**Dependencies:** Task 2.1

---

## Phase 3: Logo System

### Task 3.1 — Replace Navbar wordmark with inline SVG logo [frontend]

**File:** `src/components/Navbar.tsx`

**What to do:**
Replace the text wordmark `<a>` element with the inline SVG version as specified in `delta-spec.md`. Requirements:
- `aria-label="specrails home"` on the anchor
- SVG is inline (not `<img>`)
- `fill="hsl(var(--foreground))"` on rails; `fill="hsl(var(--background))"` on text rect fill; knockout text also `fill="hsl(var(--background))"`
- `height="42"` attribute on SVG
- `aria-hidden="true" focusable="false"` on SVG
- `data-logo="nav"` remains on the anchor (used by `AnimatedLogo` to find the nav slot)

**Acceptance criteria:**
- Navbar shows the rails SVG mark instead of text
- In dark mode: rails are light-colored, knockout text shows dark background through
- In light mode: rails are dark-colored, knockout text shows light background through (verifiable after Task 1.4)
- `AnimatedLogo` still correctly fades out the nav logo during hero scroll (data-logo="nav" present)
- `tsc --noEmit` passes

**Dependencies:** Task 1.4 (for theme-color inheritance verification)

---

### Task 3.2 — Replace `AnimatedLogo` text with SVG mark [frontend]

**File:** `src/components/AnimatedLogo.tsx`

**What to do:**
1. Replace the inner JSX from `<span>spec</span><span>rails</span>` (with purple/pink classes) to the inline SVG mark at `height="56"`.
2. Remove font/text classes from the outer `div` (no longer needed): remove `font-mono font-bold whitespace-nowrap text-5xl md:text-7xl`; keep only `whitespace-nowrap` if needed, or adjust to `flex items-center`.
3. Verify that the scroll-morph logic still works: the `offsetHeight` and `getBoundingClientRect()` calls on the outer `div` must still return meaningful values with the SVG inside.

**Note on sizing:** The SVG at `height="56"` will be significantly wider than the old text. Verify that the `heroWidth` / `navWidth` ratio in the lerp calculation produces a correct scale-to-nav transition. If the hero SVG is too wide, reduce `height` to `48` or `52` and recheck.

**Acceptance criteria:**
- Opening the homepage shows the SVG mark in the hero (large), which morphs smoothly to the navbar position on scroll
- The morphed mark aligns correctly with the nav slot
- `tsc --noEmit` passes

**Dependencies:** Task 3.1

---

### Task 3.3 — Replace `public/favicon.svg` [frontend]

**File:** `public/favicon.svg`

**What to do:**
Copy the content of `design_handoff_specrails_web/specrails-icon.svg` into `public/favicon.svg`, replacing the entire file content.

Verify:
- `index.html` already references `/favicon.svg` — no change needed there
- The SVG renders legibly at 32×32 and 16×16 in browser tab

**Acceptance criteria:**
- Browser tab shows the rails icon (not the old icon)
- SVG is valid (no parse errors in devtools)

**Dependencies:** none (independent)

---

## Phase 4: Agents Content Update

### Task 4.1 — Extend `AgentEntry` type and populate `core` / `note` fields [frontend]

**File:** `src/data/agents.ts`

**What to do:**
1. Add `core?: boolean;` and `note?: string;` to the `AgentEntry` interface.
2. Set `core: true` on the Architect entry.
3. Set `core: true` on the Developer entry.
4. Set `core: true` and `note: "Dynamically dispatched — implement detects specialized Developer agents by keywords and routes each task to the best match."` on the Developer entry.
5. Set `core: true` and `note: "Sub-specializes on demand — delegates to Frontend or Backend Reviewers when those agents are installed."` on the Reviewer entry.
6. Verify no other agents have `core` or `note`.

**Acceptance criteria:**
- `AgentEntry` interface has `core?: boolean` and `note?: string`
- `AGENTS.filter(a => a.core).map(a => a.name)` equals `['Architect', 'Developer', 'Reviewer']` (in any order)
- `tsc --noEmit` passes (optional fields are backwards-compatible)

**Dependencies:** none

---

### Task 4.2 — Update `AgentsSection` with Core badge, border, note, and intro copy [frontend]

**File:** `src/components/AgentsSection.tsx`

**What to do:**
1. Update the intro `<p>` text to the exact wording from `delta-spec.md`.
2. Update the "Compare all agents" link from `text-dracula-purple hover:text-dracula-pink` to `text-primary hover:text-dracula-cyan`.
3. In the card render, add the Core badge after the model badge (conditional on `a.core`).
4. Apply `border-primary/40` to core card's `glass-card` className via `cn()`.
5. Add the note line after the description paragraph (conditional on `a.note`).

**Acceptance criteria:**
- Intro text updated
- Architect, Developer, Reviewer cards show a filled cyan "Core" pill badge
- Core cards have a noticeably stronger border than non-core cards
- Developer and Reviewer cards show their note line in a smaller accent-colored font below the description
- Non-core cards are visually unchanged (no Core badge, no note, normal border)
- `tsc --noEmit` passes

**Dependencies:** Tasks 1.1, 4.1

---

### Task 4.3 — Add "Core" column to `AgentComparisonMatrix` [frontend]

**File:** `src/components/AgentComparisonMatrix.tsx`

**What to do:**
1. Add `<TableHead>Core</TableHead>` as the second column header (after "Agent").
2. Add a `<TableCell>` with conditional `<Badge className="bg-primary/20 text-primary border-0">Core</Badge>` as the second data cell.
3. In the mobile card view, add the Core badge next to the model badge in the header row.
4. Update "Learn more →" link color from `text-dracula-purple hover:text-dracula-pink` to `text-primary hover:text-dracula-cyan`.

**Acceptance criteria:**
- Desktop table has a "Core" column; Architect, Developer, Reviewer rows show a cyan "Core" badge; all other rows show nothing
- Mobile cards show Core badge on the three core agents
- "Learn more" links render in cyan accent
- Filtering (by name, model, stage, category) continues to work correctly
- `tsc --noEmit` passes

**Dependencies:** Tasks 1.1, 4.1

---

### Task 4.4 — Write Vitest test for AgentsSection Core rendering [frontend]

**File:** `src/test/AgentsSection.test.tsx` (new)

**What to do:**
1. Mock `useScrollAnimation` to return `{ ref: { current: null }, isVisible: true }`.
2. Render `<AgentsSection />`.
3. Assert the intro text contains "Three agents are core and always run".
4. Assert exactly three elements with text "Core" are rendered (the badges).
5. Assert Developer and Reviewer cards contain their note text.
6. Assert no other card has note text.

**Acceptance criteria:**
- `npm test` passes with all cases green

**Dependencies:** Tasks 4.1, 4.2

---

## Phase 5: Final Integration + QA

### Task 5.1 — Full lint, type-check, build, and test pass [frontend]

**What to do:**
Run in order:
```bash
npm run lint
npx tsc --noEmit
npm run build
npm test
```

Fix any errors before proceeding to Task 5.2.

**Acceptance criteria:**
- All four commands exit with code 0

**Dependencies:** All previous tasks

---

### Task 5.2 — Manual browser QA checklist [frontend]

**What to do:**
Open `http://localhost:8080` (after `npm run dev`) and verify:

**Theme toggle:**
- [ ] Default is dark mode on first visit
- [ ] Sun icon visible in dark mode; clicking → light mode with smooth transition
- [ ] Moon icon visible in light mode; clicking → dark mode
- [ ] Refreshing preserves the chosen theme
- [ ] Terminal and code blocks stay dark in both modes
- [ ] Docs page (`/docs`) looks correct in both modes

**Hero mesh:**
- [ ] Animated rails grid visible behind hero copy
- [ ] Spec labels (e.g. "Spec 42") travel left-to-right in different colors
- [ ] Agent name boxes (e.g. "Architect") descend with racing-beam outline
- [ ] Spec glows brighter and stays lit ~3 s when agent overlaps it
- [ ] Canvas pauses when hero scrolled out of view (check with DevTools Performance)
- [ ] Canvas resumes on scroll back
- [ ] No console errors

**Logo:**
- [ ] Navbar shows SVG rails mark (center rail with "specrails" knockout text)
- [ ] Logo colors flip correctly between dark and light themes
- [ ] Browser tab shows the rails icon (favicon)
- [ ] Hero logo (AnimatedLogo) morphs to navbar on scroll

**Agents section:**
- [ ] Intro copy updated to new text
- [ ] Architect, Developer, Reviewer cards have cyan "Core" badge
- [ ] Core cards have a stronger border
- [ ] Developer and Reviewer cards show note text in small font below description
- [ ] `/agents` page matrix has "Core" column; three agents show badge

**Acceptance criteria:**
- All checkboxes pass
- No visual regressions in sections outside Hero/Navbar/Agents

**Dependencies:** Task 5.1
