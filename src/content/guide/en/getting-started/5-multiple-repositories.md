<!-- guide-revision: mission-first-v1 -->

# One project, several repositories

Use one shared spec when a feature crosses repository boundaries, such as an API endpoint and the client that consumes it.

## Define the boundaries

Add the repositories to the same project, name them and choose each integration branch. Select the affected repositories in the spec. Legacy specs without an explicit scope use the primary repository. A launch can add scope but cannot omit a repository required by its specs.

Git worktrees are prepared for the selected repositories before coordinated execution begins. Each file reference and delivery keeps its repository identity. Custom shell steps must target a repository explicitly in multi-repository runs.

## Accept the whole change

The delivery card has a section for each repository. Review and integrate them separately. The shared spec finishes only after every required delivery is accepted, including an explicit no-change result. A successful integration remains recorded if another repository fails; resolve and retry the outstanding part.

Git cannot make separate repositories one atomic transaction. Avoid assuming that one green repository means the whole feature is delivered.

Changing or detaching a member is blocked while specs or active work reference it. Detaching never deletes local files. See [delivery decisions](/docs/missions-review-and-delivery).
