# SpecRails CLI Reference

<!-- specrails-web: docs slug=cli-reference -->

Command reference for `specrails-core`. All commands are run via `npx specrails-core` or inside Claude Code / OpenAI Codex as slash commands.

---

## `specrails init`

**Synopsis:** `npx specrails-core@latest init [options]`

**Description:** Installs SpecRails into your project directory. Copies agent definitions, templates, and the `/specrails:enrich` TUI installer into `.claude/`. Does not modify your source code.

**Options:**

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--root-dir` | path | `.` (current directory) | Target directory for installation |

**Examples:**

```bash
# Install into the current directory
npx specrails-core@latest init --root-dir .

# Install into a specific project directory
npx specrails-core@latest init --root-dir ~/projects/my-app
```

**What it does:**

1. Checks prerequisites — Claude Code CLI, API key, git, npm
2. If Claude Code CLI is missing, prints the install URL and exits (no stack trace)
3. If no API key is configured, prints exact fix instructions and exits
4. Copies templates and agent definitions into `.claude/`
5. Prints next step: `Open Claude Code or Codex and run /specrails:enrich`

**Expected output:**

```
✔ Checking prerequisites...
  ✔ git found
  ✔ Claude Code found
  ✔ npm found
✔ Installing SpecRails artifacts into .claude/
✔ Installed version 1.7.0
✔ Ready. Open Claude Code or Codex and run /specrails:enrich to complete configuration.
```

**See also:** [`enrich`](#specrails-enrich), [`doctor`](#specrails-doctor)

---

## `specrails enrich`

**Synopsis:** `/specrails:enrich [--from-config] [--quick]`

**Description:** Configures your SpecRails team via an interactive TUI installer. Run inside Claude Code or Codex after `init`. Defaults to the full TUI with agent and model selection. Use `--quick` for a fast 3-question setup, or `--from-config` to apply an existing `install-config.yaml` non-interactively.

**Options:**

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--quick` | boolean | `false` | Fast path — asks 3 questions, applies sensible defaults, done in under a minute |
| `--from-config` | boolean | `false` | Non-interactive — reads `install-config.yaml` from the project root and applies it directly |

**TUI mode (default)**

Launches a step-by-step terminal UI:

1. **Detect** — reads your stack, CI config, and conventions automatically
2. **Select agents** — checklist of available agents; toggle each on or off
3. **Select model** — choose the Claude or Codex model per agent
4. **Configure** — backlog provider, git workflow, PR settings
5. **Generate** — writes `install-config.yaml` and project data files to `.specrails/`

Default configuration applied automatically when not overridden in the TUI:

| Setting | Value |
|---------|-------|
| Agents enabled | CEO, CTO, Tech Lead, founding-engineer |
| CLAUDE.md template | Minimal template populated from your answers |
| OpenSpec | Enabled if CLI detected, disabled otherwise |

After setup, the installer suggests your first command based on project type:

```
✅ Configuration complete.

Try your first spec:
  > /specrails:get-backlog-specs      ← new projects
  > /specrails:tech-audit            ← existing codebases
```

**Quick mode**

```
/specrails:enrich --quick
```

Asks exactly 3 questions, then auto-configures everything else with sensible defaults:

1. **What is this project?** (one sentence)
2. **Who are the target users?**
3. **Git access for agents?** (`read-only` or `read-write`)

**Config-driven mode**

```
/specrails:enrich --from-config
```

Reads `install-config.yaml` from the project root and applies it without any prompts. Useful for team onboarding scripts or CI pipelines where you want repeatable, non-interactive setup.

**`install-config.yaml` schema**

```yaml
agents:
  enabled: [architect, developer, reviewer, product-manager]
  model: claude-opus-4-5          # default model for all agents
git:
  access: read-write              # read-only | read-write
backlog:
  provider: github                # github | jira | linear | local
project:
  name: "My Project"
  description: "One sentence summary"
  users: "Developers building web apps"
```

**Examples:**

```bash
# Inside Claude Code or Codex — full TUI (recommended for new users)
/specrails:enrich

# Quick setup — 3 questions, sensible defaults
/specrails:enrich --quick

# Non-interactive — apply install-config.yaml
/specrails:enrich --from-config
```

