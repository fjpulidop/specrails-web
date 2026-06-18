# Redesign addenda — conversation overrides

These supersede the audit blueprint (`REDESIGN_BLUEPRINT.md`) wherever it assumes recorded video. Decided with the project owner during review.

## 1. voicebox.sh uses ZERO video for feature demos
Verified against the live HTML (curl + browser UA, HTTP 200): `<video>`/mp4/webm count = 0. Feature demos are **bespoke coded recreations** of app panels — `<div class="… pointer-events-none select-none">` with ONE animated element (e.g. a waveform). The only real video is the **tutorials** section (YouTube poster thumbnails → lightbox). So "video-first" is the wrong target; **coded recreations** are the voicebox-true technique.

## 2. specrails-desktop already ships the better mechanism
`specrails-desktop/client/src/demo-mode/`:
- `fixtures/` — fake tickets/jobs/analytics/activity (real fake data, already written).
- `demo-entry.tsx` — patches `window.fetch`→fixtures, mocks WebSocket, skips auth → **runs the real hub with no backend**. Comment line 8 literally says it "Listens for postMessage from parent (**specrails-web HubShowcase**)" — the integration was DESIGNED, never built.
- `tour/` — a 15-beat scripted tour (~18s loop): synthetic cursor → Add Spec → types "Add JWT auth…" → drag spec to Rail 1 → Play → running → Logs drawer → 11 log lines → SHIPPED → fade → loop. Respects `prefers-reduced-motion`. Built via `client/vite.demo.config.ts` → `dist-demo` (`base: /hub-demo/`), copied into `public/hub-demo/`. The current build is stale (Apr 17) → REBUILD when wiring the embed.

## 3. Corrected showcase strategy (replaces blueprint §6's video plan)
Two tiers, **NO recorded clips required**:

1. **Bespoke coded showcases** (voicebox "clone"-section pattern) = primary. Each = a recreated hub panel inside `<ProductFrame>`, `pointer-events-none select-none`, ONE element animating in loop on scroll. Built with CSS keyframes (the showcase kit added in `index.css` @layer utilities) + a little JS + `recharts` (already a dep) + canvas. On-brand: rail/pill motif + cyan→violet.
   - **Rails** ⭐ (hero candidate): spec = gradient pill rides rails, drags to Rail 1, lane lights "running". The icon, alive.
   - **Explore**: chat typewriter (user→Claude) + live spec draft filling.
   - **Cost**: analytics bars rise, burn-rate counter ticks (`recharts`).
   - **Website→spec**: mini embedded-browser, hover-select element → becomes a spec card.
   - **SMASH**: one epic card explodes into sub-specs.
2. **Real hub embed** (specrails' unique edge, which voicebox lacks): rebuild `dist-demo` (with the scripted tour) → `public/hub-demo/`, embed via the planned **`HubShowcase`** (facade/lazy iframe, postMessage to switch views). The "try the real thing" climax near the CTA.

`<ProductFrame>` stays the shared primitive — it wraps a coded showcase OR the iframe instead of `<video>`. Recorded video becomes OPTIONAL/later, not the foundation.

## 4. NEW section the audit missed — Developer / API + MCP (voicebox parity)
voicebox has two dev sections, both recreated code/reference panels: **"Your local voice API"** (REST on `127.0.0.1:17493`, endpoint list, `curl` example, "no keys/limits") and **MCP** (config JSON + `voicebox.speak` call + benefit cards). specrails maps 1:1 with REAL surfaces:
- **"Your local pipeline API"** — the hub's built-in REST API (`127.0.0.1:4200`, `docs/internals/REST reference`). Recreate the terminal/reference panel with **real endpoints pulled from hub source** (no invented routes). Hook: 100% local, no auth, no telemetry.
- **MCP / integrations** — hub `mcp/` dir + Serena plugin + runs on Claude Code/Codex.
- **Agent profiles as code** — `schemas/profile.v1.json` declarative JSON.
Add this section to the landing (link into the existing docs API Reference).

## 5. Design-system foundation is already implemented
`src/index.css` + `tailwind.config.ts` already carry: surface ladder, brand pair, 3-stop `--gradient-primary`, semantic accents, hairline, radius scale (`rounded-card`/`rounded-frame`), glow tokens (`shadow-glow-brand`), `.section-heading`/`.eyebrow`, the showcase animation kit (`animate-rail-glide`, `animate-bar-rise`, `animate-card-drop`, `animate-lane-pulse`, `animate-cursor-ping`, `animate-caret`, `animate-drift-a/b`, `.cta-sheen`, `.brand-orb`), global reduced-motion block, and the sitewide focus ring. `--dracula-*` are deprecated aliases → new tokens. **Section/showcase components must consume these — never edit index.css/tailwind.config.**
