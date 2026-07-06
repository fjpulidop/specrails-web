# Context Bundle: Visual Redesign — Cyan Palette, Light Mode, Hero Mesh, Logo, Agents Update

This file contains exact code regions, import lists, and file skeletons for each affected file. Use this as the ground-truth reference when implementing — do not re-read source files during implementation unless verifying a detail not covered here.

---

## `src/index.css`

### Current `:root` block — tokens to change (lines 7–68)

Current brand-accent tokens that must change:
```css
--primary: 265 89% 78%;          /* change to 187 100% 41% */
--ring: 265 89% 78%;             /* change to 187 100% 41% */
--sidebar-primary: 265 89% 78%;  /* change to 187 100% 41% */
--sidebar-ring: 265 89% 78%;     /* change to 187 100% 41% */
```

Add after `--dracula-yellow`:
```css
--accent-cyan: 187 100% 41%;
```

Gradient replacements:
```css
/* Replace */
--gradient-primary: linear-gradient(135deg, hsl(265 89% 78%), hsl(326 100% 74%));
--gradient-primary-hover: linear-gradient(135deg, hsl(265 89% 72%), hsl(326 100% 68%));
/* With */
--gradient-primary: linear-gradient(135deg, hsl(187 100% 41%), hsl(199 100% 38%));
--gradient-primary-hover: linear-gradient(135deg, hsl(187 100% 36%), hsl(199 100% 33%));
```

### Current `.hero-glow` (line 119–124) — replace

```css
/* OLD */
.hero-glow {
  background:
    radial-gradient(ellipse 90% 60% at 50% -5%, hsl(var(--dracula-purple) / 0.20), transparent 65%),
    radial-gradient(ellipse 50% 35% at 75% 25%, hsl(var(--dracula-cyan) / 0.09), transparent 55%),
    radial-gradient(ellipse 40% 30% at 25% 30%, hsl(var(--dracula-pink) / 0.06), transparent 50%);
}
/* NEW */
.hero-glow {
  background:
    radial-gradient(ellipse 90% 60% at 50% -5%, hsl(var(--accent-cyan) / 0.18), transparent 65%),
    radial-gradient(ellipse 50% 35% at 75% 25%, hsl(var(--dracula-cyan) / 0.09), transparent 55%),
    radial-gradient(ellipse 40% 30% at 25% 30%, hsl(var(--dracula-purple) / 0.04), transparent 50%);
}
```

### Current `.gradient-btn:hover` (line 114–117) — replace box-shadow

```css
/* OLD */
box-shadow: 0 0 30px hsl(var(--dracula-purple) / 0.3);
/* NEW */
box-shadow: 0 0 30px hsl(var(--accent-cyan) / 0.3);
```

### Current `body` rule (line 76–79) — add transition

```css
/* OLD */
body {
  @apply bg-background text-foreground font-sans antialiased;
  font-family: 'Inter', sans-serif;
}
/* NEW */
body {
  @apply bg-background text-foreground font-sans antialiased transition-colors duration-300;
  font-family: 'Inter', sans-serif;
}
```

### Current `.docs-prose a, .docs-link` (line 191–193) — replace colors

```css
/* OLD */
.docs-prose a, .docs-link {
  @apply text-dracula-purple hover:text-dracula-pink underline underline-offset-2 transition-colors;
}
/* NEW */
.docs-prose a, .docs-link {
  @apply text-primary hover:text-dracula-cyan underline underline-offset-2 transition-colors;
}
```

### New block — insert after closing `}` of `:root` within `@layer base`

