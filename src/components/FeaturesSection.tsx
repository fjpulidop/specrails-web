import { useState, type ReactNode, type CSSProperties } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Reveal } from "@/components/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AGENTS } from "@/data/agents";
import { cn } from "@/lib/utils";
import {
  GitBranch, Brain, ShieldCheck, Layers, Wand2, BarChart3,
  Gauge, AlertTriangle, Users, ListOrdered, Terminal, Sparkles,
  LayoutDashboard, KanbanSquare, Search, MessageSquare,
  Keyboard, ArrowRightLeft, Workflow, FileCheck, Radio,
  Lock, ShieldAlert, Cpu, Activity, type LucideIcon,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
 * Data — only real features (no fabrication). Each list is split into
 * `marquee` (promoted, with a diagram) and `compact` (small tiles).
 * ────────────────────────────────────────────────────────────────────────── */

interface CompactFeature {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: string;
}

interface MarqueeFeature extends CompactFeature {
  diagram: ReactNode;
}

const AGENT_COUNT = AGENTS.length;

/* ── Diagram building blocks ─────────────────────────────────────────────── */

/** A neutral rail with an optional gliding spec pill. */
const Rail = ({
  label,
  state = "running",
  glideX = 132,
  delay = 0,
}: {
  label: string;
  state?: "running" | "done" | "queued";
  glideX?: number;
  delay?: number;
}) => {
  const reduced = useReducedMotion();
  const dotColor =
    state === "done"
      ? "bg-accent-success"
      : state === "queued"
        ? "bg-rail"
        : "bg-brand-cyan";
  return (
    <div
      className={cn(
        "relative flex items-center gap-2 rounded-pill border border-border/50 bg-surface-1/70 px-2.5 py-2",
        state === "running" && !reduced && "animate-lane-pulse",
      )}
    >
      <span className="h-1 flex-1 rounded-full bg-rail/40" aria-hidden>
        <span
          className={cn(
            "block h-full w-9 rounded-full",
            state === "done"
              ? "bg-accent-success/80"
              : state === "queued"
                ? "bg-rail/60"
                : "bg-gradient-brand",
            state === "running" && !reduced && "animate-rail-glide",
          )}
          style={
            state === "running"
              ? ({ "--glide-x": `${glideX}px`, animationDelay: `${delay}ms` } as CSSProperties)
              : undefined
          }
        />
      </span>
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotColor)} />
      <span className="w-16 shrink-0 truncate font-mono text-[10px] text-muted-foreground">
        {label}
      </span>
    </div>
  );
};

/** Parallel worktrees riding their own rails. */
const ParallelDiagram = () => (
  <div className="flex flex-col gap-2" aria-hidden>
    <Rail label="feat/auth" state="running" delay={0} />
    <Rail label="feat/billing" state="running" delay={400} glideX={108} />
    <Rail label="fix/cache" state="done" />
  </div>
);

/** Security gate: green checks then a hard BLOCK. */
const SecurityDiagram = () => (
  <div className="flex flex-col gap-1.5" aria-hidden>
    {[
      { icon: ShieldCheck, label: "11 credential patterns", ok: true },
      { icon: Lock, label: "OWASP scan", ok: true },
      { icon: ShieldAlert, label: "Secret in diff", ok: false },
    ].map(({ icon: Icon, label, ok }) => (
      <div
        key={label}
        className={cn(
          "flex items-center gap-2 rounded-card border px-2.5 py-1.5",
          ok
            ? "border-border/50 bg-surface-1/70"
            : "border-accent-danger/50 bg-accent-danger/10",
        )}
      >
        <Icon
          className={cn(
            "h-3.5 w-3.5 shrink-0",
            ok ? "text-accent-success" : "text-accent-danger",
          )}
        />
        <span className="flex-1 truncate font-mono text-[10px] text-muted-foreground">
          {label}
        </span>
        <span
          className={cn(
            "rounded-pill px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider",
            ok
              ? "bg-accent-success/15 text-accent-success"
              : "bg-accent-danger/20 text-accent-danger",
          )}
        >
          {ok ? "pass" : "blocked"}
        </span>
      </div>
    ))}
  </div>
);

