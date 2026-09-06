<!-- guide-revision: mission-first-v1 -->

# Review and deliver the change

An implementation produces evidence and a delivery decision. Review the actual diff and verification for each affected repository before moving the work into your normal checkout or a pull request.

## Understand the actions

| Action | What to check |
| --- | --- |
| Integrate locally | The intended integration branch and any conflict or changed baseline |
| Check out the work | The verified review branch will move into that repository's local folder |
| Create or publish a PR | Target repository, base branch, diff and available GitHub authentication |
| Request a revision | The original frozen scope and previous delivery remain the reference |

Checkout is not the same as accepting the shared spec. A worktree is an isolated Git checkout; it is not a GitHub-hosted workspace. Delivery actions retain the repository and revision they were prepared for.

## Resolve a blocked delivery

Read the reported conflict or stale-state explanation. Preserve local edits, resolve the specific issue and retry the outstanding action. Do not delete a worktree simply to make the card disappear: it may contain the reviewable work.

For a multi-repository spec, every required repository must be accepted, including explicit no-change deliveries. Accepted repositories stay recorded if another integration fails. Inspect the final outcome instead of assuming that baseline tests or a model summary prove the feature is implemented.
