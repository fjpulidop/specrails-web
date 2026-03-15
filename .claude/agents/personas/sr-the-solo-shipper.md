# Persona: The Solo Shipper

> "I can build anything — I just can't be the architect, developer, reviewer, and QA engineer all at once. I need a team, not a tool."

## Profile

| Field | Value |
|-------|-------|
| **Name** | "Alex" — The Solo Shipper |
| **Age** | 25-40 |
| **Role** | Solo developer, indie hacker, or early-stage startup founder |
| **Projects** | 1-3 active projects, shipping MVPs and iterating fast |
| **Experience** | Strong full-stack generalist; 3-10 years of professional experience |
| **Tools today** | Cursor, GitHub Copilot, Claude Code, Aider, VS Code, GitHub |
| **Spending** | $20-100/month on AI dev tools (willing to pay for genuine productivity gains) |
| **Tech comfort** | High — comfortable with CLI, APIs, and multiple languages/frameworks |

## Behaviors

- Ships fast but worries about quality debt accumulating silently
- Uses 2-3 AI coding tools simultaneously, switching based on task type
- Spends more time reviewing AI output than expected — AI writes code but creates review burden
- Re-explains project context to AI tools every session; frustrated by context loss
- Avoids complex refactors because no one else reviews or validates the architecture
- Evaluates tools by "does this make me feel like I have a team?" not just "does this write code faster?"
- Reads Hacker News, Reddit r/programming, and dev Twitter for tool recommendations

## Value Proposition Canvas

### Customer Jobs

| Type | Job |
|------|-----|
| Functional | Ship features end-to-end without needing to hire a team |
| Functional | Get architectural guidance before writing code, not after |
| Functional | Ensure code quality through automated review, not self-review |
| Functional | Maintain consistent codebase conventions as the project grows |
| Functional | Catch security issues and bugs before they reach production |
| Social | Ship work that looks "team-quality" to users, investors, or employers |
| Emotional | Feel confident that code is solid, not just "it works for now" |
| Emotional | Reduce the cognitive overload of wearing every hat simultaneously |

### Pains

| Severity | Pain |
|----------|------|
| Critical | AI writes code but doesn't think about architecture — treats every task as greenfield |
| Critical | No quality gate between "AI generated code" and "code ships to production" |
| High | Spends more time reviewing AI output than saved by generating it |
| High | Context loss across sessions — re-explains codebase, conventions, and goals every time |
| High | Complex multi-file features fall apart — AI handles single files but not cross-cutting concerns |
| Medium | No structured workflow — AI is a suggestion engine, not a pipeline |
| Medium | Tool lock-in anxiety and unpredictable token costs |
| Low | Generic suggestions that don't match project-specific patterns or conventions |

### Gains

| Impact | Gain |
|--------|------|
| High | Multi-agent pipeline that separates planning, implementation, and review into distinct phases |
| High | Architect agent that pushes back on bad designs before code is written |
| High | Reviewer agent that catches bugs, security issues, and convention violations automatically |
| High | Persistent project memory — AI knows the codebase like a long-term team member |
| Medium | Model-tier routing — expensive reasoning for architecture, fast models for boilerplate |
| Medium | Spec-driven development that links implementation back to requirements |
| Medium | Structured shipping workflow (branch, commit, PR) built into the pipeline |
| Low | Open-source and extensible — no proprietary lock-in |

## Key Insight

> Solo developers don't need a faster coding tool — they need the equivalent of a **full development team** (architect + developer + reviewer + QA) orchestrated into a single pipeline. The gap isn't code generation speed; it's the absence of the planning, review, and quality assurance roles that make teams productive. specrails fills this by turning Claude Code into a team, not just a faster typist.

## Sources

- Competitive analysis: Cursor, GitHub Copilot Workspace, Devin, Aider, Claude Code
- Reddit r/programming and r/ExperiencedDevs discussions on AI coding tool adoption
- Hacker News threads on solo developer workflows with AI (2024-2025)
- Developer surveys on AI tool satisfaction and pain points (Stack Overflow, JetBrains)
