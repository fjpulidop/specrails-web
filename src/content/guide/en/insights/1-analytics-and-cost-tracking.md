<!-- guide-revision: mission-first-v1 -->

# Read usage and cost honestly

Usage helps you understand a workflow, but providers expose different evidence. Distinguish reported values, estimates and unavailable data.

## See where the money went

Open **Analytics** from the project's right sidebar. It counts every AI call in the project: rails, loops and jobs, spec writing, file summaries, side chats, failure analysis, and the missions and Intent turns you run while the agent is pinned to that project. Missions on Home, with no project pinned, belong to no project.

Each call belongs to one of five categories that say why it was spent:

- **Implementation**: building specs with rails, loops and jobs.
- **Missions**: talking to the agent, including Intent mode.
- **Specs**: writing and refining specs, including Quick and Explore specs, splits and proposals.
- **Code**: file summaries and file stories in the Code explorer.
- **Support**: setup, failure analysis, Agent Studio and the chat sidebar.

The page reads from the total for the period, to where the money went by category, to the daily timeline, spend limits, engines and models, top specs and the raw calls. Open a category to see what it is made of, and filter the page by period, category or engine; the filters are kept in the page URL. Only engines that actually did work are listed.

When every engine runs on a subscription plan, the total is an API-equivalent estimate, not money that was charged. Hatched bars mark estimated cost from engines that do not report cost themselves. Spend limits include mission spend and count your local day.

## Compare like with like

Inspect the run's provider, model, duration, tokens and cost where available. An unavailable amount is not a free run. Provider subscriptions, account limits and external tool charges are separate from Specrails' local history.

Compare runs with similar scope and acceptance criteria. Include retries and review work: a low-cost first attempt can produce a more expensive final result.

## Investigate a limit

Read the provider's actual quota or authentication error. Account limits can be shared across applications and conversations. Do not repeatedly launch work to test whether a limit has reset.

Use the run identifier and relevant diagnostics when a recorded figure appears inconsistent. Avoid sharing raw prompts, credentials or unrelated project content in a public report.