```css
:root[data-theme="light"] {
  --background:          220 30% 98%;
  --background-darker:   220 22% 96%;
  --foreground:          240 15% 14%;
  --card:                0 0% 100%;
  --card-foreground:     240 15% 14%;
  --popover:             0 0% 100%;
  --popover-foreground:  240 15% 14%;
  --primary:             187 100% 30%;
  --primary-foreground:  0 0% 100%;
  --secondary:           220 22% 92%;
  --secondary-foreground: 240 15% 14%;
  --muted:               220 22% 92%;
  --muted-foreground:    240 8% 40%;
  --accent:              187 100% 30%;
  --accent-foreground:   0 0% 100%;
  --accent-cyan:         187 100% 30%;
  --border:              240 6% 82%;
  --input:               220 22% 92%;
  --ring:                187 100% 30%;
  --glass-bg:            220 30% 96% / 0.7;
  --glass-border:        0 0% 0% / 0.08;
  --sidebar-primary:     187 100% 30%;
  --sidebar-ring:        187 100% 30%;
  --gradient-primary:    linear-gradient(135deg, hsl(187 100% 30%), hsl(199 100% 35%));
  --gradient-primary-hover: linear-gradient(135deg, hsl(187 100% 26%), hsl(199 100% 31%));
  --dracula-bg:          220 30% 98%;
  --dracula-darker:      220 22% 96%;
  --dracula-current:     220 15% 88%;
  --dracula-fg:          240 15% 14%;
  --dracula-comment:     225 27% 36%;
  --dracula-cyan:        191 97% 35%;
  --dracula-green:       135 94% 28%;
  --dracula-orange:      31 100% 38%;
  --dracula-pink:        326 100% 42%;
  --dracula-purple:      265 89% 52%;
  --dracula-red:         0 100% 42%;
  --dracula-yellow:      65 92% 32%;
}
```

### New block — terminal dark override in light mode — insert inside `@layer components` after `.terminal` styles

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

---

## `src/hooks/useTheme.ts` (new file — complete)

```ts
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'sr-theme';

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // localStorage unavailable
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggle };
}
```

---

## `src/components/Navbar.tsx`

### Import line to replace

```ts
/* OLD */
import { Github, Coffee, Download } from "lucide-react";

/* NEW */
import { Github, Coffee, Download, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
```

### Hook call — add at top of component body

```ts
const { theme, toggle } = useTheme();
```

### Logo element to replace (lines 34–37)

```tsx
/* OLD */
<a href="/" data-logo="nav" className="font-mono text-[1.8rem] font-bold">
  <span className="text-dracula-purple">spec</span>
  <span className="text-dracula-pink">rails</span>
</a>

/* NEW */
<a href="/" data-logo="nav" className="flex items-center" aria-label="specrails home">
  <svg
    viewBox="0 0 360 96"
    height="42"
    width="auto"
    aria-hidden="true"
    focusable="false"
    style={{ display: 'block' }}
  >
    <rect x="6" y="14" width="348" height="9" rx="4.5"
          fill="hsl(var(--foreground))" opacity="0.16" />
    <rect x="6" y="33" width="348" height="30" rx="15"
          fill="hsl(var(--foreground))" />
    <text
      x="180" y="48.5"
      fontFamily="'JetBrains Mono', monospace"
      fontWeight="500"
      fontSize="20"
      textAnchor="middle"
      dominantBaseline="central"
      fill="hsl(var(--background))"
      letterSpacing="1.5"
    >specrails</text>
    <rect x="6" y="73" width="348" height="9" rx="4.5"
          fill="hsl(var(--foreground))" opacity="0.16" />
  </svg>
</a>
```

### Theme toggle button snippet

Define before the return statement:
```tsx
const ThemeToggleBtn = () => (
  <button
    onClick={toggle}
    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    className="flex items-center justify-center w-8 h-8 rounded-lg
               bg-muted/30 border border-border/30 text-muted-foreground
               hover:text-foreground hover:bg-muted/50 hover:border-border/60
               transition-colors flex-shrink-0"
  >
    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
  </button>
);
```

### Insertion points

Mobile cluster (line 38, `flex md:hidden`):
```tsx
/* Insert ThemeToggleBtn as FIRST child inside the div */
<div className="flex md:hidden items-center gap-4 absolute right-6">
  <ThemeToggleBtn />
  {/* ...existing children... */}
</div>
```

Desktop cluster (`hidden md:flex`, after DocsDropdown ~line 103):
```tsx
<DocsDropdown />
<ThemeToggleBtn />      {/* ← insert here */}
<a href="https://ko-fi.com/..." ...>
```

---

## `src/components/HeroSection.tsx`

### What to remove

The `ParticleBackground` component spans from the comment `// ---------- particle background (canvas, decorative) ----------` (line 14) through the closing `};` of the component function (~line 100). Remove the entire definition.

Also remove: `<ParticleBackground />` usage inside the hero JSX.

### Import to add

```ts
import { HeroMesh } from "@/components/HeroMesh";
```

### Root element modification

