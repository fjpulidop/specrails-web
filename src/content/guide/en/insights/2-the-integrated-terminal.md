<!-- guide-revision: mission-first-v1 -->

# Use the project terminal

The integrated terminal gives you a local shell beside the mission. It is a working tool, separate from the agent's recorded background-process history.

## Confirm the directory

Check the selected project, repository and current directory before running a command. In a multi-repository project, similar relative paths can refer to different code. A terminal tab does not automatically follow a delivery worktree or another repository selected elsewhere.

Use the project's documented development and verification commands. Keep long-running services visible, and stop the process you started when it is no longer needed.

## Observe agent-owned services

For a server started through the mission's background tools, open [Processes](/docs/insights-background-processes). That view retains bounded logs and the process identity even after the live chip disappears.

Terminal output and process logs can contain application data or secrets. Review them before copying or attaching them to another service.
