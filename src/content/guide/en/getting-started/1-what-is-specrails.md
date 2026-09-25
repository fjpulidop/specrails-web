<!-- guide-revision: mission-first-v1 -->

# What is Specrails

Specrails is a local workspace for turning a software idea into a precise spec, a coordinated implementation and a reviewable delivery. Start in a mission conversation; use the Board when you want to organize the backlog and execution lanes.

## Your first path

1. Install the app and authenticate an AI provider.
2. Add a project and its repositories.
3. Open a mission, describe the outcome and agree on the spec.
4. Choose an implementation loop and watch its evidence.
5. Review each affected repository before accepting its delivery.

A mission can explore, inspect files, operate the browser and supervise processes as well as implement. A spec records what must change; a loop defines how the work proceeds. These are separate decisions.

## What runs where

Specrails is one app. Desktop includes its engine, **Specrails Core**: when you add a project, Desktop uses Core to prepare the workflow files your provider needs, and the built-in Implement and Batch Implement loops use Core to plan, develop, verify and review the change before handing the result back to Desktop. Desktop owns everything around it: missions, the Board, worktrees, commits, pull requests and history.

Desktop and Core work through the Claude, Codex, Gemini or Kimi CLI that you install and sign in to. Local project history does not mean model calls stay on your machine: provider calls and configured integrations can send context and incur charges.

## Core is built into Desktop

Core is not a separate product. You don't install it, run it from a terminal or add it to your repositories. Desktop includes a tested version; **Desktop Settings → Updates → Specrails Core** shows the version in use and applies Core updates to all your projects.

This guide describes the current product workflow. Check your installed version and [release notes](https://github.com/fjpulidop/specrails-desktop/releases) if a control is unavailable.

Continue with [installation](/docs/getting-started-installing-and-first-run) or [your first mission](/docs/missions-first-mission).
