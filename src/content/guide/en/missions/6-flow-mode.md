<!-- guide-revision: mission-first-v1 -->

# Flow: build first, spec later

**New.** Flow lets you build working code with an agent before you know exactly what you want. You talk to the agent in the mission conversation, it writes and runs real code in an isolated worktree, and no spec is needed up front. When the result is right you say **This is it**, and a rail derives the spec and delivers the work as usual.

## Flow to discover, Implement to delegate

Use [Implement](/docs/pipeline-rails-and-jobs) when you can already describe the change: rules, acceptance criteria, an API or data model. Agree on a spec and delegate it to a rail.

Use Flow when the shape is still unclear: something exploratory or visual, an idea you want to try before committing to it. You discover the result by building it together, and the spec is written from what you built.

## Start a Flow from the mission

You never have to ask for Flow by name. When you describe something exploratory ("I want to try…", "I don't know how it should look"), the mission shows a card with two paths: **Flow**, to build it together now, and **Spec + Implement**, to agree on a spec first. The card marks the recommended path and says why in one sentence. The other path is always one click away, and the agent does not insist if you choose it or press **Not now**.

Choosing Flow opens a confirmation: Specrails creates an isolated worktree where the agent can write code, and your main branch is not touched. Press **Start Flow**. A placeholder spec appears on the board with the **In Flow** label; click it to jump back to the mission.

## Stay in control while you build

The conversation changes look and a Flow bar appears above the composer. It shows the worktree branch, the files changed with lines added and removed, and the real cost of the Flow as billed by the provider (never an estimate).

- **View changes** lists every changed file with its status and +/−.
- **Pause** stops the agent and keeps the worktree and the spec. The mission then offers **Resume Flow**, even after an app restart.
- **Discard** deletes the worktree, its branch and the placeholder spec, after a confirmation.
- **Interrupt anytime**: write while the agent is working and your message interrupts the current step. The send button turns into a lightning bolt, and the agent continues with your new information right away.

Flow writes only inside its worktree; outside Flow, missions stay read-only. A mission has one Flow at a time.

## Say "This is it"

When you are happy with the result, press **This is it**. The Flow bar goes away and the usual rail launch card appears with the **Flow → Spec** loop preselected and a free rail chosen for you. Adjust the engine, model or effort if you like and press **Launch**. If the review limit or a budget is reached, the card says so and does not launch. **Not yet** takes you back to the Flow.

The Flow → Spec loop derives the Specrails spec and the OpenSpec change from what you built, verifies and reviews them, archives the change and delivers as any run does. The delivery card appears in the mission, and the [review packet](/docs/missions-review-and-delivery) shows how much of the change the derived spec explains.

## Jira only at delivery

Nothing reaches Jira while you are in Flow or if you discard it. In projects connected to [Jira](/docs/integrations-jira-integration), the issue is created only when the delivery reaches review, already complete with the derived spec, and moves straight to the status mapped to review.

## Requirements

Flow is available from the release of Specrails Desktop that introduces it, and it needs the Specrails Core built into Desktop to support Flow. If **Start Flow** is disabled, the card lists what is missing; update Specrails Core from **Desktop Settings → Updates → Specrails Core**. Flow cost appears in Analytics as its own **Flow** surface.