Find the outermost hero `<div>` or `<section>` element. Add `data-hero` attribute:

```tsx
/* Add data-hero to the outermost hero container */
<div data-hero className="relative min-h-screen overflow-hidden ...">
  <HeroMesh />
  {/* hero-glow and hero-noise divs — keep, move before z-10 copy wrapper if needed */}
  <div className="relative z-10 flex flex-col items-center justify-center ...">
    {/* AnimatedLogo, headline, sub-copy, CTAs, terminal */}
  </div>
</div>
```

The `data-hero` attribute is how `HeroMesh` locates its parent element for mouse events and IntersectionObserver.

---

## `src/components/AnimatedLogo.tsx`

### Return JSX — outer div className change

```tsx
/* OLD className */
className="fixed z-[60] pointer-events-none font-mono font-bold whitespace-nowrap text-5xl md:text-7xl"

/* NEW className */
className="fixed z-[60] pointer-events-none"
```

### Inner content replacement

```tsx
/* OLD */
<span className="text-dracula-purple">spec</span>
<span className="text-dracula-pink">rails</span>

/* NEW */
<svg
  viewBox="0 0 360 96"
  height="56"
  width="auto"
  aria-hidden="true"
  focusable="false"
  style={{ display: 'block' }}
>
  <rect x="6" y="14" width="348" height="9" rx="4.5"
        fill="hsl(var(--foreground))" opacity="0.16" />
  <rect x="6" y="33" width="348" height="30" rx="15"
        fill="hsl(var(--foreground))" />
  <text
    x="180" y="48.5"
    fontFamily="'JetBrains Mono', monospace"
    fontWeight="500"
    fontSize="20"
    textAnchor="middle"
    dominantBaseline="central"
    fill="hsl(var(--background))"
    letterSpacing="1.5"
  >specrails</text>
  <rect x="6" y="73" width="348" height="9" rx="4.5"
        fill="hsl(var(--foreground))" opacity="0.16" />
</svg>
```

### Sizing note

The `height="56"` SVG has an intrinsic aspect ratio of 360:96 ≈ 3.75:1, so `width` = 56 × 3.75 = 210px. The scroll lerp computes `navWidth / heroWidth` as the scale factor. At `height="42"` in the navbar, the nav SVG is 42 × 3.75 = 157px. Scale = 157/210 ≈ 0.75. The nav slot must be wide enough to accommodate 157px — verify by inspecting the `data-logo="nav"` element bounding rect in devtools. If the navbar logo is visually clipped, reduce the hero height to 48 (→ 180px wide, nav at 42 → 157px, scale ≈ 0.87).

---

## `public/favicon.svg` (full replacement)

Use the content of `design_handoff_specrails_web/specrails-icon.svg` verbatim:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0d0d1a"/>
  <rect x="10" y="18" width="44" height="5" rx="2.5" fill="white" fill-opacity="0.18"/>
  <rect x="10" y="28" width="44" height="14" rx="7" fill="#00C3D2"/>
  <text x="32" y="35.5" font-family="'JetBrains Mono', monospace" font-weight="700"
        font-size="8" text-anchor="middle" dominant-baseline="central"
        fill="#080808" letter-spacing="0.5">SR</text>
  <rect x="10" y="47" width="44" height="5" rx="2.5" fill="white" fill-opacity="0.18"/>
</svg>
```

Note: Read `design_handoff_specrails_web/specrails-icon.svg` first — if the actual file content differs, use that file's content.

---

## `src/data/agents.ts`

### Interface change (line 33–45)

```ts
/* OLD */
export interface AgentEntry {
  name: string;
  model: "Opus" | "Sonnet" | "Haiku";
  primaryJob: string;
  desc: string;
  stage: PipelineStage;
  category: JobCategory;
  docsSlug: string;
  icon: LucideIcon;
  color: string;
  border: string;
  glow: string;
}

