<!-- guide-revision: mission-first-v1 -->

# Build a reusable custom loop

The Loop Builder turns a process into connected steps you can inspect and reuse. Start with a built-in loop when it fits, then customize the checks your project actually needs.

## Give every step a contract

Use AI steps for investigation or implementation, shell steps for deterministic commands and deciders for explicit continuation conditions. Connect success and failure paths and set iteration, timeout and budget limits where available.

A useful verification step tests both the build and the requested behavior. A repair instruction must address the reported failure: missing implementation needs implementation work, while a failed test may need a focused fix. Do not reduce every failure to “make the tests green.”

## Set repository scope

Choose the repository for commands that depend on a working directory. For coordinated work, the launch must include every required target. Avoid shell commands that infer another repository from a relative path outside the selected scope.

Preview the graph, verify provider capabilities, and try a bounded change before reusing it widely. A graph's End node records the configured outcome; review its evidence before [accepting delivery](/docs/missions-review-and-delivery).
