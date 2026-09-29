<!-- guide-revision: mission-first-v1 -->

# Inspect a run before retrying

The run detail brings together step progress, logs, verification and delivery context. Start here when an implementation stops or a result needs explanation.

## Find the actual boundary

Read the failed step and its error before restarting. Distinguish missing prerequisites, provider quota or authentication, command failures, unmet spec criteria and delivery conflicts. A model's final paragraph is not a substitute for the recorded outcome.

Open the relevant logs and repository diff. Look for commands that actually ran, their exit status and any skipped verification. Cost or token information may be estimated or unavailable depending on the provider.

## Continue the right work

Use the available retry or revision action for that run. Do not launch several identical implementations because a view is slow to reconnect. Check the authoritative status first.

A revision should retain the original frozen spec and delivery context. If you intend a different scope, update the backlog and launch a new run. Keep an error report's run identifier and relevant logs when [reporting a problem](/docs/settings-pipeline-telemetry-and-diagnostics).

## Read the implementation result

With a Core runtime that supports acceptance evidence, the completed run shows four
separate states: implementation, validation, archive and delivery. “Verified with
exceptions” means accepted requirement interpretations or failed/unavailable
supplementary checks remain visible. “Pending host delivery” means Core has not
performed the host's delivery work, even if the change has been archived.

Open **Evidence, exceptions and phase timings** to inspect decisions, approval
references, measurement scope and limitations, review findings and recorded phase
times. Required checks and unresolved requirements block acceptance. A passing Node
benchmark does not establish browser rendering performance. Material requirement
changes need existing user/host authorization; minor interpretations can be accepted
by the reviewer with a recorded reason and impact.

Execution success describes the process. If the current runtime reports incomplete
implementation or blocked/pending validation, Desktop settles the run as blocked
and does not complete its tickets. Older or unavailable runtimes show acceptance
evidence as unavailable; a successful process alone is not proof of acceptance.
The result is a snapshot captured at completion, not a revalidation of later edits.

The final counters distinguish executed steps, decider evaluations and agent turns.
A built-in Implement run can have one step, zero decider evaluations and many agent
turns. Core phase durations/attempts are shown when recorded; per-phase costs are
unavailable because provider usage is attributed to loop steps. Valid full test
receipts are reused until their inputs change; each phase does not need another
identical full-suite execution.

## Resume the original execution

Saved executions retain their original workflow, repository scope and delivery context. Answer a pending question or approve the displayed operation explicitly. For an interrupted write, inspect the worktree diff first, then select the exact attempts to recover. The node and scope distinguish separate branches that visited the same step. Resuming keeps the existing execution and its accounting.

Cancellation acknowledgement means the request was recorded; wait for the execution to settle before starting competing work. Steering receipts distinguish an accepted instruction from one consumed by a later agent attempt. Neither receipt proves that the requested change was completed. Missing cost information is not zero cost.

## After a workflow restart

After a crash, resume the saved workflow with its original configuration and repositories. An interrupted write requires selecting the exact attempt after inspecting the worktree diff. Completed steps are reused. A provider call whose response was lost remains counted as interrupted with unknown usage; it is never reported as free. If the original delivery cannot be proven from saved records, recovery shows an error and preserves the worktree.

When a decision step pauses for a question, resuming reuses its saved decision and sends the human answer to the following step. It does not call the model again for that same decision. A paused prompt can need another model turn to act on your answer.

## History retention

Saved executions are kept indefinitely by default. In **Saved executions → History retention**, a project can keep them for 1 to 3650 days instead. Nothing is deleted in the background: save the policy, choose **Preview cleanup** and review each run and its reason before **Delete expired history**. A run stays protected while it is active, waiting for your answer or approval, has an interrupted write, has an open delivery or a fork that still depends on it. Only runtime history under the project's Specrails storage is removed; your repository, worktrees, job log and cost records remain. An expired run shows as **Expired** and can no longer be resumed or forked. Core versions still used by a surviving run are always kept.
