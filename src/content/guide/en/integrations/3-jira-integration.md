<!-- guide-revision: mission-first-v1 -->

# Keep Jira tied to the project

Jira integration links external issues to the project's shared workflow. Repository selection describes where code changes belong; it does not redefine Jira ownership.

## Configure the mapping

Use the Jira plugin's project settings to connect the intended site and issue project. Confirm authentication and inspect the imported issue identifiers, titles and descriptions before launching work.

Decide which behavior remains managed in Jira and which spec details are refined in Specrails. Avoid creating independent copies of the same issue just to target another repository.

## Review updates

Check the external issue key before an action that writes back. A local execution status and a Jira workflow status are different systems; a completed run does not prove that a remote transition succeeded.

If a sync fails, inspect the error and reconcile the existing issue before retrying. Adding another folder to Specrails preserves the logical project's backlog and integration mapping.
