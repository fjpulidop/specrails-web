<!-- guide-revision: mission-first-v1 -->

# Give the agent project-aware tools

Specrails MCP exposes structured tools for project context, specs, rails, loops, deliveries and observation. The mission agent uses them to operate the application with recorded state.

## For agents only: connect your client

When a person asks an agent to connect, read the [dedicated MCP connection runbook](https://specrails.dev/for-agents/mcp.md). It covers Claude Code and Codex CLI and desktop: locate the bundled bridge, preserve existing configuration, verify the real connection and diagnose failures. The web version is plain Markdown and needs no JavaScript.

Keep Specrails running and open **Settings ▸ MCP ▸ Copy client config**. Some versions return only `specrails-mcp`, which may not be on PATH; the runbook explains how to locate the actual executable and script. The bridge reads the token locally, so no token belongs in client configuration. Registration alone is not proof of connection: complete `initialize`, `tools/list`, and a read-only `specrails_projects` call with `{"action":"list"}`.

## What a connected client can do

An external client such as Claude Code or Codex gets the same project-aware tools. `specrails_status` gives a one-call glance at the whole app: what is running, what needs you, recent failures, today's spend and resource use. `specrails_inbox` reads and answers the Needs you inbox, `specrails_missions` lists, reads and messages missions, `specrails_board` and `specrails_spend` summarize a project's board and spend, and `specrails_jobs` can diagnose a failed job and return the end of its log.

Every tool answers in one shape: a short summary an assistant can relay, the data, the identifiers involved and suggested next calls. Errors carry stable codes such as `not_found`, `invalid_input` or `confirmation_required`. A destructive call from an external client runs only when it is resent with `confirm: true` after you agreed; `dryRun: true` describes what would happen without running it. Every call still needs its permission tier (Read, Write, AI spawn or Destructive) to be enabled in **Settings ▸ MCP**.

## Keep references scoped

A logical project owns its backlog. Repository identifiers select individual code roots, while a spec or coordinated execution can name several repositories. The same file path in two repositories is not the same reference.

Prefer the coordinated rails and loops tools for multi-repository implementation. Legacy direct job spawning remains limited to the primary repository and requires explicit selection in a multi-repository project; it is not a shortcut for changing an arbitrary secondary repository.

## Inspect the tool result

Tool availability is not proof that an action succeeded. Read structured errors and returned identifiers. Use the current project inventory rather than guessing an ID, path or loop capability from an old conversation.

The active mission connection can deliver explicitly promoted [steering messages](/docs/missions-steering-and-receipts) at safe tool boundaries when native delivery is unavailable. That does not interrupt an operation already in flight.
