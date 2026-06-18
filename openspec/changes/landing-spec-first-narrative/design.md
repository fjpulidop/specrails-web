# Design: landing-spec-first-narrative

## Conflict Analysis

### In-flight: hero-redesign-hub-primary

**Status:** Partially applied. Evidence:
- `src/components/HubShowcaseSection.tsx` is deleted (in git status: `D src/components/HubSection.tsx`)
- `src/pages/CorePage.tsx` already exists (lazy-loaded in App.tsx)
- `useReleaseManifest` hook already exists (`src/test/useReleaseManifest.test.ts` is present)
- `HeroSection.tsx` already uses `useReleaseManifest`, `downloadFromState`, `detectPlatform`, `PLATFORM_SHORT`, `DemoVideo` — all from that change
- Current H1 in HeroSection.tsx reads "Put your specs on rails. / From idea to shipped PR." — this is the hero-redesign-hub-primary copy, NOT the new brief's H1

**Conflicts with landing-spec-first-narrative:**

| Element | hero-redesign-hub-primary intent | landing-spec-first-narrative brief | Resolution |
|---|---|---|---|
| H1 | "Put your specs on rails. From idea to shipped PR." | "Describe it. A team of agents ships it." | **New brief wins.** Replace H1. |
| Subhead | "specrails turns a repo into a spec-driven pipeline of 14 specialized agents — running on the Claude Code or Codex CLI." | "specrails is an agentic software development system. You write a spec — what to build and why. A team of AI agents designs, builds, reviews, and ships the PR." | **New brief wins.** No agent count. No "bring one CLI." |
| Prerequisite pill | "Bring one CLI — Claude Code or Codex." | Removed. Model-agnostic line moved to Block ④. | **New brief wins.** Remove pill. |
| CTA pair | Download (primary) + "See how it works" (secondary, href="#hub") | Download (primary) + npx copy (secondary) + "See how it works↓" (scroll tertiary, href="#pipeline") | **New brief wins.** Add npx CTA. The scroll anchor changes from `#hub` to `#pipeline` (the new Block ② section). |
| DemoVideo caption | "See it in action" (placeholderText) | "Watch one spec go from idea to a shipped pull request — press play." | **New brief wins.** |
| Download behavior | useReleaseManifest + platform detection (keep) | Same — keep | **No conflict.** |
| Trust row | MIT licensed · macOS & Windows · signed builds | Same (keep) | **No conflict.** |

**What hero-redesign-hub-primary delivered that this change keeps:**
- `useReleaseManifest` hook — preserved, used unchanged for the Download CTA
- Platform detection (detectPlatform, downloadFromState, PLATFORM_SHORT) — preserved
- DemoVideo component with `ready={false}` — preserved, caption updated
- CorePage at /core — not touched by this change
- Static brand glow (hero-glow, hero-noise) instead of animated canvas — preserved

**What hero-redesign-hub-primary intended but this change supersedes:**
- The H1 "Put your specs on rails." — replaced
- The subhead with "14 specialized agents" — replaced
- The "Bring one CLI" prerequisite pill — removed
- The secondary CTA pointing to `#hub` — replaced with npx CTA; scroll link changes target

**HubShowcaseSection import in Index.tsx:** The `src/components/HubShowcaseSection.tsx` file is deleted but its import and JSX may still exist in Index.tsx. This change's Index.tsx task must remove that import (it will be gone either way after this change's demotions).

---

### In-flight: update-web-for-codex-support

**Status:** Completed (tasks.md shows all checked). Applied copy changes include:
- HeroSection subhead now references "Claude Code & Codex" (but current file still shows 14 agents — the change may have been applied to a different copy position)
- FeaturesSection mentions both providers
- CorePage mentions both providers
- docs-registry Codex entry updated

**Conflicts with landing-spec-first-narrative:**

