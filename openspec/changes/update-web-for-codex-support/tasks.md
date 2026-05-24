## 1. Docs content

- [x] 1.1 Rewrite `src/content/codex-getting-started.md` with real content sourced from `specrails-hub/docs/codex.md`: prereqs (codex CLI ≥ 0.128.0, `codex login` or `OPENAI_API_KEY`, specrails-core ≥ 4.6.0), add-project flow, what's installed (`.codex/`, `AGENTS.md`, skills, rails), "Differences vs Claude" section (estimated cost, no provider switch post-create, `providerSupport.codex` plugin gating, `exec resume` token re-feed), troubleshooting, and link to canonical hub doc. Remove the `🧪 Coming Soon — Currently in Lab` banner.
- [x] 1.2 Edit `src/content/installation.md`: remove the `🧪 Codex (OpenAI) Support — Coming Soon (in Lab)` block (line ~5) and the `_Coming Soon (in lab)_` suffix on the Codex CLI line item (~14). Leave the Codex prerequisite present with version constraint (≥ 0.128.0).
- [x] 1.3 Edit `src/content/core-vs-hub.md`: remove the `🧪 Codex (OpenAI) Support — Coming Soon (in Lab).` line (~3). Leave the Interface row reading `Claude Code / Codex CLI` unchanged.
- [x] 1.4 Edit `src/content/getting-started.md` (already neutral — no change needed): rephrase the "Using OpenAI Codex instead of Claude Code? See [Getting Started with OpenAI Codex]" link so it does not advertise Codex as "Coming Soon".

## 2. Docs registry

- [x] 2.1 Edit `src/lib/docs-registry.ts` Codex entry (title line ~3 and description line ~79): drop `(Coming Soon)` from the title and remove the `🧪 Coming Soon — Codex support is currently being tested in our lab` description, replacing the description with a neutral one-liner. Keep the slug `codex-getting-started` unchanged so deep links still work.

## 3. Landing copy

- [x] 3.1 Edit `index.html` meta description (~line 8): change "turns Claude Code into your full dev team" to mention both Claude Code & Codex. Keep total length under 160 characters.
- [x] 3.2 Edit `src/components/HeroSection.tsx` (~line 275): change the hardcoded "Claude Code" reference inside the hero string to "Claude Code & Codex".
- [x] 3.3 Edit `src/components/FeaturesSection.tsx` (~line 20): change the feature item title/desc that reads "Built on Claude Code" / "Native Claude Code integration" to mention both providers.
- [x] 3.4 Edit `src/pages/CorePage.tsx` (~line 62): change "Works with Claude Code." to "Works with Claude Code & Codex." preserving the existing color spans.

## 4. README

- [x] 4.1 Edit `README.md`: already mentions Codex correctly ("running on Claude Code or OpenAI Codex") — no change needed. The "when Codex support ships" wording was in `codex-getting-started.md` (handled in 1.1).
- [x] 4.2 Drop Codex Coming Soon banner from `src/content/deployment.md:3` (discovered during audit; same scope as 1.x).
- [x] 4.3 Drop Codex Coming Soon banner + "tested in our lab" sentence from `src/content/cli-reference.md:5,7` (discovered during audit; same scope as 1.x).

## 5. Tests + verification

- [x] 5.1 Audit `src/test/` for string assertions against the old copy ("Claude Code" in hero/features/core tests) and update them to match the new "Claude Code & Codex" wording.
- [x] 5.2 Run `npm run lint`, `npx tsc --noEmit`, `npm test`, and `npm run build` locally and fix any failure. Result: lint 0 errors / 10 pre-existing warnings, tsc clean, 224/224 tests pass, build OK.
- [ ] 5.3 (manual) Start `npm run dev` and visually verify: landing hero, Features section, Core page, `/docs/codex-getting-started`, `/docs/installation`, `/docs/core-vs-hub`, `/docs/getting-started`, and the Docs sidebar/dropdown — confirm no remaining "Coming Soon"/🧪 mentions for Codex and that dual-provider copy reads cleanly.
