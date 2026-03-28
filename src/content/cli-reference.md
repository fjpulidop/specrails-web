# SpecRails CLI Reference

<!-- specrails-web: docs slug=cli-reference -->

Command reference for `specrails-core`. All commands are run via `npx specrails-core` or inside Claude Code / OpenAI Codex as slash commands.

---

## `specrails init`

**Synopsis:** `npx specrails-core@latest init [options]`

**Description:** Installs SpecRails into your project directory. Copies agent definitions, templates, and the `/setup` wizard into `.claude/`. Does not modify your source code.

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
5. Prints next step: `Open Claude Code or Codex and run /setup`

**Expected output:**

```
✔ Checking prerequisites...
  ✔ git found
  ✔ Claude Code found
  ✔ npm found
✔ Installing SpecRails artifacts into .claude/
✔ Installed version 1.7.0
✔ Ready. Open Claude Code or Codex and run /setup to complete configuration.
```

**See also:** [`setup`](#specrails-setup), [`doctor`](#specrails-doctor)

---

## `specrails setup`

**Synopsis:** `/setup [--advanced]`

**Description:** Configures your SpecRails team. Run inside Claude Code or Codex after `init`. Defaults to Quick Start mode (3 questions). Use `--advanced` for the full 5-phase wizard.

**Options:**

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--advanced` | boolean | `false` | Run the full 5-phase configuration wizard instead of Quick Start |

**Quick Start mode (default)**

Asks exactly 3 questions, then auto-configures everything else with sensible defaults:

1. **What is this project?** (one sentence)
2. **Who are the target users?**
3. **Git access for agents?** (`read-only` or `read-write`)

Default configuration applied automatically:

| Setting | Value |
|---------|-------|
| Agents enabled | CEO, CTO, Tech Lead, founding-engineer |
| CLAUDE.md template | Minimal template populated from your answers |
| OpenSpec | Enabled if CLI detected, disabled otherwise |

After setup, the wizard suggests your first command based on project type:

```
✅ Setup complete.

Try your first spec:
  > /specrails:get-backlog-specs      ← new projects
  > /specrails:tech-audit            ← existing codebases
```

**Advanced mode**

```
/setup --advanced
```

Runs the full 5-phase wizard:

| Phase | What happens |
|-------|-------------|
| 1. Codebase Analysis | Reads file extensions, dependencies, CI config — builds a stack profile |
| 2. User Personas | Creates 2–4 fictional-but-realistic user personas for feature scoring |
| 3. Configuration | Backlog provider, git workflow, agent selection |
| 4. File Generation | Fills all templates with your project data — no placeholder strings remain |
| 5. Cleanup | Removes the wizard itself, leaves only final production files |

**Examples:**

```bash
# Inside Claude Code or Codex — Quick Start (recommended for new users)
/setup

# Inside Claude Code or Codex — full wizard
/setup --advanced
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

**See also:** [`preview`](#specrails-preview), [`setup`](#specrails-setup)

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
- Project-specific content generated by `/setup` — personas, stack profile, custom agent instructions
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
| `setup` | `/setup` (Claude Code / Codex) | Configure your agent team |
| `doctor` | `npx specrails-core doctor` | Run diagnostics |
| `implement` | `/specrails:implement` (Claude Code / Codex) | Run the full pipeline for a feature |
| `preview` | `/specrails:implement ... --dry-run` (Claude Code / Codex) | Dry-run the pipeline — no code committed |
| `update` | `npx specrails-core@latest update` | Update to the latest release |

---

*For issues not covered here, open a discussion at [github.com/fjpulidop/specrails-core/discussions](https://github.com/fjpulidop/specrails-core/discussions).*