| Element | update-web-for-codex-support result | landing-spec-first-narrative brief | Resolution |
|---|---|---|---|
| Hero subhead provider mention | "Claude Code & Codex" in subhead copy | New subhead removes provider names entirely; model-agnostic line goes to Block ④ | **New brief wins.** Block ④ uses "Claude, Codex, and Gemini — bring your own API key." |
| Hero "bring one CLI" pill | "Claude Code or Codex" | Pill is removed entirely | **New brief wins.** |
| FeaturesSection (demoted) | "Claude Code & Codex" references | FeaturesSection removed from Index.tsx | **No conflict.** FeaturesSection still exists at /core route rendering; copy there is preserved. |
| CorePage | "Works with Claude Code & Codex." | Unchanged by this change | **No conflict.** |
| Codex doc entries | Already updated | Unchanged by this change | **No conflict.** |
| index.html meta description | Updated to mention Codex | This change does NOT modify index.html meta | **No conflict.** |

**Model-agnostic copy mandate from brief:**
The brief says: "compatible via API key" not "bring one CLI" and "Claude, Codex, and Gemini — bring your own API key." This is strictly additive beyond what update-web-for-codex-support did (which only added Codex, not Gemini). Block ④ body copy will use the brief's exact wording.

---

## Component-Level Implementation Design

### 1. HeroSection.tsx

**What changes:**
- `<h1>` inner text: "Describe it. A team of agents ships it." (two sentences on separate lines using `<br />`). Remove the `gradient-text` span wrapping "From idea to shipped PR." Apply `gradient-text` to "agents ships it." or the whole second sentence — the brief's copy is plain, so apply the gradient to "ships it." to keep visual continuity.
- Subhead `<p>`: Replace with: "specrails is an agentic software development system. You write a spec — what to build and why. A team of AI agents designs, builds, reviews, and ships the PR."
- Remove the prerequisite pill (`<Reveal delay={250}>` block with Terminal icon, "Bring one CLI").
- CTA block: keep Download primary CTA unchanged (useReleaseManifest behavior preserved). Add npx secondary CTA as a `<div>` with monospace `<code>` and a `<CopyButton>`. Replace the existing `href="#hub"` secondary anchor with a quiet tertiary scroll link: `href="#pipeline"` with text "See how it works ↓" and no ArrowRight icon (or keep ArrowRight for accessibility).
- DemoVideo: change `placeholderText="See it in action"` to `placeholderText="Watch one spec go from idea to a shipped pull request — press play."` and `label` can stay as-is or be updated to match.
- Everything else (eyebrow, trust row, GitHubStarsButton, glow/noise divs, data-logo anchor) is untouched.

**Approach for npx CTA:**
```tsx
<div className="inline-flex items-center gap-2 rounded-pill border border-border/70 bg-surface-2/60 px-4 py-3 font-mono text-xs text-foreground/80 sm:w-auto">
  <code>npx specrails-core@latest init</code>
  <CopyButton value="npx specrails-core@latest init" label="Copy CLI command" />
</div>
```
This is consistent with the CopyButton usage in ProductsSection and FooterSection. No new component needed.

**Scroll tertiary CTA:**
A quiet `<a href="#pipeline">` in a small muted style — below the npx row, not inside the main CTA flex. Brief calls it "quiet scroll link" so it's `text-muted-foreground` with a `↓` or `ArrowRight`.

**aria-label update:** The Download anchor's `aria-label` currently says "Download specrails-desktop for {platformShort}". Keep this — it's accurate and the test verifies it.

---

### 2. PipelineSection.tsx — Block ② "How it works"

**What changes:**
- Section `id="pipeline"` stays.
- Eyebrow: change from "Powered by specrails-core" to "How it works".
- H2: change from "One spec, riding the rails" to "It starts with a spec, not a prompt."
- Add a **spec explainer block** between the H2 and the station track. This is new JSX inside the `<Reveal>` at the top:

```
A spec is the unit of work — and the source of truth. It says what to build,
why it matters to a real user, and how you'll know it's done. You write it
before any code. A prompt is a wish; a spec is a contract the work has to honor.
```

Followed by a 4-bullet list (why specs matter) using the brief's exact copy.

Then a transition sentence: "You write the contract. Then a team shows up to honor it."

