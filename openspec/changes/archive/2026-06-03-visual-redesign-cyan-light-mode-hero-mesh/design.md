# Design: Visual Redesign — Cyan Palette, Light Mode, Hero Mesh, Logo, Agents Update

## Architecture Overview

This change is purely frontend — no backend, no build-pipeline changes, no new dependencies beyond what is already installed. All four parts operate through the existing token/component system.

The execution dependency order is:

```
[1] CSS tokens (src/index.css)
     └─► [2] useTheme hook (new file)
           └─► [3] Navbar toggle (extends existing)
[4] HeroMesh canvas (new file)
     └─► [5] HeroSection mount (extends existing)
[6] SVG logo (public/ + Navbar + AnimatedLogo)
[7] AgentEntry type + data (src/data/agents.ts)
     └─► [8] AgentsSection render (extends existing)
     └─► [9] AgentComparisonMatrix column (extends existing)
```

Parts 1-3 (palette/theme) are prerequisites for Part 4 (canvas reads CSS tokens at runtime). Parts 6-9 are independent of each other and can proceed in any order after Part 1.

---

## Part 1: CSS Token Strategy

### Design Decision: `data-theme` attribute on `documentElement`

The prototype uses `body.light` class. The repo uses shadcn/ui and Tailwind, whose dark-mode integration targets `html` with a `dark` class by default. Using `data-theme="light"` / `data-theme="dark"` on `documentElement` is a middle path:
- Does not conflict with Tailwind's `dark:` variant (which uses `.dark` class on `html`)
- Is more semantically explicit than a bare class
- Is readable from JavaScript without string parsing

The CSS selector is `:root[data-theme="light"]` (`:root` === `html`).

### New token: `--accent-cyan`

```css
--accent-cyan: 187 100% 41%;   /* #00C3D2 deep variant, sufficient contrast on dark */
```

The existing `--dracula-cyan: 191 97% 77%` is kept for fills, glows, and badges — it is too light at full opacity for solid interactive surfaces. `--accent-cyan` is the new "primary brand" token used for buttons, gradient stops, and glow highlights.

### Token reassignments (dark default, unchanged in :root)

| Token | Old value | New value |
|---|---|---|
| `--primary` | `265 89% 78%` (purple) | `187 100% 41%` (accent-cyan) |
| `--primary-foreground` | `231 15% 18%` | unchanged |
| `--ring` | `265 89% 78%` | `187 100% 41%` |
| `--sidebar-primary` | `265 89% 78%` | `187 100% 41%` |
| `--gradient-primary` | cyan→teal gradient (cyan stop + teal secondary stop) |
| `--gradient-primary-hover` | same, 6% darker |

The `--dracula-purple`, `--dracula-pink`, and all other Dracula hues remain unchanged — they are still used for per-agent card accents and syntax highlighting.

### Light mode token set

Added under `:root[data-theme="light"]`:

```css
:root[data-theme="light"] {
  --background:          220 30% 98%;
  --background-darker:   220 22% 96%;
  --foreground:          240 15% 14%;
  --muted-foreground:    240 8% 40%;
  --border:              0 0% 0% / 0.10;
  --card:                0 0% 100%;
  --card-foreground:     240 15% 14%;
  --primary:             187 100% 30%;   /* darken accent-cyan ~11% L for light bg */
  --ring:                187 100% 30%;
  --accent-cyan:         187 100% 30%;
  --dracula-cyan:        191 97% 40%;    /* darken ~37% L */
  --dracula-purple:      265 89% 52%;
  --dracula-pink:        326 100% 48%;
  --dracula-green:       135 94% 34%;
  --dracula-yellow:      65 92% 38%;
  --dracula-orange:      31 100% 44%;
  --dracula-red:         0 100% 50%;
  --dracula-comment:     225 27% 36%;
  --muted:               220 22% 92%;
  --glass-bg:            220 30% 96% / 0.7;
  --glass-border:        0 0% 0% / 0.08;
  --gradient-primary:    linear-gradient(135deg, hsl(187 100% 30%), hsl(199 100% 35%));
  --gradient-primary-hover: linear-gradient(135deg, hsl(187 100% 26%), hsl(199 100% 31%));
}
```

Terminal and code blocks override: inside `.terminal` and `.docs-prose pre`, `background-color` is pinned to `hsl(var(--dracula-darker))` using `!important` under a `:root[data-theme="light"]` rule — matching the prototype's `body.light .term` pattern.

### Body transition

`body` receives `@apply transition-colors duration-300;` so the background/color shift is smooth on toggle.

### `hero-glow` update

