<!-- guide-revision: mission-first-v1 -->

# Add a project and its repositories

A project is a logical product with one shared backlog. It can contain one repository, several repositories or extra folders used as context.

## Create the project

Open Add Project, choose the primary folder and give the project a recognizable name. Add the other folders that belong to the product, then complete the prerequisite and Core setup checks.

For an existing project, use **Project settings → General → Repositories and folders**. Repository names help distinguish paths such as `frontend/src/index.ts` and `api/src/index.ts`; stable membership IDs keep their context separate.

## Select implementation scope

A spec without an explicit selection targets the primary repository. Select every repository required by a change before launching it. Reading another folder does not grant it implementation scope. Secondary non-Git folders provide context but cannot be additional isolated implementation targets.

The project owns its backlog and integrations. Adding a folder already used elsewhere does not import that other project's tickets or Jira ownership.

Next: [multi-repository work](/docs/getting-started-multiple-repositories) and [your first mission](/docs/missions-first-mission).
