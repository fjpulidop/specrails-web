# Getting Started in 5 Minutes

You are 5 minutes away from having a full AI engineering team working on your codebase. This guide walks you from zero to your first agent-generated pull request.

---

## What you will build

By the end of this tutorial you will have:

- SpecRails installed and running locally
- A dashboard showing your AI team and task board
- Your first task delegated to an agent — and a PR waiting for your review

---

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org) |
| **Git** | any | Your project must be a git repo |
| **GitHub account** | — | For PR creation and repo integration |
| **Anthropic API key** | — | Agents run Claude models — [console.anthropic.com](https://console.anthropic.com) |

If your project is not a git repository yet:

```bash
cd your-project
git init
git add .
git commit -m "initial commit"
```

---

## Minute 1 — Install

From your project directory, run:

```bash
npx specrails-core@latest init
```

The initializer runs automatically. You will see:

```
✅ SpecRails initialized
   Dashboard: http://localhost:3001
   Board:     http://localhost:3001/board
   Docs:      http://localhost:3001/docs

Your team is ready. Create your first task to get started.
```

**What was installed:** SpecRails downloaded and configured the agent system, set up a local task board, and launched a dashboard server. Nothing in your codebase was modified.

> First run downloads dependencies. Expect 2–4 minutes on the initial install. Subsequent starts are instant.

---

## Minute 2 — Open the dashboard

```bash
open http://localhost:3001
```

You will see your **SpecRails dashboard** — a local task management interface where your AI agents live and take assignments.

The left panel lists your agent team. By default you get:

- **CEO** — task planning and delegation
- **CTO** — architecture decisions and technical direction
- **Founding Engineer** — implementation
- **QA Engineer** — test coverage
- **DevOps Engineer** — deployment and infrastructure
- **Technical Writer** — documentation

---

## Minute 3 — Create your first task

Click **New Task** on the board and describe what you want to build. Be specific — the more context you give, the better the output:

```
Add a health check endpoint:
- GET /health
- Returns: { status: "ok", version: "x.x.x", uptime: N }
- Include tests
- Follow existing Express route conventions
```

Click **Create**. The CEO agent picks up the task immediately.

---

## Minutes 4–5 — Watch the pipeline run

The CEO creates a plan and delegates work:

```
CEO: Analyzing request...
  → Creating subtasks for CTO, Founding Engineer, QA Engineer

CTO: Reviewing architecture...
  → Approved: follows existing route structure in src/routes/

Founding Engineer: Writing implementation...
  → Created: src/routes/health.ts
  → Modified: src/app.ts (route registered)

QA Engineer: Writing tests...
  → Created: tests/routes/health.test.ts (6 tests)

Founding Engineer: Running CI...
  → npm test ✔ (all tests passing)
  → PR opened: https://github.com/your-org/your-project/pull/12
```

Open the PR. You will find working code, passing tests, and a description explaining what was built and why.

**You decide whether to merge.** Agents never push to main or merge without your approval.

---

## Verify your installation

Run the built-in diagnostics to confirm everything is healthy:

```bash
npx specrails-core doctor
```

Expected output:

```
✔ Node.js 18+ found
✔ Git found
✔ specrails-hub running on :3001
✔ SpecRails Hub connected
✔ Agent configs loaded (6 agents)
✔ GitHub CLI authenticated
✔ Anthropic API key present
```

If any check fails, the `doctor` command prints the fix for each issue.

---

## Customize your team

By default all agents are enabled. To disable agents you do not need, edit `specrails.config.json` in your project root:

```json
{
  "agents": {
    "ceo": { "enabled": true },
    "cto": { "enabled": true },
    "founding-engineer": { "enabled": true },
    "qa-engineer": { "enabled": true },
    "devops-engineer": { "enabled": false },
    "technical-writer": { "enabled": false }
  }
}
```

Disabling agents reduces API costs and keeps the task board focused.

---

## Next steps

| What to explore | Where to go |
|-----------------|-------------|
| Understand the pipeline architecture | [Core Concepts](concepts.md) |
| See every agent's role and scope | [Agents](agents.md) |
| Configure git workflow and integrations | [Installation & Setup](installation.md) |
| Build from existing GitHub issues | Create a task and paste the issue URL |

---

## Troubleshooting

**Dashboard does not open after `init`**

The hub server may not have started. Check:

```bash
npx specrails-core doctor
```

Or start it manually:

```bash
npx specrails-core start
```

**Agents are not picking up tasks**

Check that your Anthropic API key is set:

```bash
echo $ANTHROPIC_API_KEY
```

If empty, add it to your shell profile or a `.env` file at the project root.

**PR was not created**

GitHub CLI must be installed and authenticated:

```bash
brew install gh
gh auth login
```

Agents fall back to creating a local branch if `gh` is unavailable. Check the task comment thread in the dashboard for the branch name.

**`doctor` shows a failed check**

Each failure includes a fix command. Run it and re-run `doctor` to confirm.

---

*Something not working? Open an issue at [github.com/fjpulidop/specrails-core/issues](https://github.com/fjpulidop/specrails-core/issues).*

---

[← Back to Docs](README.md) · [Core Concepts →](concepts.md)
