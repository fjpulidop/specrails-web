import { useEffect, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Box,
  GitBranch,
  Github,
  Layers,
  Lightbulb,
  PenTool,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Reveal } from "@/components/Reveal";
import { CopyButton } from "@/components/CopyButton";
import { useSeo } from "@/hooks/useSeo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AGENTS, type AgentEntry } from "@/data/agents";
import { cn } from "@/lib/utils";

// openspec: hero-redesign-hub-primary (core-page capability)

const AGENT_COUNT = AGENTS.length;
const CORE_AGENTS = AGENTS.filter((a) => a.core);
const SPECIALIST_AGENTS = AGENTS.filter((a) => !a.core);
const BLOCK_AGENTS = AGENTS.filter((a) => /BLOCK/i.test(a.desc));

const INSTALL_COMMAND = "npx specrails-core@latest init";

/** A glossy gradient pill riding neutral rails — the brand metaphor in five stops. */
interface RailStop {
  id: string;
  label: string;
  Icon: typeof Lightbulb;
}

const RAIL_STOPS: RailStop[] = [
  { id: "idea", label: "Idea", Icon: Lightbulb },
  { id: "architecture", label: "Architecture", Icon: PenTool },
  { id: "implementation", label: "Implementation", Icon: Box },
  { id: "review", label: "Review", Icon: ShieldCheck },
  { id: "pr", label: "Pull Request", Icon: Rocket },
];

const TRUST_CHIPS: { label: string; tone: "success" | "cyan" | "violet" }[] = [
  { label: "MIT licensed", tone: "cyan" },
  { label: "100% local", tone: "violet" },
  { label: "No telemetry", tone: "success" },
];

const PILLARS: {
  Icon: typeof Workflow;
  title: string;
  body: string;
  accent: string;
}[] = [
  {
    Icon: Box,
    title: "14 specialised agents",
    body: "Architect, developers, layer reviewers, a security-reviewer that can BLOCK, product manager, analyst, doc-sync, merge-resolver, test-writer and performance-reviewer — each a focused sub-process with scoped tools.",
    accent: "text-brand-cyan",
  },
  {
    Icon: Workflow,
    title: "Phased pipeline",
    body: "Idea → Architecture → Implementation → Review → PR. Every phase has explicit gates and confidence scoring, so nothing ships before it has earned it.",
    accent: "text-brand-violet",
  },
  {
    Icon: GitBranch,
    title: "Parallel rails",
    body: "Builds run in isolated git worktrees, so two specs progress side by side without stepping on each other. Institutional memory persists across sessions.",
    accent: "text-accent-success",
  },
];

const INTEGRATIONS: { label: string; blurb: string }[] = [
  {
    label: "CI",
    blurb:
      "Run the full pipeline on every PR to block regressions before they reach main.",
  },
  {
    label: "Pre-commit",
    blurb:
      "Wire review agents into git hooks so issues are caught before code ever leaves your laptop.",
  },
  {
    label: "Cron",
    blurb:
      "Scheduled runs for nightly health checks, dependency updates, and docs sync.",
  },
];

const toneChip: Record<"success" | "cyan" | "violet", string> = {
  success: "border-accent-success/30 bg-accent-success/10 text-accent-success",
  cyan: "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan",
  violet: "border-brand-violet/30 bg-brand-violet/10 text-brand-violet",
};