/* NEW */
export interface AgentEntry {
  name: string;
  model: "Opus" | "Sonnet" | "Haiku";
  primaryJob: string;
  desc: string;
  stage: PipelineStage;
  category: JobCategory;
  docsSlug: string;
  icon: LucideIcon;
  color: string;
  border: string;
  glow: string;
  core?: boolean;
  note?: string;
}
```

### Architect entry addition (line 74–86)

```ts
{
  name: "Architect",
  model: "Sonnet",
  primaryJob: "Translates specs into tasks and risk assessments",
  desc: "Translates specs into technical designs, ordered tasks, and risk assessments",
  stage: "design",
  category: "architecture",
  docsSlug: "agents",
  icon: Cpu,
  color: "text-dracula-orange",
  border: "border-dracula-orange",
  glow: "glow-orange",
  core: true,           // ← add
},
```

### Developer entry addition (line 87–99)

```ts
{
  name: "Developer",
  model: "Sonnet",
  primaryJob: "Full-stack polyglot, 4-phase implementation",
  desc: "Full-stack polyglot engineer. 4 phases: Understand → Plan → Implement → Verify",
  stage: "implementation",
  category: "engineering",
  docsSlug: "agents",
  icon: Code,
  color: "text-dracula-green",
  border: "border-dracula-green",
  glow: "glow-green",
  core: true,           // ← add
  note: "Dynamically dispatched — implement detects specialized Developer agents by keywords and routes each task to the best match.",  // ← add
},
```

### Reviewer entry addition (line 139–151)

```ts
{
  name: "Reviewer",
  model: "Sonnet",
  primaryJob: "Final quality gate with confidence scoring",
  desc: "Final quality checkpoint. Runs CI, autonomously fixes issues (up to 3 attempts)",
  stage: "review",
  category: "quality",
  docsSlug: "agents",
  icon: CheckCircle,
  color: "text-dracula-orange",
  border: "border-dracula-orange",
  glow: "glow-orange",
  core: true,           // ← add
  note: "Sub-specializes on demand — delegates to Frontend or Backend Reviewers when those agents are installed.",  // ← add
},
```

---

## `src/components/AgentsSection.tsx`

### Full import list (unchanged)

```ts
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AGENTS } from "@/data/agents";
import { cn } from "@/lib/utils";
```

Add `cn` import if not already present.

### Intro paragraph replacement

```tsx
/* OLD */
<p className={`text-muted-foreground text-center max-w-2xl mx-auto mb-4 ...`}>
  12 specialized agents working in concert, each with a distinct role and
  the right model for the job.
</p>

/* NEW */
<p className={`text-muted-foreground text-center max-w-2xl mx-auto mb-4 ...`}>
  Three agents are core and always run — Architect, Developer, and Reviewer.
  The rest are optional specialists. The{" "}
  <code className="font-mono text-sm px-1 rounded bg-dracula-current text-dracula-cyan">
    implement
  </code>{" "}
  command dispatches the right Developer dynamically by task keywords, and the
  Reviewer sub-specializes into Frontend or Backend reviewers when installed.
</p>
```

### "Compare all agents" link color

```tsx
/* OLD */
className="text-sm text-dracula-purple hover:text-dracula-pink transition-colors"
/* NEW */
className="text-sm text-primary hover:text-dracula-cyan transition-colors"
```

### Card render — updated (replace the inner div)

```tsx
<div
  key={a.name}
  className={cn(
    "glass-card p-5 transition-all duration-500",
    a.core && "border-primary/40",
    `hover:${a.glow} hover:border-opacity-60`,
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  )}
  style={{ transitionDelay: `${i * 80}ms` }}
>
  <div className="flex items-start gap-3 mb-3">
    <div className="p-2 rounded-lg bg-dracula-current">
      <a.icon className={`w-5 h-5 ${a.color}`} />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="font-semibold text-sm">{a.name}</h3>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${modelColors[a.model]}`}>
          {a.model}
        </span>
        {a.core && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
            Core
          </span>
        )}
      </div>
    </div>
  </div>
  <p className="text-muted-foreground text-xs leading-relaxed">{a.desc}</p>
  {a.note && (
    <p className="mt-2 text-[11px] text-primary/80 font-mono leading-relaxed">{a.note}</p>
  )}
</div>
```

---

## `src/components/AgentComparisonMatrix.tsx`

### Desktop table header — add Core column

```tsx
/* After <TableHead>Agent</TableHead> */
<TableHead>Core</TableHead>
```

### Desktop table row — add Core cell

```tsx
/* After the Agent <TableCell> (first cell in each row) */
<TableCell>
  {a.core && (
    <Badge className="bg-primary/20 text-primary border-0">Core</Badge>
  )}
</TableCell>
```

### Mobile card — add Core badge

