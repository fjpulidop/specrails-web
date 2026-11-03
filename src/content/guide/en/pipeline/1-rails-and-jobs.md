<!-- guide-revision: mission-first-v1 -->

# Choose a loop and follow its rail

A loop defines the process; a rail is the execution lane; a job or run records what actually happened. Missions can launch them for you, while Board exposes the same controls directly.

## Pick the process for the request

| Loop | Use it for |
| --- | --- |
| Implement | An agreed spec with architecture, implementation and review |
| Custom | Your own AI, shell and decision steps, including loops you add from the loop gallery (for example Freestyle or Quick SDD) |
| Intent → Spec | Code you built in an [Intent session](/docs/missions-intent-mode): derives the spec and OpenSpec change, then verifies, reviews, archives and delivers |

Implement is the only built-in loop, and Specrails never offers other loops on its own. Intent → Spec is launched only from an Intent session, when you press **Hand off**; it does not appear as a loop you can pick for a spec.

Implement runs every spec on a rail in one run. To work on independent specs in parallel, put them on separate rails.

Select the provider, supported model settings and repositories before starting. Check prerequisites and capacity: a reserved or queued rail is not evidence that a model has begun working.

## Read completion as evidence

Follow the live step, verification result and any failure reason. A successful baseline test does not prove the feature exists; review must check the requested behavior too. Iteration and time limits stop a loop when it cannot complete safely.

A finished implementation produces a [reviewable delivery](/docs/missions-review-and-delivery). It does not make every integration or publication automatic.
