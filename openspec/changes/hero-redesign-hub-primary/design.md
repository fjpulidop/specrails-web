## Context

The specrails-web landing page has two separate "see the product" surfaces today: an animated install terminal inside `HeroSection.tsx` (with a Core ↔ Hub switcher) and a live iframe of the hub demo inside `HubShowcase.tsx`. The hero terminal is at the top but doesn't show the product; the iframe is lower on the page and only appears when the visitor scrolls.

Product direction has shifted: specrails-hub is the primary product. specrails-core is the terminal-first option for developers. The hero should lead with Hub and offer an obvious download path. specrails-hub has just introduced a stable `latest/manifest.json` channel (specrails-hub change `add-latest-release-channel`) that makes a runtime-resolved Download CTA safe and cheap.

The existing hub-demo build is about to get a scripted product tour (specrails-hub change `hub-demo-scripted-tour`) which will make the embedded iframe feel alive even without user interaction. Lifting that iframe into the hero gives the landing page a voicebox-style "live product at first paint" hero.

Constraints:
- macOS Apple Silicon is the only supported download today; design must be honest about that and not imply broader OS support.
- Iframe is cross-origin from the point of view of hub-demo's asset loading (same host as the web page, but sandboxed); no same-origin scripting is needed nor desired.
- Mobile iframe embedding is impractical (performance + layout); must have a graceful fallback.
- `/core` is an add-only page; it does not change the host's existing routes or breadcrumbs.

## Goals / Non-Goals

**Goals:**
- Ship a hero that shows the live hub-demo iframe within an animated browser-chrome frame, at first paint on desktop.
- Ship a Download CTA that resolves the latest version and binary URL at runtime via `manifest.json`, falling back gracefully if the network call fails.
- Ship a View-on-GitHub CTA next to Download.
- Surface the current version and platform constraint ("v1.30.0 · Apple Silicon only") directly under the Download CTA.
- Build a dedicated `/core` page that continues to tell the Core story for developer-audiences.
- Keep Core discoverable from the Hub landing via a single small link.
- Degrade gracefully on mobile and on `prefers-reduced-motion`.

**Non-Goals:**
- Fallback to Intel Mac, Windows, or Linux downloads. Apple Silicon only until the hub ships those builds.
- Auto-updates inside the desktop app. Out of scope (handled by specrails-hub).
- Redesigning the Problem, Pipeline, Agents, Features, Commands, Roadmap sections below the hero. They are untouched.
- Replacing the ProductsSection comparison cards. They stay; only their CTA targets adjust.
- Client-side sha256 verification of the downloaded `.dmg`. Browsers cannot compute a file hash after download without a user-gesture, and modern macOS Gatekeeper already verifies the notarisation on launch. The manifest's `sha256` exists for possible future UI (admins, internal tooling).
- New copy or brand refresh for the `/core` page beyond ToC-level structure. Copy tuning is a follow-up.

## Decisions

### Decision 1: Iframe moves into HeroSection, HubShowcase file is deleted
The iframe lives exactly once — in the hero. Keeping two iframes on the page (hero + showcase) wastes bandwidth and duplicates the content. Deleting `HubShowcase.tsx` is less risky than trying to make it conditionally render "only when the hero can't".

The `useProductCache`-style lazy-load pattern from `HubShowcase` (manifest probe via `content-type` header) is ported into the hero.

Alternatives considered:
- Keep HubShowcase as a deeper interactive demo and put only a static image in the hero — rejected because then the hero doesn't carry the "live product" wow factor.
- Move the iframe into hero AND keep HubShowcase showing a different route — rejected as scope creep and layout clutter.

### Decision 2: Version + download URL come from `manifest.json`
At mount, the hero issues a single `fetch('https://specrails.dev/downloads/specrails-hub/latest/manifest.json')`. A small hook `useReleaseManifest()` owns the fetch, caches the result in-memory for the lifetime of the page, exposes `{ version, dmgUrl, status }` with three states: `loading`, `ready`, `error`.

Render rules:
- `loading`: Download button renders a muted skeleton ("↓ Download for Mac" text, disabled, subtle shimmer).
- `ready`: Download button enabled, `href = manifest.platforms["darwin-arm64"].url`. Version pill shows `v{version} · Apple Silicon only`.
- `error`: Download button falls back to a hardcoded link to GitHub Releases (`https://github.com/fjpulidop/specrails-hub/releases/latest`) and the version pill shows `Apple Silicon only` with no version string.

Alternatives considered:
- Inject version at build time via Vite `define`. Problem: the web deploys on its own cadence, not in lockstep with hub releases; a build-time value would lag. Runtime fetch is worth the ~one roundtrip.
- Call GitHub Releases API directly. Rate-limited + CORS uncertainty + extra hop; the hub's `manifest.json` is authoritative.

### Decision 3: Download button uses `<a href>` with `download` attribute, no JavaScript
The button is a real anchor tag so right-click → copy link works and browsers handle the file save dialog natively. No `onClick` handler, no fetch-blob-then-save dance. The browser handles it.

```tsx
<a
  href={manifest.platforms['darwin-arm64'].url}
  download
  className="...premium shimmer..."
>
  ↓ Download for Mac
</a>
```

### Decision 4: Mobile fallback is a static screenshot plus Download CTA
The iframe does not render below the `lg` breakpoint (1024px). A single static hero image (`/public/hero-hub-screenshot.webp` at roughly 2560×1600 @ 1x and 2x variants) renders in the iframe's place with the browser-chrome frame around it. Download CTA remains the primary action; the image carries a `Download for Mac to see the real thing` caption.

Rationale: iframe-in-a-mobile-hero is a known bad UX (scroll trapping, double pinch-zoom, extra JS bundle on a tiny screen).

