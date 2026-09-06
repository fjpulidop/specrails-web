<!-- guide-revision: mission-first-v1 -->

# Understand the agent roles

Roles make an implementation easier to inspect: planning, development and review have different responsibilities even when the same provider runs them.

## Follow the handoffs

The architect turns the agreed scope into a concrete design and tasks. The developer changes the selected repositories and verifies the result. The reviewer checks the implementation against the spec, actual source and verification evidence.

The mission agent coordinates the surrounding workflow: it can inspect the project, create specs, launch loops and present delivery actions. Its conversation is not the same as the execution's internal role sessions.

## Inspect evidence, not labels

A “reviewer” label does not prove that review happened. Look for the recorded phase, checks and findings. Retry should resume the appropriate incomplete work with bounded context, rather than pretend to resume a provider session that no longer exists.

Installed Core workflows and provider capabilities determine how roles are dispatched. Read [provider settings](/docs/pipeline-picking-an-engine-per-rail) before assuming all adapters use identical subagents.
