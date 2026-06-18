import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldAlert } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Reveal } from "@/components/Reveal";
import { AGENTS, type AgentEntry, type PipelineStage } from "@/data/agents";
import { cn } from "@/lib/utils";

const AGENT_COUNT = AGENTS.length;
const CORE_COUNT = AGENTS.filter((a) => a.core).length;
const SPECIALIST_COUNT = AGENT_COUNT - CORE_COUNT;
const BLOCKERS = AGENTS.filter((a) => /BLOCK/i.test(a.desc));

const modelClass: Record<AgentEntry["model"], string> = {
  Opus: "bg-brand-violet/15 text-brand-violet border-brand-violet/30",
  Sonnet: "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30",
  Haiku: "bg-accent-success/15 text-accent-success border-accent-success/30",
};

/**
 * Maps each agent's legacy `glow` token to a theme-aware HSL expression used as
 * the `--agent-glow` CSS variable. Hover styling references the variable through
 * a single static Tailwind arbitrary class, so nothing depends on runtime class
 * strings (which Tailwind cannot compile).
 */
const glowVar: Record<string, string> = {
  "glow-purple": "var(--brand-violet)",
  "glow-pink": "var(--brand-violet)",
  "glow-cyan": "var(--brand-cyan)",
  "glow-green": "var(--accent-success)",
  "glow-orange": "var(--accent-warning)",
  "glow-yellow": "var(--accent-warning)",
  "glow-red": "var(--accent-danger)",
};

interface StageGroup {
  id: PipelineStage;
  label: string;
  blurb: string;
}

/** Pipeline order, rendered top-to-bottom along the rail. */
const STAGES: StageGroup[] = [
  { id: "discovery", label: "Discovery", blurb: "Find what is worth building." },
  { id: "design", label: "Design", blurb: "Turn intent into an ordered plan." },
  {
    id: "implementation",
    label: "Implementation",
    blurb: "Build it in parallel worktrees.",
  },
  { id: "testing", label: "Testing", blurb: "Prove it behaves." },
  { id: "review", label: "Review", blurb: "Gate quality, security and docs." },
  { id: "audit", label: "Audit", blurb: "Keep specs honest after ship." },
];

interface StatChip {
  value: string;
  label: string;
  danger?: boolean;
}

const STAT_CHIPS: StatChip[] = [
  { value: String(AGENT_COUNT), label: "agents" },
  { value: String(CORE_COUNT), label: "core, always run" },
  { value: String(SPECIALIST_COUNT), label: "optional specialists" },
  {
    value: String(BLOCKERS.length),
    label: "can BLOCK your ship",
    danger: true,
  },
];

