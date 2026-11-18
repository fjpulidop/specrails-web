<!-- guide-revision: mission-first-v1 -->

# Inspect processes and retained logs

Open Processes in a saved mission to inspect active services and their retained history. Finished processes remain discoverable after their temporary composer chips disappear.

## Find the relevant process

Search the history and check the command, repository, working directory and start time. Open its logs to inspect stdout and stderr, filter or search the output, pause following, and copy or download the available snapshot.

The history survives reload and reconnect when persistence is available. Retention is bounded by age, count and storage size; a log is not an unlimited recording. Truncation and persistence errors should remain visible.

## See what Specrails is running

**Resources** in the status bar shows the CPU, memory and number of processes of everything Specrails launched, across the app. Open it to see them grouped by source: missions and chats, rails, loops and jobs, background processes, terminals, agent CLIs, MCP and runners, Git, and the Specrails server itself. Each process is counted once. The figures refresh while the panel is open; on a system that cannot report them, the panel says so.

## Stop with confirmation

Stop targets the registered process identity, not just a reused PID. While confirmation is pending, keep the stopping state visible; a request error can be retried without pretending the service has disappeared.

After a Desktop restart, **Disconnected** means supervision was interrupted. The operating system's process state may be unknown, so Specrails does not adopt or kill an old PID as if it still owned it. Deleting a mission or project also removes its process history.
