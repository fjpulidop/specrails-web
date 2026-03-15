# Proposal: Agent Skills & Model Comparison Matrix

**Issue:** #13
**Status:** proposed
**Date:** 2026-03-15

## Problem

The current AgentsSection on the landing page presents all 11 agents as static cards. A visitor evaluating specrails can read each card in isolation, but cannot efficiently compare agents by model tier, pipeline stage, or job category. There is no way to ask "which agents run during implementation?" or "which agents use Opus?" without reading every card individually.

This friction delays the "aha moment" for Solo Shippers — the primary target persona — who need to quickly validate that specrails has an agent that solves their specific bottleneck.

## Proposed Solution

Add a dedicated `/agents` route that renders an interactive comparison matrix for all 11 agents. The matrix is a filterable, searchable table with columns for the dimensions a Solo Shipper cares about most: Agent Name, Model, Primary Job, Pipeline Stage, Job Category, and a link to the relevant docs page.

The landing page AgentsSection retains its card grid for visual impact. The matrix is a complementary, detail-oriented view linked from the existing section heading and the Navbar Docs dropdown.

## Non-Goals

- This proposal does not replace or redesign the existing `AgentsSection` card grid.
- This proposal does not add new docs content about agents beyond what already exists at `/docs/agents`.
- This proposal does not add backend APIs or server-side filtering.
- This proposal does not cover a full agent profile page per agent.

## Success Criteria

- A visitor landing on `/agents` can filter to see only Sonnet-model agents in under 3 seconds.
- The table is readable on mobile without horizontal overflow cutting off content.
- All 11 agents are present with accurate metadata.
- Zero TypeScript errors, zero ESLint violations.
