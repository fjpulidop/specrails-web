# Tasks: landing-spec-first-narrative

> Layer: [frontend]
> Execution: sequential (each task depends on the previous)
> Constraints: no design-system changes; Dracula tokens only; shadcn/ui components where applicable; no backend

---

## Task 1 — HeroSection rewrite [frontend] [done]

**File:** `src/components/HeroSection.tsx`

**What to do:**
1. Replace the `<h1>` content. Current text: "Put your specs on rails. / From idea to shipped PR." New text: "Describe it. A team of agents ships it." Apply `gradient-text` class to "ships it." (keep gradient on second line for visual continuity). Use `<br />` between the two sentences.
2. Replace the subhead `<p>` (currently the `<Reveal delay={200}>` block). New copy verbatim: "specrails is an agentic software development system. You write a spec — what to build and why. A team of AI agents designs, builds, reviews, and ships the PR." Remove the `<span className="text-brand-cyan">14 specialized agents</span>` span entirely.
3. Remove the prerequisite pill entirely — the full `<Reveal delay={250}>` block containing the Terminal icon and "Bring one CLI" text.
4. Update the CTA block (`<Reveal delay={300}>`):
   - Keep the Download `<a>` element exactly as-is (useReleaseManifest behavior, aria-label, disabled state, downloadHref logic).
   - Replace the existing secondary `<a href="#hub">See how it works</a>` with an npx copy row AND a tertiary scroll link:
     - npx row: a `<div>` (not a button, not an `<a>`) with `inline-flex items-center gap-2 rounded-pill border border-border/70 bg-surface-2/60 pl-4 pr-1.5 py-2.5 font-mono text-xs text-foreground/80`. Inside: a `<code>` with text `npx specrails-core@latest init` and a `<CopyButton value="npx specrails-core@latest init" label="Copy CLI command" />`. Import `CopyButton` from `@/components/CopyButton`.
     - Tertiary link: `<a href="#pipeline" className="text-xs text-muted-foreground hover:text-foreground transition-colors">See how it works ↓</a>` placed below the CTA row (outside the flex row, as its own `<Reveal>` or inside the same block after the flex).
5. Update `DemoVideo` props: change `placeholderText="See it in action"` to `placeholderText="Watch one spec go from idea to a shipped pull request — press play."`. Keep all other props (`label`, `poster`, `srcBase`, `ready={false}`, `glow`, `aspectRatio`) unchanged.
6. Remove the `ArrowRight` import if it is no longer used after removing the secondary CTA anchor.

**Dependencies:** None (first task).

**Acceptance criteria:**
- `section#hero` renders.
- `<h1>` contains "Describe it." and "A team of agents ships it." — no mention of "14 specialized agents" or "Put your specs on rails".
- No element contains text matching `/bring one cli/i` or `/14 specialized agents/i`.
- Download CTA `<a>` has aria-label matching `/download specrails-desktop for/i`.
- An element contains text `npx specrails-core@latest init` within the hero section.
- An `<a href="#pipeline">` exists with text matching `/see how it works/i`.
- DemoVideo placeholder text matches the new caption.
- `npm run lint` passes on this file.
- `npx tsc --noEmit` passes.

---

## Task 2 — PipelineSection rewrite as "How it works" [frontend] [done]

**File:** `src/components/PipelineSection.tsx`

**What to do:**
1. Change the eyebrow from "Powered by specrails-core" to "How it works".
2. Change the H2 from "One spec, riding the rails" to "It starts with a spec, not a prompt."
3. Replace the subhead `<p>` (currently: "The /specrails:implement command sends...") with a two-part spec explainer block:

   **Part A — spec explainer paragraph:**
   ```
   A spec is the unit of work — and the source of truth. It says what to build,
   why it matters to a real user, and how you'll know it's done. You write it
   before any code. A prompt is a wish; a spec is a contract the work has to honor.
   ```

   **Part B — 4-bullet "why specs matter" list:**
   - What to build, in plain words.
   - Why it matters to a real user.
   - Acceptance criteria, written before code.
   - One source of truth the team shares.

   Use a `<ul>` with `<li>` items, styled with `text-sm text-muted-foreground` and a small bullet or `→` prefix. Keep within `max-w-2xl mx-auto` for readability.

4. Add a transition sentence after the spec bullets, before the station track: "You write the contract. Then a team shows up to honor it." Style as `mt-6 text-sm font-medium text-foreground text-center`.

