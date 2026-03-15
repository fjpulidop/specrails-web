# Persona: The Engineering Lead

> "I need my team shipping faster with AI, but I also need governance, consistency, and quality I can trust. Give me a system, not a toy."

## Profile

| Field | Value |
|-------|-------|
| **Name** | "Morgan" — The Engineering Lead |
| **Age** | 32-50 |
| **Role** | Engineering manager, tech lead, or VP of Engineering at a startup or mid-size company |
| **Team size** | 3-20 engineers, often with mixed seniority levels |
| **Experience** | 10+ years in software; deep technical background with growing management responsibilities |
| **Tools today** | GitHub Copilot Business, Cursor (some team members), JIRA/Linear, CI/CD pipelines, code review tools |
| **Spending** | $20-50/seat/month budget for dev tools; needs ROI justification |
| **Tech comfort** | High — evaluates tools hands-on but also considers team-wide adoption friction |

## Behaviors

- Evaluates AI dev tools by team-level impact, not individual productivity
- Worries about "shadow AI" — developers using personal tools without team visibility
- Frustrated that AI tools generate code but don't enforce team standards or architectural patterns
- Spends significant time in code review catching issues that AI could have prevented
- Needs to justify AI tool spend to leadership with concrete metrics (cycle time, defect rate)
- Skeptical of hype — wants to see real demos and case studies, not marketing claims
- Champions tools that reduce the review burden on senior engineers

## Value Proposition Canvas

### Customer Jobs

| Type | Job |
|------|-----|
| Functional | Ensure AI-generated code follows team standards and architectural patterns |
| Functional | Reduce code review burden on senior engineers without sacrificing quality |
| Functional | Provide consistent development workflow across the team regardless of individual tool preferences |
| Functional | Measure and demonstrate the ROI of AI dev tool adoption |
| Functional | Maintain governance and security compliance in AI-assisted development |
| Social | Be seen as an innovative leader who adopts AI effectively, not recklessly |
| Emotional | Feel confident that AI tools improve quality, not just speed |
| Emotional | Trust that the team's output is consistently high-quality without micromanaging |

### Pains

| Severity | Pain |
|----------|------|
| Critical | No way to enforce team-specific architectural patterns across AI-generated code |
| Critical | AI tools lack quality gates — code goes from "generated" to "PR" with no structured review |
| High | Inconsistent output — different team members get different suggestions for the same problem |
| High | Can't measure whether AI tools actually improve productivity or just feel faster |
| High | Security and IP concerns about proprietary code being sent to AI providers |
| Medium | Junior engineers over-trust AI suggestions; senior engineers refuse to use AI at all |
| Medium | No audit trail — can't trace back why AI made specific implementation decisions |
| Low | Cost scales linearly with seats but value is hard to quantify per-engineer |

### Gains

| Impact | Gain |
|--------|------|
| High | Structured pipeline with quality gates that enforces team standards automatically |
| High | Cross-agent coordination — architect decisions feed into developer implementation and reviewer validation |
| High | Reduced senior engineer review burden through automated convention and architecture checks |
| Medium | Spec-driven development that creates traceability from requirement to implementation |
| Medium | Consistent workflow across the team — same pipeline regardless of individual preferences |
| Medium | Model-tier routing that optimizes cost without sacrificing quality where it matters |
| Low | Open-source and inspectable — no black-box decisions, full transparency |
| Low | GitHub/JIRA integration for existing workflow compatibility |

## Key Insight

> Engineering leads don't just need AI that writes code faster — they need a **system** that ensures AI-generated code meets team standards, passes quality gates, and is traceable back to requirements. The gap isn't productivity; it's **governance and consistency at the team level**. specrails' multi-agent pipeline with specialized roles (architect, developer, reviewer) mirrors how high-functioning teams already work — it just automates the structure.

## Sources

- Competitive analysis: GitHub Copilot Enterprise, Tabnine Enterprise, Sourcegraph Cody, Amazon Q Developer
- Engineering management discussions on AI tool adoption and governance challenges
- Industry reports on AI dev tool ROI measurement and team-level adoption patterns
- Developer surveys on team-level AI tool satisfaction (GitHub, JetBrains, Stack Overflow 2024-2025)
