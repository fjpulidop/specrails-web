<!-- guide-revision: mission-first-v1 -->

# Drafts, contracts and frozen scope

Drafts are editable planning state. An admitted implementation keeps a snapshot of its spec and repository scope so later edits do not redefine work already running.

## Review before launching

Use the contract to record interfaces, data shapes, invariants and acceptance criteria where they matter. Prefer precise requirements over a long list of guessed files. The agent should verify relationships against source rather than treating a proposed file list as fact.

Save the intended repository selection with the spec. Launching may add necessary repositories, but it must not silently omit a target required by the saved contract.

## Revise deliberately

Editing the backlog while a run is active changes future work, not that run's frozen request. Use the delivery's revision action to continue the reviewed implementation with its original context and an explicit correction.

For a new scope, update the spec and start a new run. Compare the result against the saved contract and [delivery evidence](/docs/missions-review-and-delivery), not only the latest wording in chat.
