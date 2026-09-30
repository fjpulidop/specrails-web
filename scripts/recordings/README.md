# Product recordings

These are recordings of Desktop's React UI, not animated mockups. Fetch and
WebSocket fixtures contain sample projects/messages/usage only. The native
Tauri bridge is simulated for titlebar and footer rendering; the recording does
not demonstrate OS sleep prevention or a real agent execution. Companion images
are screenshots of the hosted release build's built-in read-only Demo.

From this repository, with Desktop installed alongside it:

1. Refresh `factory-loops.json` from Desktop's exported `factoryLoopsForCapabilities` with the paired
   Core capability flags in
   `server/modules/loops/runtime/loop-factory.ts` if the built-ins changed.
   Refresh `workflow-catalog.json` using the paired Core CLI's `workflows list`.
2. Run Desktop's Vite binary with this config:
   `../specrails-desktop/client/node_modules/.bin/vite --config scripts/recordings/vite.config.mjs`
3. Run `node scripts/recordings/capture.mjs`. Chromium and ffmpeg are required.
   Set `SPECRAILS_DESKTOP_DIR` if Desktop is elsewhere.
4. Inspect each clip and poster. Update all localized transcripts, durations and
   the media query version in consumers when changing the interaction script.

`public/product/recordings.json` records the Desktop revision and sample-data
provenance. `public/companion-app/build-info.json` records the upstream commit,
version and bundle hash. Companion's unchanged semantic version alone is not
sufficient to identify its source revision.
