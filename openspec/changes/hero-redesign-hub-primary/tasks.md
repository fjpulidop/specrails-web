## 1. Release Manifest Hook

- [ ] 1.1 Create `src/hooks/useReleaseManifest.ts` that fetches `https://specrails.dev/downloads/specrails-hub/latest/manifest.json` once and returns `{ status: 'loading' | 'ready' | 'error', manifest? }`
- [ ] 1.2 Cache the promise at module scope so multiple mounts on the same page share one fetch
- [ ] 1.3 Validate `schemaVersion === 1` and required fields (`version`, `platforms.darwin-arm64.{filename,url,sha256,size}`); any mismatch returns `error`
- [ ] 1.4 Write unit tests using `msw` covering: success, 404, 500, invalid JSON, unknown schemaVersion

## 2. Hero Redesign

- [ ] 2.1 Remove the product switcher (`ProductSwitcher`) and the tabbed terminal (`TabbedTerminal`) from `HeroSection.tsx`
- [ ] 2.2 Add a new `BrowserChromeFrame` sub-component rendering the window chrome (traffic lights + address pill showing `localhost:4200`) with a purple glow ring, glass morphism, and subtle noise texture overlay
- [ ] 2.3 Mount a lazy-loaded `<iframe src="/hub-demo/index.html" ... />` inside the browser frame on `>= lg` breakpoints, using the same IntersectionObserver + manifest-probe pattern currently used by `HubShowcase.tsx`
- [ ] 2.4 Add a `hero-hub-screenshot.webp` static asset under `public/` and render it inside the frame on `< lg` breakpoints with a short caption ("Download for Mac to see the real thing")
- [ ] 2.5 Add a Download CTA `<a>` element with `download` attribute that reads `manifest.platforms['darwin-arm64'].url`; when `status === 'loading'` render a disabled skeleton; when `status === 'error'` point to `https://github.com/fjpulidop/specrails-hub/releases/latest`
- [ ] 2.6 Add a View on GitHub CTA `<a>` pointing to `https://github.com/fjpulidop/specrails-hub` directly next to the Download button
- [ ] 2.7 Add a version pill under the CTAs showing `v{version} · Apple Silicon only` (ready) or `Apple Silicon only` (error); skeleton shimmer when loading
- [ ] 2.8 Add a single small "Prefer the CLI? → specrails-core" text link at the bottom of the hero that `Link`s to `/core`
- [ ] 2.9 Retain the existing `ParticleBackground` canvas; adjust the radial glow class to apply a 6-second opacity breathing animation (`animate-hero-breath`) gated behind `motion-safe:`
- [ ] 2.10 Add a `@keyframes hero-shimmer` animation in `index.css` plus a `motion-safe:animate-hero-shimmer` utility used on the Download CTA

## 3. HubShowcase Removal

