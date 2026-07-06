I have verified all the load-bearing facts. The token system, gradient definition, keyframes, tailwind config, and component structure all match the audits. I now have everything needed to write a precise, drop-in blueprint.

# specrails.dev — Redesign Blueprint

The brief: take a competent-but-templated dev-tool landing site to voicebox.sh / Linear / Raycast tier. The audits converge on one diagnosis: **the page describes a beautiful visual product without ever showing it, in a brand gradient that isn't actually the brand.** This blueprint fixes the brand at the token level, shows the product with real video, and rebuilds the IA around the "spec on rails" metaphor the name promises.

---

## 1. Executive summary — the 5 highest-leverage moves

1. **Fix the brand gradient at the token level (1 line, sitewide upgrade).** `--gradient-primary` (index.css:56) is `linear-gradient(135deg, hsl(187 100% 41%), hsl(199 100% 38%))` — two near-identical teals, no violet. Every `gradient-text` headline, the primary CTA, and the hero glow inherit this. Redefining it as a true cyan→violet sweep instantly makes ~12 headlines and the hero look like the product icon. **Nothing else on this list lands without this.**

2. **Show the product. Replace fake mockups with real hub video + the live demo.** Today: zero `<img>` in all of src, a fake char-by-char terminal (`DemoSection`), and a hand-coded HTML dashboard (`HubSection`, which isn't even rendered). Meanwhile `public/hero-hub-screenshot.webp` (a real, accurate Spec/Rails shot) is referenced nowhere and a fully playable app sits dark at `public/hub-demo/`. Build a video-first Hub showcase with autoplaying muted loops in a floating window frame + a click-to-launch live demo. This is the single biggest gap to the target tier.

3. **Rebuild the hero around ONE confident gradient headline + a working mobile experience.** The only `<h1>` is `invisible` (HeroSection.tsx:51); the visible "headline" is a 30px `<p>`. There's **no mobile nav** (no hamburger) and the **primary Download CTA is `hidden sm:`** — phones get no IA and no primary action. Promote the tagline to a real ~72px gradient H1, add a Radix `Sheet` mobile nav, and ship a mobile-appropriate primary CTA.

4. **Rename the token layer and tighten the dark surface/hairline system.** The palette is still named `--dracula-*` (~408 uses) — the #1 "swapped-palette starter" tell. Re-derive a navy surface ladder + brand pair from the icon, add a `surface-elevated` card token, and darken the hairline (`--border` is `240 14% 44%`, too bright) so cards step up from the page via *surface + hairline*, not scattered glows.

5. **Make "rails" the spine + reorder to show-then-tell.** The product is specRAILS and the icon is a pill on rails, yet "rails" never appears in copy as a concept. Pay it off in the hero, render the literal rails metaphor in Pipeline + the Hub board, and reorder so proof (Demo/Hub) comes early instead of six scrolls down. Move the Hub from a thin card to a full section with parity to Core.

---

## 2. What's already good — keep, do not regress

- **Theme plumbing.** `useTheme.ts` distinguishes explicit choice from system pref and tracks the OS live; the pre-paint inline script (index.html:9-21) kills FOUC; HeroMesh re-reads tokens so both themes work. North-star-tier. **Keep all of it.**
- **The docking AnimatedLogo + chip-seating beam flash.** Scroll-driven lerp into the navbar slot with `easeInOutCubic`, perimeter beam trace (index.css:445-475), reduced-motion gated. The single most distinctive asset — keep it, and ignite it along the new gradient rail.
- **HeroMesh engineering.** IntersectionObserver gating, `visibilitychange` pause, reduced-motion static draw, batched path strokes, `dt` clamping, refs-not-state. Keep the architecture; fix the *content* (kill the literal "Spec 247" labels) and perf details (DPR cap, palette caching).
- **DownloadPage visual language.** Gradient hairline `p-[1px]` cards, detected-platform badge, sha256/size/notarised trust chips, SupportCard personality. **This is the bar — propagate it sitewide.**
- **AgentComparisonMatrix responsive pattern** (real `<Table>` → hand-built mobile card stack) and **DocsLayout's Radix `Sheet` drawer** — reuse both as house patterns.
- **DemoSection content** (real `/specrails:implement` transcript with box-drawing tables, parallel worktree output) — keep as the *CLI track*; pair it with a hub video, don't delete.
- **Accurate core content**: 14 agents, correct models, Security Gate / Confidence Scoring / Dependency-Aware Ordering all map to real README mechanics. Keep the specificity.
- **A11y basics already right**: shadcn Button `focus-visible` rings, matrix `sr-only` labels + caption, decorative SVGs `aria-hidden`, strong dark-mode body contrast. Extend these patterns; don't rebuild them.

---

## 3. Prioritized issue list (deduped across all audits)

### P0 — breaks the premium impression or is broken

- **Brand gradient is cyan→cyan, not cyan→violet** (index.css:56) → redefine `--gradient-primary` as a 3-stop cyan→periwinkle→violet ramp.
- **No accessible H1; hero headline is an `invisible` `<h1>` + a 30px `<p>`** (HeroSection.tsx:49-68) → promote tagline to a real visible gradient H1; make logo placeholder an `aria-hidden` div.
- **No mobile navigation** (Navbar everything in `hidden md:flex`) → add Radix `Sheet` hamburger menu mirroring DocsLayout.
- **Primary Download CTA `hidden sm:` — hero has no action on phones** (HeroSection.tsx:87) → ship a mobile primary CTA (See the demo / View download), `w-full sm:w-auto`.
- **The hub is never shown — zero product imagery/video/live demo** (no `<img>` in src; `hero-hub-screenshot.webp` + `/hub-demo/` unused) → video-first Hub showcase + live demo embed.
- **`HubSection` & `InstallSection` built but mounted on no page** (Index.tsx); HubSection's mock is fake + CTA points to dead `/docs/hub`; ProductsSection "Explore the Hub" → `#hero` (scroll-to-top) → rewrite into a real Hub section, fix CTAs.
- **Agent count wrong: copy says 12, data has 14** (AgentsPage.tsx:10,22; AgentsDropdown.tsx:9) → derive `AGENT_COUNT = AGENTS.length`.
- **No focus-visible styles on any hand-rolled `<a>`/`<button>`** (zero `focus-visible:` in src outside ui/) → global brand focus ring.
- **Light-mode accent text fails AA contrast** (cyan 3.56:1, primary 4.05:1, orange 3.91:1; gradient headings ~3.5-4:1) → darken light accent tokens to clear 4.5:1.
- **CorePage is AI-templated and flat** (no hero, no glow, no imagery; h1 only `text-4xl/5xl`; `ArrowLeft rotate-180` hack) → rebuild to DownloadPage's language.
- **Docs: no "On this page" TOC**, only tiny floating arrows → sticky 3-column right-rail TOC.
- **Docs: anchored headings hide under the 64px fixed navbar** (no `scroll-margin-top`) → `scroll-mt-20` on prose headings.
- **No copy-to-clipboard on any code block / install command** → reusable `CopyButton`.
- **Hub feature cards describe a generic dashboard, not specrails-desktop** (missing: talk-a-spec, website-to-spec, rails, Compare, SMASH) → rewrite from hub README.
- **Several hub cards are fabricated** ("Chat per Project", "Command Launcher", "Post-it", "success rates") → delete/replace with README-true features.
- **"rails" metaphor — the brand name — never appears in copy** → make it the page spine.
- **Render-blocking Google Fonts `@import`** (index.css:1, no preconnect/preload) → self-host + preload.
- **Single 969 KB JS bundle, no code splitting** (App.tsx static imports drag recharts + markdown stack onto landing) → route-level `React.lazy` + `manualChunks`.
- **`/noise.webp` 404s on every hero render** (referenced index.css:434, file absent) → ship the asset or remove the rule.
- **Demo terminal + install commands overflow horizontally on phones** (no `overflow-x`, no global `overflow-x:hidden` guard) → scroll frames + safety net.
- **`animate-fade-up` starts at opacity:0 with no reduced-motion fallback** — primary hero content can vanish for reduced-motion users → pair every opacity:0 entrance with a reduced-motion `opacity:1` override.
- **Favicon/OG/AnimatedLogo are the OLD colorless mark** (no gradient) → redraw with the signature gradient pill.

### P1 — clearly worth doing

- **Token layer still named `--dracula-*`** (~408 refs) → codemod to role + brand scale.
- **Surface ladder + hairline**: add `--surface-2` elevated card token; darken/reduce `--border` (240 14% 44% → ~240 20% 16% at low opacity).
- **Brand colors hardcoded as raw `rgba` in shadows** (HeroSection.tsx:90,94 `rgba(0,195,210)`; DownloadPage `rgba(189,147,249)`/`rgba(255,121,198)`) → tokenized glow utilities.
- **No fluid display type scale; every section H2 is identical `text-4xl font-bold`; no negative tracking** → `clamp()` display scale + `tracking-[-0.02em]` + unified `.section-heading`.
- **HeroMesh visually noisy** (18 "Spec 247" labels + roaming agent boxes) → ambient light pulses only.
- **Looping CTA shimmer is a template tell** (index.css:386-405) → remove; static premium fill + hover-only sheen.
- **Navbar desktop cluster overcrowded** (11 identical links, no active state, no pinned CTA) → 4-5 groups + one gradient CTA + scroll-spy (use existing unused `NavLink.tsx`).
- **Agent card hover glow is dead code** (`hover:${a.glow}` never compiled by Tailwind) → single `--agent-glow` CSS-var hover.
- **`/agents` is a dry spreadsheet** → "Meet the team" roster grouped by pipeline stage on a rail; table as secondary toggle.
- **Pipeline is a literal timeline that misses the rails metaphor; rail hidden on mobile** → glowing twin rails + traveling pill, rail visible on mobile.
- **Features/Commands/Principles are 3 identical card grids** → bento Features, terminal-styled Commands, numbered Principles.
- **Footer is bare, off-brand text wordmark (purple/pink), Bug icon for "Installation", no demo/social** → rebuild with SVG logo + columns + correct icons + gradient top-glow.
- **Live `/hub-demo/` undiscoverable** → prominent "Try it live" CTA; lazy facade embed.
- **GitHubStarsButton is dead code, off-theme** → wire compact star count into navbar/hero.
- **DemoSection: no replay/skip, no reduced-motion, can finish offscreen** → controls + instant full transcript under reduced-motion.
- **Most animations ignore `prefers-reduced-motion`** (only 3 of ~10 gated) → global reduced-motion reset.
- **No `<main>` landmark / skip link on Index & Download** → add both.
- **SectionNav arrows near-invisible + sub-44px touch targets** → raise contrast, hide on mobile or 44px targets.
- **Mobile docs: bare hamburger, no breadcrumb/context** → breadcrumb + mobile TOC.
- **No docs search** → Cmd+K `cmdk` palette.
- **Docs prose: no callouts, no heading anchors** → `[!NOTE/TIP/WARNING]` callout cards + hover anchors.
- **Platform claims contradictory** (hero "macOS + Windows" vs core-vs-hub.md "macOS only") → single source of truth.
- **Dead CTAs** ("Explore the Hub" → `#hero`) → point at real destinations.
- **Section order buries proof** → reorder show-then-tell.
- **HeroMesh: per-frame `getComputedStyle`, no DPR cap, no mobile density scaling** → cache palette, cap DPR 1.5, sparser on mobile.
- **`/hub-demo` iframe is a 1.6 MB second app** → never eager-load; facade pattern.
- **DocsIndex bland vs the rest** → branded header band + richer cards.
- **DocsDropdown & AgentsDropdown are hand-rolled menus** (no keyboard/ARIA, violates shadcn mandate) → shadcn `DropdownMenu`.

### P2 — polish

- **Rainbow inline keyword spans in hero/prose** (5 hues) → cyan/violet + neutral only.
- **Open-source badge uses green pulse dot** ("server online" cliché, off-axis) → static cyan dot or glyph.
- **Accent-color overload** (green×80, pink×34, orange×27 used decoratively) → demote to functional roles.
- **Model badges lean on Dracula green/purple** → cyan with weight/opacity variation; red reserved for Security BLOCK.
- **Home cards show long `desc`, matrix shows `primaryJob`** → use `primaryJob` everywhere, `desc` on expand.
- **Dead `border` field in agents.ts; "Learn more" all → same `/docs/agents`** → use it for per-agent accent / deep-link or drawer.
- **Dead `src/App.css`** (CRA/Vite scaffold, off-brand `#646cff`/`#61dafb`) → delete.
- **Single radius token, ad-hoc rounded-2xl/full** → radius scale (`--radius-frame: 1.5rem`).
- **Duplicated scroll-reveal logic** (hook + 10 inline strings + separate hero keyframe) → one `<Reveal>` primitive.
- **Inline styles for stagger delays** (violates Tailwind-only rule) → delay utilities / CSS vars.
- **Glass borders below 3:1 non-text contrast** → bump structural borders to ≥3:1.
- **Smooth scroll forced globally, no reduced-motion opt-out** → gate in JS + CSS.
- **og-image.png 200 KB; favicon.ico 20 KB legacy; hero-hub-screenshot.webp 84 KB dead** → optimize / wire in / drop.
- **No `loading`/`decoding`/dimensions convention for images** → establish `<MediaFrame>`.
- **Inter `font-feature-settings` not enabled** → add `'kern','liga','calt'` (optionally `'ss03'`).
- **No trust/proof row under hero** → GitHub stars + MIT + signed-builds strip.
- **DownloadPage Windows-ARM card uses pink** → re-accent within cyan→violet.
- **SupportCard drops its headline on mobile** → show a sized-down h2 instead of hiding.
- **Hero/section copy fixes** ("are…it's" grammar; Codex "in lab" status; "AI Development Platform" generic SEO) → tighten to the rails differentiator.

---

## 4. New design system

> Drop-in for `src/index.css` `:root` and `tailwind.config.ts`. Token names are role-based; keep `--dracula-*` as **deprecated aliases** pointing at the new tokens for one release so the ~408 references don't break before the codemod lands.

### 4.1 Surface ladder (dark — derived from the icon's navy stops)

```css
/* Icon palette: #05060c → #0c0e18 → #141828, neutral rail #7a7f96 */
--surface-0: 230 44% 4%;    /* #05060c  page background        (was --background) */
--surface-1: 228 33% 7%;    /* #0c0e18  section bands           (was --background-darker, inverted role) */
--surface-2: 228 28% 12%;   /* #141828  elevated cards/frames   (NEW — cards step UP) */
--surface-3: 228 24% 16%;   /* hover/active elevated surface     (NEW) */
--rail:      230 12% 53%;   /* #7a7f96  neutral rails / muted graphic device (NEW) */

--foreground: 240 26% 95%;  /* #eeeef5 cool white — keep */
--muted-foreground: 240 9% 62%;  /* nudged up from 57% for AA headroom */

/* Hairline — the #1 amateur-dark-theme tell. Dark + low opacity. */
--border: 228 20% 16%;      /* ~#21242e, was 240 14% 44% (too bright) */
--hairline: 228 20% 16%;    /* alias for clarity; default usage at /60–/80, decorative at /30 */
```

`* { @apply border-border/30 }` stays, but **interactive component edges** (inputs, nav boundary, focusable cards) use `border-border/70` to clear the 3:1 non-text minimum.

### 4.2 Signature cyan→violet gradient (the brand)

```css
/* Brand pair from the icon */
--brand-cyan:   188 78% 52%;   /* #1ccbe2 */
--brand-violet: 270 55% 65%;   /* #a374db */

/* 3-stop sweep so violet is actually visible (12°-apart teals read as flat) */
--gradient-primary: linear-gradient(120deg,
  hsl(188 80% 52%) 0%,
  hsl(212 70% 60%) 45%,
  hsl(270 55% 65%) 100%);
--gradient-primary-hover: linear-gradient(120deg,
  hsl(188 84% 47%) 0%,
  hsl(212 74% 55%) 45%,
  hsl(270 60% 60%) 100%);

/* Variants */
--gradient-brand-text: linear-gradient(120deg, hsl(188 90% 62%), hsl(270 65% 72%)); /* brighter for on-dark text-clip */
--gradient-brand-soft: linear-gradient(120deg, hsl(188 70% 50% / 0.18), hsl(270 50% 60% / 0.18)); /* large fills/glows */
```

**Usage policy (Raycast "once per page"):** the full gradient appears on (1) the wordmark/logo pill, (2) the hero gradient-text line, (3) the single primary CTA, (4) ONE radial glow behind the hero/Hub product frame. Section headings may use `--gradient-brand-text` on the key word only. **Never** per-card.

### 4.3 Accent / semantic colors

Demote the Dracula rainbow to *functional roles only* (badges, pipeline stage semantics, agent identity), never decorative prose:

```css
--accent-success: 150 65% 45%;   /* green — pass/ready */
--accent-warning: 38 92% 55%;    /* amber — caution */
--accent-danger:  0 72% 58%;     /* red — reserved for Security BLOCK */
--accent-info:    188 78% 52%;   /* = brand-cyan */
```

Model badges: one cyan with opacity/weight variation (Sonnet `/100`, Opus `/100` bold-violet, Haiku `/70`) rather than 3 hues.

### 4.4 Light mode adaptation

Dark-mode deep glows don't translate. Light mode = off-white canvas + **ElevenLabs-style drifting pastel orbs** (low-opacity cyan/violet radial blobs) as the only color moments, behind content.

```css
:root[data-theme="light"] {
  --surface-0: 220 33% 99%;
  --surface-1: 220 26% 96%;
  --surface-2: 0 0% 100%;        /* cards are pure white, elevated by hairline */
  --border:    228 14% 86%;
  /* Accents darkened to clear 4.5:1 as text on the light canvas */
  --brand-cyan:   190 95% 30%;   /* was 35% → now AA as inline text */
  --brand-violet: 270 60% 46%;
  --gradient-primary: linear-gradient(120deg, hsl(190 90% 32%), hsl(245 70% 50%), hsl(270 60% 50%));
  /* gradient-text only rendered at ≥24px bold so the lightest stop can pass at 3:1 */
}
```

Add a contrast unit test over the theme tokens + `@axe-core/playwright` gate on `/`, `/download`, `/agents`, a docs page, both themes.

### 4.5 Typography scale

Keep **Inter (sans) + JetBrains Mono (code)** — correct dev-tool pairing. **Self-host both** (remove the `@import`), preload Inter 700/800 and JetBrains Mono 700, `font-display: swap`. Enable `font-feature-settings: 'kern','liga','calt';` on body.

| Role | Size | Weight | Tracking | Leading | Usage |
|---|---|---|---|---|---|
| Display-XL (hero H1) | `clamp(2.5rem, 6vw, 4.5rem)` | 700 | `-0.03em` | 1.05 | hero headline |
| Display-LG | `clamp(2rem, 4vw, 3rem)` | 600 | `-0.02em` | 1.1 | section openers |
| Display-MD | `text-3xl md:text-4xl` (30→36) | 600 | `-0.02em` | 1.15 | sub-sections |
| Eyebrow | `text-xs` | 500 | `0.12em` (positive) | — | uppercase mono label above every H2 |
| Body-LG | `text-lg` (18) | 400 | normal | 1.6 | hero subhead |
| Body | `text-base` (16) | 400 | normal | 1.6 | prose |
| Caption / CLI | `text-sm` mono | 500 | normal | 1.5 | code, version pills |

- **The wordmark moves from `font-mono` to the display sans** for the marketing hero; mono reserved for CLI/code/eyebrows/version pills.
- Replace every `text-4xl font-bold text-center` section heading with one `.section-heading` class (Display-MD spec above) — single source of truth, kills the 10× copy-paste.

### 4.6 Spacing rhythm

- Major section gap: **`py-24` (96px)** — already correct, keep. Hero + final CTA → **`py-32`** for extra air.
- Mobile: reduce section padding to **`py-16`** below `sm`.
- Container: keep `max-w-6xl` (1152px) for copy; product frames may go `max-w-5xl/6xl` so the demo dominates.
- Two-column workhorse: copy-left / product-right, `lg:grid-cols-2` with the visual column larger (`lg:grid-cols-[1fr_1.3fr]`), stacks on mobile.

### 4.7 Glow / glass / border treatment

Tokenize glow once; expose as Tailwind utilities (`theme.extend.boxShadow`), kill all hardcoded `rgba` shadows:

```css
--glow-brand:    0 24px 60px -20px hsl(var(--brand-cyan) / 0.40);
--glow-violet:   0 24px 60px -20px hsl(var(--brand-violet) / 0.35);
--glow-elevated: 0 8px 24px -12px hsl(230 44% 2% / 0.6);
```

**Elevation = surface ladder + hairline, not drop shadows** (Linear/Raycast). Cards sit on `--surface-2` with a `border-border/70` hairline and an inset top highlight `inset 0 1px 0 hsl(0 0% 100% / 0.06)` for the glassy pixel-rendered edge. The `--glow-brand` appears **once**, behind the hero/Hub product frame.

Radius scale:
```css
--radius:        0.75rem;  /* inputs/buttons */
--radius-card:   1rem;
--radius-frame:  1.5rem;   /* all product/window frames */
--radius-pill:   9999px;
```
Map `rounded-card` / `rounded-frame` in tailwind. Standardize `.glass-card` and the hero chrome on `rounded-frame`.

### 4.8 Motion system

```css
--ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
--reveal-distance: 12px;
--reveal-duration: 700ms;
```

- **Scroll-reveal**: one `<Reveal>` primitive wrapping `useScrollAnimation`; `opacity 0→1` + `translateY(12px)→0` + optional `blur(6px)→0`, `--ease-out-soft`, stagger 80–120ms. Replaces the 10 inline strings *and* the separate hero `animate-fade-up` keyframe so timing matches everywhere.
- **Primary motion moment = play-on-scroll video** (IntersectionObserver), not decorative keyframes.
- **Remove** the infinite CTA shimmer and demote hero-breath to a very slow, low-contrast loop (or one-shot on mount).
- **Reduced-motion contract** — single global block + a `useReducedMotion()` hook (wrap `matchMedia`, mirror HeroMesh's check) consumed by HeroMesh, AnimatedLogo dock, `<Reveal>`, video autoplay, and `scrollIntoView`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .animate-fade-up { opacity: 1 !important; animation: none !important; }
}
```

- **Focus ring** (brand, deliberate): `:where(a,button,[role=button],summary):focus-visible { outline: 2px solid hsl(var(--brand-cyan)); outline-offset: 2px; box-shadow: 0 0 0 4px hsl(var(--brand-cyan)/0.25); border-radius: inherit; }`

---

## 5. Section-by-section redesign

**New section order (show-then-tell, product parity):**
`Hero → Problem → Demo (CLI proof, moved up) → Agents (the team) → Pipeline (how it runs) → Hub Showcase (NEW, video-first) → Products (core-vs-hub "use both") → Features → Commands → Principles → Footer`

### Hero (new composition)
- **Desktop:** Four elements max above the demo: (1) quiet mono eyebrow `MIT · Local-first · Open source` (static cyan dot or no dot); (2) **Display-XL H1**, real and visible, two lines, second line in `gradient-text`: *"Put your specs on rails. / From idea to shipped PR."*; (3) one-line subhead, Body-LG, `max-w-2xl`, brand-cyan/violet + neutral only (no rainbow), with "Codex: in lab" micro-badge; (4) CTA pair — bright gradient **Download for {platform}** + ghost **Try the live demo** (→ Hub showcase / `/hub-demo`). Below: **trust row** (GitHub stars via wired GitHubStarsButton · MIT · macOS & Windows signed). Then the **hero product frame**: autoplaying muted hub loop in the floating window frame with the `--glow-brand` behind it (the one glow). HeroMesh becomes ambient light pulses on rails behind everything; the docking logo stays.
- **Mobile:** H1 `clamp(1.75rem,7vw,2.5rem)`, subhead `text-base`. Primary CTA **full-width** (`w-full sm:w-auto`) — "See it in action" scrolling to the Hub showcase, with a small "Get it on desktop" note; never blank. Reduce hero `pt`/`pb` so H1 clears the fold on a 667px device. Product frame letterboxed to look intentional at phone width.
- Logo placeholder becomes `aria-hidden`; real H1 is the headline (or `sr-only` H1 + decorative logo).

### Problem
- **Desktop:** Kill the three-equal-cards template. One confident statement — *"Raw AI coding is powerful. Without rails, it's chaos."* — beside a visual contrast: a chaotic "agents without rails" tangle vs the clean Spec/Rails board. Each pain telegraphs a specrails payoff (no product sense → persona scoring; agents collide → each spec on its own rail; ships unreviewed → confidence gate + security scan). Fix grammar.
- **Mobile:** Statement stacks above a single simplified contrast graphic; no 3-card wall.

### Demo (moved to slot 3 — CLI proof)
- **Desktop:** Keep the real `/specrails:implement` terminal in a `ProductFrame` (traffic lights). Add Replay/Skip controls; render full transcript instantly under reduced-motion; restart on re-enter. Frame it explicitly as the **CLI track**.
- **Mobile:** Curated narrower subset (phase headers + completion + final report), `overflow-x-auto` with left-fade mask, `text-[10px]`, copy button. Add global `overflow-x:hidden` guard.

### Agents (the team)
- **Desktop home section:** Lead with stat chips from data — *"14 agents · 3 core · 11 specialists · 1 can BLOCK your ship"* (`AGENT_COUNT` from agents.ts). Group cards by pipeline stage (Discovery → Design → Implementation → Review → Audit) docked to a thin gradient rail. `primaryJob` as the scannable headline; `--agent-glow` CSS-var hover (lift + colored glow + border). Per-agent detail drawer on click.
- **`/agents` page:** "Meet the team" roster (visual default) with the filterable matrix as a secondary "Compact view" toggle. Hero with gradient H1 + stat chips. Fix 12→14 everywhere. Replace hand-rolled AgentsDropdown with shadcn.
- **Mobile:** Stage-grouped single column, rail visible; matrix card header clusters Model + Core badges right-aligned (fix the 3-child `justify-between` wrap).

### Pipeline (how it runs)
- **Desktop:** The literal brand metaphor — glowing **twin rails** with a glossy gradient **pill** traveling between station nodes on scroll-reveal. Larger type. Reconcile phase labels with DemoSection so the viewer sees the same pipeline twice (diagram + real run).
- **Mobile:** Keep vertical but **keep the rail visible** (currently `hidden md:block` — the whole point disappears). Pill travels down on scroll.

### Hub Showcase (NEW — slot 6, video-first, parity with Core)
- **Desktop:** Full section, not a tab. Eyebrow `LOCAL DASHBOARD`, gradient H2. Three hero capabilities, each an autoplaying muted loop in a `ProductFrame`, alternating copy-left/product-right: (1) **Talk a spec into existence** (Explore/Quick); (2) **Turn any website into a spec** (embedded-browser element select — the most novel feature); (3) **Run specs on parallel rails** (the rails board — drag → lane → parallel runs → cost/analytics ticking). Compare + SMASH as secondary cards. Primary **Try the live demo** CTA → facade-embedded `/hub-demo`. Copy pulled verbatim from hub README; delete fabricated features.
- **Mobile:** Stacked; each video in a phone-friendly frame (9:16-friendly crop), play-on-scroll. "Try the live demo" full-width.

### Products (core-vs-hub "use both" — slot 7, after proof)
- **Desktop:** Keep the Engine/Control-Center model and the Zap connector, but **medium-match**: Core shown as a crisp mono CLI frame, Hub as a live product frame, with a single "spec" object visually traveling from terminal into the rails. Headline → *"One pipeline. Two ways to ride it."* Fix the dead `#hero` CTA.
- **Mobile:** Stacked cards, connector becomes a vertical flow.

### Features
- **Desktop:** **Bento** layout — promote 2-3 marquee tiles (Parallel Execution, Security Gate, Institutional Memory) with a small diagram each; demote the rest to compact rows. Not a uniform 4-col grid. Keep the core/hub/together tabs.
- **Mobile:** Single-column, marquee tiles first.

### Commands
- **Desktop:** Render as a **unified terminal-styled list** (mono lines in one `.terminal` frame, badge as inline tag) — ties to the CLI brand instead of another card grid. Copy button per command.
- **Mobile:** Same terminal, horizontal-scroll frame.

### Principles
- **Desktop:** Rows, each led by a **large gradient numeral** (or the pill-on-rails glyph) so it doesn't read as another card stack. This is internal-philosophy content — keep it late.
- **Mobile:** Stacked rows.

### Footer
- **Desktop:** Lead with the **new SVG rails-pill logo** + one-line positioning. Cyan→violet hairline/glow on the top border. Columns: Product / Docs / Community / Legal. Add **"Try the live Hub demo"** link + copy-to-clipboard `npx specrails-core init` pill. Correct icons (Download for Installation, not Bug).
- **Mobile:** Stacked columns; SVG logo (not the legacy purple/pink text wordmark) is the last brand impression.

---

## 6. Hub demo + video showcase plan

**Where they live:** self-hosted in `public/demos/` (static SPA, no backend). One short loop in the **hero** product frame (the only video that loads on initial paint), three loops in the **Hub Showcase** (below fold, play-on-scroll). The heavy full narrated demo is **click-to-expand** behind a facade.

**`<ProductFrame>` component (NEW, extract the duplicated macOS chrome):**
- `rounded-frame` (16–24px), `--surface-2` bg, `border-border/70` hairline, inset top-highlight white/6%, traffic-light dots, optional faux URL pill (`localhost — specrails-desktop`), `--glow-brand` *only* on the hero/Hub-primary instance.
- Props: `as` (`video` | `iframe` | `img` | children), `poster`, `aspectRatio` (reserve space → zero CLS), `glow?`.

**Capture spec:** Record the real Tauri hub + the CLI with QuickTime at 1280px (1920px hero), 60fps, tight window-only region, OS cursor hidden or subtly highlighted, notifications off, **product's own dark theme** so video sits seamless on `--surface-0`. Design for **muted playback** — bake on-screen text callouts (no narration). Loop = 8–12s, last frame matches first (return to same dashboard state). Story per clip: spec drafted by talking to Claude → dragged onto a rail → parallel pipelines running → cost/analytics ticking → PR created.

**Encode — dual format, WebM first:**
```
# MP4 (Safari/universal)
ffmpeg -i in.mov -vf "scale=1280:trunc(ow/a/2)*2" -c:v libx264 -pix_fmt yuv420p \
  -crf 22 -preset veryslow -movflags +faststart -an out.mp4
# WebM (VP9 two-pass, ~50% smaller)
ffmpeg -i in.mov -c:v libvpx-vp9 -b:v 1000K -pass 1 -an -f null /dev/null && \
ffmpeg -i in.mov -c:v libvpx-vp9 -b:v 1000K -pass 2 -an out.webm
```
Strip audio (`-an`). Targets: **~1 MB WebM / ~2 MB MP4** per 10s 1280px loop. Ship a **WebP poster** per clip — reuse/extend `public/hero-hub-screenshot.webp`.

**Embed markup (React):**
```jsx
<video autoPlay muted loop playsInline preload="none"
       poster="/demos/hub-rails-poster.webp"
       ref={r => { if (r) r.muted = true; }}  // React can strip muted; set imperatively
       style={{ aspectRatio: "16 / 10" }}>
  <source src="/demos/hub-rails.webm" type="video/webm" />
  <source src="/demos/hub-rails.mp4"  type="video/mp4" />
</video>
```
`autoPlay muted playsInline` are mandatory (without `muted`, autoplay is blocked; without `playsInline`, iOS force-fullscreens). Explicit `aspectRatio` prevents CLS.

**Lazy autoplay-on-scroll:** new `useVideoAutoplay` hook mirroring `useScrollAnimation` — IntersectionObserver `threshold: 0.5`, `play()` when ≥50% visible, `pause()` when out, `preload="none"` below fold. Hero clip may `preload="metadata"`.

**Reduced-motion fallback:** gate autoplay behind `useReducedMotion()` — if reduced, render **poster only** + a visible play button (WCAG 2.2.2: autoplaying video must be pausable). Add `<track>`/sr-only description of what each demo shows.

**Coexistence with live `/hub-demo/`:** the live interactive app stays as the deeper "drive it yourself" experience, surfaced via the **facade pattern** — render the poster `ProductFrame` with a launch affordance; only inject `<iframe src="/hub-demo/" title="Live specrails-desktop demo" loading="lazy">` **on click** (or IntersectionObserver), never eagerly (it's a 1.6 MB second React app). Separately flag to the hub team that `/hub-demo`'s 368 KB `dracula-colors` chunk is almost certainly a build bug.

---

## 7. Implementation plan (phased, parallel-agent-sized)

**Phase 0 — Token foundation (BLOCKING; one agent, must land first).** Everything depends on it.
- Rewrite `src/index.css` `:root` + `[data-theme=light]` per §4: surface ladder, brand pair, **3-stop `--gradient-primary`**, semantic accents, hairline, radius scale, glow tokens, `font-feature-settings`, global reduced-motion block, focus-visible ring. Add `--dracula-*` aliases → new tokens (no mass rename yet). Self-host fonts (`@fontsource/inter`, `@fontsource/jetbrains-mono` — **new deps**, justified: removes render-blocking 3-hop Google Fonts waterfall, fits no-telemetry brand) + preload in index.html. Map `boxShadow`/`borderRadius`/`section-heading` utilities in `tailwind.config.ts`. Ship/inline `noise.webp` or delete the rule. **Delete `src/App.css`.**
- *Verification gate:* `npm run build`, `npx tsc --noEmit`, visual smoke of the gradient on existing `gradient-text`.

**Phase 1 — Shared primitives (parallel after Phase 0).**
- `<ProductFrame>` (new), `<Reveal>` (new, replaces inline reveal strings + hero keyframe), `<CopyButton>` (new), `useVideoAutoplay` + `useReducedMotion` hooks (new). New dep: **none** (use native APIs). Wire `GitHubStarsButton` styling to the new button language.
- A11y baseline: global focus ring (Phase 0), `<main>` + skip link on Index & Download, global `overflow-x:hidden` guard.

**Phase 2 — Hero + Nav (parallel; high traffic, do early).**
- **Rewrite** `HeroSection`: visible gradient H1, eyebrow, single subhead (de-rainbow), CTA pair, trust row, hero `ProductFrame` with hero video, ambient HeroMesh (strip Spec-247 labels/agent boxes; cache palette; DPR cap 1.5; mobile density). Remove looping shimmer. Mobile primary CTA.
- **Rewrite** `Navbar`: Radix `Sheet` mobile menu (mirror DocsLayout), 4-5 desktop groups + one gradient CTA + scroll-spy via existing `NavLink`, top scrim, compact star count.

**Phase 3 — New & rebuilt sections (parallel, one agent each).**
- **NEW `HubShowcaseSection`** (video-first, 3 capabilities + Compare/SMASH + live-demo facade). Mount in `Index.tsx` at slot 6. **Reorder** Index per §5.
- **Rewrite** `DemoSection` (controls, reduced-motion, mobile overflow), `PipelineSection` (twin rails + traveling pill, rail visible on mobile), `ProblemSection` (metaphor-driven), `ProductsSection` (medium-matched, fix dead CTA), `FeaturesSection` (bento, de-fabricate hub cards), `CommandsSection` (terminal list), `PrinciplesSection` (gradient numerals), `FooterSection` (SVG logo, columns, demo link, copy pill).
- **AgentsSection**: stage grouping + `--agent-glow` hover + stat chips + detail drawer; `primaryJob` headline.
- **DELETE** orphaned `HubSection` + `InstallSection` (replaced by HubShowcaseSection / DownloadPage) after confirming no live refs; remove their tests.

**Phase 4 — Subpages + docs (parallel).**
- **Rewrite** `CorePage` to DownloadPage language (hero, copyable terminal, rails diagram, bigger H1, fix ArrowLeft hack).
- **Rewrite** `AgentsPage` ("Meet the team" + matrix toggle); fix 12→14 (`AGENT_COUNT`).
- **Docs system:** 3-column shell + sticky TOC, `scroll-mt-20`, `CopyButton` on code blocks, `[!NOTE/TIP/WARNING]` callouts + heading anchors, mobile breadcrumb + TOC, branded `DocsIndex`. Replace hand-rolled `DocsDropdown`/`AgentsDropdown` with **shadcn `DropdownMenu`**. Add **Cmd+K** search (new dep: **`cmdk`** — justified: shadcn-native, gives keyboard/ARIA for free, on-brand for the Raycast-style audience; `@radix-ui` already present).
- **Brand assets:** redraw `favicon.svg` (gradient pill + gloss + navy panel), regenerate `og-image.png` (<80 KB), update `AnimatedLogo` to the gradient stops, drop legacy `.ico`.

**Phase 5 — Perf + a11y gate (last; depends on routes existing).**
- Route-level `React.lazy` + Suspense in `App.tsx`; `manualChunks` (react, radix, recharts, markdown stack) in `vite.config.ts`. Target landing initial JS <120 KB gzip.
- Code-split / defer HeroMesh on mobile.
- New dev deps: **`@axe-core/playwright`** (a11y CI gate on `/`, `/download`, `/agents`, a docs page, both themes) + token contrast unit test. Lighthouse-CI perf budget gate (95+).
- Content accuracy pass: platform claims single-source, Codex "in lab" badge, SEO title to the rails metaphor, grammar fixes, audit every hub claim against README.

**Rewritten:** HeroSection, Navbar, DemoSection, PipelineSection, ProblemSection, ProductsSection, FeaturesSection, CommandsSection, PrinciplesSection, FooterSection, CorePage, AgentsPage, AgentsSection, DocsLayout/DocsIndex/MarkdownRenderer, index.css, tailwind.config.ts, favicon.svg, AnimatedLogo, App.tsx, vite.config.ts.
**New:** HubShowcaseSection, ProductFrame, Reveal, CopyButton, TableOfContents, Cmd+K command palette, useVideoAutoplay, useReducedMotion, demo video assets + posters.
**Deleted:** HubSection, InstallSection (+ tests), App.css, legacy favicon.ico.
**New deps:** `@fontsource/inter`, `@fontsource/jetbrains-mono`, `cmdk`, `@axe-core/playwright` — each justified above; no animation library added (motion stays CSS + IntersectionObserver per the brief).

Key file references for the build: brand gradient `src/index.css:56`; invisible H1 `src/components/HeroSection.tsx:51`; hidden mobile CTA `:87`; rainbow spans `:72-76`; missing sections `src/pages/Index.tsx:41-50`; bright hairline `src/index.css:35`; dracula token namespace `src/index.css:41-53`; unused real screenshot `public/hero-hub-screenshot.webp`; live demo `public/hub-demo/`.