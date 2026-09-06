<!-- guide-revision: mission-first-v1 -->

# Inspect a run before retrying

The run detail brings together step progress, logs, verification and delivery context. Start here when an implementation stops or a result needs explanation.

## Find the actual boundary

Read the failed step and its error before restarting. Distinguish missing prerequisites, provider quota or authentication, command failures, unmet spec criteria and delivery conflicts. A model's final paragraph is not a substitute for the recorded outcome.

Open the relevant logs and repository diff. Look for commands that actually ran, their exit status and any skipped verification. Cost or token information may be estimated or unavailable depending on the provider.

## Continue the right work

Use the available retry or revision action for that run. Do not launch several identical implementations because a view is slow to reconnect. Check the authoritative status first.

A revision should retain the original frozen spec and delivery context. If you intend a different scope, update the backlog and launch a new run. Keep an error report's run identifier and relevant logs when [reporting a problem](/docs/settings-pipeline-telemetry-and-diagnostics).