/** Institutional memory: records stacking into a persistent store. */
const MemoryDiagram = () => (
  <div className="flex flex-col gap-1.5" aria-hidden>
    {[
      "decision: use worktrees",
      "pattern: gate on confidence",
      "fix: retry merge w/ context",
    ].map((line, i) => (
      <div
        key={line}
        className="flex items-center gap-2 rounded-card border border-border/50 bg-surface-1/70 px-2.5 py-1.5"
        style={{ marginLeft: `${i * 10}px` }}
      >
        <Brain className="h-3 w-3 shrink-0 text-brand-violet" />
        <span className="truncate font-mono text-[10px] text-muted-foreground">
          {line}
        </span>
      </div>
    ))}
    <p className="pl-1 pt-0.5 font-mono text-[9px] uppercase tracking-wider text-rail">
      persists across sessions →
    </p>
  </div>
);

/** Live pipeline: agents handing a spec down the rails. */
const PipelineDiagram = () => (
  <div className="flex flex-col gap-2" aria-hidden>
    <Rail label="architect" state="done" />
    <Rail label="developer" state="running" delay={0} />
    <Rail label="reviewer" state="queued" />
  </div>
);

/** Cost / analytics: rising bars (uses the shared bar-rise kit). */
const AnalyticsDiagram = () => {
  const reduced = useReducedMotion();
  const bars = [38, 64, 46, 82, 58, 72];
  return (
    <div className="flex h-20 items-end gap-1.5" aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className={cn(
            "flex-1 rounded-t-sm bg-gradient-to-t from-brand-cyan/30 to-brand-cyan/80",
            !reduced && "animate-bar-rise",
          )}
          style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
        />
      ))}
    </div>
  );
};

