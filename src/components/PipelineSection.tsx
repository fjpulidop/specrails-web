import { type CSSProperties } from "react";
import { Lightbulb, PenTool, Code, ShieldCheck, GitPullRequest } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * The five stations a spec rides through. Reconciled 1:1 with the live run in
 * DemoSection so the viewer sees the same pipeline as a diagram (here) and as a
 * real terminal run (#demo):
 *   Idea           → DemoSection "Phase 0: Parse Input"
 *   Architecture   → DemoSection "Phase 3a: Architect"
 *   Implementation → DemoSection "Phase 3b: Implement (worktrees)"
 *   Review         → DemoSection "Phase 4b: Reviewer"
 *   PR             → DemoSection "Phase 4c: Ship"
 */
const stations = [
  {
    label: "Idea",
    phase: "Phase 0",
    actor: "Parse input",
    desc: "A GitHub Issue, a local file, or free text — one ticket or a whole batch.",
    icon: Lightbulb,
  },
  {
    label: "Architecture",
    phase: "Phase 3a",
    actor: "Architect agent",
    desc: "Designs the change as validated spec artifacts before any code is written.",
    icon: PenTool,
  },
  {
    label: "Implementation",
    phase: "Phase 3b",
    actor: "Developer agents",
    desc: "Specialists build in parallel across isolated git worktrees — lint, types, build and tests must pass.",
    icon: Code,
  },
  {
    label: "Review",
    phase: "Phase 4b",
    actor: "Reviewer + security",
    desc: "Layer-by-layer review gated by a confidence score; the security reviewer can BLOCK.",
    icon: ShieldCheck,
  },
  {
    label: "PR",
    phase: "Phase 4c",
    actor: "Ship",
    desc: "Conflict-aware commit, push and ticket update, closed out with a full pipeline report.",
    icon: GitPullRequest,
  },
] as const;

/** Fixed pitch of the mobile vertical track, in px, so the pill travel is deterministic. */
const V_ROW = 132; // vertical distance between station node centers
const V_NODE = 56; // node diameter (h-14 / w-14)

const PipelineSection = () => {
  const reduced = useReducedMotion();

  return (
    <section id="pipeline" className="section-spacious section-darker">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center">
          <p className="eyebrow mb-3">How it works</p>
          <h2 className="section-heading">
            You don't write the spec.{" "}
            <span className="gradient-text">specrails generates it.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Describe a feature. specrails turns your prompt into a spec — the source of truth
            your agents build from. You choose how hands-on:
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-2 px-4 py-1.5 text-sm">
              <span className="font-semibold text-foreground">Quick</span>
              <span className="text-muted-foreground">— defaults, one shot.</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-2 px-4 py-1.5 text-sm">
              <span className="font-semibold text-foreground">Interactive</span>
              <span className="text-muted-foreground">— refine it together.</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-2 px-4 py-1.5 text-sm">
              <span className="font-semibold text-foreground">Raw</span>
              <span className="text-muted-foreground">— freeform, you steer.</span>
            </span>
          </div>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
            From there, a team of agents designs, builds, reviews, and ships it — each with one job.
          </p>
          <div className="mt-6">
            <Link
              to="/core"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan hover:text-brand-violet transition-colors"
            >
              Get started with specrails-core →
            </Link>
          </div>
        </Reveal>

        {/* ── Desktop: horizontal twin rails ───────────────────────────── */}
        <Reveal delay={100} className="mt-16 hidden md:block">
          <HorizontalTrack reduced={reduced} />
        </Reveal>

        {/* ── Mobile: vertical twin rails (always visible — the metaphor) ─ */}
        <Reveal delay={100} className="mt-12 md:hidden">
          <VerticalTrack reduced={reduced} />
        </Reveal>

        <Reveal delay={200} className="mt-12 text-center">
          <a
            href="#demo"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-cyan hover:text-brand-violet transition-colors"
          >
            Watch the same pipeline run for real
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

/* ── Desktop ──────────────────────────────────────────────────────────── */

function HorizontalTrack({ reduced }: { reduced: boolean }) {
  // The rail container is pinned to the first and last node centres (10%→90%
  // of the row). `translateX(%)` resolves against the element's own width, so
  // the travel distance must be absolute: the row is min(72rem, 100vw − 3rem)
  // wide (max-w-6xl, px-6 gutters); the pinned rail spans 80% of that.
  const glideStyle = {
    "--glide-x": "calc((min(72rem, 100vw - 3rem)) * 0.8)",
  } as CSSProperties;

  return (
    <div className="relative">
      {/* Twin rails + flow + pill, seated behind the node row (node is h-14,
          so the rail block spans the node's full height and the beam centre
          passes through the node centre). */}
      <div className="absolute inset-x-[10%] top-0 h-14" aria-hidden="true">
        <div className="relative h-full w-full">
          {/* two parallel neutral rails */}
          <span className="absolute inset-x-0 top-[38%] h-px bg-rail/50" />
          <span className="absolute inset-x-0 top-[62%] h-px bg-rail/50" />
          {/* energy flowing along the rails */}
          <span
            className={cn(
              "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[length:200%_100%]",
              "bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent",
              !reduced && "animate-rail-flow",
            )}
          />
          {/* The glossy spec pill, gliding station to station. NOTE: the
              shared `animate-rail-glide` keyframe sets `transform` outright, so
              it overrides Tailwind translate utilities — the pill's centring is
              baked into `left`/`top` (pill is h-4=16px, w-9=36px). */}
          <span
            className={cn(
              "absolute left-[-1.125rem] top-[calc(50%-0.5rem)]",
              "h-4 w-9 rounded-pill bg-gradient-brand shadow-glow-brand",
              "[box-shadow:inset_0_1px_0_hsl(0_0%_100%_/_0.45)]",
              !reduced && "animate-rail-glide",
            )}
            style={glideStyle}
          />
        </div>
      </div>

      <ol className="relative grid grid-cols-5 gap-4">
        {stations.map((s, i) => (
          <li key={s.label} className="flex flex-col items-center text-center">
            <StationNode station={s} />
            <StationCopy station={s} className="mt-4" align="center" />
            <span className="sr-only">Station {i + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Mobile ───────────────────────────────────────────────────────────── */

function VerticalTrack({ reduced }: { reduced: boolean }) {
  const trackHeight = (stations.length - 1) * V_ROW + V_NODE;
  // Travel distance for the pill: from the first node centre to the last,
  // expressed along the (rotated) glide lane.
  const glideStyle = { "--glide-x": `${(stations.length - 1) * V_ROW}px` } as CSSProperties;

  return (
    <div className="relative pl-[4.5rem]">
      {/* Rail gutter on the left, deterministic height so pill travel is exact */}
      <div
        className="absolute left-0 top-0 w-14"
        style={{ height: `${trackHeight}px` }}
        aria-hidden="true"
      >
        <div className="relative h-full w-full">
          {/* two parallel vertical rails */}
          <span className="absolute inset-y-0 left-[38%] w-px bg-rail/50" />
          <span className="absolute inset-y-0 left-[62%] w-px bg-rail/50" />
          {/* energy flowing down the rails */}
          <span
            className={cn(
              "absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[length:100%_200%]",
              "bg-gradient-to-b from-transparent via-brand-cyan/70 to-transparent",
              !reduced && "animate-rail-flow",
            )}
          />
          {/* Rotated lane: a horizontal track (so the shared translateX glide
              works) rotated into the vertical gutter. A horizontal pill becomes
              a correctly proportioned vertical pill after the 90° turn. */}
          <div
            className="absolute left-1/2 top-[28px] origin-top-left [transform:rotate(90deg)]"
            style={{ width: `${(stations.length - 1) * V_ROW}px`, height: "1px" }}
          >
            {/* Centring baked into left/top (see note above): the glide
                keyframe overrides `transform`. In the lane's pre-rotation
                frame the pill is h-4=16px / w-9=36px. */}
            <span
              className={cn(
                "absolute left-[-1.125rem] top-[-0.5rem]",
                "h-4 w-9 rounded-pill bg-gradient-brand shadow-glow-brand",
                "[box-shadow:inset_0_1px_0_hsl(0_0%_100%_/_0.45)]",
                !reduced && "animate-rail-glide",
              )}
              style={glideStyle}
            />
          </div>
        </div>
      </div>

      <ol className="relative flex flex-col" style={{ gap: `${V_ROW - V_NODE}px` }}>
        {stations.map((s, i) => (
          <li key={s.label} className="relative" style={{ minHeight: `${V_NODE}px` }}>
            <StationNode station={s} className="absolute left-[-4.5rem] top-0" />
            <StationCopy station={s} className="pt-1" align="left" />
            <span className="sr-only">Station {i + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Shared pieces ────────────────────────────────────────────────────── */

function StationNode({
  station,
  className,
}: {
  station: (typeof stations)[number];
  className?: string;
}) {
  const Icon = station.icon;
  return (
    <span
      className={cn(
        "relative z-10 grid place-items-center shrink-0",
        "h-14 w-14 rounded-card border border-border/70 bg-surface-2",
        "shadow-glow-elevated text-brand-cyan",
        className,
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

function StationCopy({
  station,
  className,
  align,
}: {
  station: (typeof stations)[number];
  className?: string;
  align: "center" | "left";
}) {
  return (
    <div className={className}>
      <span className="block text-[11px] font-mono uppercase tracking-[0.12em] text-rail">
        {station.phase}
      </span>
      <h3 className="mt-0.5 text-base font-semibold tracking-tight">{station.label}</h3>
      <p className="mt-0.5 text-xs font-mono text-brand-cyan/80">{station.actor}</p>
      <p
        className={cn(
          "mt-2 text-sm text-muted-foreground",
          align === "center" && "mx-auto max-w-[12rem]",
        )}
      >
        {station.desc}
      </p>
    </div>
  );
}

export default PipelineSection;
