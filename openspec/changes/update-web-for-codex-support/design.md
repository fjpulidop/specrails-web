## Context

Codex support in specrails-hub graduated from lab/beta to a default-enabled path: provider is chosen per project at Add Project time, with codex CLI ≥ 0.128.0 and specrails-core ≥ 4.6.0 as prereqs. The hub documents the gap candidly in `specrails-hub/docs/codex.md` (no native cost, no provider switch post-create, plugin gating via `providerSupport.codex`, `exec resume` re-feeds tokens). The website lags behind: hero/features/products copy still names only Claude Code, the docs sidebar advertises Codex as "(Coming Soon)", and `codex-getting-started.md` is a placeholder.

Commit `19be217` previously stripped Codex from the landing precisely because the hub didn't support it. The reverse operation is now needed, but with a more honest framing than full parity.

## Goals / Non-Goals

**Goals:**
- Surface Codex as a first-class supported provider on the landing and docs.
- Replace the "Coming Soon" placeholder with a real getting-started doc that links out to the hub doc for deep architecture.
- Be explicit about Codex caveats (cost estimated, no post-create switch, plugin gating, session-resume cost) without burying them.
- Keep changes scoped to copy + markdown + one registry entry. No component refactors.

**Non-Goals:**
- Adding a provider/CLI column to `AgentComparisonMatrix` (decided: agent-level only).
- Touching `RoadmapSection.tsx` (it's a live GitHub Issues feed — nothing hardcoded to move).
- Writing a `docs/codex.md` mirror of the hub's full architecture pointers — link out instead.
- Rebranding Claude Code as "primary" or Codex as "secondary" in UI tone. Treat as peers in copy; document the asymmetry in the Codex doc body.
- Adding feature flags or toggles on the web side. The hub's `SPECRAILS_HUB_CODEX_BETA` env gate is a dev-only escape hatch and out of scope for marketing copy.

## Decisions

**1. Dual-provider copy pattern: "Claude Code & Codex"**
- Adopt the literal string "Claude Code & Codex" (with the ampersand) as the standard phrasing in hero/products/features copy.
- Rationale: short, scans cleanly, no need to introduce ordering language ("primary/secondary"). User picked this option explicitly during exploration.
- Alternatives considered: "Claude Code (primary) · Codex (supported)" — rejected as overly hedgy; honesty about the gap lives in the Codex doc, not the headline.

**2. Drop the 🧪 banner everywhere — replace with nothing**
- All four "🧪 Coming Soon — in Lab" call-outs (`installation.md`, `core-vs-hub.md`, `codex-getting-started.md`, plus the `docs-registry.ts` description) are removed in their entirety, not relabeled to "Beta".
- Rationale: hub treats codex as default-enabled. Keeping a beta banner contradicts that. Caveats (estimated cost, etc.) move into a "Differences vs Claude" section of the Codex doc — they belong as factual content, not a banner.
- Alternatives considered: rename banner to "Beta" — rejected. The hub's `SPECRAILS_HUB_CODEX_BETA` env var is a rollback hatch, not a product label.

**3. `codex-getting-started.md` content sourced from `specrails-hub/docs/codex.md`**
- Single source of truth for the asymmetry table and detailed architecture is the hub doc. The web doc paraphrases the user-facing parts (prereqs, add-project, differences, troubleshooting) and links out for the architecture pointers.
- Rationale: avoids two copies of the asymmetry table drifting out of sync.
- Alternatives considered: write a fully independent doc — rejected, drift risk.

**4. `docs-registry.ts` shape: only edit the existing Codex entry**
- The "codex-getting-started" entry already exists. Remove "(Coming Soon)" from the title, remove the lab-banner description, keep slug and ordering stable so deep links don't break.
- Rationale: minimum-diff approach; preserves URL `/docs/codex-getting-started`.

**5. Test posture: update string assertions, don't add new tests**
- If existing `HeroSection.test.tsx` or `FeaturesSection.test.tsx` asserts on the old copy ("Claude Code"), update the assertion to match new copy. Do not add new tests for marketing strings.
- Rationale: tests guard behavior, not copy. New tests would lock in marketing text.

## Risks / Trade-offs

- **[Drift between web Codex doc and hub `docs/codex.md`]** → Link prominently to the hub doc; keep the web doc deliberately shorter and focused on first-time setup. Quarterly review aligned with hub's pricing-table review cadence.
- **[Users assume full parity from the headline]** → "Differences vs Claude" section in the Codex doc is mandatory and must be visible above the troubleshooting fold.
- **[Tests asserting on old copy break the build silently if not updated]** → Audit `src/test/` for string assertions matching `/Claude Code/` in hero/features tests during the tasks pass and update in the same change.
- **[`index.html` meta description affects SEO]** → Keep it under 160 chars; preserve current structure (`turns X into your full dev team`) just inserting "& Codex".

## Migration Plan

This is a copy/docs change with no schema or runtime impact — no migration needed. Rollback is `git revert`.

## Open Questions

None. Scope and copy decisions resolved during exploration phase.
