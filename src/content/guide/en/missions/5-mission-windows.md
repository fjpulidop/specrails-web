<!-- guide-revision: mission-first-v1 -->

# Keep a mission in its own window

Separate mission windows are a native desktop feature. They let you keep a conversation visible beside the application you are testing without starting another agent.

## Move the mission

Use the mission header's separate-window action. Specrails transfers the draft, references, attachments and workspace state to the new window. Only one window owns the editable conversation at a time; the original view offers a way to focus it.

Finish the current send, upload, message edit or capture before moving. The transfer waits for the destination to restore the view before acknowledging ownership. If it fails while the source is alive, keep the source draft and retry from the visible error.

## Bring it back

Use the reintegration action or close the mission window. The main window restores the conversation before the child closes. The agent continues in the same backend throughout the transfer.

Closing the main window hides it to the tray; quitting the app is a separate shutdown operation. Browser-hosted Specrails does not provide native mission windows. A complete OS crash is different from a failed window transfer: only the state already persisted or checkpointed can be recovered.
