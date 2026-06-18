# Landing rebuild — approved content brief

> Working input for the OpenSpec change. Authoritative source for copy + IA.
> Approved by the founder (Javier) in session 2026-06-18. Design system is
> **out of scope** — colors, typography, spacing, components stay as they are.
> This change is **content + information architecture only**.

## North star

A visitor must (1) understand what specrails *is* within seconds, in plain
language, (2) want to **play with it / explore its universe**, and (3) download
it. Comprehension → desire → download. Low density, strong point of view — not a
feature catalog.

## Foundational framing

specrails is an **agentic software development system**. Name the category
before any feature. Core thesis carried through every act: **a prompt is a wish;
a spec is a contract.** The **spec is the star**; the agents (from the AI
providers) are the crew that executes it.

## Pedagogical rule

One new idea per scroll, simplest/biggest first. The **3-product ecosystem is
revealed LAST**, laddered basic → detailed. The **agent count never appears in
the landing body**. Every list capped at **4 bullets**. Headlines < 8 words,
subheads < 25, bullets < 10.

## Information architecture — landing = 6 blocks

| # | Block | Component | Reuse/new |
|---|-------|-----------|-----------|
| 1 | Hero (category-first + demo video) | `HeroSection` | reuse, rewrite copy |
| 2 | How it works — Spec first, agents second | `PipelineSection` (+ spec explainer lead) | reuse, reframe |
| 3 | Demo proof (live spec→PR run) | `DemoSection` | reuse, trim density |
| 4 | Why specrails (raw CLI vs rails) | `ProblemSection` | reuse, reframe to contrast |
| 5 | The ecosystem (3 products, revealed last) | `ProductsSection` | reuse, **add 3rd layer: companion** |
| 6 | Conversion footer | `FooterSection` | reuse, add desire hook + sticky CTA |

**Demoted to subpages (remove from `Index.tsx`):** `AgentsSection`,
`HubShowcaseSection`, `FeaturesSection`, `CommandsSection`, `ApiMcpSection`,
`PrinciplesSection`. Update `SECTION_IDS` + `SectionNav` accordingly. Content
lives on `/agents`, `/core`, `/docs`, `/download` (already exist).

## Factual constraints (do not contradict / do not invent)

- Compatible with **Claude, Codex, and Gemini — bring your own API key.** (NOT
  "bring one CLI".) Model-agnostic: "You own the rails, not the vendor."
- **specrails-companion** is a **live Flutter PWA** hosted at
  `specrails.dev/companion-app`. CTA = **"Open the companion"** (not download /
  not coming-soon). Pairs to specrails-desktop **peer-to-peer over WebRTC
  (DTLS)**; a zero-knowledge mailbox relays only the **~5-second handshake** and
  **never sees your data**.
- A Spec = unit of work + source of truth (OpenSpec format): what to build, why
  it matters to a real user, acceptance criteria — written before code.
- Demo **video is TBD** → ship with the existing `DemoVideo` play-affordance
  placeholder (`ready={false}`); drop the clip in later.

## Approved copy deck

### ① Hero
- **eyebrow:** MIT · Local-first · Open source
- **H1:** Describe it. A team of agents ships it.
- **subhead:** specrails is an agentic software development system. You write a
  spec — what to build and why. A team of AI agents designs, builds, reviews,
  and ships the PR.
- **video caption:** Watch one spec go from idea to a shipped pull request —
  press play.
- **CTA primary:** Download specrails (platform-detected desktop build — keep
  current `useReleaseManifest` behavior)
- **CTA secondary:** `npx specrails-core@latest init` with copy button — "try
  just the CLI"
- **CTA tertiary (quiet scroll link):** See how it works ↓

### ② How it works — Spec (the contract)
- **label:** How it works
- **H2:** It starts with a spec, not a prompt.
- **spec explainer:** A spec is the unit of work — and the source of truth. It
  says what to build, why it matters to a real user, and how you'll know it's
  done. You write it before any code. A prompt is a wish; a spec is a contract
  the work has to honor.
