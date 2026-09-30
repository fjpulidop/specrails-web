# Product media refresh

The 2026-09-30 refresh replaces every active Desktop clip (mission, Board,
Freestyle builder) and its poster, plus current Companion previews. Localized
transcripts describe the interactions captured, with sample-data labels.

Source revisions are stored in `public/product/recordings.json` and
`public/companion-app/build-info.json`. Companion's semantic version remains
1.0.1+5 upstream; use its commit and bundle hash to distinguish the refresh.
The build is committed with the website, not deferred to an unrelated deploy.

See `scripts/recordings/README.md` to reproduce recordings. Media consumers use
versioned URLs; Flutter uses versioned bootstrap, entrypoint and asset roots.
`npm run test:product-assets` verifies that they ship coherently before build.

Validated: 98 Companion tests, all web coverage checks, types, lint, guide
freshness and production build. Browser smoke at 1440px and 390px checks video
playback, image loading, runtime errors and horizontal overflow. The sample
recordings render the real React UI with a simulated native bridge. No live
agent, personal credentials or customer data is used.