5. Add an agents framing block above the station track (between the transition sentence and `<Reveal delay={100}>`):
   ```
   The spec is the star. The agents are the crew that executes it — each with one job.
   You don't manage them; you approve the spec.
   ```
   Followed by a 4-bullet agents points list:
   - A product manager pressure-tests the value.
   - An architect plans it; developers build it.
   - Reviewers and a security scan guard the merge.
   - Out comes a PR — reviewed, not guessed.

   Style as `mt-4 max-w-2xl mx-auto text-sm text-muted-foreground text-center` for the intro. Bullets same style as spec bullets above.

6. Add a CTA after the agents framing, before the station diagram Reveal: a `<Link to="/core">` using a Button variant or a simple inline link. Text: "Get started with specrails-core →". Style: `inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan hover:text-brand-violet transition-colors`. Add `import { Link } from "react-router-dom"` if not already present.

7. Leave the HorizontalTrack, VerticalTrack, StationNode, StationCopy, and the `stations` array completely unchanged. The 5-station diagram is the evidence that follows the framing.

8. Keep the bottom link "Watch the same pipeline run for real → #demo" unchanged.

**Dependencies:** Task 1 (hero sets the `#pipeline` anchor target which this section provides).

**Acceptance criteria:**
- `section#pipeline` renders with eyebrow "How it works".
- H2 contains "It starts with a spec, not a prompt."
- "A prompt is a wish; a spec is a contract" appears in the section.
- 4 spec bullets render in order.
- "You write the contract. Then a team shows up to honor it." appears.
- 4 agents bullets render.
- A Link to `/core` is present.
- The 5-station track still renders (Idea, Architecture, Implementation, Review, PR).
- `npm run lint` and `npx tsc --noEmit` pass.

---

## Task 3 — DemoSection rewrite as "Demo proof" [frontend] [done]

**File:** `src/components/DemoSection.tsx`

**What to do:**
1. Change the eyebrow from "The CLI track" to "Demo proof".
2. Change the H2 from "One command. Three features. Shipped on rails." to "Describe it. Watch it ship."
3. Update the subhead `<p>`: prepend the brief's tie-in before the existing description. New copy: "One spec, idea → reviewed PR, in a single run. A real /specrails:implement run inside Claude Code — architect, developer and reviewer agents moving three GitHub issues down the pipeline in parallel, all the way to an open PR."
4. Update the caption at the bottom: change "Idea → Architecture → Implementation → Review → PR · every feature on its own rail, merged in order." to "Describe it. Watch it ship. — one spec, idea → reviewed PR, in a single run. Stations 1:1 with the pipeline above."

**No changes** to the terminal animation, COMMAND constant, buildLines(), CHAR_DELAY, LINE_PAUSE, Replay/Skip controls, ProductFrame, IntersectionObserver logic, or mobile/desktop transcript rendering.

**Dependencies:** Task 2 (pipeline establishes the "spec-first" narrative that this section reinforces).

**Acceptance criteria:**
- `section#demo` renders with eyebrow "Demo proof".
- H2 contains "Describe it. Watch it ship."
- "One spec, idea → reviewed PR" appears in the section.
- Terminal animation still starts and renders lines.
- `npm run lint` and `npx tsc --noEmit` pass.

---

## Task 4 — ProblemSection rewrite as "Why specrails" [frontend] [done]

**File:** `src/components/ProblemSection.tsx`

**What to do:**
1. Change the eyebrow from "The problem" to "Why specrails".
2. Change the H2 from "Raw AI coding is powerful. Without rails, it's chaos." to "Raw AI guesses. specrails commits."
3. Replace the left-column content (the `pains.map()` ledger and its preceding `<p>` paragraph) with:

   **Frame paragraph:** "You already have the AI — Claude, Codex, or Gemini. This is the team around it. Used raw, it's one prompt and one agent, guessing. specrails turns that same model into a disciplined team."
   Style: `mt-5 text-muted-foreground leading-relaxed`.

   **2-column comparison block:** A `<div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">` with two labeled columns. Left column heading: "Raw CLI" (small mono text, `text-accent-danger/80`). Right column heading: "specrails" (small mono text, `text-brand-cyan`). Then 4 row pairs:
   - Row 1: "One prompt — it guesses what you meant." | "One spec — the intent is written down."
   - Row 2: "One agent doing everything alone." | "A team of agents, each with a job."
   - Row 3: "Edits straight into main." | "Each spec on its own rail — parallel, no collisions."
   - Row 4: "Hope it's right." | "Know it's right."

   Each cell: `<p className="text-muted-foreground">` for Raw CLI side, `<p className="text-foreground">` for specrails side.

   **Model-agnostic line:** Below the grid, `<p className="mt-6 text-sm text-muted-foreground">Works with <span className="text-foreground">Claude, Codex, and Gemini</span> — bring your own API key. You own the rails, not the vendor.</p>`

   **Closing line:** `<p className="mt-3 text-sm font-medium text-foreground">Same models. A system around them that turns vibes into certainty.</p>`

   **CTA:** Add a Download Link below the closing line. Use `<Link to="/download">` (React Router, import from react-router-dom). Use the existing `Button` shadcn/ui component: `<Button asChild variant="cyan"><Link to="/download">Download specrails <ArrowRight className="h-4 w-4" /></Link></Button>`. Import `ArrowRight` from lucide-react, `Button` from `@/components/ui/button`, `Link` from react-router-dom.