```css
.hero-glow {
  background:
    radial-gradient(ellipse 90% 60% at 50% -5%, hsl(var(--accent-cyan) / 0.18), transparent 65%),
    radial-gradient(ellipse 50% 35% at 75% 25%, hsl(var(--dracula-cyan) / 0.09), transparent 55%),
    radial-gradient(ellipse 40% 30% at 25% 30%, hsl(var(--dracula-purple) / 0.04), transparent 50%);
}
```

`gradient-btn:hover` box-shadow changes from `--dracula-purple` to `--accent-cyan`.

### `docs-prose` link color update

`docs-prose a, .docs-link` currently references `--dracula-purple` / `--dracula-pink`. Update to `--primary` so it inherits the new accent and auto-adapts in light mode.

---

## Part 2: `useTheme` Hook

**File:** `src/hooks/useTheme.ts`

```ts
export type Theme = 'light' | 'dark';

export function useTheme(): { theme: Theme; toggle: () => void }
```

Implementation pattern (matches existing hook style in `src/hooks/`):

1. `useState<Theme>` initialized by reading `localStorage.getItem('sr-theme')` — if `'light'`, use `'light'`; otherwise default `'dark'`.
2. `useEffect` on `[theme]`: sets `document.documentElement.dataset.theme = theme` and persists to `localStorage`.
3. `toggle`: flips state between `'light'` and `'dark'`.
4. Return `{ theme, toggle }`.

The hook does not touch `document.body.classList` — the prototype uses `body.light`; the repo implementation targets `data-theme` on `:root` which is cleaner for Tailwind integration.

---

## Part 3: Navbar Toggle

**File:** `src/components/Navbar.tsx`

Import `useTheme` and `{ Sun, Moon }` from `lucide-react`.

Toggle button markup (shared pattern for both clusters):

```tsx
<button
  onClick={toggle}
  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-border/60 transition-colors"
>
  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
</button>
```

Placement:
- **Desktop cluster** (`hidden md:flex`): insert between the `DocsDropdown` and the `Coffee` icon.
- **Mobile cluster** (`flex md:hidden absolute right-6`): insert as the first element.

---

## Part 4: HeroMesh Canvas Engine

**File:** `src/components/HeroMesh.tsx`

### Component signature

```ts
export function HeroMesh(props: {}): JSX.Element
```

Returns a `<canvas>` element with `className="absolute inset-0 w-full h-full pointer-events-none"` — positioned by the parent container. Mouse events are attached to the **hero section element**, not the canvas.

### Engine structure

All mutable engine state lives in `useRef` closures — never in React state (which would trigger re-renders on every frame):

```
refs: canvasRef, stateRef (holds: nodes, NP[], beams, bolts,
      activeAgents, mx, my, tmx, tmy, lastT, running, inView, rafId)
```

Single `useEffect(()=>{ ...engine... return cleanup }, [])`.

### Key types (in-file, not exported)

```ts
type Node = { bx: number; by: number; phase: number; freq: number; amp: number };
type NP   = { sx: number; sy: number; scale: number };  // projected position + depth scale

type SpecBeam = {
  rail: number; x: number; label: string;
  hue: [number, number, number]; lit: boolean; litUntil: number;
  litPerimT: number; litTimer: number; speed: number;
  r: number; g: number; b: number;
};

type AgentBolt = {
  path: { r: number; c: number }[];
  progress: number; agentName: string; opacity: number;
  phase: 'in' | 'hold' | 'out';
  alpha: number; peakReached: boolean; decay: number;
  agentSpeed: number; perimT: number; perimRate: number;
  r: number; g: number; b: number; agent: string;
};
```

### `computePositions` — the exported/testable function

```ts
export function computePositions(
  nodes: Node[], mouseX: number, mouseY: number, out: NP[]
): void
```

This is the only function exported besides `HeroMesh` itself — it enables unit testing the projection math without a canvas.

### Canvas palette — reads CSS tokens at runtime

```ts
function readPalette(): [number, number, number][] {
  const s = getComputedStyle(document.documentElement);
  const toRgb = (hslVar: string): [number, number, number] => { ... };
  return [
    toRgb(s.getPropertyValue('--dracula-cyan')),
    toRgb(s.getPropertyValue('--dracula-green')),
    toRgb(s.getPropertyValue('--dracula-purple')),
    toRgb(s.getPropertyValue('--dracula-pink')),
    toRgb(s.getPropertyValue('--dracula-yellow')),
  ];
}
```

`readPalette()` is called at the start of each RAF frame (cheap — `getComputedStyle` is cached by the browser between paints). This ensures the canvas recolors immediately when the theme switches.

