<!-- guide-revision: mission-first-v1 -->

# Give the agent project-aware tools

Specrails MCP exposes structured tools for project context, specs, rails, loops, deliveries and observation. The mission agent uses them to operate the application with recorded state.

## For agents only: connect your client

When a person asks an agent to connect, read the [dedicated MCP connection runbook](https://specrails.dev/for-agents/mcp.md). It covers Claude Code, Codex CLI and desktop, Kimi Code and Gemini CLI: locate the bundled bridge, preserve existing configuration, verify the real connection and diagnose failures. The web version is plain Markdown and needs no JavaScript.

Keep Specrails running and open **Settings ▸ MCP ▸ Copy client config**. Some versions return only `specrails-mcp`, which may not be on PATH; the runbook explains how to locate the actual executable and script. The bridge reads the token locally, so no token belongs in client configuration. Registration alone is not proof of connection: complete `initialize`, `tools/list`, and a read-only `specrails_projects` call with `{"action":"list"}`.

## Keep references scoped

A logical project owns its backlog. Repository identifiers select individual code roots, while a spec or coordinated execution can name several repositories. The same file path in two repositories is not the same reference.

Prefer the coordinated rails and loops tools for multi-repository implementation. Legacy direct job spawning remains limited to the primary repository and requires explicit selection in a multi-repository project; it is not a shortcut for changing an arbitrary secondary repository.

## Inspect the tool result

Tool availability is not proof that an action succeeded. Read structured errors and returned identifiers. Use the current project inventory rather than guessing an ID, path or loop capability from an old conversation.

The active mission connection can deliver explicitly promoted [steering messages](/docs/missions-steering-and-receipts) at safe tool boundaries when native delivery is unavailable. That does not interrupt an operation already in flight.
