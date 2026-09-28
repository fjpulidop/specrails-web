<!-- guide-revision: mission-first-v1 -->

# Build a reusable custom loop

The Loop Builder turns a process into connected steps you can inspect and reuse. Start with a built-in loop when it fits, then customize the checks your project actually needs.

## Give every step a contract

Use AI steps for investigation or implementation, shell steps for deterministic commands and deciders for explicit continuation conditions. Connect success and failure paths and set iteration, timeout and budget limits where available.

A useful verification step tests both the build and the requested behavior. A repair instruction must address the reported failure: missing implementation needs implementation work, while a failed test may need a focused fix. Do not reduce every failure to “make the tests green.”

## Set repository scope

Choose the repository for commands that depend on a working directory. For coordinated work, the launch must include every required target. Avoid shell commands that infer another repository from a relative path outside the selected scope.

Preview the graph, verify provider capabilities, and try a bounded change before reusing it widely. A graph's End node records the configured outcome; review its evidence before [accepting delivery](/docs/missions-review-and-delivery).

## Compose and validate the graph

Use the catalog available in your Desktop version. Drag steps onto the canvas, connect their outcomes, and configure each step in its inspector. Validate the graph before publishing it; fix the reported node and parameter errors before launching. Specrails Core is the engine built into Desktop that executes these workflows. Manage its version in Desktop Settings → Updates → Specrails Core.

Give each role only the access it needs. Separate read-only investigation from code changes, and connect changes to explicit verification. Parallel branches share the workflow budget; a successful End node alone does not establish that a writing workflow has verified evidence.

When the selected Core exposes invocation limits, prompt, role and decider
pieces offer `timeoutMs` and `idleTimeoutMs`. Set a limit to `0` to disable that
step timer, or remove the field to inherit the default. Whole-workflow budgets
and cancellation still apply. A verification step that asks a blocking question
waits for your answer before accepting a success result.

When a saved legacy graph is first replaced with Core pieces, its original graph is preserved. The library then offers **Export original graph**. The export has a distinct name so you can import it as a separate draft without replacing the current workflow. Conversion and later edits never publish a loop automatically.

Use **Set variables** for state that must survive a pause: set typed JSON values or adjust an existing integer counter. This piece makes no AI call. All updates commit together; an invalid counter leaves every variable unchanged. Variables in a mapped component remain local to that component.

For a Decider, **Continue while this condition holds** can protect unfinished required work. For example, `$vars.failedPass == true` converts a stop proposal into continue until the workflow clears that flag. The decision still runs, and repeated unchanged work remains subject to the no-progress limit. Human questions still pause for an answer.

To migrate a saved legacy loop, choose **Convert to Core** in the loop library. Select the original repository when a shell step has no explicit scope. Conversion validates the graph and saves a draft with an exportable copy of the original. Review the connected steps and publish explicitly. Running loops cannot be converted; conflicting edits are preserved. Converted writers require real verification commands, and Quick SDD uses the OpenSpec version included in Core. Update Core if conversion is unavailable.

To see which saved loops still need attention, open **Core migration check** in the loop library and choose **Check**. It lists loops the installed Core rejects, loops ready to convert and loops that need a repository or other fix. It never converts or publishes anything on its own.
