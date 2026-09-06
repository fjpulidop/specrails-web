<!-- guide-revision: mission-first-v1 -->

# Diagnose a problem with evidence

A useful problem report identifies the application version, affected operation and observable failure without exposing unrelated project data.

## Capture the relevant state

Record your OS, Specrails version, provider, run or conversation identifier and the exact error. Include the failed step and relevant logs. Distinguish a disconnected interface from an empty database: first check backend and runtime status before concluding that records were lost.

For delivery problems, identify the repository, branch and action. Preserve local changes and worktrees until the failure is understood. For browser problems, say whether you used the native app or a development/browser-hosted surface.

## Share a bounded report

Remove credentials, session tokens and unrelated source from logs or screenshots. Model requests, integrations and optional diagnostic features have their own data boundaries; “local-first” is not a claim that every configured operation is offline.

Report a reproducible sequence and expected result through the project's [issue tracker](https://github.com/fjpulidop/specrails-desktop/issues).
