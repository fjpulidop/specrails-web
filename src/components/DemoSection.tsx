import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState, useRef } from "react";

interface TermLine {
  text: string;
  color: string;
  delay: number;
}

const CHAR_DELAY = 8;
const LINE_PAUSE = 120;
const SECTION_PAUSE = 400;
const TABLE_LINE_PAUSE = 60;

function buildLines(): TermLine[] {
  const lines: TermLine[] = [];
  let t = 0;

  const add = (text: string, color: string, pause = LINE_PAUSE) => {
    lines.push({ text, color, delay: t });
    t += pause;
  };
  const section = (text: string, color: string) => {
    add("", "text-dracula-fg", SECTION_PAUSE);
    add(text, color, SECTION_PAUSE);
  };
  const tbl = (text: string, color = "text-dracula-fg") =>
    add(text, color, TABLE_LINE_PAUSE);

  // Command
  add("$ /sr:implement #7, #11, #9", "text-dracula-green", 600);
  add("", "text-dracula-fg", 200);
  add(
    "Implementation Pipeline \u2014 sr-architect \u2192 sr-developer \u2192 sr-reviewer across 3 features in parallel.",
    "text-dracula-purple",
    SECTION_PAUSE
  );

  // Phase -1
  section("\u2500\u2500 Phase -1: Environment Setup", "text-dracula-cyan");
  tbl("\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510");
  tbl("\u2502 Tool           \u2502 Status   \u2502 Notes                  \u2502");
  tbl("\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524");
  tbl("\u2502 GitHub CLI      \u2502 \u2705 ok    \u2502 Backlog provider       \u2502", "text-dracula-green");
  tbl("\u2502 OpenSpec        \u2502 \u2705 ok    \u2502 v1.1.1                 \u2502", "text-dracula-green");
  tbl("\u2502 patch           \u2502 \u2705 ok    \u2502 For merge strategy B   \u2502", "text-dracula-green");
  tbl("\u2502 Dependencies    \u2502 \u2705 ok    \u2502 Pre-code phase         \u2502", "text-dracula-green");
  tbl("\u2502 Test runner     \u2502 n/a     \u2502 Not configured         \u2502", "text-dracula-comment");
  tbl("\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518");

  // Phase 0
  section("\u2500\u2500 Phase 0: Parse Input \u2014 Fetching Issues", "text-dracula-cyan");
  add("3 issues fetched from GitHub. Multi-feature mode (SINGLE_MODE=false).", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  tbl("\u250c\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510");
  tbl("\u2502 #   \u2502 Title                            \u2502 Area       \u2502 Effort  \u2502");
  tbl("\u251c\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524");
  tbl("\u2502 #7  \u2502 Auto-Doc Sync Agent              \u2502 Agents     \u2502 Medium  \u2502", "text-dracula-purple");
  tbl("\u2502 #11 \u2502 Refactor Priority Recommender     \u2502 Commands   \u2502 High    \u2502", "text-dracula-orange");
  tbl("\u2502 #9  \u2502 Codebase Health Check Dashboard   \u2502 Commands   \u2502 Medium  \u2502", "text-dracula-pink");
  tbl("\u2514\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518");

  // Phase 3a
  section("\u2500\u2500 Phase 3a: Architect (parallel)", "text-dracula-cyan");
  add("Launching 3 sr-architect agents in parallel to create OpenSpec artifacts.", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  tbl("\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510");
  tbl("\u2502 Agent          \u2502 Feature                          \u2502 Target Directory                            \u2502");
  tbl("\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524");
  tbl("\u2502 sr-architect   \u2502 #7 Auto-Doc Sync Agent           \u2502 openspec/changes/auto-doc-sync-agent/        \u2502", "text-dracula-purple");
  tbl("\u2502 sr-architect   \u2502 #11 Refactor Priority Recommender\u2502 openspec/changes/refactor-recommender/       \u2502", "text-dracula-orange");
  tbl("\u2502 sr-architect   \u2502 #9 Health Check Dashboard        \u2502 openspec/changes/health-check-dashboard/     \u2502", "text-dracula-pink");
  tbl("\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518");

  // Agent completions
  add("", "text-dracula-fg", SECTION_PAUSE);
  add("Agent completions:", "text-dracula-yellow");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add(
    "\u2713 #11 Refactor Recommender \u2014 completed first. Created proposal.md, design.md,",
    "text-dracula-green"
  );
  add(
    "  tasks.md (4 sequential tasks), context-bundle.md with complete command specification.",
    "text-dracula-green"
  );
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add(
    "\u2713 #7 Auto-Doc Sync Agent \u2014 completed. Created proposal.md, design.md (detection",
    "text-dracula-green"
  );
  add(
    "  matrix, style learning protocol), tasks.md (6 tasks), context-bundle.md.",
    "text-dracula-green"
  );
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add(
    "\u2713 #9 Health Check Dashboard \u2014 completed. Created proposal.md, design.md",
    "text-dracula-green"
  );
  add(
    "  (six-check architecture, grading rubric), tasks.md (8 tasks T1\u2013T8), context-bundle.md.",
    "text-dracula-green"
  );

  // Shared file analysis
  add("", "text-dracula-fg", SECTION_PAUSE);
  add("No shared files detected. All features modify independent files.", "text-dracula-fg");
  add("Merge order: auto-doc-sync-agent \u2192 refactor-recommender \u2192 health-check-dashboard", "text-dracula-comment");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("Pre-validation: All 3 features have complete artifacts. \u2705", "text-dracula-green");

  // Phase 3b
  section("\u2500\u2500 Phase 3b: Implement (parallel, worktrees)", "text-dracula-cyan");
  add("Launching 3 sr-developer agents in isolated worktrees.", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  tbl("\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510");
  tbl("\u2502 Agent          \u2502 Feature                          \u2502 Isolation            \u2502 Mode       \u2502");
  tbl("\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524");
  tbl("\u2502 sr-developer   \u2502 #7 Auto-Doc Sync Agent           \u2502 worktree agent-ac47  \u2502 background \u2502", "text-dracula-purple");
  tbl("\u2502 sr-developer   \u2502 #11 Refactor Priority Recommender\u2502 worktree agent-af8a  \u2502 background \u2502", "text-dracula-orange");
  tbl("\u2502 sr-developer   \u2502 #9 Health Check Dashboard        \u2502 worktree agent-a0b3  \u2502 background \u2502", "text-dracula-pink");
  tbl("\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518");

  // Implementation completions
  add("", "text-dracula-fg", SECTION_PAUSE);
  add("\u2713 #11 Refactor Priority Recommender \u2014 completed (61s)", "text-dracula-green");
  add("  Created: templates/commands/sr/refactor-recommender.md", "text-dracula-fg");
  add("  Created: .claude/commands/sr/refactor-recommender.md", "text-dracula-fg");
  add("  Verification: template has expected placeholders, instance has none. \u2705", "text-dracula-green");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("\u2713 #7 Auto-Doc Sync Agent \u2014 completed (160s)", "text-dracula-green");
  add("  Created: templates/agents/sr-doc-sync.md", "text-dracula-fg");
  add("  Created: .claude/agents/sr-doc-sync.md", "text-dracula-fg");
  add("  Created: .claude/agent-memory/sr-doc-sync/MEMORY.md", "text-dracula-fg");
  add("  Modified: templates/commands/sr/implement.md (added Phase 3d)", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("\u2713 #9 Health Check Dashboard \u2014 completed (338s)", "text-dracula-green");
  add("  Created: templates/commands/sr/health-check.md (396 lines)", "text-dracula-fg");
  add("  Created: .claude/commands/sr/health-check.md", "text-dracula-fg");
  add("  Created: .claude/health-history/.gitkeep", "text-dracula-fg");
  add("  Verification: zero unresolved placeholders in instance. \u2705", "text-dracula-green");

  // Phase 3c
  section("\u2500\u2500 Phase 3c: Write Tests", "text-dracula-cyan");
  add("Skipped \u2014 no test framework configured (pre-code phase).", "text-dracula-comment");

  // Phase 4a
  section("\u2500\u2500 Phase 4a: Merge Worktree Changes", "text-dracula-cyan");
  add("No shared files \u2014 all features modify independent files.", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  tbl("\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510");
  tbl("\u2502 Status           \u2502 Files                                            \u2502");
  tbl("\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524");
  tbl("\u2502 Cleanly merged   \u2502 templates/agents/sr-doc-sync.md (new)                \u2502", "text-dracula-green");
  tbl("\u2502 Cleanly merged   \u2502 .claude/agents/sr-doc-sync.md (new)                  \u2502", "text-dracula-green");
  tbl("\u2502 Cleanly merged   \u2502 .claude/agent-memory/sr-doc-sync/MEMORY.md (new)     \u2502", "text-dracula-green");
  tbl("\u2502 Cleanly merged   \u2502 templates/commands/sr/implement.md (modified)         \u2502", "text-dracula-green");
  tbl("\u2502 Cleanly merged   \u2502 templates/commands/sr/refactor-recommender.md (new)   \u2502", "text-dracula-green");
  tbl("\u2502 Cleanly merged   \u2502 .claude/commands/sr/refactor-recommender.md (new)     \u2502", "text-dracula-green");
  tbl("\u2502 Cleanly merged   \u2502 templates/commands/sr/health-check.md (new)           \u2502", "text-dracula-green");
  tbl("\u2502 Cleanly merged   \u2502 .claude/commands/sr/health-check.md (new)             \u2502", "text-dracula-green");
  tbl("\u2502 Cleanly merged   \u2502 .claude/health-history/.gitkeep (new)              \u2502", "text-dracula-green");
  tbl("\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518");
  add("No merge conflicts. Worktrees cleaned up.", "text-dracula-green");

  // Phase 4b
  section("\u2500\u2500 Phase 4b: Reviewer", "text-dracula-cyan");
  add("Launched reviewer agent to validate ALL merged changes.", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  tbl("\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510");
  tbl("\u2502 Check                            \u2502 Status   \u2502 Notes                  \u2502");
  tbl("\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524");
  tbl("\u2502 File naming (kebab-case)          \u2502 \u2705 pass  \u2502 All 7 files kebab-case \u2502", "text-dracula-green");
  tbl("\u2502 Template placeholder integrity    \u2502 \u2705 pass  \u2502 Tokens as expected     \u2502", "text-dracula-green");
  tbl("\u2502 Instance placeholder integrity    \u2502 \u2705 pass  \u2502 No unresolved tokens   \u2502", "text-dracula-green");
  tbl("\u2502 YAML frontmatter                  \u2502 \u2705 pass  \u2502 All 6 files valid      \u2502", "text-dracula-green");
  tbl("\u2502 Phase 3d positioning              \u2502 \u2705 pass  \u2502 Correctly positioned   \u2502", "text-dracula-green");
  tbl("\u2502 Doc-sync color                    \u2502 \u2705 pass  \u2502 Fixed green \u2192 yellow   \u2502", "text-dracula-yellow");
  tbl("\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("All 3 OpenSpec changes marked as shipped.", "text-dracula-fg");
  add("Final verdict: PASS \u2705", "text-dracula-green");

  // Phase 4c
  section("\u2500\u2500 Phase 4c: Ship", "text-dracula-cyan");
  add("Branch created: feat/backlog-sprint-7-9-11", "text-dracula-purple");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("3 commits (one per feature):", "text-dracula-fg");
  add("  66f18ac feat: add doc-sync agent for automated documentation updates (#7)", "text-dracula-green");
  add("  48d5611 feat: add refactor-recommender command for tech debt analysis (#11)", "text-dracula-green");
  add("  4b1e846 feat: add health-check dashboard command for quality monitoring (#9)", "text-dracula-green");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("Pushed to remote. PR created.", "text-dracula-fg");
  add("Comments added to issues #7, #9, #11 referencing PR #31.", "text-dracula-fg");
  add("PR body includes Closes #7, Closes #9, Closes #11 for merge-time closure.", "text-dracula-comment");

  // Phase 4e
  section("\u2500\u2500 Phase 4e: Pipeline Report", "text-dracula-cyan");
  tbl("\u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510");
  tbl("\u2502 Feature    \u2502 Change Name              \u2502 Architect \u2502 Developer \u2502 Reviewer \u2502 Status    \u2502");
  tbl("\u251c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524");
  tbl("\u2502 #7 Agent   \u2502 auto-doc-sync-agent      \u2502 ok        \u2502 ok        \u2502 ok (fix) \u2502 Shipped   \u2502", "text-dracula-green");
  tbl("\u2502 #11 Cmd    \u2502 refactor-recommender     \u2502 ok        \u2502 ok        \u2502 ok       \u2502 Shipped   \u2502", "text-dracula-green");
  tbl("\u2502 #9 Cmd     \u2502 health-check-dashboard   \u2502 ok        \u2502 ok        \u2502 ok       \u2502 Shipped   \u2502", "text-dracula-green");
  tbl("\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("PR: https://github.com/fjpulidop/specrails-core/pull/31", "text-dracula-purple");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("Pipeline completed successfully. 3 features shipped. \u2705", "text-dracula-green", 0);

  return lines;
}

const terminalLines = buildLines();

const DemoSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Start animation when section scrolls into view
  useEffect(() => {
    if (isVisible && !started) {
      setStarted(true);
    }
  }, [isVisible, started]);

  // Animate lines
  useEffect(() => {
    if (!started) return;
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [started]);

  // Auto-scroll to bottom as new lines appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <section id="demo" className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          See it in <span className="gradient-text">Action</span>
        </h2>
        <p
          className={`text-center text-muted-foreground mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          One command. Three features. Fully autonomous.
        </p>

        <div
          className={`terminal p-0 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20">
            <div className="terminal-dot bg-dracula-red" />
            <div className="terminal-dot bg-dracula-yellow" />
            <div className="terminal-dot bg-dracula-green" />
            <span className="text-xs text-muted-foreground ml-2">
              specrails — /sr:implement
            </span>
          </div>

          {/* Terminal body with fixed height and scroll */}
          <div
            ref={scrollRef}
            className="p-4 text-left text-xs md:text-sm leading-relaxed overflow-y-auto overscroll-contain"
            style={{ height: "clamp(240px, 30vh, 320px)" }}
          >
            <div className="font-mono whitespace-pre">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={line.color} style={{ minHeight: line.text === "" ? "0.75rem" : undefined }}>
                  {line.text}
                </div>
              ))}
              {started && visibleLines < terminalLines.length && (
                <span className="inline-block w-2 h-4 bg-dracula-green animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
