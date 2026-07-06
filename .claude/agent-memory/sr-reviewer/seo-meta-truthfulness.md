---
name: seo-meta-truthfulness
description: SEO meta description in Index.tsx useSeo() call can contradict component copy when copy changes — requires cross-checking
metadata:
  type: feedback
---

After narrative copy changes in landing sections, the `useSeo({ description: "..." })` call in `src/pages/Index.tsx` (line ~29) must be updated to match the new messaging.

In the founder revision round on 2026-06-18 the component copy moved from "you write a spec" to "specrails generates the spec from your prompt" — but Index.tsx SEO description still said "You write a spec — what to build and why." This contradicted the truthfulness requirement and was caught by the reviewer pass.

**Why:** The SEO description is a meta string not tested by any unit test, so it drifts silently when component copy changes.

**How to apply:** After any copy change that affects the main value proposition narrative (HeroSection subhead, PipelineSection H2, ProblemSection frame paragraph), grep Index.tsx for the `description:` field of `useSeo()` and verify it is still consistent.
