<!-- guide-revision: mission-first-v1 -->

# Know what to back up

Your repositories and Specrails' local records are different parts of the workspace. Back up both when protecting or moving your work.

## Keep the two layers

Source files remain in the folders you registered. Specs, runtime artifacts, worktrees and project history can have distinct managed locations. The default Specrails data home is `~/.specrails`; explicit environment configuration can change it.

A logical multi-repository project keeps one backlog and integration identity while retaining separate repository memberships. Adding a folder does not import another project's history.

## Move or remove deliberately

Before moving a repository or deleting a project, inspect pending runs, delivery references and saved process history. Membership removal must not silently delete your source folders, but deleting application records can remove their history.

Stop the relevant app processes before manually restoring a database backup. Preserve the original backup until the restored projects and paths have been checked. Do not fix a startup error by deleting the data directory without understanding which records it contains.
