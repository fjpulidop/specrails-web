import {
  HardDrive,
  Sparkles,
  ScanSearch,
  UserCheck,
  Brain,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * The six design principles specrails-core is built on. Rendered as a numbered
 * ledger — each row led by a large gradient numeral — so it reads as a set of
 * commitments riding the rails, not another card stack.
 */
interface Principle {
  num: string;
  label: string;
  tag: string;
  desc: string;
  icon: LucideIcon;
}

const principles: Principle[] = [
  {
    num: "01",
    label: "Local by default",
    tag: "your-machine",
    desc: "Every agent runs on your hardware. No accounts, no telemetry, no code leaving the repo — the whole pipeline is yours, MIT-licensed.",
    icon: HardDrive,
  },
  {
    num: "02",
    label: "Self-cleaning",
    tag: "no-residue",
    desc: "Parallel builds live in isolated git worktrees that are created and torn down per run, so your working tree is never left in a half-finished state.",
    icon: Sparkles,
  },
  {
    num: "03",
    label: "Context-first",
    tag: "reads-real-code",
    desc: "Agents analyze the actual codebase before acting — real files, real conventions — instead of pasting generic boilerplate over your project.",
    icon: ScanSearch,
  },
  {
    num: "04",
    label: "Persona-driven",
    tag: "VPC-scored",
    desc: "Each of the 14 agents holds a focused role and is scored against a value/precision/confidence rubric, so reviews stay sharp and accountable.",
    icon: UserCheck,
  },
  {
    num: "05",
    label: "Institutional memory",
    tag: "learns-over-time",
    desc: "Decisions, conventions and prior outcomes persist between runs, so the pipeline compounds what it knows about your repo rather than starting cold.",
    icon: Brain,
  },
  {
    num: "06",
    label: "Parallel-safe",
    tag: "git-worktrees",
    desc: "Independent work fans out across worktrees and merges back conflict-aware — speed without trampling state, sequenced only where safety demands it.",
    icon: GitBranch,
  },
];

const PrinciplesSection = () => {
  const reduced = useReducedMotion();

  return (
    <section id="principles" className="section-spacious section-darker">
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-3">Built on specrails-core</p>
          <h2 className="section-heading">
            Six principles riding the{" "}
            <span className="gradient-text">rails</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Not features — commitments. Every agent, every run, every worktree
            answers to the same six rules.
          </p>
        </Reveal>

        <ol className="mt-14 md:mt-20">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.num}
              delay={((i % 2) * 100) as 0 | 100}
              className="group"
            >
              <PrincipleRow principle={p} reduced={reduced} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

function PrincipleRow({
  principle,
  reduced,
}: {
  principle: Principle;
  reduced: boolean;
}) {
  const Icon = principle.icon;

  return (
    <div
      className={cn(
        "relative grid items-start gap-x-6 gap-y-4 py-8 md:py-10",
        "grid-cols-[auto_1fr] md:grid-cols-[7rem_1fr_auto]",
        "border-t border-border/30 first:border-t-0",
        "transition-colors duration-300 hover:bg-surface-2/40",
      )}
    >
      {/* Large gradient numeral — the ledger marker */}
      <div className="flex items-start md:justify-end">
        <span
          aria-hidden="true"
          className={cn(
            "gradient-text font-mono font-semibold leading-none tracking-tight",
            "text-4xl md:text-6xl",
            "transition-transform duration-300 group-hover:-translate-y-0.5",
          )}
        >
          {principle.num}
        </span>
      </div>

      {/* Title + description */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
            {principle.label}
          </h3>
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-rail">
            {principle.tag}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
          {principle.desc}
        </p>
      </div>

      {/* Pill-on-rails glyph — the brand metaphor, right-anchored on desktop */}
      <div className="col-start-2 md:col-start-3 md:pt-2">
        <PillRailGlyph icon={Icon} reduced={reduced} />
      </div>
    </div>
  );
}

/**
 * A compact "spec on rails" glyph: a glossy gradient pill seated on twin
 * neutral rails, carrying the principle's icon. Reinforces the brand metaphor
 * row by row. The pill nudges forward along the rails on row hover — calm by
 * default, so six of them never read as noise; reduced-motion pins it still.
 */
function PillRailGlyph({
  icon: Icon,
  reduced,
}: {
  icon: LucideIcon;
  reduced: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid h-12 w-24 place-items-center shrink-0",
        "rounded-card border border-border/70 bg-surface-2",
      )}
    >
      {/* twin neutral rails */}
      <span className="absolute inset-x-3 top-[42%] h-px bg-rail/40" />
      <span className="absolute inset-x-3 top-[58%] h-px bg-rail/40" />

      {/* the glossy spec pill carrying the icon */}
      <span
        className={cn(
          "relative z-10 grid h-7 w-12 place-items-center rounded-pill",
          "bg-gradient-brand shadow-glow-brand text-background",
          "[box-shadow:inset_0_1px_0_hsl(0_0%_100%_/_0.45)]",
          "transition-transform duration-500 ease-out",
          !reduced && "group-hover:translate-x-2",
        )}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
    </span>
  );
}

export default PrinciplesSection;