### Light/dark rail color

```ts
const isLight = document.documentElement.dataset.theme === 'light';
const lc = isLight ? '0,0,0' : '255,255,255';
const baseAlpha = isLight ? 0.15 : 0.08;
```

Checked each frame — no subscription needed.

### `prefers-reduced-motion`

```ts
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion) {
  draw(0);  // single static frame
  return;   // skip RAF loop entirely
}
```

### Lifecycle

```
setTimeout(60ms) -> resize() -> start() -> io.observe(heroEl)
window 'resize'  -> resize()
hero 'mousemove' -> update tmx/tmy
hero 'mouseleave' -> tmx=tmy=-9999
io callback      -> inView flag -> start()/stop()
visibilitychange -> document.hidden -> start()/stop()

cleanup: cancelAnimationFrame(rafId), io.disconnect()
         remove event listeners
```

### AGENT_NAMES constant

Exact list from prototype:
```ts
const AGENT_NAMES = [
  'Full-Stack Dev', 'Architect', 'Reviewer', 'Security',
  'Backend Dev', 'Frontend Dev', 'Merger', 'Product Mgr', 'Product Analyst'
];
```

Invariant: `activeAgents` is a `Set<string>`; `pickAgent()` filters it; at most one `AgentBolt` per name.

---

## Part 5: HeroSection Integration

**File:** `src/components/HeroSection.tsx`

1. Remove the `ParticleBackground` component (the 50-dot canvas) and its usage.
2. Import and render `<HeroMesh />` as the first child of the hero's root `<div>` (which must be `position: relative; overflow: hidden`).
3. All existing hero copy (`AnimatedLogo`, headline, sub-copy, CTAs, terminal mockup) is rendered in a child `div` that is `position: relative; z-index: 10` — ensuring it sits above the canvas.
4. Pass `prefers-reduced-motion` check down to `HeroMesh` via a prop if needed — but since `HeroMesh` reads `matchMedia` internally, no prop is required.

---

## Part 6: Logo System

### Navbar inline SVG

The SVG from `specrails-logo.svg` is inlined directly in `Navbar.tsx` (not imported as `<img>`) so that `fill="hsl(var(--foreground))"` and `fill="hsl(var(--background))"` inherit the current theme. The SVG is rendered with `height="42"` `width="auto"`.

Replace:
```tsx
<a href="/" data-logo="nav" className="font-mono text-[1.8rem] font-bold">
  <span className="text-dracula-purple">spec</span>
  <span className="text-dracula-pink">rails</span>
</a>
```

With:
```tsx
<a href="/" data-logo="nav" className="flex items-center" aria-label="specrails home">
  <svg viewBox="0 0 360 96" height="42" width="auto" aria-hidden="true" focusable="false">
    <rect x="6" y="14" width="348" height="9" rx="4.5" fill="hsl(var(--foreground))" opacity="0.16"/>
    <rect x="6" y="33" width="348" height="30" rx="15" fill="hsl(var(--foreground))"/>
    <text x="180" y="48.5" fontFamily="'JetBrains Mono', monospace" fontWeight="500"
          fontSize="20" textAnchor="middle" dominantBaseline="central"
          fill="hsl(var(--background))" letterSpacing="1.5">specrails</text>
    <rect x="6" y="73" width="348" height="9" rx="4.5" fill="hsl(var(--foreground))" opacity="0.16"/>
  </svg>
</a>
```

Note: JSX requires camelCase SVG attributes (`fontFamily`, `fontWeight`, `textAnchor`, `dominantBaseline`, `letterSpacing`).

### `AnimatedLogo`

`AnimatedLogo` currently renders the text wordmark `<span>spec</span><span>rails</span>`. It should render the same inline SVG as the Navbar (same attributes, same viewBox), sized larger for the hero context (`height="56"` or matching the hero font size). The scroll-morphing logic (lerp/scale/position) is unchanged — it targets the bounding box of the element regardless of its content.

### `public/favicon.svg`

Replace the content of `public/favicon.svg` with the content of `design_handoff_specrails_web/specrails-icon.svg`. The `index.html` `<link rel="icon" href="/favicon.svg">` reference is unchanged.

---

## Part 7: Agents Data

**File:** `src/data/agents.ts`

Extend `AgentEntry` interface:
```ts
export interface AgentEntry {
  // ...existing fields...
  core?: boolean;
  note?: string;
}
```

Set on three entries:
```ts
// Architect
core: true,

// Developer
core: true,
note: "Dynamically dispatched — implement detects specialized Developer agents by keywords and routes each task to the best match.",

// Reviewer
core: true,
note: "Sub-specializes on demand — delegates to Frontend or Backend Reviewers when those agents are installed.",
```