**See also:** [`init`](#specrails-init), [`doctor`](#specrails-doctor)

---

## `specrails doctor`

**Synopsis:** `npx specrails-core doctor [--verbose]`

**Description:** Runs diagnostics on your SpecRails installation and reports any issues. See the [specrails doctor reference](./specrails-doctor) for the full list of checks, output format, and remediation steps.

**Examples:**

```bash
# Run diagnostics
npx specrails-core doctor

# Verbose output (recommended when filing a bug report)
npx specrails-core doctor --verbose
```

**Exit codes:** `0` if all checks pass. `1` if any check fails.

> **Full reference:** The `doctor` command has its own dedicated page. See [specrails doctor — Diagnostics Reference](./specrails-doctor) for checks, output examples, and a common issues table.

**See also:** [`init`](#specrails-init), [specrails doctor reference](./specrails-doctor)

---

## `specrails implement`

**Synopsis:** `/specrails:implement "<description>" [options]`
**Alias:** `/specrails:run "<description>" [options]`

**Description:** Runs the full agent pipeline for a feature. The pipeline goes: architect → developer → test writer → security reviewer → reviewer → pull request. Accepts a plain-language description or GitHub issue numbers.

**Options:**

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--dry-run` | boolean | `false` | Preview mode — writes output to `.claude/.dry-run/` instead of your working tree. No branches or PRs created. |

**Examples:**

```bash
# Implement from a plain description
/specrails:implement "add a health check endpoint"

# Implement from GitHub issues
/specrails:implement #42, #43

# Multiple issues in one run
/specrails:implement #42 #43 #44

# Preview what the pipeline would produce — no code written to working tree
/specrails:implement "add dark mode" --dry-run
```

**Pipeline stages:**

| Stage | Agent | What it does |
|-------|-------|-------------|
| 1 | sr-architect | Reads the spec and your stack, designs the implementation |
| 2 | sr-developer | Writes code following your project's conventions |
| 3 | sr-test-writer | Adds tests — happy path, edge cases, error responses |
| 4 | sr-security-reviewer | Scans for injection, auth bypass, exposed secrets |
| 5 | sr-reviewer | Runs your CI commands (`npm test`, etc.) and fixes failures |
| 6 | — | Opens a pull request to your repository |

**Expected output (final step):**

```
✔ PR created: https://github.com/your-org/your-project/pull/47
  "feat: add health check endpoint"
  3 files changed, 42 additions
```

**See also:** [`preview`](#specrails-preview), [`enrich`](#specrails-enrich)

---

## `specrails preview`

**Synopsis:** `/specrails:implement "<description>" --dry-run`

**Description:** Runs the full agent pipeline in dry-run mode. Output is written to `.claude/.dry-run/` instead of your working tree. No branches are created, no PRs are opened. Use this to review what SpecRails would produce before committing.

**Options:**

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--dry-run` | boolean | required | Activates preview mode |

**Examples:**

```bash
# Preview a feature before applying
/specrails:implement "add dark mode" --dry-run

# Inspect the dry-run output
ls .claude/.dry-run/
```

**Applying a preview**

After reviewing the dry-run output, run the same command without `--dry-run` to apply it to your working tree:

```bash
# Apply the same feature for real
/specrails:implement "add dark mode"
```

**See also:** [`implement`](#specrails-implement)

---

## `specrails update`

**Synopsis:** `npx specrails-core@latest update`

**Description:** Updates `specrails-core` to the latest release. Re-installs agent definitions and templates from the new version while preserving your project-specific configuration in `.claude/`.

**Examples:**

```bash
# Update to the latest release
npx specrails-core@latest update
```

**What is preserved:**

- `specrails.config.json` — your agent configuration is not overwritten
- Project-specific content generated by `/specrails:enrich` — personas, stack profile, custom agent instructions
- Any local changes you have made to agent files

**What is updated:**

- Core agent template files in `.claude/agents/`
- Built-in commands and slash command definitions
- The `bin/doctor.sh` health check script

After updating, run diagnostics to confirm everything is healthy:

```bash
npx specrails-core doctor
```

**See also:** [`doctor`](#specrails-doctor), [`init`](#specrails-init)

---

## Command summary

| Command | How to invoke | What it does |
|---------|--------------|-------------|
| `init` | `npx specrails-core@latest init` | Install SpecRails into a project |
| `enrich` | `/specrails:enrich` (Claude Code / Codex) | Configure your agent team via TUI |
| `doctor` | `npx specrails-core doctor` | Run diagnostics |
| `implement` | `/specrails:implement` (Claude Code / Codex) | Run the full pipeline for a feature |
| `preview` | `/specrails:implement ... --dry-run` (Claude Code / Codex) | Dry-run the pipeline — no code committed |
| `update` | `npx specrails-core@latest update` | Update to the latest release |

---

*For issues not covered here, open a discussion at [github.com/fjpulidop/specrails-core/discussions](https://github.com/fjpulidop/specrails-core/discussions).*
