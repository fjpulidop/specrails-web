<!-- guide-revision: mission-first-v1 -->

# Coordinate a batch of specs

Batch Implement coordinates several saved specs as one execution plan. Use it for related work whose dependencies and repository scope are already understood.

## Prepare the batch

Select the specs, review their acceptance criteria and confirm the union of their target repositories. Order dependencies explicitly: a UI task may depend on an API contract even if the two live in different repositories.

Do not use a batch to hide an unresolved specification. Explore uncertain requirements first. Shared repositories may require sequential work even when the tasks look independent.

## Review the complete result

The execution retains the selected specs and repository scope. Follow individual steps as well as the overall run; a partial implementation is not a completed batch.

Review each affected repository and the combined behavior. Verification should cover the candidate being delivered, including cross-repository contracts. If one repository needs a correction, preserve the accepted deliveries and retry the outstanding work through the group.

Read [multi-repository projects](/docs/getting-started-multiple-repositories) before integrating a batch that spans repositories.


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