4. Remove the `pains` array constant, the `PAIN_DELAY` constant, and the `RailLane` component (it is only used in the visual right column, which stays). Wait — `RailLane` is used in the AFTER visual (the right column). Keep `RailLane`. Remove only `pains`, `PAIN_DELAY`.
5. Remove unused icon imports: `Compass`, `GitMerge`, `ShieldAlert`. Keep `ArrowRight`, `ShieldX`, `CheckCircle2` (used in the right visual column).
6. Keep the right column visual entirely intact — the "Without rails / On rails" SVG and RailLane board is the perfect visual complement to the new 2-column text comparison.

**Dependencies:** Task 3.

**Acceptance criteria:**
- `section#problem` renders with eyebrow "Why specrails".
- H2 contains "Raw AI guesses. specrails commits."
- "Claude, Codex, and Gemini" appears in the section.
- "bring your own API key" appears.
- "Same models." appears.
- The 2-column comparison grid renders with "Raw CLI" and "specrails" headings.
- The right column visual (RailLane board) still renders.
- A Link to `/download` exists in the section.
- No `Compass`, `GitMerge`, `ShieldAlert` imports remain.
- `npm run lint` and `npx tsc --noEmit` pass.

---

## Task 5 — ProductsSection extend to 3 layers [frontend] [done]

**File:** `src/components/ProductsSection.tsx`

**What to do:**
1. Change the eyebrow from "Core + Hub" to "The ecosystem".
2. Change the H2 from "One pipeline. Two ways to ride it." to "Three ways to ride the rails."
3. Replace the framing `<p>` with: "Now that you get the idea, here's how to use it — start with one command in your terminal, add a cockpit when you want to watch, reach for your phone when you step away."

4. Update `CORE_CAPABILITIES` — remove the `${AGENTS.length} specialized agents` entry (no agent count on landing). Replace with a copy that doesn't enumerate: `{ icon: Cpu, label: "Spec-driven pipeline, idea → PR" }`. Keep the other two capabilities unchanged.

5. Change Core card CTA: currently `<Link to="/core">Explore specrails-core</Link>`. Change button text to "Get the CLI" per brief.