No other agents receive `core` or `note`.

---

## Part 8: AgentsSection Render

**File:** `src/components/AgentsSection.tsx`

Three changes:

1. **Intro copy** — replace the `<p>` description and link text:
   ```
   "Three agents are core and always run — Architect, Developer, and Reviewer.
   The rest are optional specialists. The implement command dispatches the right
   Developer dynamically by task keywords, and the Reviewer sub-specializes into
   Frontend or Backend reviewers when installed."
   ```

2. **Core badge** — in the card header row, after the model badge, render:
   ```tsx
   {a.core && (
     <span className="text-[10px] font-mono px-2 py-0.5 rounded-full
                      bg-accent/20 text-accent border border-accent/30">
       Core
     </span>
   )}
   ```
   `text-accent` resolves to the new cyan accent via `--primary`/`--accent`.

3. **Core border** — add `border-accent/40` class to core cards; non-core cards keep the default `glass-card` border.

4. **Note line** — below the `<p className="text-muted-foreground">` desc, render:
   ```tsx
   {a.note && (
     <p className="mt-2 text-[11px] text-accent/80 leading-relaxed">{a.note}</p>
   )}
   ```

---

## Part 9: AgentComparisonMatrix Column

**File:** `src/components/AgentComparisonMatrix.tsx`

Add a "Core" column to both the desktop `<Table>` and mobile card stack:

- **Desktop table header:** `<TableHead>Core</TableHead>` after the "Agent" column.
- **Desktop table cell:** 
  ```tsx
  <TableCell>
    {a.core && <Badge className="bg-accent/20 text-accent border-0">Core</Badge>}
  </TableCell>
  ```
- **Mobile card:** add `{a.core && <Badge ...>Core</Badge>}` next to the model badge.

---

## Compatibility Analysis

### Breaking changes to the public surface

None. This change does not modify:
- CLI flags in `install.sh`
- Command names or argument flags in `templates/commands/*.md`
- Agent names in `templates/agents/*.md`
- Config keys in `openspec/config.yaml`
- Any `{{PLACEHOLDER}}` keys in templates

### Additive field changes

`AgentEntry` gains two optional fields (`core?: boolean`, `note?: string`). All existing consumers of `AgentEntry` that destructure or read the type remain valid because both fields are optional and TypeScript's structural typing is satisfied. Components that render agent cards (`AgentsSection`, `AgentsDropdown`) simply ignore the new fields until updated.

**Compatibility: No contract surface changes detected.**

---

## Risks and Considerations

### Canvas performance
The mesh engine projects `COLS × ROWS` nodes every frame. At `SPACING=36` and a 1440-wide viewport, this is roughly 41 × 31 ≈ 1,271 nodes. The prototype already batches all rail segments into one `stroke()` call and all dots into one `fill()` call — replicate this batching exactly. Do not draw individual `beginPath/stroke` per segment.

### Canvas + React strict mode
In React 18 strict mode, effects run twice in development. The canvas engine must be idempotent on re-mount: the cleanup function (RAF cancel + observer disconnect) must be robust enough that a second mount starts a fresh engine without leftover state from the first.

### `getComputedStyle` in tests
The test environment (jsdom) does not resolve CSS custom properties from `src/index.css`. Unit tests for `HeroMesh` must mock `getComputedStyle` to return valid HSL strings, or use a test helper that injects the token values.

### `IntersectionObserver` in tests
jsdom does not implement `IntersectionObserver`. Tests must mock it — the frontend rules already call this out.

### AnimatedLogo SVG sizing
The existing `AnimatedLogo` positions the element with `position: fixed; z-index: 60` and uses `offsetHeight` to compute scroll transitions. With an SVG replacing the text, the height is now controlled by the `height` attribute. Verify that the lerp/scale calculation produces correct nav-to-hero morphing for the new SVG dimensions — the element's width will be much wider than the text wordmark.

### Light mode — existing section components
Components outside the four affected ones (HeroSection, Navbar, AgentsSection, AgentComparisonMatrix) use `text-dracula-*` and `bg-dracula-*` utilities that rely on the underlying `--dracula-*` HSL variables. In light mode, these variables are darkened by ~20-37% lightness, so all text/bg should remain legible without per-component changes. Spot-check `FeaturesSection`, `PipelineSection`, `CommandsSection`, and `FooterSection` after implementing to confirm no invisible-text situations.

### Favicon SVG browser support
All modern browsers support SVG favicons. The `index.html` `<link>` uses `type="image/svg+xml"` which is already correct. No change needed.
