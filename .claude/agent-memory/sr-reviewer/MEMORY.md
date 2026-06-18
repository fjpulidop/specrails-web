# Agent Memory: sr-reviewer

This file is loaded into context at the start of every session. Keep it under 200 lines.

## Patterns & Fixes
- [common-fixes](./common-fixes.md) — Canvas jsdom noise, react-refresh warning in HeroMesh, computePositions signature discrepancy, IntersectionObserver target requirement
- [seo-meta-truthfulness](./seo-meta-truthfulness.md) — SEO description in Index.tsx useSeo() call can drift from component copy; always cross-check meta description against current subhead/narrative after copy changes