6. Change Desktop card CTA: currently `<a href="#hub">See the Hub in action</a>` (an anchor to the deleted #hub section). Replace with `<Link to="/download">Download for desktop<ArrowRight/></Link>` as a Button variant="outline" or "ghost". Keep import of `Link` from react-router-dom (already used elsewhere in the file).

7. Add the **companion card** as a third column:
   - Import `Smartphone` from lucide-react.
   - Add `COMPANION_CAPABILITIES` constant:
     ```ts
     const COMPANION_CAPABILITIES = [
       { icon: Smartphone, label: "Control your desktop pipeline from your phone" },
       { icon: ShieldCheck, label: "Pairs peer-to-peer over WebRTC (DTLS)" },
       { icon: ShieldCheck, label: "Zero-knowledge mailbox — never sees your data" },
     ] as const;
     ```
     Note: reuse `ShieldCheck` (already imported). Import `Smartphone`.
   - The companion card JSX mirrors the structure of the desktop card. Inside the `ProductFrame`: a short prose block instead of a full rails UI mockup. Content:
     ```
     Control your desktop pipeline from your phone.
     Pairs to specrails-desktop peer-to-peer over WebRTC (DTLS).
     A zero-knowledge mailbox relays only the ~5-second handshake.
     Your data never leaves your devices.
     ```
   - Companion card CTA: `<a href="https://specrails.dev/companion-app" target="_blank" rel="noopener noreferrer">Open the companion <ExternalLink/></a>`. Import `ExternalLink` from lucide-react. Use Button variant consistent with other CTAs in the section.
   - Companion footnote: `<p className="mt-3 font-mono text-xs text-rail">for: anyone who walks away from the desk but not the work.</p>`

8. Add a second `<RailConnector>` between desktop and companion columns.

9. Update the grid layout:
   - Change `lg:grid-cols-[1fr_auto_1fr]` to `lg:grid-cols-[1fr_auto_1fr_auto_1fr]`.
   - On mobile, all 5 elements stack vertically (already handled by the single-column default).
   - The `Reveal` delay sequence: 100ms (core), 200ms (connector1), 300ms (desktop), 400ms (connector2), 500ms (companion).

10. Remove the "Complementary" bottom section (the `<Reveal delay={200} className="mt-14 ...">` paragraph "They are complementary: Core does the work..."). Replace with nothing, or a minimal closing: `<Reveal delay={300} className="mt-10 text-center"><p className="text-xs font-mono text-muted-foreground">Start anywhere. All three share the same spec.</p></Reveal>`.

11. Remove the `AGENTS` import if `${AGENTS.length}` is no longer used. Check: after CORE_CAPABILITIES update, `AGENTS` is unused. Remove the import.

**Dependencies:** Task 4.

**Acceptance criteria:**
- `section#products` renders with eyebrow "The ecosystem".
- H2 contains "Three ways to ride the rails."
- Three product cards render: specrails-core, specrails-desktop, specrails-companion.
- "Open the companion" CTA links to `https://specrails.dev/companion-app`.
- "WebRTC (DTLS)" appears in the section.
- "never sees your data" (or equivalent) appears.
- No `${AGENTS.length}` or numeric agent count in the section text.
- Core CTA links to `/core`. Desktop CTA links to `/download`.
- `AGENTS` import is removed.
- `npm run lint` and `npx tsc --noEmit` pass.

---

## Task 6 — FooterSection desire hook + closing CTA [frontend] [done]

**File:** `src/components/FooterSection.tsx`

**What to do:**
1. Replace the brand pitch `<p>` in the `BrandLockup`/brand-column section. Current text: "Put your specs on rails. A local-first, spec-driven pipeline of 14 AI agents that turns an idea into a reviewed pull request — open source and MIT licensed." New text (brief's desire hook): "Stop re-prompting an agent that keeps guessing. Describe a feature in a sentence and watch a real team design it, build it, and hand you a clean, reviewed PR — while you do something else."
2. Add a sticky CTA / closing line above the install pill: `<p className="text-xl font-bold text-foreground">Describe it. Watch it ship.</p>`. Place this between the `<BrandLockup />` component and the desire hook paragraph.
3. Keep the install command pill unchanged.
4. Keep the footer link columns unchanged (including "The 14 agents" nav label — it's navigation, not a narrative claim).
5. Keep the bottom bar unchanged (copyright, Ko-fi, GitHub links).

**Dependencies:** Task 5.

**Acceptance criteria:**
- Footer contains "Stop re-prompting an agent that keeps guessing."
- Footer contains "Describe it. Watch it ship." as a prominent heading-level element.
- Install command pill (`npx specrails-core@latest init`) still renders.
- Bottom bar renders with copyright, Ko-fi, and GitHub links.
- No "14 AI agents" in the footer brand column text.
- `npm run lint` and `npx tsc --noEmit` pass.

---

## Task 7 — Index.tsx: section order, demotions, SECTION_IDS [frontend] [done]

**File:** `src/pages/Index.tsx`

**What to do:**
1. Remove the following imports entirely:
   - `import AgentsSection from "@/components/AgentsSection"`
   - `import HubShowcaseSection from "@/components/HubShowcaseSection"` (or `HubSection` per git status — remove whichever resolves)
   - `import FeaturesSection from "@/components/FeaturesSection"`
   - `import CommandsSection from "@/components/CommandsSection"`
   - `import ApiMcpSection from "@/components/ApiMcpSection"`
   - `import PrinciplesSection from "@/components/PrinciplesSection"`

2. Remove the corresponding JSX elements from `<main>`:
   - `<AgentsSection />`
   - `<HubShowcaseSection />` (or `<HubSection />`)
   - `<FeaturesSection />`
   - `<CommandsSection />`
   - `<ApiMcpSection />`
   - `<PrinciplesSection />`

3. Reorder the remaining JSX in `<main>` to match the 6-block narrative:
   ```tsx
   <HeroSection />
   <PipelineSection />
   <DemoSection />
   <ProblemSection />
   <ProductsSection />
   ```
   (FooterSection is outside `<main>` — keep it there.)

4. Replace `SECTION_IDS` with:
   ```ts
   const SECTION_IDS = [
     "hero",
     "pipeline",
     "demo",
     "problem",
     "products",
     "footer",
   ];
   ```

5. Update the `useSeo()` call:
   - title: `"specrails — Describe it. A team of agents ships it."`
   - description: `"specrails is an agentic software development system. You write a spec — what to build and why. A team of AI agents designs, builds, reviews, and ships the PR. Compatible with Claude, Codex, and Gemini."`

6. Update the `<main>` JSX comment to: `{/* Comprehension → desire → download: hero → how it works → demo proof → why specrails → the ecosystem → footer. */}`

**Dependencies:** Tasks 1–6 (all section content must be updated before Index reorganization, to avoid import errors).

**Acceptance criteria:**
- `SECTION_IDS` has exactly 6 entries: `["hero", "pipeline", "demo", "problem", "products", "footer"]`.
- No imports of AgentsSection, HubShowcaseSection, FeaturesSection, CommandsSection, ApiMcpSection, PrinciplesSection.
- `<main>` contains exactly: HeroSection, PipelineSection, DemoSection, ProblemSection, ProductsSection — in that order.
- FooterSection is rendered outside `<main>`.
- `useSeo` title contains "Describe it. A team of agents ships it."
- `npm run lint` and `npx tsc --noEmit` pass.

---

## Task 8 — Test updates [frontend] [done]

**Files:** `src/test/HeroSection.test.tsx`, `src/test/Index.test.tsx`, `src/test/ProductsSection.test.tsx` (if applicable)

**What to do in HeroSection.test.tsx:**
1. Update the H1 assertion (line ~96–98):
   ```ts
   expect(heading).toHaveTextContent(/describe it\. a team of agents ships it\./i);
   ```
   Remove the `expect(heading).toHaveTextContent(/from idea to shipped pr/i)` assertion.
2. Remove the assertion on "14 specialized agents" (the `getByText(/14 specialized agents/i)` call — currently in the "subhead" test, line ~103).
3. Update the subhead test to check for the new agentic framing: `expect(screen.getByText(/agentic software development system/i)).toBeInTheDocument()`.
4. Update the "See how it works" test:
   ```ts
   expect(demoCta).toHaveAttribute("href", "#pipeline");
   ```
   (was `"#hub"`)
5. Add a test for the npx CTA being visible in the hero:
   ```ts
   it("renders the npx CLI command in the hero", () => {
     renderHero();
     expect(screen.getByText(/npx specrails-core@latest init/i)).toBeInTheDocument();
   });
   ```

**What to do in Index.test.tsx:**
- Read through the test. The current tests do not assert on SECTION_IDS content — they only verify SectionNav up/down buttons render. No changes required unless a test explicitly checks for removed section IDs or the old SEO title string.

**What to do in ProductsSection.test.tsx (check only):**
- Read `src/test/ProductsSection.test.tsx`. If it asserts on "14 specialized agents" text, update the assertion to reflect the new CORE_CAPABILITIES copy. If it asserts on "Explore specrails-core", update to "Get the CLI". If it asserts on the "See the Hub in action" CTA, update to "Download for desktop".

**What to do if SectionVisibility.test.tsx or App.test.tsx reference removed sections:**
- Grep for `AgentsSection`, `FeaturesSection`, `CommandsSection`, `PrinciplesSection`, `ApiMcpSection` in `src/test/`. Remove or update any assertions that reference these components or their section IDs.

**Dependencies:** Task 7 (Index.tsx must be finalized before running tests to avoid import errors).

**Acceptance criteria:**
- `npm test` passes with 0 failures.
- No test asserts on "14 specialized agents" or "Put your specs on rails" in the context of the landing H1.
- HeroSection tests assert on "Describe it. A team of agents ships it."
- HeroSection test for "See how it works" asserts `href="#pipeline"`.
- HeroSection test verifies npx command is present in the hero.

---

## Task 9 — Verification gate [frontend] [done]

**What to do:**
Run the full verification suite in order. Fix any failure before proceeding to the next command.

```bash
npm run lint          # must exit 0
npx tsc --noEmit      # must exit 0
npm test              # must pass all tests (0 failures)
npm run build         # must produce a dist/ with no errors
```

For each failure:
- Lint errors: fix the reported file/line.
- Type errors: fix the reported type mismatch (usually an unused import or missing prop).
- Test failures: fix the assertion or the source code (prefer fixing the source; only change tests if the test is asserting on old copy that the brief explicitly replaces).
- Build errors: fix the Vite/SWC error.

**Dependencies:** Task 8 (all code and tests must be updated).

**Acceptance criteria:**
- `npm run lint` exits 0.
- `npx tsc --noEmit` exits 0.
- `npm test` exits 0 with all tests passing.
- `npm run build` exits 0 and produces a `dist/` directory.
- No new ESLint warnings introduced (pre-existing warnings acceptable, per `update-web-for-codex-support` precedent of "10 pre-existing warnings").