- **why specs matter (4):**
  - What to build, in plain words.
  - Why it matters to a real user.
  - Acceptance criteria, written before code.
  - One source of truth the team shares.
- **transition:** You write the contract. Then a team shows up to honor it.
- **agents framing:** The spec is the star. The agents are the crew that
  executes it — each with one job. You don't manage them; you approve the spec.
- **agents points (4):**
  - A product manager pressure-tests the value.
  - An architect plans it; developers build it.
  - Reviewers and a security scan guard the merge.
  - Out comes a PR — reviewed, not guessed.

### ③ Demo proof
- caption tie-in: **Describe it. Watch it ship.** — one spec, idea → reviewed
  PR, in a single run. (Reconcile the demo's stations 1:1 with block ②'s pipeline.)

### ④ Why specrails (raw CLI vs rails)
- **label:** Why specrails
- **H2:** Raw AI guesses. specrails commits.
- **frame:** You already have the AI — Claude, Codex, or Gemini. This is the
  team around it. Used raw, it's one prompt and one agent, guessing. specrails
  turns that same model into a disciplined team.
- **two columns (4 each):**

  | Raw CLI | specrails |
  |---|---|
  | One prompt — it guesses what you meant. | One spec — the intent is written down. |
  | One agent doing everything alone. | A team of agents, each with a job. |
  | Edits straight into main. | Each spec on its own rail — parallel, no collisions. |
  | Hope it's right. | Know it's right. |

- **model-agnostic line:** Works with Claude, Codex, and Gemini — bring your own
  API key. You own the rails, not the vendor.
- **closing:** Same models. A system around them that turns vibes into certainty.

### ⑤ The ecosystem (revealed last, basic → detailed)
- **label:** The ecosystem
- **H2:** Three ways to ride the rails.
- **framing:** Now that you get the idea, here's how to use it — start with one
  command in your terminal, add a cockpit when you want to watch, reach for your
  phone when you step away.
- **layers:**
  1. **specrails-core — the engine** · One command drops the whole pipeline into
     any git repo. `npx specrails-core@latest init`. No app, no account. ·
     CTA: **Get the CLI** · for: anyone with a terminal and a git repo.
  2. **specrails-desktop — the cockpit** · A local app to drag specs onto rails
     and watch them run. Cost + analytics. 100% local, no accounts, no
     telemetry. Signed macOS & Windows builds; Linux soon. · CTA: **Download for
     desktop** · for: anyone who'd rather watch the work than read a log.
  3. **specrails-companion — your phone** · Control your desktop pipeline from
     your phone. Pairs peer-to-peer over WebRTC (DTLS); a zero-knowledge mailbox
     relays only the ~5-second handshake and never sees your data. · CTA:
     **Open the companion** · for: anyone who walks away from the desk but not
     the work.

### ⑥ Conversion footer
- **desire hook:** Stop re-prompting an agent that keeps guessing. Describe a
  feature in a sentence and watch a real team design it, build it, and hand you
  a clean, reviewed PR — while you do something else.
- **sticky CTA / closing line:** Describe it. Watch it ship.
- keep MIT / local-first / signed-builds trust row.

## CTA placement (conversion)
- Hero — primary Download beside the demo video.
- End of ② How it works — once the spec idea has landed.
- End of ④ Why specrails — after the contrast.
- Each ecosystem layer carries its own CTA.
- Sticky footer — "Describe it. Watch it ship."

## Out of scope
- No design-system changes (colors, type, spacing, shadcn primitives).
- No backend. companion-signal.php + /companion-app are already hosted; only
  link to them.
- Building the demo video itself (placeholder ships now).

## Tests / verification (per CLAUDE.md)
- Update affected Vitest tests (e.g. `HeroSection.test.tsx`,
  `CorePage.test.tsx`) to match new copy.
- `npm run lint` · `npx tsc --noEmit` · `npm test` · `npm run build` all green.
