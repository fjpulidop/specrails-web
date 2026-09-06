<!-- guide-revision: mission-first-v1 -->

# Shape a spec in Explore

Explore combines a conversation with a live draft. Use it when the request needs investigation or decisions before implementation.

## Work through the uncertainty

Describe the outcome and provide relevant project references. Ask the agent to inspect the existing behavior, identify constraints and compare concrete options. Answer the questions that change the design; avoid accepting a long draft without reading its assumptions.

The draft can evolve while you talk. Review its acceptance criteria, dependencies and target repositories after each important change. Context from another repository is not automatically permission to modify it.

## Save a coherent draft

When the contract is ready, save it to the project backlog. Reopening or continuing a draft should preserve its fields rather than silently dropping the repository selection.

If a large request is split into smaller specs or planned in milestones, review each child's scope and dependencies. A parent scope is a starting point, not evidence that every child needs every repository. Then choose an [implementation loop](/docs/pipeline-rails-and-jobs).
