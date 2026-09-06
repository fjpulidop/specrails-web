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