const CorePage = () => {
  useSeo({
    title: "specrails-core — The open-source CLI behind specrails",
    description:
      "specrails-core is the terminal-first, open-source CLI for spec-driven AI development. One command installs 14 specialised agents and a phased pipeline from idea to shipped PR. MIT, local, parallel builds via git worktrees.",
    canonical: "https://specrails.dev/core",
  });

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-surface-0">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-16 px-6 md:pb-24">
        <div
          className="absolute inset-0 hero-glow motion-safe:animate-hero-breath pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hero-noise pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          {/* Copy column */}
          <div>
            <Reveal>
              <p className="eyebrow inline-flex items-center gap-2 text-brand-cyan">
                <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                Open-source CLI · MIT
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-5 font-bold tracking-[-0.03em] leading-[1.04] [font-size:clamp(2.5rem,6vw,4.25rem)]">
                Put your repo on{" "}
                <span className="gradient-text">spec-driven rails</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                One command turns any repository into a spec-driven pipeline with{" "}
                <span className="text-foreground">
                  {AGENT_COUNT} specialised AI agents
                </span>{" "}
                — from idea to shipped PR, all from your terminal. Runs on Claude
                Code; Codex support is coming soon.
              </p>
            </Reveal>

            {/* Copyable install terminal */}
            <Reveal delay={300}>
              <div className="mt-8 max-w-xl rounded-card border border-border/70 bg-surface-2 [box-shadow:inset_0_1px_0_hsl(0_0%_100%_/_0.05)]">
                <div className="flex items-center gap-2 border-b border-border/50 px-4 h-9">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-danger/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-warning/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-success/70" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                    your-project — zsh
                  </span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground">
                    <span className="select-none text-brand-cyan">$ </span>
                    {INSTALL_COMMAND}
                  </code>
                  <CopyButton
                    value={INSTALL_COMMAND}
                    label="Copy install command"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={300}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <a
                href="https://github.com/fjpulidop/specrails-core"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-sheen inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill gradient-btn px-5 py-2.5 text-sm"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                View on GitHub
              </a>
              <Link
                to="/docs/installation"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-pill border border-border/70 bg-surface-2 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand-cyan/50"
              >
                Read the docs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>

            <Reveal
              delay={300}
              className="mt-7 flex flex-wrap items-center gap-2"
            >
              {TRUST_CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-[11px] font-mono",
                    toneChip[chip.tone],
                  )}
                >
                  {chip.label}
                </span>
              ))}
            </Reveal>
          </div>

          {/* Rails visual column */}
          <Reveal delay={200}>
            <RailsDiagram reducedMotion={reducedMotion} />
          </Reveal>
        </div>
      </section>

      {/* ── Architecture pillars ───────────────────────────────────── */}
      <section className="section-spacious section-darker">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-brand-cyan">How it works</p>
            <h2 className="section-heading mt-3">
              A whole engineering team,{" "}
              <span className="gradient-text">docked on rails</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              specrails-core scaffolds agents, commands and config straight into
              your repo. Nothing phones home, nothing auto-updates — the entire
              footprint is two directories you own and commit.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={(i * 100) as 0 | 100 | 200}>
                <GradientHairlineCard className="h-full">
                  <span
                    className={cn(
                      "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/30 bg-surface-3",
                      pillar.accent,
                    )}
                    aria-hidden="true"
                  >
                    <pillar.Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </GradientHairlineCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14-agent roster teaser ─────────────────────────────────── */}
      <section className="section-spacious">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-brand-cyan">The roster</p>
            <h2 className="section-heading mt-3">
              {AGENT_COUNT} agents,{" "}
              <span className="gradient-text">one pipeline</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Three agents are core and always run. The rest are optional
              specialists that{" "}
              <code className="rounded bg-surface-3 px-1 font-mono text-sm text-brand-cyan">
                implement
              </code>{" "}
              dispatches by task — including a security-reviewer that can block
              the ship outright.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-8 flex flex-wrap gap-2.5">
            <RosterStat value={String(AGENT_COUNT)} label="agents total" />
            <RosterStat
              value={String(CORE_AGENTS.length)}
              label="core, always run"
            />
            <RosterStat
              value={String(SPECIALIST_AGENTS.length)}
              label="optional specialists"
            />
            <RosterStat
              value={String(BLOCK_AGENTS.length)}
              label="can BLOCK your ship"
              danger
            />
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AGENTS.map((agent, i) => (
              <Reveal
                key={agent.name}
                delay={((i % 3) * 100) as 0 | 100 | 200}
              >
                <AgentTile agent={agent} />
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={100}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <Link
              to="/agents"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan transition-colors hover:text-brand-violet"
            >
              Compare all {AGENT_COUNT} agents
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/docs/agents"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Read the agent docs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Customise + integrations ───────────────────────────────── */}
      <section className="section-spacious section-darker">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-brand-cyan">Make it yours</p>
            <h2 className="section-heading mt-3">Customise the team</h2>
            <p className="mt-4 text-muted-foreground">
              Drop your own agents and slash commands into{" "}
              <code className="rounded bg-surface-3 px-1 font-mono text-sm text-brand-cyan">
                .claude/agents/
              </code>{" "}
              and{" "}
              <code className="rounded bg-surface-3 px-1 font-mono text-sm text-brand-cyan">
                .claude/commands/
              </code>
              . They appear in the pipeline alongside the built-ins — and the
              whole installed footprint is yours to edit and commit.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "VPC persona scoring keeps the product manager grounded in real users.",
                "Institutional memory in .specrails/agent-memory/ persists decisions across runs.",
                "Re-run init to refresh agents without touching your .specrails/ data.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Layers
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
                    aria-hidden="true"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow text-brand-violet">Run it where you live</p>
            <h2 className="section-heading mt-3">Fits your workflow</h2>
            <div className="mt-6 space-y-3">
              {INTEGRATIONS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-card border border-border/70 bg-surface-2 p-4 transition-colors hover:border-brand-cyan/40"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand-cyan">
                    {item.label}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.blurb}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────────────── */}
      <section className="section-spacious">
        <div className="mx-auto max-w-3xl">
          <GradientHairlineCard className="text-center" emphasised>
            <p className="eyebrow text-brand-cyan">Get started</p>
            <h2 className="section-heading mt-3">
              One command. <span className="gradient-text">Full pipeline.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Install specrails-core into any git repository and run your first
              spec from idea to PR — locally, free, with no telemetry.
            </p>

            <div className="mx-auto mt-7 flex max-w-md items-center gap-3 rounded-pill border border-border/70 bg-surface-1 px-4 py-2.5">
              <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground">
                <span className="select-none text-brand-cyan">$ </span>
                {INSTALL_COMMAND}
              </code>
              <CopyButton value={INSTALL_COMMAND} label="Copy install command" />
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://github.com/fjpulidop/specrails-core"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill border border-border/70 bg-surface-2 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand-cyan/50"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                specrails-core on GitHub
              </a>
              <Link
                to="/download"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-brand-violet transition-colors hover:text-brand-cyan"
              >
                Prefer a dashboard? Get Specrails (Desktop)
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              MIT licensed · Contributions welcome
            </p>
          </GradientHairlineCard>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

// ── helpers ─────────────────────────────────────────────────────────

/** Gradient-hairline frame (p-[1px]) mirroring the DownloadPage card language. */
function GradientHairlineCard({
  children,
  className,
  emphasised = false,
}: {
  children: ReactNode;
  className?: string;
  emphasised?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-frame p-[1px] transition-all duration-300",
        emphasised
          ? "bg-gradient-to-br from-brand-cyan/50 via-brand-violet/30 to-brand-cyan/40"
          : "bg-gradient-to-br from-border/50 to-border/10 hover:from-brand-cyan/40 hover:to-brand-violet/20",
      )}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-frame bg-surface-2 p-6 md:p-8",
          emphasised && "shadow-glow-elevated",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function RosterStat({
  value,
  label,
  danger = false,
}: {
  value: string;
  label: string;
  danger?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1.5 rounded-pill border px-3 py-1.5 text-sm",
        danger
          ? "border-accent-danger/40 bg-accent-danger/10"
          : "border-border/70 bg-surface-2",
      )}
    >
      <span
        className={cn(
          "font-mono font-semibold tabular-nums",
          danger ? "text-accent-danger" : "text-foreground",
        )}
      >
        {value}
      </span>
      <span className={danger ? "text-accent-danger/90" : "text-muted-foreground"}>
        {label}
      </span>
    </span>
  );
}

