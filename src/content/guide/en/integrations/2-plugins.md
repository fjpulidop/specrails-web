<!-- guide-revision: mission-first-v1 -->

# Connect project integrations

Plugins connect Specrails with project systems such as external ticket providers. Configure them for the logical project rather than separately for every repository.

## Check ownership and credentials

Open the project's integration settings and review the plugin's required configuration. Use the intended account and project mapping. Credentials and access rules belong to that integration; enabling a plugin does not grant access to every external resource.

Test the connection and inspect imported data before relying on it for implementation. Preserve external identifiers so updates return to the correct system.

## Add repositories without splitting the backlog

Adding another repository does not create another integration owner or merge a foreign backlog. Specs may target several repositories while the project's ticket integration remains shared.

If a plugin is unavailable or reports an error, retain the error and avoid repeated writes that could create duplicate records. See [Jira](/docs/integrations-jira-integration) for project mapping and [MCP](/docs/integrations-mcp-server) for agent tools.
