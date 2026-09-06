<!-- guide-revision: mission-first-v1 -->

# Queue, steer and understand the checks

You can prepare the next message while an agent is working, or explicitly steer the active invocation. Sending and stopping are separate actions.

## Queue or steer

Send during a run queues the message for the next turn. Pending messages offer steering, deletion and an Edit action. Editing uses the composer so its references, attachments and draft can be recovered. Once delivery is in progress, those actions are disabled to avoid changing an input the agent may already have received.

With Claude and Codex, explicit steering uses the native provider channel. Other supported paths deliver at safe Specrails MCP boundaries; pending input falls back to a subsequent turn if it cannot be delivered in time. An action already underway is not retroactively cancelled by steering.

## Read the delivery receipts

| Icon | Meaning |
| --- | --- |
| One gray check | Sent; preparing delivery |
| Two gray checks | Delivery to the transport confirmed |
| Two green checks | The agent explicitly acknowledged reading the input |

Hover or focus the receipt for its explanation. A later model response does not automatically prove that a correction was read. An unconfirmed delivery is not silently replayed; inspect the message before deciding what to send again.

Use Stop when you actually want to stop the invocation.