function AgentTile({ agent }: { agent: AgentEntry }) {
  const Icon = agent.icon;
  const canBlock = /BLOCK/i.test(agent.desc);
  return (
    <div
      className={cn(
        "h-full rounded-card border bg-surface-2 p-4 transition-colors",
        agent.core
          ? "border-brand-cyan/40 hover:border-brand-cyan/60"
          : "border-border/70 hover:border-border",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/30 bg-surface-3"
          aria-hidden="true"
        >
          <Icon className={cn("h-4 w-4", agent.color)} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-sm font-semibold text-foreground">
              {agent.name}
            </h3>
            {agent.core ? (
              <span className="rounded-pill border border-brand-cyan/40 bg-brand-cyan/10 px-1.5 py-0.5 font-mono text-[10px] leading-none text-brand-cyan">
                core
              </span>
            ) : null}
            {canBlock ? (
              <span className="inline-flex items-center gap-1 rounded-pill border border-accent-danger/40 bg-accent-danger/10 px-1.5 py-0.5 font-mono text-[10px] leading-none text-accent-danger">
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
    </div>
  );
}

/** The brand metaphor made visible: a glossy gradient pill gliding along neutral rails. */
function RailsDiagram({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative rounded-frame border border-border/70 bg-surface-2 p-6 md:p-8 hero-chrome-ring">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-rail">spec on rails</span>
        <span className="font-mono text-[11px] text-brand-cyan">
          idea → PR
        </span>
      </div>

      {/* The rail track with a gliding pill */}
      <div className="relative mt-7 h-16">
        {/* Two neutral rails */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[22px] h-px bg-rail/50"
        />
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[42px] h-px bg-rail/50"
        />
        {/* Energy flow beam riding the rail */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute left-0 right-0 top-[31px] h-0.5 rounded-full",
            "bg-[linear-gradient(90deg,transparent,hsl(var(--brand-cyan)/0.6),transparent)] bg-[length:50%_100%] bg-no-repeat opacity-70",
            !reducedMotion && "animate-rail-flow",
          )}
        />
        {/* The glossy spec pill */}
        <div
          aria-hidden="true"
          style={{ "--glide-x": "calc(100% - 4.5rem)" } as CSSProperties}
          className={cn(
            "absolute left-0 top-[18px] h-7 w-16 rounded-pill bg-gradient-brand shadow-glow-brand",
            !reducedMotion && "animate-rail-glide",
          )}
        />
      </div>

      {/* The five pipeline stops */}
      <ol className="mt-7 space-y-2.5">
        {RAIL_STOPS.map((stop, i) => {
          const StopIcon = stop.Icon;
          return (
            <li
              key={stop.id}
              className="flex items-center gap-3 rounded-card border border-border/40 bg-surface-1/60 px-3.5 py-2.5"
            >
              <span className="font-mono text-[11px] text-rail tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/30 bg-surface-3 text-brand-cyan"
                aria-hidden="true"
              >
                <StopIcon className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-medium text-foreground">
                {stop.label}
              </span>
              {i < RAIL_STOPS.length - 1 ? (
                <ArrowRight
                  className="ml-auto h-3.5 w-3.5 text-rail"
                  aria-hidden="true"
                />
              ) : (
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-accent-success">
                  ready
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default CorePage;
