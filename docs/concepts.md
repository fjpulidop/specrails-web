# Core Concepts

Before diving into commands and agents, it helps to understand the ideas behind SpecRails.

## The pipeline

SpecRails organizes development as a **linear pipeline** where each phase produces artifacts for the next:

```
Discovery → Architecture → Implementation → Quality → Ship
```

| Phase | Agent | Input | Output |
|-------|-------|-------|--------|
| Discovery | Product Manager | User personas, market research | Feature ideas with VPC scores |
| Architecture | Architect | Feature spec | Design doc + task breakdown |
| Implementation | Developer(s) | Tasks + conventions | Production code |
| Quality | Test Writer → Doc Sync → Security → Reviewer | Code changes | Tests, docs, security report, CI pass |
| Ship | Reviewer | Verified code | Pull Request |

Each phase has a **dedicated agent** with a narrow scope. Agents don't step on each other — the architect never writes code, the developer never runs CI, the reviewer never designs architecture.

## Product-driven development

Most AI coding tools start from code. SpecRails starts from **users**.

### Value Proposition Canvas (VPC)

Every feature is evaluated against user personas using the [Value Proposition Canvas](https://www.strategyzer.com/library/the-value-proposition-canvas) framework:

```
┌─────────────────────────────────┐
│        Customer Segment         │
│  ┌─────────┬────────┬────────┐  │
│  │  Jobs   │ Pains  │ Gains  │  │
│  └─────────┴────────┴────────┘  │
└─────────────────────────────────┘
                 ↕ fit
┌─────────────────────────────────┐
│       Value Proposition         │
│  ┌─────────┬────────┬────────┐  │
│  │Products │ Pain   │ Gain   │  │
│  │& Svc    │Relievers│Creators│  │
│  └─────────┴────────┴────────┘  │
└─────────────────────────────────┘
```

- **Customer Jobs** — what your users need to accomplish (functional, social, emotional)
- **Pains** — frustrations, risks, and obstacles they face
- **Gains** — outcomes and benefits they desire

Each persona scores features 0–5 on how well they address their needs. Features with high scores across multiple personas get prioritized.

### Personas

During setup, SpecRails generates **user personas** based on competitive research. Each persona has a complete VPC profile. When the Product Manager proposes features, they're evaluated against these personas — not gut feelings.

See [Customization → Personas](customization.md#personas) for how to edit and add personas.

## Agents, not prompts

SpecRails doesn't use generic prompts. It uses **specialized agents** — each with:

- A **narrow role** (architect designs, developer codes, reviewer validates)
- A **persistent memory** that grows across sessions
- **Layer-aware conventions** loaded per file path
- A specific **AI model** matched to the task complexity

This specialization means each agent is optimized for its job. The architect thinks in terms of systems and trade-offs. The developer thinks in terms of implementation patterns. The reviewer thinks in terms of CI pipelines and edge cases.

See [Agents](agents.md) for the full roster.

## OpenSpec

SpecRails uses [OpenSpec](https://openspec.dev) as its specification system. OpenSpec provides a structured way to go from idea to implementation:

```
Spec (source of truth)
  └── Change
        ├── Proposal     — what and why
        ├── Design       — how (technical approach)
        ├── Tasks        — ordered implementation steps
        ├── Context Bundle — files the developer needs
        └── Delta Spec   — spec updates after implementation
```

The architect reads specs before designing. The developer reads the design before coding. After shipping, the change is archived and the spec is updated.

This creates a **paper trail** from product decision to shipped code.

## Layer conventions

Different parts of your codebase have different rules. Your backend might use snake_case while your frontend uses camelCase. Your API layer might require OpenAPI annotations while your tests just need clear naming.

SpecRails detects your **architecture layers** during setup and generates per-layer convention files:

```
.claude/rules/
├── backend.md      # Loaded for backend/**
├── frontend.md     # Loaded for frontend/**
└── shared.md       # Loaded for shared/**
```

Agents automatically load the right conventions based on which files they're modifying. No manual context-switching needed.

## Agent memory

Each agent maintains a **persistent memory** at `.claude/agent-memory/<agent>/MEMORY.md`. This memory survives across sessions, so agents learn from past work:

- The architect remembers architectural decisions and trade-offs
- The developer remembers patterns and gotchas in your codebase
- The reviewer remembers common CI failures and fixes

Memory is automatic — agents write observations as they work and read them in future sessions.

## What's next?

Now that you understand the concepts, meet the agents:

- [Agents](agents.md) — every agent explained in detail
- [Workflows & Commands](workflows.md) — the commands that orchestrate the pipeline

---

[← Getting Started](getting-started.md) · [Agents →](agents.md)