- [ ] 3.1 Delete `src/components/HubShowcase.tsx`
- [ ] 3.2 Remove its import and `<HubShowcase />` JSX from `src/pages/Index.tsx` (or wherever it's mounted)
- [ ] 3.3 Remove any tests that import `HubShowcase` (delete those test files or the relevant suites)
- [ ] 3.4 Grep for `#hub-showcase` across `src/` and `public/`; remove or repoint any remaining references
- [ ] 3.5 Remove `hub-showcase` entry from `public/sitemap.xml` if present

## 4. Navbar Changes

- [ ] 4.1 In `src/components/Navbar.tsx`, remove the entry `{ label: "Hub", href: "/#hub-showcase" }`
- [ ] 4.2 Add a `Core` nav link entry whose `to="/core"` (use `Link` from `react-router-dom`)
- [ ] 4.3 Add a Download pill button on the right side, using the same href resolution as the hero CTA (read from `useReleaseManifest`)
- [ ] 4.4 Re-order visible desktop navbar entries to: `Problem, Agents (dropdown), Pipeline, Features, Commands, Core, Docs (dropdown), [Download pill], GitHub icon`
- [ ] 4.5 Adjust mobile navbar to include a Download entry (full-width button) and a Core link; GitHub stays as icon

## 5. ProductsSection CTA Rewire

- [ ] 5.1 In `src/components/ProductsSection.tsx`, change the Core card CTA to navigate to `/core`
- [ ] 5.2 Change the Hub card CTA to smooth-scroll to `#hero` instead of `#hub-showcase`

## 6. Core Page

- [ ] 6.1 Create `src/pages/CorePage.tsx` composed of a banner, install tabs block, architecture section, agents teaser, customisation section, integration examples, GitHub CTA, back-to-Hub link
- [ ] 6.2 Lift the `coreTabs` data + `TabbedTerminal` render from the legacy hero into the install block on CorePage (copy-move, not re-implement)
- [ ] 6.3 Add `<title>` and `<meta name="description">` for the Core page via a small per-page head helper (or document.title mutation in a `useEffect`)
- [ ] 6.4 Add the `/core` route to `src/App.tsx`
- [ ] 6.5 Add `/core` entry to `public/sitemap.xml`
- [ ] 6.6 Ensure the Navbar and FooterSection render on the Core page (same layout primitives)

## 7. Mobile & Accessibility

- [ ] 7.1 Verify the hero falls back to the static screenshot at `< lg` (manual check at 375px, 768px, 1023px, 1024px)
- [ ] 7.2 Wrap all new decorative motion utilities (`animate-hero-breath`, `animate-hero-shimmer`) behind `motion-safe:` so they are disabled under `prefers-reduced-motion: reduce`
- [ ] 7.3 Confirm the iframe is not mounted on mobile (not just hidden)
- [ ] 7.4 Confirm the Download CTA has an accessible name (button or link text, not just an icon)

## 8. Styling / Design Tokens

- [ ] 8.1 Add `@keyframes hero-breath` and `@keyframes hero-shimmer` in `src/index.css`
- [ ] 8.2 Add the purple glow-ring utility `.hero-chrome-ring` (purple outer glow, inner border) in `src/index.css`
- [ ] 8.3 Add noise texture asset `public/noise.webp` (small, ~15KB) and a `.hero-noise` utility that renders it at 2% opacity above the radial glow

## 9. Tests

- [ ] 9.1 Unit tests for `useReleaseManifest` hook (from §1.4)
- [ ] 9.2 Component test: hero renders Download CTA skeleton when hook is loading
- [ ] 9.3 Component test: hero renders `v1.30.0 · Apple Silicon only` when hook is ready with that version
- [ ] 9.4 Component test: hero Download CTA falls back to GitHub Releases URL when hook is error
- [ ] 9.5 Component test: hero does not mount an iframe at widths below 1024px (use `jsdom` with mocked `matchMedia`)
- [ ] 9.6 Component test: hero does not render any `ProductSwitcher` or `TabbedTerminal`
- [ ] 9.7 Component test: no element on the landing page has `id="hub-showcase"`
- [ ] 9.8 Component test: Navbar shows Core and Download entries and no `href="#hub-showcase"` link
- [ ] 9.9 Component test: ProductsSection Core CTA `href` resolves to `/core`
- [ ] 9.10 Component test: Core page renders all eight sections in order
- [ ] 9.11 Snapshot test: sitemap.xml contains a `/core` URL entry

## 10. Playwright / E2E

- [ ] 10.1 Update existing Playwright landing-page test to assert the hero contains an iframe at desktop widths
- [ ] 10.2 Add a new Playwright test that navigates to `/core` and asserts the eight Core page sections are visible

## 11. Documentation

- [ ] 11.1 Update `README.md` (or whichever project doc lists sections) to remove the HubShowcase reference and mention the hero-embedded demo
- [ ] 11.2 Add a short CLAUDE.md note in specrails-web about the `useReleaseManifest` hook and the `/hub-demo/` iframe being the "live product" in the hero
- [ ] 11.3 Add an inline comment in `HeroSection.tsx` near the manifest fetch pointing to the openspec change id `hero-redesign-hub-primary`

## 12. Cross-Repo Coordination (manual, not blocking this spec's code)

- [ ] 12.1 Confirm specrails-hub change `add-latest-release-channel` is shipped and the `manifest.json` URL returns valid JSON before rolling out this change
- [ ] 12.2 Confirm specrails-hub change `hub-demo-scripted-tour` is shipped and the updated `dist-demo/` has been copied to `public/hub-demo/` so the hero iframe plays the scripted tour on load