- Station section: prepend with an agent framing header: "The spec is the star. The agents are the crew that executes it — each with one job. You don't manage them; you approve the spec."
- The 5-station track below stays structurally intact (same `stations` array, same HorizontalTrack/VerticalTrack layout). Only the framing text above it changes.
- The bottom link: change "Watch the same pipeline run for real" → keep, it still links to `#demo` which is correct.
- The subhead below H2 ("The /specrails:implement command sends...") is replaced by the spec explainer above — remove this existing paragraph.
- Add a CTA after the spec explainer section (per brief "CTA placement: End of ② How it works"). Use a Download CTA (same link behavior as hero) or a link to `/core`. The brief specifies CTA after "once the spec idea has landed" — a `<Link to="/core">Get started with specrails-core</Link>` button after the agent framing is appropriate.

**No structural component changes.** HorizontalTrack and VerticalTrack remain intact. Only the `<Reveal className="text-center">` header block expands.

---

### 3. DemoSection.tsx — Block ③ Demo proof

**What changes:**
- Eyebrow: change "The CLI track" to "Demo proof".
- H2: change "One command. Three features. Shipped on rails." to "Describe it. Watch it ship."
- Subhead `<p>`: add tie-in line before the existing description. Brief says: "one spec, idea → reviewed PR, in a single run." + keep the existing explanation of what the terminal shows.
- Caption at the bottom: change "Idea → Architecture → Implementation → Review → PR · every feature on its own rail, merged in order." to "Describe it. Watch it ship. — one spec, idea → reviewed PR, in a single run."

**No behavioral or layout changes.** The terminal animation, Replay/Skip controls, and ProductFrame are unchanged.

---

### 4. ProblemSection.tsx — Block ④ "Why specrails"

**What changes:**
- `id="problem"` stays.
- Eyebrow: change "The problem" to "Why specrails".
- H2: change "Raw AI coding is powerful. Without rails, it's chaos." to "Raw AI guesses. specrails commits."
- Left column: replace the pain → payoff ledger with the brief's 2-column contrast framing. The new structure:

Frame paragraph: "You already have the AI — Claude, Codex, or Gemini. This is the team around it. Used raw, it's one prompt and one agent, guessing. specrails turns that same model into a disciplined team."

Then a 2-column comparison table (4 rows each):

| Raw CLI | specrails |
|---|---|
| One prompt — it guesses what you meant. | One spec — the intent is written down. |
| One agent doing everything alone. | A team of agents, each with a job. |
| Edits straight into main. | Each spec on its own rail — parallel, no collisions. |
| Hope it's right. | Know it's right. |

Model-agnostic line: "Works with Claude, Codex, and Gemini — bring your own API key. You own the rails, not the vendor."

Closing: "Same models. A system around them that turns vibes into certainty."

**Right column visual:** The existing `RailLane` visual contrast diagram (Without rails vs On rails) is appropriate and stays — it visually supports the new 2-column contrast. The `before/after` metaphor matches "Raw AI guesses → specrails commits." Keep it.

**CTA placement (end of Block ④):** Brief specifies a CTA at the end of Why specrails. Add a Download CTA anchor below the model-agnostic line, consistent with the hero's Download button (same href, same disabled behavior). The component doesn't currently consume `useReleaseManifest` — add the hook import or use a simple Link to `/download`.

**Approach for 2-column table:** Use a `<div className="grid grid-cols-2 gap-4">` inside each side, with 4 `<p>` items. Keep within the existing `lg:grid-cols-[1fr_1.15fr]` layout. The left column gets wider with the new content; right column (RailLane visual) stays.

**Removed:** The `pains` array and its map render. The `PAIN_DELAY` constant. The `Compass`, `GitMerge`, `ShieldAlert` icon imports. The `ShieldX`, `CheckCircle2` icon imports can stay (used in the right visual).

---

### 5. ProductsSection.tsx — Block ⑤ "The ecosystem"

