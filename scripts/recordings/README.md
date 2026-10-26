# Product recordings

These are recordings of Desktop's current React UI with the **Specrails** theme, not animated mockups. The capture sets both the saved theme and the HTML boot theme and waits for it before recording. Fetch and
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
   Set `SPECRAILS_DESKTOP_DIR` if Desktop is elsewhere. Use `FFMPEG_PATH=/absolute/path/to/ffmpeg` to select a binary compatible with the host architecture. The configuration resolves React and Tailwind plugins from Desktop, avoiding an ESM import of the build-only demo config.
4. Inspect each clip and poster. Update all localized transcripts, durations and
   `RECORDING_ASSET_VERSION` in `src/lib/recording-copy.ts` when changing the interaction script.

`public/product/recordings.json` records the theme, Desktop revision and sample-data
provenance. `public/companion-app/build-info.json` records the upstream commit,
version and bundle hash. Companion's unchanged semantic version alone is not
sufficient to identify its source revision.

The 2026-10-26 refresh uses Desktop `f1ed7f8f8da67f9adb3f5092cfa51589eb2414ad`. Factory graphs were exported with `engineV2`, `workflowDefinitions`, `deriveChange`, `workflowAgentSteps` and `workflowImplementationSteps` set to 1. The workflow catalog remains at nodeKindsVersion 7, matching the paired Core source. Mission-session fixtures now return an empty subagent snapshot before the generic conversation route. Code activity returns an empty, valid page for specs that have not run; capture rejects error alerts in spec details. No real provider or execution is invoked.