function AgentCard({
  agent,
  onOpen,
}: {
  agent: AgentEntry;
  onOpen: (a: AgentEntry) => void;
}) {
  const Icon = agent.icon;
  return (
    <button
      type="button"
      onClick={() => onOpen(agent)}
      style={{ "--agent-glow": glowVar[agent.glow] } as CSSProperties}
      className={cn(
        "group/card relative w-full text-left rounded-card border border-border/70 bg-surface-2 p-4 min-h-[44px]",
        "transition-all duration-300 [transition-timing-function:var(--ease-out-soft)]",
        "hover:-translate-y-1 hover:border-[hsl(var(--agent-glow)/0.5)]",
        "hover:shadow-[0_0_0_1px_hsl(var(--agent-glow)/0.4),var(--glow-elevated)]",
        "focus-visible:-translate-y-1 focus-visible:border-[hsl(var(--agent-glow)/0.5)]",
        agent.core && "border-brand-cyan/40",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-surface-3 border border-border/30 transition-colors group-hover/card:border-[hsl(var(--agent-glow)/0.4)]"
          aria-hidden="true"
        >
          <Icon className={cn("h-4 w-4", agent.color)} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h4 className="text-sm font-semibold text-foreground">
              {agent.name}
            </h4>
            <span
              className={cn(
                "font-mono text-[10px] leading-none px-1.5 py-0.5 rounded-pill border",
                modelClass[agent.model],
              )}
            >
              {agent.model}
            </span>
            {agent.core ? (
              <span className="font-mono text-[10px] leading-none px-1.5 py-0.5 rounded-pill border border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan">
                core
              </span>
            ) : null}
            {/BLOCK/i.test(agent.desc) ? (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] leading-none px-1.5 py-0.5 rounded-pill border border-accent-danger/40 bg-accent-danger/10 text-accent-danger">
                <ShieldAlert className="h-3 w-3" aria-hidden="true" />
                can block
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {agent.primaryJob}
          </p>
        </div>
      </div>
    </button>
  );
}

const AgentsSection = () => {
  const [active, setActive] = useState<AgentEntry | null>(null);
  const ActiveIcon = active?.icon;
  const activeBlocks = active ? /BLOCK/i.test(active.desc) : false;

  return (
    <section id="agents" className="section-spacious section-darker">
      <div className="container mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="eyebrow text-brand-cyan">Powered by specrails-core</p>
          <h2 className="section-heading mt-3">
            A complete <span className="gradient-text">AI agent team</span>,
            docked on the rails
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Three agents are core and always run — Architect, Developer,
            Reviewer. The rest are optional specialists that{" "}
            <code className="font-mono text-sm rounded bg-surface-3 px-1 text-brand-cyan">
              implement
            </code>{" "}
            dispatches by task keywords, with the Reviewer sub-specializing into
            frontend or backend when installed.
          </p>
        </Reveal>

        {/* Stat chips derived from data */}
        <Reveal
          delay={100}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          {STAT_CHIPS.map((chip) => (
            <span
              key={chip.label}
              className={cn(
                "inline-flex items-baseline gap-1.5 rounded-pill border px-3 py-1.5 text-sm",
                chip.danger
                  ? "border-accent-danger/40 bg-accent-danger/10"
                  : "border-border/70 bg-surface-2",
              )}
            >
              <span
                className={cn(
                  "font-mono font-semibold tabular-nums",
                  chip.danger ? "text-accent-danger" : "text-foreground",
                )}
              >
                {chip.value}
              </span>
              <span
                className={cn(
                  chip.danger
                    ? "text-accent-danger/90"
                    : "text-muted-foreground",
                )}
              >
                {chip.label}
              </span>
            </span>
          ))}
        </Reveal>

        {/* Stage groups docked along a thin gradient rail */}
        <div className="relative mt-14">
          {/* The rail spine */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[15px] top-2 bottom-2 w-px md:left-[19px] bg-gradient-to-b from-brand-cyan/60 via-rail/50 to-brand-violet/60"
          />

          <div className="space-y-12">
            {STAGES.map((stage, stageIndex) => {
              const agents = AGENTS.filter((a) => a.stage === stage.id);
              if (agents.length === 0) return null;
              return (
                <Reveal
                  key={stage.id}
                  delay={stageIndex % 2 === 0 ? 0 : 100}
                  className="relative pl-10 md:pl-14"
                >
                  {/* Rail node for this stage */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-border/70 bg-surface-2 shadow-glow-elevated"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-brand md:h-3 md:w-3" />
                  </span>

                  {/* Stage header */}
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-brand-cyan">
                      {String(stageIndex + 1).padStart(2, "0")} ·{" "}
                      {stage.label}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {stage.blurb}
                    </span>
                    <span className="ml-auto font-mono text-[11px] text-rail">
                      {agents.length}{" "}
                      {agents.length === 1 ? "agent" : "agents"}
                    </span>
                  </div>

                  {/* Agent cards */}
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {agents.map((agent) => (
                      <AgentCard
                        key={agent.name}
                        agent={agent}
                        onOpen={setActive}
                      />
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Links out */}
        <Reveal
          delay={100}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <Link
            to="/agents"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan transition-colors hover:text-brand-violet"
          >
            Compare all {AGENT_COUNT} agents
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/docs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Read the agent docs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      {/* Per-agent detail drawer */}
      <Sheet open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <SheetContent
          side="right"
          className="border-border/70 bg-surface-1 w-full sm:max-w-md overflow-y-auto"
          style={
            active ? ({ "--agent-glow": glowVar[active.glow] } as CSSProperties) : undefined
          }
        >
          {active ? (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-frame border border-[hsl(var(--agent-glow)/0.4)] bg-surface-2"
                    aria-hidden="true"
                  >
                    {ActiveIcon ? (
                      <ActiveIcon className={cn("h-5 w-5", active.color)} />
                    ) : null}
                  </span>
                  <div className="text-left">
                    <SheetTitle>{active.name}</SheetTitle>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {active.model} model
                    </p>
                  </div>
                </div>
                <SheetDescription className="sr-only">
                  Details for the {active.name} agent.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5 text-left">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={cn(
                      "font-mono text-[10px] leading-none px-2 py-1 rounded-pill border",
                      modelClass[active.model],
                    )}
                  >
                    {active.model}
                  </span>
                  {active.core ? (
                    <span className="font-mono text-[10px] leading-none px-2 py-1 rounded-pill border border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan">
                      core agent
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] leading-none px-2 py-1 rounded-pill border border-border/70 text-muted-foreground">
                      specialist
                    </span>
                  )}
                  {activeBlocks ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] leading-none px-2 py-1 rounded-pill border border-accent-danger/40 bg-accent-danger/10 text-accent-danger">
                      <ShieldAlert className="h-3 w-3" aria-hidden="true" />
                      can block shipping
                    </span>
                  ) : null}
                </div>

                <div>
                  <p className="eyebrow text-rail">Primary job</p>
                  <p className="mt-1.5 text-sm font-medium text-foreground">
                    {active.primaryJob}
                  </p>
                </div>

                <div>
                  <p className="eyebrow text-rail">What it does</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {active.desc}
                  </p>
                </div>

                {active.note ? (
                  <div className="rounded-card border border-border/70 bg-surface-2 p-3">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {active.note}
                    </p>
                  </div>
                ) : null}

                <div>
                  <p className="eyebrow text-rail">Pipeline stage</p>
                  <p className="mt-1.5 text-sm capitalize text-foreground">
                    {STAGES.find((s) => s.id === active.stage)?.label ??
                      active.stage}
                  </p>
                </div>

                <Link
                  to={`/docs/${active.docsSlug}`}
                  onClick={() => setActive(null)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan transition-colors hover:text-brand-violet"
                >
                  Open agent docs
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default AgentsSection;