**What changes:**
- `id="products"` stays.
- Eyebrow: change "Core + Hub" to "The ecosystem".
- H2: change "One pipeline. Two ways to ride it." to "Three ways to ride the rails."
- Framing paragraph: "Now that you get the idea, here's how to use it — start with one command in your terminal, add a cockpit when you want to watch, reach for your phone when you step away."

**Layout shift: 2 products → 3.** The current `lg:grid-cols-[1fr_auto_1fr]` (core + connector + desktop) must expand to accommodate the companion. Options:
- Stack to `lg:grid-cols-3` with a gap (remove the animated connector between core↔desktop to fit 3 cards cleanly)
- Keep connectors and use `lg:grid-cols-[1fr_auto_1fr_auto_1fr]`

**Decision:** Use a vertical card stack with a simplified connector, changing the layout to `lg:grid-cols-3` with equal columns. The `RailConnector` horizontal animation between core and desktop is kept between column 1 and 2. A second connector between desktop and companion. This requires a second `<RailConnector orientation="horizontal" />` between columns 2 and 3. On mobile, all connectors are vertical. This is the simplest approach that keeps the rails metaphor.

**specrails-companion card (third layer):**
- Icon: use `Smartphone` from lucide-react
- Brand color: use `text-brand-cyan` (same as core, or introduce a distinct variant — brief doesn't specify; cyan is safe)
- Product label: "specrails-companion"
- Card title: "Your phone"
- ProductFrame: no terminal mockup needed — use a simplified card showing a phone UI or a brief prose description
- Capabilities list (3 bullets from brief):
  - Control your desktop pipeline from your phone
  - Pairs peer-to-peer over WebRTC (DTLS)
  - Zero-knowledge mailbox — never sees your data
- Footnote: "for: anyone who walks away from the desk but not the work."
- CTA: `<a href="https://specrails.dev/companion-app" target="_blank" rel="noopener noreferrer">Open the companion</a>` — external link, not a React Router `Link`

**Core card CTA:** Brief says "Get the CLI" → change "Explore specrails-core" to "Get the CLI" (or keep "Explore specrails-core" — the brief text is for the ecosystem layer description; the CTA button text in brief says "Get the CLI"). Use "Get the CLI".

**Desktop card CTA:** Brief says "Download for desktop" → change current CTA from "See the Hub in action" (href="#hub") to a Download CTA. Use `href="/download"` via `<Link to="/download">`. Text: "Download for desktop".

**CORE_CAPABILITIES list update:** Remove `${AGENTS.length} specialized agents` mention (no agent count in landing body per brief). Replace with copy that doesn't count agents: "Spec-driven pipeline, idea → PR", "Parallel builds in git worktrees", "Security reviewer can block the ship".

**Complementary section at bottom:** Remove the existing "They are complementary: Core does the work in your terminal..." paragraph — it described only two products. Replace with a brief closing ("Start anywhere. All three share the same spec.") or remove it entirely. Brief doesn't call for a specific closing here; remove it to keep density low.

---

### 6. FooterSection.tsx — Block ⑥ Conversion footer

**What changes:**
- Brand pitch paragraph: change "Put your specs on rails. A local-first, spec-driven pipeline of 14 AI agents that turns an idea into a reviewed pull request — open source and MIT licensed." to the brief's desire hook: "Stop re-prompting an agent that keeps guessing. Describe a feature in a sentence and watch a real team design it, build it, and hand you a clean, reviewed PR — while you do something else."
- Add a "sticky CTA / closing line": "Describe it. Watch it ship." as a large typographic element in the brand column, above or below the npx install command pill. Style as `text-xl font-bold` in `text-foreground` — consistent with existing type scale.
- Existing install command pill (npx) stays.
- Trust row (MIT · local-first · signed builds) in the bottom bar stays.
- No agent count anywhere in the footer.

**Footer link columns:** The "Product" column links "The 14 agents" to /agents. The `14` is in the link label, not the landing body — the brief says "no agent count in the landing body." The footer nav is navigation, not a narrative claim, so this label can remain or be simplified to "Agents". Brief doesn't specify footer nav labels; conservatively keep it as-is to minimize diff.

---

### 7. Index.tsx

**What changes:**
- Remove imports: `AgentsSection`, `HubShowcaseSection` (likely already removed in hero-redesign-hub-primary applied state), `FeaturesSection`, `CommandsSection`, `ApiMcpSection`, `PrinciplesSection`
- Remove JSX: `<AgentsSection />`, `<HubShowcaseSection />`, `<FeaturesSection />`, `<CommandsSection />`, `<ApiMcpSection />`, `<PrinciplesSection />`
- `SECTION_IDS` reduced from 12 to 6: `["hero", "pipeline", "demo", "problem", "products", "footer"]`
- Section order in JSX: `<HeroSection />` → `<PipelineSection />` → `<DemoSection />` → `<ProblemSection />` → `<ProductsSection />` → (no JSX for footer, it's outside `<main>`)
- SEO title and description via `useSeo()`:
  - title: "specrails — Describe it. A team of agents ships it."
  - description: "specrails is an agentic software development system. You write a spec — what to build and why. A team of AI agents designs, builds, reviews, and ships the PR. Compatible with Claude, Codex, and Gemini."

**SectionNav:** Driven by `SECTION_IDS` — no other change needed. The nav will reflect 6 sections automatically.

**Comment in `<main>`:** Update the comment that currently says "Show-then-tell: hero → why → proof..." to match the new narrative order.

---

### 8. Test Updates

**HeroSection.test.tsx:**
- Update H1 assertion: `expect(heading).toHaveTextContent(/describe it\. a team of agents ships it\./i)`
- Remove assertion on "14 specialized agents" (line ~103: `expect(screen.getByText(/14 specialized agents/i))`)
- Update subhead assertion: test for "agentic software development system" instead of "14 specialized agents"
- Update "See how it works" test: `href` changes from `#hub` to `#pipeline`
- Add assertion for npx copy element: `screen.getByText(/npx specrails-core@latest init/i)` visible in hero
- DemoVideo placeholderText change: if tested, update to new caption copy

**Index.test.tsx:**
- SECTION_IDS assertion (if any): update to 6 IDs. Currently the test only checks SectionNav renders (up/down buttons) — no section IDs enumerated. No change needed unless a test enumerates them.

**ProductsSection.test.tsx:** Check for assertions on "14 specialized agents" in CORE_CAPABILITIES — must update if present.

---

## Compatibility Impact

### Breaking Changes Found

**Category 4 (Behavioral Change — Advisory): `#hub` anchor in hero CTA**
- Current: `<a href="#hub">See how it works</a>` in HeroSection
- After: `<a href="#pipeline">See how it works ↓</a>`
- Impact: Any external link or bookmarked URL pointing to `specrails.dev/#hub` will scroll to the hero position (the `#hub` id belongs to HubSection which is already removed). The anchor no longer resolves. After this change it scrolls to `#pipeline` instead.
- Severity: Low. `#hub` was already broken by `hero-redesign-hub-primary` (HubSection deleted).

**Category 2 (Rename — Breaking): `SECTION_IDS` array in Index.tsx**
- Current: 12 section IDs including `agents`, `hub`, `features`, `commands`, `api`, `principles`
- After: 6 section IDs: `hero`, `pipeline`, `demo`, `problem`, `products`, `footer`
- Impact: `SectionNav` and any hash-based deep links to removed sections (`/#agents`, `/#features`, etc.) will silently fail. These anchors no longer exist on the landing page.
- Migration: Content is accessible at its dedicated route: `/agents`, `/core`, `/docs`.

**Category 4 (Behavioral Change — Advisory): `CORE_CAPABILITIES` in ProductsSection**
- Agent count string removed from the Core product card capabilities list.
- Impact: The number of agents is no longer surfaced anywhere on the landing page.

### Compatibility Notes (Advisory)
- The `hero-redesign-hub-primary` change's H1 copy ("Put your specs on rails.") is superseded. No external systems depend on this text.
- The `update-web-for-codex-support` copy changes to HeroSection subhead are superseded by the new subhead. The model-agnostic line (Claude, Codex, Gemini) in Block ④ is strictly additive.
