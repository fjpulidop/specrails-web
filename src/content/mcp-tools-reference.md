# specrails-mcp Tools Reference

This page documents the MCP tools exposed by specrails-mcp. Each tool is callable by any MCP-compatible client connected to the specrails-mcp server.

---

## doctor

Validates the health of the connected specrails-core project.

**Purpose:** Run this first when debugging connection or configuration issues. It checks that the project structure is intact and that specrails-mcp can reach all expected files and directories.

**Parameters:** None

**Example response:**

```json
{
  "status": "ok",
  "checks": [
    { "name": "SPECRAILS_ROOT exists", "passed": true },
    { "name": "openspec/specs/ found", "passed": true },
    { "name": "CLAUDE.md found", "passed": true },
    { "name": "personas/ found", "passed": true }
  ]
}
```

**Failure example:**

```json
{
  "status": "error",
  "checks": [
    { "name": "SPECRAILS_ROOT exists", "passed": false, "error": "Directory not found: /path/to/project" }
  ]
}
```

**When to use:** After initial setup, or when resources are returning empty results.

---

## score-feature

Scores a proposed feature against your project's VPC (Value Proposition Canvas) personas.

**Purpose:** Before spending engineering time on a feature, run it through your defined personas to understand whether it creates value for the right users. The score reflects persona-weighted fit across jobs-to-be-done, pains, and gains.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `feature` | string | Yes | A short description of the proposed feature (1–3 sentences) |

**Example call:**

```json
{
  "feature": "Add a one-click deploy button that pushes the current branch to a staging environment"
}
```

**Example response:**

```json
{
  "score": 0.82,
  "breakdown": [
    {
      "persona": "Indie Hacker",
      "score": 0.91,
      "rationale": "Reduces deployment friction — a top pain for solo developers moving fast"
    },
    {
      "persona": "OSS Maintainer",
      "score": 0.73,
      "rationale": "Useful for previewing PRs, but maintainers often have existing CI pipelines"
    }
  ],
  "recommendation": "Build — strong fit with primary persona pain points"
}
```

**When to use:** During product discovery, before writing an OpenSpec change, or when evaluating competing feature requests.

---

## query-failures

Analyzes failure patterns from agent memory to surface recurring problems.

**Purpose:** As agents run, they write memory entries when things go wrong. `query-failures` aggregates those entries and finds patterns — repeated errors, consistently failing tasks, agents that get stuck in the same way. Use this to drive improvements to prompts, CLAUDE.md conventions, or project structure.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Maximum number of failure entries to analyze (default: 50) |
| `agent` | string | No | Filter by agent name (e.g., `"developer"`, `"reviewer"`) |
| `since` | string | No | ISO 8601 date string — only include failures after this date |

**Example call:**

```json
{
  "agent": "developer",
  "since": "2025-01-01T00:00:00Z"
}
```

**Example response:**

```json
{
  "totalFailures": 12,
  "patterns": [
    {
      "pattern": "TypeScript type errors in generated code",
      "count": 5,
      "recommendation": "Add explicit type annotations to CLAUDE.md conventions"
    },
    {
      "pattern": "Missing test coverage for new components",
      "count": 4,
      "recommendation": "Strengthen test requirements in reviewer agent prompt"
    }
  ],
  "entries": [...]
}
```

**When to use:** During retrospectives, when you notice repeated CI failures, or when onboarding a new agent persona to the project.

---

## Available resources (reference)

In addition to tools, specrails-mcp exposes the following resources. Resources are read-only and browseable from any MCP client.

| Resource URI | Description |
|---|---|
| `specrails://specs` | All OpenSpec specs in `openspec/specs/` |
| `specrails://changes` | OpenSpec change history from `openspec/changes/` |
| `specrails://personas` | VPC persona files from `personas/` |
| `specrails://config` | Project config: `CLAUDE.md`, `openspec/config.yaml` |
| `specrails://memory` | Agent memory entries |
| `specrails://skills` | Provider-agnostic SKILL.md files |
| `specrails://provider-info` | Detected AI provider (Claude Code, Codex, etc.) |

---

## Next steps

| What to do | Where to go |
|---|---|
| Initial setup | [Getting Started](mcp-getting-started) |
| Overview of the MCP server | [Overview](mcp-overview) |
| specrails-core project concepts | [Core Concepts](concepts) |
