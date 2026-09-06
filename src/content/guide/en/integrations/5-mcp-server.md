<!-- guide-revision: mission-first-v1 -->

# Give the agent project-aware tools

Specrails MCP exposes structured tools for project context, specs, rails, loops, deliveries and observation. The mission agent uses them to operate the application with recorded state.

## Keep references scoped

A logical project owns its backlog. Repository identifiers select individual code roots, while a spec or coordinated execution can name several repositories. The same file path in two repositories is not the same reference.

Prefer the coordinated rails and loops tools for multi-repository implementation. Legacy direct job spawning remains limited to the primary repository and requires explicit selection in a multi-repository project; it is not a shortcut for changing an arbitrary secondary repository.

## Inspect the tool result

Tool availability is not proof that an action succeeded. Read structured errors and returned identifiers. Use the current project inventory rather than guessing an ID, path or loop capability from an old conversation.

The active mission connection can deliver explicitly promoted [steering messages](/docs/missions-steering-and-receipts) at safe tool boundaries when native delivery is unavailable. That does not interrupt an operation already in flight.
