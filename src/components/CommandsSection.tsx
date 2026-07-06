import { Reveal } from "@/components/Reveal";
import { ProductFrame } from "@/components/ProductFrame";
import { CopyButton } from "@/components/CopyButton";

interface CommandEntry {
  /** Full slash command, used verbatim for the copy action. */
  cmd: string;
  /** One-line rationale, rendered as a terminal comment. */
  desc: string;
  /** Short inline tag shown beside the command. */
  tag: string;
}

const commands: CommandEntry[] = [
  {
    cmd: "/specrails:enrich",
    desc: "Interactive TUI installer — select agents, choose models, configure your team. Use --from-config for non-interactive setup.",
    tag: "setup",
  },
  {
    cmd: "/specrails:implement",
    desc: "The flagship command. Runs the full pipeline end-to-end: architecture, implementation, review, ship.",
    tag: "pipeline",
  },
  {
    cmd: "/specrails:batch-implement",
    desc: "Multi-feature orchestrator. Builds the dependency graph, detects cycles, executes in waves (Kahn's algorithm).",
    tag: "multi-feature",
  },
  {
    cmd: "/specrails:get-backlog-specs",
    desc: "Backlog prioritized by VPC scoring against personas. Parses prerequisites and topologically sorts for safe ordering.",
    tag: "product",
  },
  {
    cmd: "/specrails:auto-propose-backlog-specs",
    desc: "Product discovery on autopilot — generates new feature ideas and opens GitHub Issues for the backlog.",
    tag: "discovery",
  },
  {
    cmd: "/specrails:compat-check",
    desc: "Backwards-compatibility analyzer. Flags breaking API, schema and contract changes, then writes a migration guide.",
    tag: "compat",
  },
  {
    cmd: "/specrails:why",
    desc: "AI-powered in-context help. Search agent decision rationale and architectural explanations from the pipeline.",
    tag: "decisions",
  },
];

const CommandsSection = () => {
  return (
    <section id="commands" className="section-spacious section-darker">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="eyebrow mb-3">Slash commands</p>
          <h2 className="section-heading">
            Your whole team, <span className="gradient-text">one command away</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Every command runs inside Claude Code. Type a slash, drive the pipeline — from a single
            feature to an entire backlog.
          </p>
        </Reveal>

        <Reveal delay={100} className="max-w-4xl mx-auto">
          <ProductFrame chrome="mac" label="claude — specrails-core" interactive>
            {/* Horizontal-scroll safe: the inner track keeps a sane min width on
                very narrow screens instead of wrapping the mono command lines. */}
            <div className="overflow-x-auto">
              <ul className="min-w-[20rem] p-3 sm:p-5 text-sm font-mono divide-y divide-border/30">
                {commands.map((c) => (
                  <li
                    key={c.cmd}
                    className="group flex flex-col gap-1.5 rounded-md px-2 sm:px-3 py-3 transition-colors hover:bg-surface-3/60"
                  >
                    {/* Prompt line: caret + command + tag + copy */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span aria-hidden className="text-brand-violet shrink-0 select-none">
                        &gt;
                      </span>
                      <code className="text-brand-cyan font-medium whitespace-nowrap">
                        {c.cmd}
                      </code>
                      <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-rail border border-rail/40 whitespace-nowrap">
                        {c.tag}
                      </span>
                      <CopyButton
                        value={c.cmd}
                        label={`Copy ${c.cmd}`}
                        className="ml-auto h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 motion-reduce:opacity-100"
                      />
                    </div>
                    {/* Comment line: indented description, terminal-style */}
                    <p className="pl-5 sm:pl-6 text-muted-foreground/80 text-[13px] leading-relaxed">
                      <span aria-hidden className="select-none mr-1.5">
                        #
                      </span>
                      {c.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </ProductFrame>
        </Reveal>

        <Reveal delay={200} className="mt-6 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Tip: run{" "}
            <code className="text-brand-cyan">/specrails:implement</code> to drive the entire
            pipeline end-to-end.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default CommandsSection;