```tsx
/* In the card header div, after the model Badge */
<Badge className={modelColors[a.model]}>{a.model}</Badge>
{a.core && (
  <Badge className="bg-primary/20 text-primary border-0">Core</Badge>
)}
```

### Link color update (both desktop and mobile)

```tsx
/* OLD */
className="text-xs text-dracula-purple hover:text-dracula-pink transition-colors"
/* NEW */
className="text-xs text-primary hover:text-dracula-cyan transition-colors"
```

---

## Test file skeletons

### `src/test/useTheme.test.tsx`

```tsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useTheme } from '@/hooks/useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it('defaults to dark', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('sets documentElement.dataset.theme on mount', () => {
    renderHook(() => useTheme());
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('toggles to light', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(localStorage.getItem('sr-theme')).toBe('light');
  });

  it('inits from localStorage', () => {
    localStorage.setItem('sr-theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });
});
```

### `src/test/HeroMesh.test.ts`

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { computePositions } from '@/components/HeroMesh';

// Mock performance.now for deterministic output
vi.stubGlobal('performance', { now: () => 0 });

describe('computePositions', () => {
  const makeNode = (bx: number, by: number) => ({
    bx, by,
    phase: 0, freq: 0.2, amp: 2,
  });

  it('mutates out array in place', () => {
    const nodes = [makeNode(100, 100)];
    const out = [{ sx: 0, sy: 0, scale: 0 }];
    const outRef = out[0];
    computePositions(nodes, -9999, -9999, out, 200, 200);
    expect(out[0]).toBe(outRef); // same object
    expect(out[0].sx).not.toBe(0);
  });

  it('node far from mouse has near-zero depth (no sphere distortion)', () => {
    const nodes = [makeNode(100, 100)];
    const out = [{ sx: 0, sy: 0, scale: 0 }];
    computePositions(nodes, -9999, -9999, out, 200, 200);
    expect(out[0].scale).toBeCloseTo(0, 1);
  });

  it('node near mouse has non-zero depth', () => {
    const nodes = [makeNode(100, 100)];
    const out = [{ sx: 0, sy: 0, scale: 0 }];
    computePositions(nodes, 100, 100, out, 200, 200);
    expect(out[0].scale).toBeGreaterThan(0);
  });
});
```

### `src/test/AgentsSection.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AgentsSection from '@/components/AgentsSection';

vi.mock('@/hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => ({ ref: { current: null }, isVisible: true }),
}));

describe('AgentsSection', () => {
  it('shows updated intro copy mentioning core agents', () => {
    render(<MemoryRouter><AgentsSection /></MemoryRouter>);
    expect(screen.getByText(/Three agents are core and always run/i)).toBeInTheDocument();
  });

  it('renders exactly three Core badges', () => {
    render(<MemoryRouter><AgentsSection /></MemoryRouter>);
    const badges = screen.getAllByText('Core');
    expect(badges).toHaveLength(3);
  });

  it('shows Developer note text', () => {
    render(<MemoryRouter><AgentsSection /></MemoryRouter>);
    expect(screen.getByText(/Dynamically dispatched/i)).toBeInTheDocument();
  });

  it('shows Reviewer note text', () => {
    render(<MemoryRouter><AgentsSection /></MemoryRouter>);
    expect(screen.getByText(/Sub-specializes on demand/i)).toBeInTheDocument();
  });
});
```

---

## Key invariants to enforce during implementation

1. `localStorage` key `'sr-theme'` is the ONLY persistence source. `dataset.theme` on `documentElement` is always derived from it.
2. Canvas RAF is suspended when `inView === false` OR `document.hidden === true`. Both conditions must be checked in `start()`.
3. `activeAgents` Set prevents more than one bolt per agent name. `newBolt()` must check before creating.
4. `computePositions` is called every frame inside `draw()`. The exported version is for tests only.
5. The `data-hero` attribute on the hero root div is required by `HeroMesh` to locate its parent for mouse events and the IntersectionObserver.
6. Terminal/code blocks must explicitly override `background-color` in light mode with `!important` — they must not inherit the light `--background` token.
7. The inline SVG logo uses `hsl(var(--foreground))` and `hsl(var(--background))` — never hardcoded colors.
8. `core: true` is set on exactly Architect, Developer, Reviewer. No other agents receive this flag.