/** Mini multi-project dashboard. */
const DashboardDiagram = () => (
  <div className="flex gap-2" aria-hidden>
    <div className="flex w-16 shrink-0 flex-col gap-1">
      {[LayoutDashboard, KanbanSquare, BarChart3].map((Icon, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-1.5 py-1 font-mono text-[9px]",
            i === 0
              ? "bg-brand-violet/15 text-brand-violet"
              : "text-muted-foreground",
          )}
        >
          <Icon className="h-3 w-3" />
        </div>
      ))}
    </div>
    <div className="flex flex-1 flex-col gap-1.5">
      {["api-gateway", "web-app", "infra"].map((p, i) => (
        <div
          key={p}
          className="flex items-center gap-2 rounded-card border border-border/50 bg-surface-1/70 px-2 py-1.5"
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i === 0 ? "bg-brand-cyan" : i === 1 ? "bg-accent-success" : "bg-rail",
            )}
          />
          <span className="flex-1 truncate font-mono text-[10px] text-muted-foreground">
            {p}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/** Together: core implements → hub visualizes. */
const TogetherDiagram = () => {
  const reduced = useReducedMotion();
  return (
    <div className="flex items-center gap-2" aria-hidden>
      <div className="flex flex-1 flex-col items-center gap-1 rounded-card border border-brand-cyan/30 bg-surface-1/70 px-2 py-2.5">
        <Terminal className="h-4 w-4 text-brand-cyan" />
        <span className="font-mono text-[9px] text-muted-foreground">core</span>
      </div>
      <div className="relative h-1 flex-1 rounded-full bg-rail/30">
        <span
          className={cn(
            "absolute top-0 h-full w-8 rounded-full bg-gradient-brand",
            !reduced && "animate-rail-glide",
          )}
          style={{ "--glide-x": "44px" } as CSSProperties}
        />
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 rounded-card border border-brand-violet/30 bg-surface-1/70 px-2 py-2.5">
        <LayoutDashboard className="h-4 w-4 text-brand-violet" />
        <span className="font-mono text-[9px] text-muted-foreground">hub</span>
      </div>
    </div>
  );
};

/* ── Feature catalogue ───────────────────────────────────────────────────── */

interface TabData {
  marquee: MarqueeFeature[];
  compact: CompactFeature[];
}

const coreData: TabData = {
  marquee: [
    {
      title: "Parallel Execution",
      desc: "Features are implemented simultaneously in isolated git worktrees — independent lanes, no stepping on each other. A merge resolver reconciles conflicts with spec context.",
      icon: GitBranch,
      accent: "text-brand-cyan",
      diagram: <ParallelDiagram />,
    },
    {
      title: "Security Gate",
      desc: "The Security Reviewer scans 11 credential patterns and OWASP vulnerabilities before every ship. A BLOCKED status hard-stops the pipeline — nothing risky reaches your PR.",
      icon: ShieldAlert,
      accent: "text-accent-danger",
      diagram: <SecurityDiagram />,
    },
    {
      title: "Institutional Memory",
      desc: "Every agent keeps persistent memory. Decisions, patterns, and post-mortem fixes accumulate across sessions and load as guardrails for future runs.",
      icon: Brain,
      accent: "text-brand-violet",
      diagram: <MemoryDiagram />,
    },
  ],
  compact: [
    { title: "Claude Code, Codex in lab", desc: "Runs on Anthropic's Claude Code today; OpenAI Codex support is coming soon — currently in lab.", icon: Terminal, accent: "text-brand-cyan" },
    { title: "Spec-Driven Development", desc: "Each agent owns one part of the lifecycle using SDD with OpenSpec as the source of truth.", icon: FileCheck, accent: "text-brand-cyan" },
    { title: "VPC Persona Scoring", desc: "Value Proposition Canvas maps Pain Relievers & Gain Creators to Customer Jobs — scored 0–5 per persona.", icon: BarChart3, accent: "text-brand-violet" },
    { title: "Confidence Scoring", desc: "Reviewers self-assess across correctness, security, tests, docs, and performance. A gate blocks shipping below threshold.", icon: Gauge, accent: "text-accent-warning" },
    { title: "Failure Learning Loop", desc: "Flagged failures become post-mortem records. Future developer agents load them as guardrails to prevent repeats.", icon: AlertTriangle, accent: "text-accent-warning" },
    { title: "Layer-Specific Reviews", desc: "Dedicated frontend and backend reviewers run in parallel, applying domain expertise independently.", icon: Users, accent: "text-brand-cyan" },
    { title: "Dependency-Aware Ordering", desc: "Backlog prerequisites build a dependency DAG, topologically sorted so the safest order is always chosen.", icon: ListOrdered, accent: "text-accent-success" },
    { title: "Multi-Stack & Smart Setup", desc: "Analyzes your real codebase — imports, conventions, CI — across Python, Node, Go, Rust, React, and more, then self-cleans.", icon: Layers, accent: "text-accent-warning" },
  ],
};

const hubData: TabData = {
  marquee: [
    {
      title: "Real-Time Rails",
      desc: "Drag specs onto execution rails — parallel lanes with per-rail agent profiles. Watch each agent activate and stream output live as the spec rides down the pipeline.",
      icon: Workflow,
      accent: "text-brand-cyan",
      diagram: <PipelineDiagram />,
    },
    {
      title: "Cost & Analytics",
      desc: "Track every AI cost per provider, with burn rate over time and CSV export. The Analytics page turns token spend into KPIs you can actually read.",
      icon: BarChart3,
      accent: "text-accent-warning",
      diagram: <AnalyticsDiagram />,
    },
    {
      title: "Multi-Project Dashboard",
      desc: "Every specrails project in one local-first desktop app — signed macOS and Windows builds. 100% local, single-user, no accounts, no telemetry.",
      icon: LayoutDashboard,
      accent: "text-brand-violet",
      diagram: <DashboardDiagram />,
    },
  ],
  compact: [
    { title: "Draft by Talking", desc: "Explore a spec in conversation with Claude or Codex, or one-shot it with Quick.", icon: MessageSquare, accent: "text-brand-violet" },
    { title: "Website → Spec", desc: "Point the embedded browser at a live site and hover-select an element to turn it into a spec.", icon: Search, accent: "text-brand-cyan" },
    { title: "SMASH an Epic", desc: "Break a large epic into focused sub-specs ready to drop onto their own rails.", icon: Sparkles, accent: "text-accent-warning" },
    { title: "Compare Specs", desc: "Put two specs side by side to diff scope and intent before you commit a lane.", icon: ArrowRightLeft, accent: "text-brand-cyan" },
    { title: "Per-Rail Agent Profiles", desc: "Each execution lane gets its own agent configuration for independent, parallel runs.", icon: Cpu, accent: "text-brand-violet" },
    { title: "Keyboard-First UX", desc: "Full keyboard navigation and a command palette — drive the whole app without a mouse.", icon: Keyboard, accent: "text-brand-cyan" },
  ],
};

const togetherData: TabData = {
  marquee: [
    {
      title: "Core Implements, Hub Visualizes",
      desc: `Core's ${AGENT_COUNT} agents do the heavy lifting — writing code, running tests, shipping PRs. Hub gives you a live, local view of every step as it happens, with logs you can filter and search.`,
      icon: ArrowRightLeft,
      accent: "text-brand-cyan",
      diagram: <TogetherDiagram />,
    },
  ],
  compact: [
    { title: "Core Learns, Hub Reports", desc: "Core's institutional memory accumulates patterns; Hub surfaces them in analytics and activity feeds.", icon: Activity, accent: "text-accent-warning" },
    { title: "Core Ships PRs, Hub Tracks", desc: "Core opens pull requests; Hub tracks every feature from idea through merge.", icon: FileCheck, accent: "text-accent-success" },
    { title: "Core Runs Agents, Hub Streams", desc: `Core orchestrates ${AGENT_COUNT} agents; Hub streams their output in real time — filter, search, monitor from one screen.`, icon: Radio, accent: "text-brand-violet" },
  ],
};

/* ── Tiles ───────────────────────────────────────────────────────────────── */

const MarqueeTile = ({ feature }: { feature: MarqueeFeature }) => {
  const { title, desc, icon: Icon, accent, diagram } = feature;
  return (
    <article className="group surface-card flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow-elevated">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-card border border-border/70 bg-surface-1">
          <Icon className={cn("h-5 w-5", accent)} aria-hidden />
        </span>
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <div className="mt-auto pt-5">{diagram}</div>
    </article>
  );
};

const CompactTile = ({ feature }: { feature: CompactFeature }) => {
  const { title, desc, icon: Icon, accent } = feature;
  return (
    <article className="group glass-card flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1">
      <Icon className={cn("h-5 w-5", accent)} aria-hidden />
      <h3 className="mt-3 text-sm font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </article>
  );
};

/* ── Bento layout ─────────────────────────────────────────────────────────
 * Marquee tiles span 2 columns on lg (and 3-up grid → wide on the row).
 * Mobile is a single column with the marquee tiles first.
 * ───────────────────────────────────────────────────────────────────────── */

const Bento = ({ data }: { data: TabData }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {data.marquee.map((f, i) => (
      <Reveal
        key={f.title}
        delay={(Math.min(i, 3) * 100) as 0 | 100 | 200 | 300}
        className="sm:col-span-2 lg:col-span-1"
      >
        <MarqueeTile feature={f} />
      </Reveal>
    ))}
    {data.compact.map((f, i) => (
      <Reveal
        key={f.title}
        delay={(Math.min(i % 4, 3) * 100) as 0 | 100 | 200 | 300}
      >
        <CompactTile feature={f} />
      </Reveal>
    ))}
  </div>
);

/* ── Section ─────────────────────────────────────────────────────────────── */

const TAB_ACTIVE: Record<string, string> = {
  core: "data-[state=active]:bg-brand-cyan/15 data-[state=active]:text-brand-cyan",
  hub: "data-[state=active]:bg-brand-violet/15 data-[state=active]:text-brand-violet",
  together: "data-[state=active]:bg-surface-3 data-[state=active]:text-foreground",
};

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("core");

  return (
    <section id="features" className="section-spacious section-darker">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Capabilities</p>
          <h2 className="section-heading">
            Built for shipping, <span className="gradient-text">end to end</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Two products, one set of rails. specrails-core runs the pipeline;
            specrails-desktop gives it a local-first cockpit.
          </p>
        </Reveal>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-10 w-full">
          <Reveal delay={100} className="flex justify-center">
            <TabsList className="h-auto rounded-pill border border-border/70 bg-surface-2 p-1">
              {[
                { value: "core", label: "Core" },
                { value: "hub", label: "Hub" },
                { value: "together", label: "Together" },
              ].map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className={cn(
                    "rounded-pill px-5 py-2 text-sm font-medium text-muted-foreground transition-colors",
                    TAB_ACTIVE[t.value],
                  )}
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Reveal>

          <TabsContent value="core" className="mt-10">
            <Bento data={coreData} />
          </TabsContent>
          <TabsContent value="hub" className="mt-10">
            <Bento data={hubData} />
          </TabsContent>
          <TabsContent value="together" className="mt-10">
            <Bento data={togetherData} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesSection;
