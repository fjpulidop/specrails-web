<!-- guide-revision: mission-first-v1 -->

# Intent: say the problem, not the solution

**Intent** is how work starts in Specrails. Instead of writing a solution, you write down the **intent**: the problem, the outcome you want, how you will know it worked, who and what it affects, the limits and what nobody knows yet. Specrails derives the spec from it, and you review the spec instead of writing it. (Intent is the new name of what used to be called Flow, and it keeps everything Flow could do.)

## The intent

An intent has six parts and no part for the solution:

| Part | What goes in it |
| --- | --- |
| **Problem** | What is wrong today, for whom, and when it hurts |
| **Outcome sought** | What is true once it is solved, with an optional hypothesis |
| **How we will know** | Observable signals; they become acceptance criteria |
| **Who and what it affects** | People, screens or systems |
| **Constraints** | Limits any solution must respect |
| **Open questions** | What nobody knows yet; agents investigate them instead of guessing |

If you name a solution (“add a Redis cache”), the intent keeps what it is for (“the API answers in under 200 ms”) as the outcome. Your solution becomes a constraint if you require it, or an open question if it is one option. An intent stays in Specrails and is never sent to Jira.

## Where an intent comes from

- **In a mission.** When you describe work, the agent interviews you about the users, the limits and how you will know it worked, then shows an **Intent** card with every part and, when the request is ambiguous, two readings of it. Click a reading or answer in your own words.
- **In Add Spec.** **Intent** is the first mode and opens by default. Describe the problem, press **Generate intent and spec**, and review both. See [Add Spec modes](/docs/specs-specs-and-the-backlog).

Every agent that works on the spec receives the intent first, as the source of truth for why and for what outcome, never for how. When a rail delivers a spec that has an intent, it is written as `intent.md` in the OpenSpec change, so it lives in Git next to the code.

## Explore or Delegate

A settled intent offers two equal paths. Neither is recommended; you choose.

- **Explore** builds it together with an agent in an isolated Intent session. When the result is right, a rail derives the spec from what you built. Use it when the shape is still unclear: something exploratory or visual.
- **Delegate** has the agent write the spec from the intent. You review it and a rail builds it with [Implement](/docs/pipeline-rails-and-jobs). Use it when what you want is already clear.

## Start an Intent session

Choose **Explore**. A confirmation opens: Specrails creates an isolated worktree where the agent can write code, and your main branch is not touched. Press **Start Intent**. A placeholder spec carrying your intent appears on the board with the **In Intent** label; click it to jump back to the mission. You can also start any existing spec in Intent with **Start in Intent** on the board or in the spec detail.

## Stay in control while you build

A bar above the composer shows the worktree branch, the files changed with lines added and removed, and the real cost as billed by the provider (never an estimate).

- **View changes** lists every changed file with its status and +/−.
- **Pause Intent** stops the agent and keeps the worktree and the spec. The mission then offers **Resume Intent**, even after an app restart.
- **Discard** deletes the worktree, its branch and the placeholder spec, after a confirmation. A spec that existed before comes back exactly as it was.
- **Interrupt anytime**: write while the agent is working and your message interrupts the current step.

Intent writes only inside its worktree; outside Intent, missions stay read-only. A mission has one Intent at a time.

## Hand off

When you are happy with the result, press **Hand off**. The row reads **Ready to turn into a PR**, with a rail, engine, model and effort already chosen for you. Adjust them if you like and press **Launch**, or **Not yet** to go back. If the review limit or a budget is reached, the line says so and nothing launches.

The rail derives the spec and the OpenSpec change from what you built, verifies and reviews them, archives the change and delivers as any run does. The delivery card appears in the mission, and the [review packet](/docs/missions-review-and-delivery) shows how much of the change the derived spec explains. If the run fails for a technical reason, the work returns to the Intent intact.

## Jira only at delivery

Nothing reaches Jira while you are in Intent or if you discard it. In projects connected to [Jira](/docs/integrations-jira-integration), the issue is created only when the delivery reaches review, already complete with the derived spec.

## Requirements

Intent needs the Specrails Core built into Desktop to support it. If **Start Intent** is disabled, the card lists what is missing; update Specrails Core from **Desktop Settings → Updates → Specrails Core**. Intent cost appears in Analytics as its own **Intent** surface.
