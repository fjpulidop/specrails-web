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

## Ask about a selection

Select text in a mission and choose **Ask about this** for a side conversation that explains it with the mission's earlier context. Press Enter with no question for a plain explanation, then ask follow-ups. The side conversation is not saved: closing it discards it, and the mission, its composer and its provider session are not changed. It is an AI call on the mission's provider.

## Watch the context window

A ring beside the composer shows how full the mission's provider session context is, as measured after each turn. Hover or open it for the tokens used, the window and the model. When the provider does not report the window, or right after it compacted the context, the ring says the share is unknown.

From the ring, **Start fresh with a summary** writes a summary of the mission (goal, decisions, current state, next steps). Your next message then starts a new provider session that knows only that summary; the conversation stays in the history. It is available once the current turn finishes, and not while the mission is in Intent, which runs in its own session.
