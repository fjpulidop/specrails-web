# Proposal: The specrails Playbook

## What

Add a `/playbook` section to specrails.dev — a curated best-practices guide for OSS maintainers who want to get the most out of specrails in a real project. The Playbook lives under `/docs` using existing infrastructure, starting with three core guides:

1. **Product Discovery** — how to write specs that yield good implementations
2. **Parallel Development** — using `sr:batch-implement` and worktrees without creating merge hell
3. **OSS Maintainer Workflow** — setting up review gates, convention enforcement, and confidence thresholds so you can merge AI-generated PRs with confidence

Two additional guides are planned for Phase 2:

4. **Design System Integration** — making specrails respect your existing UI/component library
5. **Customization Deep Dives** — writing effective agent personas, layer rules, and failure records

## Why

The existing docs explain what specrails does. The Playbook explains how to use it well. These are different documents for different moments in the user journey: the docs are reference material; the Playbook is applied wisdom accumulated from real usage patterns.

The primary audience is the OSS Maintainer persona — someone running a real project who wants to reduce review burden without sacrificing code quality. They don't need more "how it works" content; they need "here's what we do in practice."

## Non-goals

- This is not a tutorial (getting-started.md covers that)
- This is not agent reference material (agents.md covers that)
- Phase 1 does not include interactive examples, embedded terminals, or video content
- No new routing infrastructure — Playbook pages use the existing `/docs/:slug` system

## Success criteria

- Playbook accessible at `/docs/playbook-product-discovery`, `/docs/playbook-parallel-dev`, `/docs/playbook-oss-maintainer`
- All three pages appear in the docs sidebar under a "Playbook" section header
- All three pages appear in the DocsDropdown
- Content is accurate to how specrails actually works (pipeline phases, agent names, commands, config keys)
- Pages pass mobile layout check and match Dracula typography

## GitHub Issue

Closes #8
