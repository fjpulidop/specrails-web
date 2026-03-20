## Context

specrails.dev is a static React 18 SPA (no backend). Email capture requires a third-party form service. The existing design system uses Dracula theme tokens and shadcn/ui primitives. The landing page already has `InstallSection`, `RoadmapSection`, and `FooterSection` as reference patterns.

## Goals / Non-Goals

**Goals:**
- Capture email addresses before public launch
- Mobile-first layout that looks native to the Dracula design system
- Clear success feedback on submission
- No backend deployment required

**Non-Goals:**
- Email verification or double opt-in flow
- GDPR consent checkbox (deferred — owner must configure before launch)
- Analytics integration on form submission events

## Decisions

### 1. Form service: Formspree

**Choice:** Formspree via a plain `fetch` POST to `https://formspree.io/f/<id>`.

**Rationale:** Zero infrastructure, works from a static SPA, free tier covers early-stage volumes. The endpoint ID is left as `REPLACE_ME` — the project owner must create a Formspree form and set the real ID before deploying.

**Alternatives considered:**
- EmailOctopus / ConvertKit — heavier integration, require API keys in frontend (not ideal)
- Netlify Forms — couples hosting to Netlify; we deploy to Hostinger FTP
- Self-hosted — contradicts the no-backend constraint

### 2. Component placement

**Choice:** Between `RoadmapSection` and `FooterSection`.

**Rationale:** After the user has seen the full value proposition and roadmap, they are primed to sign up. Placing the CTA at the bottom of the content (but before the footer) is the canonical "last stop" pattern.

### 3. State management: local component state

**Choice:** `useState` for `email`, `status` (`idle | submitting | success | error`).

**Rationale:** No global state needed; the form is self-contained.

### 4. Styling: Dracula tokens + shadcn/ui

Use `Button` and `Input` from shadcn/ui; wrap in a `section` with `section-darker` background class (matches `FooterSection` pattern). Gradient headline uses `gradient-text` utility class already defined.

## Risks / Trade-offs

- **Formspree free tier limits (100 submissions/month)** → Mitigation: acceptable pre-launch; owner upgrades plan when needed
- **`REPLACE_ME` placeholder ships to production** → Mitigation: document clearly in component and README; form will silently fail until configured (no crash)
- **No GDPR/consent copy** → Mitigation: owner must add before EU traffic reaches the page; marked as a TODO comment in the component

## Open Questions

- Should the error state show a retry button or a mailto fallback? (Defaulting to inline error message + retry for now)
