# What is a Spec?

A **Spec** is the unit of work in specrails — and the single source of truth the entire agent pipeline builds from. Understanding what a Spec is (and why it exists) is the fastest way to understand why specrails works the way it does.

---

## The problem with raw prompting

You open Claude Code and type:

> "Add a user profile page with an avatar, display name, and email."

Claude writes something. Maybe it's good. Maybe it misses the point entirely because it guessed at the details you left out. You iterate. You re-prompt. An hour later you have code — but it may not match what you actually needed, and there are no tests to prove it.

**Raw prompting is a wish.** You hope the model infers the right requirements, the right scope, the right success bar.

---

## What a Spec captures

A Spec turns a wish into a contract. It records three things:

1. **What to build** — a clear, bounded description of the feature or change.
2. **Why it matters to a real user** — the problem being solved, who has it, and what value they get. This keeps agents grounded in product intent rather than technical speculation.
3. **Acceptance criteria** — concrete, testable conditions that must be true for the work to be considered done.

> **A prompt is a wish. A Spec is a contract.**

---

## You generate Specs, not hand-write them

You never sit down and author a Spec from scratch. You describe your idea in plain language, and specrails generates the Spec for you. Three modes:

| Mode | When to use |
|------|-------------|
| **Quick** (`/specrails:auto-propose-backlog-specs`) | Turn a rough idea into a scored, ready-to-implement Spec automatically |
| **Interactive** (`/specrails:get-backlog-specs`) | Guided conversation — specrails asks clarifying questions and builds the Spec with you |
| **Raw** | Paste or edit a Spec file directly if you prefer full control |

The Quick and Interactive flows are powered by the **Product Manager agent**, which knows how to ask the right questions, write acceptance criteria that are actually testable, and score business value so you can prioritise a backlog.

### Example Spec

```json
{
  "id": "spec-0042",
  "title": "User profile page",
  "user_story": "As a logged-in user, I want a profile page showing my avatar, display name, and email so that I can confirm my account details at a glance.",
  "acceptance_criteria": [
    "Visiting /profile renders the user's avatar, display name, and email",
    "Avatar falls back to initials when no image is set",
    "Updating the display name saves immediately without a page reload",
    "All three fields are visible on mobile (375 px viewport)"
  ],
  "priority": "high",
  "effort": "M"
}
```

That JSON lives in your repo (under `.specrails/tickets/`). Every agent — and every team member — can read it. Nothing lives only in someone's head.

---

## Spec-Driven Development (SDD)

Once a Spec exists, you run the pipeline:

```
/specrails:implement
```

The Spec becomes the single source of truth that flows through every phase:

```
Product Manager  →  reviews scope, enriches acceptance criteria
Architect        →  designs the solution from the Spec, not from guesswork
Developers       →  implement against the Spec's criteria (parallel rails possible)
Layer Reviewers  →  check their layer (frontend / backend / DB) against the Spec
Reviewer         →  final gate — blocks merge if criteria are not met
Security         →  scans for vulnerabilities before the PR ships
```

Because every agent reads the same Spec, there is no telephone game. The Architect doesn't invent requirements. The Reviewer doesn't approve code that drifts from the original intent. The Spec keeps everyone — human and AI — aligned.

---

## Test-Driven Development (TDD) baked in

Acceptance criteria are not just documentation — they become tests.

- The **Developer agents** write tests derived from the acceptance criteria before (or alongside) the implementation.
- The **Reviewer agent** runs those tests and checks coverage. If the criteria are not met, it **blocks the PR** and explains why.
- The **Security agent** runs a vulnerability scan as a second gate.

Nothing merges unless both gates pass. This is TDD without the overhead of writing tests by hand before you know what you're building.

---

## Why this beats one-shot prompting

| One-shot prompt | Spec + pipeline |
|-----------------|-----------------|
| Model guesses at requirements | Requirements are explicit and agreed up front |
| Single agent does everything | Specialists handle what they're best at |
| No review — output is the output | Reviewer + Security gate can block before merge |
| Hard to run in parallel | Multiple features run on parallel git branches simultaneously |
| No record of intent | Spec persists — future agents and teammates can read why a decision was made |

The Spec adds a minute of upfront clarity and saves hours of back-and-forth later.

---

## Next steps

- [Install specrails-core](/docs/installation) — get the pipeline into your repo
- [Install Specrails (Desktop)](/docs/hub-installation) — manage Specs visually on a board
- [Core Concepts](/docs/concepts) — the full pipeline and agent roles explained
- [Desktop Features](/docs/hub-features) — Specs board, Rails, Jobs, and Analytics
