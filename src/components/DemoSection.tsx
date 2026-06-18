import { useEffect, useRef, useState, useCallback } from "react";
import { RotateCcw, FastForward, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { ProductFrame } from "@/components/ProductFrame";
import { CopyButton } from "@/components/CopyButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TermLine {
  text: string;
  color: string;
  delay: number;
  /** Wide ASCII tables are dropped from the curated mobile subset. */
  mobile?: boolean;
}

const COMMAND = "/specrails:implement #7, #11, #9";

const CHAR_DELAY = 8;
const LINE_PAUSE = 120;
const SECTION_PAUSE = 400;
const TABLE_LINE_PAUSE = 60;

function buildLines(): TermLine[] {
  const lines: TermLine[] = [];
  let t = 0;

  const add = (text: string, color: string, pause = LINE_PAUSE, mobile = true) => {
    lines.push({ text, color, delay: t, mobile });
    t += pause;
  };
  const section = (text: string, color: string) => {
    add("", "text-dracula-fg", SECTION_PAUSE);
    add(text, color, SECTION_PAUSE);
  };
  // Wide ASCII tables: shown on desktop, dropped from the curated mobile subset.
  const tbl = (text: string, color = "text-dracula-fg") =>
    add(text, color, TABLE_LINE_PAUSE, false);

  // Command
  add("$ /specrails:implement #7, #11, #9", "text-dracula-green", 600);
  add("", "text-dracula-fg", 200);
  add(
    "Implementation Pipeline — sr-architect → sr-developer → sr-reviewer across 3 features in parallel.",
    "text-dracula-purple",
    SECTION_PAUSE
  );

  // Phase -1
  section("── Phase -1: Environment Setup", "text-dracula-cyan");
  tbl("┌────────────────┬──────────┬────────────────────────┐");
  tbl("│ Tool           │ Status   │ Notes                  │");
  tbl("├────────────────┼──────────┼────────────────────────┤");
  tbl("│ GitHub CLI      │ ✅ ok    │ Backlog provider       │", "text-dracula-green");
  tbl("│ OpenSpec        │ ✅ ok    │ v1.1.1                 │", "text-dracula-green");
  tbl("│ patch           │ ✅ ok    │ For merge strategy B   │", "text-dracula-green");
  tbl("│ Dependencies    │ ✅ ok    │ Pre-code phase         │", "text-dracula-green");
  tbl("│ Test runner     │ n/a     │ Not configured         │", "text-dracula-comment");
  tbl("└────────────────┴──────────┴────────────────────────┘");

  // Phase 0
  section("── Phase 0: Parse Input — Fetching Issues", "text-dracula-cyan");
  add("3 issues fetched from GitHub. Multi-feature mode (SINGLE_MODE=false).", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  tbl("┌─────┬──────────────────────────────────┬────────────┬─────────┐");
  tbl("│ #   │ Title                            │ Area       │ Effort  │");
  tbl("├─────┼──────────────────────────────────┼────────────┼─────────┤");
  tbl("│ #7  │ Auto-Doc Sync Agent              │ Agents     │ Medium  │", "text-dracula-purple");
  tbl("│ #11 │ Refactor Priority Recommender     │ Commands   │ High    │", "text-dracula-orange");
  tbl("│ #9  │ Codebase Health Check Dashboard   │ Commands   │ Medium  │", "text-dracula-pink");
  tbl("└─────┴──────────────────────────────────┴────────────┴─────────┘");

  // Phase 3a
  section("── Phase 3a: Architect (parallel)", "text-dracula-cyan");
  add("Launching 3 sr-architect agents in parallel to create OpenSpec artifacts.", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  tbl("┌─────────────┬──────────────────────────────────┬───────────────────────────────────────────────┐");
  tbl("│ Agent          │ Feature                          │ Target Directory                            │");
  tbl("├─────────────┼──────────────────────────────────┼─────────────────────────────────────────────┤");
  tbl("│ sr-architect   │ #7 Auto-Doc Sync Agent           │ openspec/changes/auto-doc-sync-agent/        │", "text-dracula-purple");
  tbl("│ sr-architect   │ #11 Refactor Priority Recommender│ openspec/changes/refactor-recommender/       │", "text-dracula-orange");
  tbl("│ sr-architect   │ #9 Health Check Dashboard        │ openspec/changes/health-check-dashboard/     │", "text-dracula-pink");
  tbl("└─────────────┴──────────────────────────────────┴─────────────────────────────────────────────┘");

  // Agent completions
  add("", "text-dracula-fg", SECTION_PAUSE);
  add("Agent completions:", "text-dracula-yellow");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add(
    "✓ #11 Refactor Recommender — completed first. Created proposal.md, design.md,",
    "text-dracula-green"
  );
  add(
    "  tasks.md (4 sequential tasks), context-bundle.md with complete command specification.",
    "text-dracula-green"
  );
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add(
    "✓ #7 Auto-Doc Sync Agent — completed. Created proposal.md, design.md (detection",
    "text-dracula-green"
  );
  add(
    "  matrix, style learning protocol), tasks.md (6 tasks), context-bundle.md.",
    "text-dracula-green"
  );
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add(
    "✓ #9 Health Check Dashboard — completed. Created proposal.md, design.md",
    "text-dracula-green"
  );
  add(
    "  (six-check architecture, grading rubric), tasks.md (8 tasks T1–T8), context-bundle.md.",
    "text-dracula-green"
  );

  // Shared file analysis
  add("", "text-dracula-fg", SECTION_PAUSE);
  add("No shared files detected. All features modify independent files.", "text-dracula-fg");
  add("Merge order: auto-doc-sync-agent → refactor-recommender → health-check-dashboard", "text-dracula-comment");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("Pre-validation: All 3 features have complete artifacts. ✅", "text-dracula-green");

  // Phase 3b
  section("── Phase 3b: Implement (parallel, worktrees)", "text-dracula-cyan");
  add("Launching 3 sr-developer agents in isolated worktrees.", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  tbl("┌─────────────┬──────────────────────────────────┬─────────────────────┬────────────┐");
  tbl("│ Agent          │ Feature                          │ Isolation            │ Mode       │");
  tbl("├─────────────┼──────────────────────────────────┼─────────────────────┼────────────┤");
  tbl("│ sr-developer   │ #7 Auto-Doc Sync Agent           │ worktree agent-ac47  │ background │", "text-dracula-purple");
  tbl("│ sr-developer   │ #11 Refactor Priority Recommender│ worktree agent-af8a  │ background │", "text-dracula-orange");
  tbl("│ sr-developer   │ #9 Health Check Dashboard        │ worktree agent-a0b3  │ background │", "text-dracula-pink");
  tbl("└─────────────┴──────────────────────────────────┴─────────────────────┴────────────┘");

  // Implementation completions
  add("", "text-dracula-fg", SECTION_PAUSE);
  add("✓ #11 Refactor Priority Recommender — completed (61s)", "text-dracula-green");
  add("  Created: templates/commands/sr/refactor-recommender.md", "text-dracula-fg");
  add("  Created: .claude/commands/sr/refactor-recommender.md", "text-dracula-fg");
  add("  Verification: template has expected placeholders, instance has none. ✅", "text-dracula-green");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("✓ #7 Auto-Doc Sync Agent — completed (160s)", "text-dracula-green");
  add("  Created: templates/agents/sr-doc-sync.md", "text-dracula-fg");
  add("  Created: .claude/agents/sr-doc-sync.md", "text-dracula-fg");
  add("  Created: .claude/agent-memory/sr-doc-sync/MEMORY.md", "text-dracula-fg");
  add("  Modified: templates/commands/sr/implement.md (added Phase 3d)", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("✓ #9 Health Check Dashboard — completed (338s)", "text-dracula-green");
  add("  Created: templates/commands/sr/health-check.md (396 lines)", "text-dracula-fg");
  add("  Created: .claude/commands/sr/health-check.md", "text-dracula-fg");
  add("  Created: .claude/health-history/.gitkeep", "text-dracula-fg");
  add("  Verification: zero unresolved placeholders in instance. ✅", "text-dracula-green");

  // Phase 3c
  section("── Phase 3c: Write Tests", "text-dracula-cyan");
  add("Skipped — no test framework configured (pre-code phase).", "text-dracula-comment");

  // Phase 4a
  section("── Phase 4a: Merge Worktree Changes", "text-dracula-cyan");
  add("No shared files — all features modify independent files.", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  tbl("┌──────────────────┬──────────────────────────────────────────────────┐");
  tbl("│ Status           │ Files                                            │");
  tbl("├──────────────────┼──────────────────────────────────────────────────┤");
  tbl("│ Cleanly merged   │ templates/agents/sr-doc-sync.md (new)                │", "text-dracula-green");
  tbl("│ Cleanly merged   │ .claude/agents/sr-doc-sync.md (new)                  │", "text-dracula-green");
  tbl("│ Cleanly merged   │ .claude/agent-memory/sr-doc-sync/MEMORY.md (new)     │", "text-dracula-green");
  tbl("│ Cleanly merged   │ templates/commands/sr/implement.md (modified)         │", "text-dracula-green");
  tbl("│ Cleanly merged   │ templates/commands/sr/refactor-recommender.md (new)   │", "text-dracula-green");
  tbl("│ Cleanly merged   │ .claude/commands/sr/refactor-recommender.md (new)     │", "text-dracula-green");
  tbl("│ Cleanly merged   │ templates/commands/sr/health-check.md (new)           │", "text-dracula-green");
  tbl("│ Cleanly merged   │ .claude/commands/sr/health-check.md (new)             │", "text-dracula-green");
  tbl("│ Cleanly merged   │ .claude/health-history/.gitkeep (new)              │", "text-dracula-green");
  tbl("└──────────────────┴──────────────────────────────────────────────────┘");
  add("No merge conflicts. Worktrees cleaned up.", "text-dracula-green");

  // Phase 4b
  section("── Phase 4b: Reviewer", "text-dracula-cyan");
  add("Launched reviewer agent to validate ALL merged changes.", "text-dracula-fg");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  tbl("┌──────────────────────────────────┬──────────┬────────────────────────┐");
  tbl("│ Check                            │ Status   │ Notes                  │");
  tbl("├──────────────────────────────────┼──────────┼────────────────────────┤");
  tbl("│ File naming (kebab-case)          │ ✅ pass  │ All 7 files kebab-case │", "text-dracula-green");
  tbl("│ Template placeholder integrity    │ ✅ pass  │ Tokens as expected     │", "text-dracula-green");
  tbl("│ Instance placeholder integrity    │ ✅ pass  │ No unresolved tokens   │", "text-dracula-green");
  tbl("│ YAML frontmatter                  │ ✅ pass  │ All 6 files valid      │", "text-dracula-green");
  tbl("│ Phase 3d positioning              │ ✅ pass  │ Correctly positioned   │", "text-dracula-green");
  tbl("│ Doc-sync color                    │ ✅ pass  │ Fixed green → yellow   │", "text-dracula-yellow");
  tbl("└──────────────────────────────────┴──────────┴────────────────────────┘");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("All 3 OpenSpec changes marked as shipped.", "text-dracula-fg");
  add("Final verdict: PASS ✅", "text-dracula-green");

  // Phase 4c
  section("── Phase 4c: Ship", "text-dracula-cyan");
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
  section("── Phase 4e: Pipeline Report", "text-dracula-cyan");
  tbl("┌────────────┬────────────────────────┬───────────┬───────────┬──────────┬───────────┐");
  tbl("│ Feature    │ Change Name              │ Architect │ Developer │ Reviewer │ Status    │");
  tbl("├────────────┼────────────────────────┼───────────┼───────────┼──────────┼───────────┤");
  tbl("│ #7 Agent   │ auto-doc-sync-agent      │ ok        │ ok        │ ok (fix) │ Shipped   │", "text-dracula-green");
  tbl("│ #11 Cmd    │ refactor-recommender     │ ok        │ ok        │ ok       │ Shipped   │", "text-dracula-green");
  tbl("│ #9 Cmd     │ health-check-dashboard   │ ok        │ ok        │ ok       │ Shipped   │", "text-dracula-green");
  tbl("└────────────┴────────────────────────┴───────────┴───────────┴──────────┴───────────┘");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("PR: https://github.com/fjpulidop/specrails-core/pull/31", "text-dracula-purple");
  add("", "text-dracula-fg", TABLE_LINE_PAUSE);
  add("Pipeline completed successfully. 3 features shipped. ✅", "text-dracula-green", 0);

  return lines;
}

const terminalLines = buildLines();
const mobileLines = terminalLines.filter((l) => l.mobile !== false);
const TOTAL_DURATION =
  terminalLines.length > 0 ? terminalLines[terminalLines.length - 1].delay : 0;

const DemoSection = () => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const [visibleLines, setVisibleLines] = useState(0);
  const [running, setRunning] = useState(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  // Schedule the char-by-char (line-by-line) reveal using each line's delay.
  const play = useCallback(() => {
    clearTimers();
    if (reduced) {
      // Reduced motion: render the entire transcript instantly.
      setVisibleLines(terminalLines.length);
      setRunning(false);
      return;
    }
    setVisibleLines(0);
    setRunning(true);
    timers.current = terminalLines.map((line, i) =>
      window.setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === terminalLines.length - 1) setRunning(false);
      }, line.delay),
    );
  }, [clearTimers, reduced]);

  const skip = useCallback(() => {
    clearTimers();
    setVisibleLines(terminalLines.length);
    setRunning(false);
  }, [clearTimers]);

  // Restart whenever the section (re)enters the viewport; pause on exit.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (reduced) {
      setVisibleLines(terminalLines.length);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
        } else {
          clearTimers();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [play, clearTimers, reduced]);

  // Auto-scroll to bottom as new lines stream in.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const showCaret = running && visibleLines < terminalLines.length;

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="section-spacious section-darker overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Reveal>
            <p className="eyebrow mb-3">Demo proof</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="section-heading">
              Describe it.{" "}
              <span className="gradient-text">Watch it ship.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              One spec, idea → reviewed PR, in a single run. A real{" "}
              <span className="font-mono text-foreground">/specrails:implement</span>{" "}
              run inside Claude Code — architect, developer and reviewer agents
              moving three GitHub issues down the pipeline in parallel, all the
              way to an open PR.
            </p>
          </Reveal>
        </div>

        {/* Terminal frame = the CLI track */}
        <Reveal delay={300}>
          <ProductFrame label="specrails — /specrails:implement">
            {/* Command bar with copy + transport controls */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-surface-1/40">
              <Terminal className="w-3.5 h-3.5 text-brand-cyan shrink-0" aria-hidden="true" />
              <code className="font-mono text-[11px] md:text-xs text-foreground/80 truncate">
                {COMMAND}
              </code>
              <div className="ml-auto flex items-center gap-1.5 shrink-0">
                <CopyButton value={COMMAND} label="Copy the command" />
                {!reduced && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={play}
                      className="h-8 gap-1.5 px-2.5 text-xs font-mono border-border/50 bg-surface-1/60"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">Replay</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={skip}
                      disabled={!showCaret}
                      className="h-8 gap-1.5 px-2.5 text-xs font-mono border-border/50 bg-surface-1/60"
                    >
                      <FastForward className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">Skip</span>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Desktop transcript: full, monospaced, vertical scroll */}
            <div
              ref={scrollRef}
              className="hidden md:block px-5 py-4 text-left text-[13px] leading-relaxed overflow-y-auto overscroll-contain h-[clamp(320px,46vh,560px)]"
            >
              <pre className="font-mono whitespace-pre" aria-label="specrails implement pipeline transcript">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <div
                    key={i}
                    className={line.color}
                    style={{ minHeight: line.text === "" ? "0.75rem" : undefined }}
                  >
                    {line.text || " "}
                  </div>
                ))}
              </pre>
              {showCaret && (
                <span className="inline-block w-2 h-4 align-middle bg-brand-cyan animate-caret" aria-hidden="true" />
              )}
            </div>

            {/* Mobile transcript: curated subset, horizontal scroll, left-fade mask */}
            <div className="md:hidden relative">
              <div
                className="overflow-x-auto overflow-y-auto overscroll-contain px-5 py-4 h-[320px]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0, #000 1.5rem)",
                  maskImage:
                    "linear-gradient(to right, transparent 0, #000 1.5rem)",
                }}
              >
                <pre className="font-mono whitespace-pre text-[10px] leading-relaxed" aria-hidden="true">
                  {mobileLines.map((line, i) => {
                    // On mobile we reveal the curated subset in lockstep with the
                    // full transcript's progress so Replay/Skip still drive it.
                    const fullIndex = terminalLines.indexOf(line);
                    const shown = fullIndex < visibleLines;
                    if (!shown) return null;
                    return (
                      <div
                        key={i}
                        className={cn(line.color)}
                        style={{ minHeight: line.text === "" ? "0.6rem" : undefined }}
                      >
                        {line.text || " "}
                      </div>
                    );
                  })}
                  {showCaret && (
                    <span className="inline-block w-1.5 h-3 align-middle bg-brand-cyan animate-caret" />
                  )}
                </pre>
              </div>
            </div>
          </ProductFrame>
        </Reveal>

        {/* Caption — keep the metaphor felt, not buzzwordy */}
        <Reveal delay={300}>
          <p className="mt-5 text-center text-xs font-mono text-muted-foreground">
            Describe it. Watch it ship. — one spec, idea → reviewed PR, in a single run. Stations 1:1 with the pipeline above.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default DemoSection;
