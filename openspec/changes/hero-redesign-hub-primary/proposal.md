## Why

Today the landing page positions specrails-core and specrails-hub as equal siblings: the hero shows an animated install terminal behind a Core ↔ Hub product switcher, and a separate HubShowcase section lower on the page embeds a live iframe of the hub demo. Two problems with this:

1. **Buried product**: the actual product (the hub UI) is one scroll away from first paint. Visitors have to scroll past Problem / Agents / Pipeline to see what they came for — voicebox.sh and similar AI-native landing pages show the product in the hero, not hidden below the fold.
2. **No download path**: there is no way to get the macOS desktop build from the landing page. The hub now has a stable `latest/manifest.json` channel (see specrails-hub change `add-latest-release-channel`) so a Download CTA is finally possible.

Product strategy has also shifted: specrails-hub is now the primary product, specrails-core is repositioned as the CLI option for developers who want terminal-only workflows. The landing page should reflect that.

## What Changes

- Lift the hub-demo iframe out of the separate HubShowcase section and embed it directly inside HeroSection, inside an animated browser-chrome frame with premium visual polish (radial glow, shimmer CTA, subtle noise texture, glass morphism).
- Delete the standalone HubShowcase section (its content is now in the hero).
- Replace the Core ↔ Hub product switcher and dual CTAs with a single primary CTA pair: **Download for Mac** (downloads the `.dmg` from `specrails.dev/downloads/specrails-hub/latest/`) and **View on GitHub**.
- Below the Download button, display a small version pill ("v1.30.0 · Apple Silicon only") populated at runtime by fetching `https://specrails.dev/downloads/specrails-hub/latest/manifest.json`.
- Replace Core's hero presence with a single text link at the bottom of the hero ("Prefer the CLI? → specrails-core") that routes to a new `/core` page.
- Add a new `/core` page targeting developers, with the dev-oriented content that used to live inside the hero's Core switcher tab.
- Adjust `hub-navigation` so the navbar's "Hub" entry is renamed or repointed (the `#hub-showcase` anchor no longer exists) and a new "Download" entry is added.
- Adjust `products-section` so its Core CTA routes to `/core` (the new page) instead of scrolling to the hero install terminal.
- On mobile, the hero hides the iframe entirely and shows a static hero screenshot plus the Download CTA (per voicebox pattern).
- Respect `prefers-reduced-motion`: all decorative hero animations (particle background, shimmer) become static.

## Capabilities

### New Capabilities
- `core-page`: dedicated developer-oriented page at `/core` that presents specrails-core (CLI) as the terminal-first option, with install commands, architecture deep-dive, and links back to the main Hub landing.

### Modified Capabilities
- `hub-navigation`: hero section becomes product-first (embedded hub-demo iframe + Download CTA + GitHub button + version pill from manifest.json). The dual-product CTA layout is replaced. Navbar gains a Download entry; the Hub entry is repointed (or renamed) now that `#hub-showcase` is gone.
- `hub-showcase`: REMOVED — the standalone section is deleted and its iframe is lifted into the hero. Mobile behaviour (screenshot fallback) moves into the hero capability.
- `products-section`: Core card CTA routes to `/core` instead of the hero install terminal; Hub card CTA routes to the hero (replacing the obsolete `#hub-showcase` scroll target).

## Impact

- **Code (modified)**: `src/components/HeroSection.tsx`, `src/components/Navbar.tsx`, `src/components/ProductsSection.tsx`.
- **Code (removed)**: `src/components/HubShowcase.tsx` (whole file).
- **Code (new)**: `src/pages/CorePage.tsx` (or similar), plus a small `useReleaseManifest` hook that fetches and caches `manifest.json`.
- **Routing**: add `/core` route in `src/App.tsx`.
- **Assets**: a static hero screenshot for mobile fallback (one PNG in `public/`).
- **Cross-repo dependency**: depends on specrails-hub changes `add-latest-release-channel` (manifest URL) and `hub-demo-scripted-tour` (alive-looking iframe). Spec 3 can ship UI-wise without them, but will look dead until both land; recommended order is Spec 1 → Spec 2 → Spec 3.
- **SEO**: new `/core` route needs a sitemap entry and meta tags (spea-405-on-page-seo precedent).
- **Breaking**: the `#hub-showcase` anchor on the landing page stops resolving. Any external link pointing to it 404s silently (anchor scroll does nothing). Low risk.