### Decision 5: Premium polish recipe — 6 layers
The "ultra-premium" feel is a stack of six small effects, none of which individually take much code:

```
Layer 1 · particle canvas background  (exists, unchanged)
Layer 2 · radial ambient glow          (exists, intensify + add breathing)
Layer 3 · subtle noise texture overlay (new, ~15kb webp at 2% opacity)
Layer 4 · browser-chrome frame         (new, glass morphism, purple glow ring)
Layer 5 · iframe / screenshot          (content)
Layer 6 · shimmer sweep on Download CTA (new, CSS keyframe)
```

Layer 2 "breathing" = slow `opacity: 0.8 ⇄ 1.0` animation over ~6s. Layer 6 shimmer = diagonal gradient sweeping once every 4s. Both disabled under `prefers-reduced-motion: reduce`.

### Decision 6: `/core` page is a lightweight route, not a subdomain
Add a `/core` path-based route to the existing React Router tree. No subdomain, no separate Vite project, no SSR. This keeps assets, layout primitives (Navbar, Footer), and build pipeline shared.

Page structure (ToC):
1. Short banner — "specrails-core · the CLI behind specrails-hub"
2. Install block — Quick Setup / Full Setup tabs (moved verbatim from existing hero core tabs)
3. Architecture section — diagrams + prose on agents, pipeline, rails
4. Agents catalog teaser + link to existing `/agents`
5. Customisation section — writing your own agents/commands
6. Integration examples — CI, pre-commit, etc
7. GitHub CTA
8. Link back to Hub (`"Want the dashboard? → /"`)

Reuses Navbar and Footer unmodified. Adds a page-level `<title>` and `<meta description>`.

### Decision 7: Navbar changes
The current navbar has entries: Problem · Agents · Pipeline · Hub · Features · Commands · Docs · GitHub. Changes:

- `Hub` entry repoints from `#hub-showcase` to `#hero` (or is dropped — Hub IS the hero now, a nav entry to it is redundant since the page opens on it).
- New entry `Core` pointing to `/core`.
- New visible Download button (pill-style, right-aligned, dracula-purple) that fires a direct download via the same manifest URL as the hero button.
- GitHub icon button stays.

Final order: `Problem · Agents · Pipeline · Features · Commands · Core · Docs · [Download] · GitHub`

Rationale: "Core" sits near "Docs" because both are "go somewhere else to learn more" links. "Download" is the primary action and gets pill-button prominence.

### Decision 8: ProductsSection CTA rewiring
The ProductsSection cards currently have: Core CTA → scroll to hero install terminal; Hub CTA → scroll to `#hub-showcase`. New wiring:

- Core card CTA → route to `/core`.
- Hub card CTA → scroll to `#hero` (the hero now contains the iframe).

This preserves the comparison narrative without demoting the section.

### Decision 9: `useReleaseManifest` hook is in-memory only, no localStorage
Stale manifest in localStorage would persist across releases and could outlive a web deploy where the hardcoded fallback URL changed. In-memory cache is sufficient; the hero is above the fold and gets fetched once per page load.

## Risks / Trade-offs

- **[manifest.json is slow / unreachable during first paint on flaky networks]** → UI shows muted skeleton for up to ~3 seconds, then falls back to the GitHub Releases link (Decision 2). No white screen, no blocker.
- **[iframe asset cost hurts LCP]** → iframe is lazy-loaded via IntersectionObserver (same pattern HubShowcase uses today). Hero LCP element is the H1 / tagline text, not the iframe — LCP budget preserved.
- **[CORS on manifest.json fetch]** → `specrails.dev` is same-origin for the production web host (if deployed there) or cross-origin otherwise. Hostinger config must allow `Access-Control-Allow-Origin: *` on `latest/`. Add to the spec 1 `.htaccess` delta if not already present.
- **[mobile screenshot goes stale as hub UI evolves]** → low cost to re-export once every few releases. Document in the spec as a manual step.
- **[`/core` route diverges from main site visually]** → reuses Navbar + Footer + Tailwind tokens; visual divergence is bounded unless we intentionally style it differently.
- **[Download button points at a missing binary if manifest.json is published but FTP upload raced]** → spec 1 mandates the `.dmg` is HEAD-verified before manifest upload, removing this race.
- **[Deleting HubShowcase.tsx breaks existing tests or direct imports]** → grep for imports before deletion; tasks include a cleanup pass.

## Migration Plan

1. Implement `useReleaseManifest` hook and a small manifest-fetching integration test using `msw`.
2. Implement the new hero layout on a feature branch with `prefers-reduced-motion` guards.
3. Delete `HubShowcase.tsx`, remove imports, remove tests that reference it, delete `#hub-showcase` anchors.
4. Rewire ProductsSection CTAs.
5. Add `/core` route + page; reuse Navbar + Footer.
6. Update navbar per Decision 7.
7. Add static hero screenshot asset for mobile.
8. Run full vitest + playwright; visual regression against snapshots.
9. Ship behind no flag — the change is a full replacement, not gradual rollout.
10. Rollback: revert the merge commit. The hero returns to dual-CTA layout; `/core` route 404s; no data migration.

## Open Questions

- Should the navbar "Hub" entry be dropped entirely or renamed to "Demo"? Leaning drop — the hero IS the hub. If analytics show clicks on it, revisit.
- Should the hero offer a secondary "install via npm" line for power users (`npm install -g specrails-hub`)? Probably yes, as a small muted text line under the Download CTA. Not critical for v1 of this spec.
- Should the `/core` page get its own sitemap + og-image entry in this spec or a follow-up SEO spec? Include sitemap + `<title>` + `<meta>` here; defer og-image generation to a follow-up.
