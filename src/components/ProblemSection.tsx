import { ArrowRight, ShieldX, CheckCircle2, Check } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** The four pipeline stages every spec rides through, left → right. */
const STAGES = ["Idea", "Build", "Review", "Ship"] as const;

/**
 * One spec on its own rail: a row of stage nodes filled up to where the spec
 * currently is, with its live status on the right. Different specs sit at
 * different stages — that's the parallelism, made legible (no slider look).
 */
const SpecRail = ({
  name,
  stage,
  status,
  tone,
  running = false,
  done = false,
}: {
  name: string;
  stage: number; // index into STAGES the spec has reached
  status: string;
  tone: string; // text-color token for the status label
  running?: boolean;
  done?: boolean;
}) => (
  <div className="grid grid-cols-[5rem_1fr_4.5rem] items-center gap-2.5">
    <span className="truncate font-mono text-[11px] text-foreground/80">{name}</span>

    {/* the rail: stage nodes joined by segments, filled up to `stage` */}
    <div className="flex items-center">
      {STAGES.map((_, i) => (
        <Fragment key={i}>
          <span
            className={cn(
              "relative z-10 h-2.5 w-2.5 shrink-0 rounded-full border",
              i < stage && "border-brand-cyan bg-brand-cyan",
              i === stage &&
                cn(
                  "border-brand-cyan bg-brand-cyan",
                  running && "motion-safe:animate-lane-pulse",
                ),
              i > stage && "border-border/70 bg-surface-1",
            )}
          />
          {i < STAGES.length - 1 && (
            <span className="h-0.5 flex-1 overflow-hidden rounded-pill bg-rail/30">
              <span
                className={cn(
                  "block h-full rounded-pill bg-brand-cyan/70 transition-[width]",
                  i < stage ? "w-full" : "w-0",
                )}
              />
            </span>
          )}
        </Fragment>
      ))}
    </div>

    <span className={cn("inline-flex items-center justify-end gap-1 text-right font-mono text-[10px]", tone)}>
      {done && <Check className="h-3 w-3" />}
      {status}
    </span>
  </div>
);

const ProblemSection = () => {
  return (
    <section id="problem" className="section-spacious section-darker">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* ---------- The statement ---------- */}
          <div>
            <Reveal as="p" className="eyebrow mb-4">
              Why specrails
            </Reveal>

            <Reveal delay={100}>
              <h2 className="section-heading lg:text-[2.75rem]">
                You already have the AI.{" "}
                <span className="gradient-text">This is the team around it.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Claude, Codex, or Gemini, used raw, is one prompt and one agent — guessing. specrails turns the same model into a disciplined team.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <p className="font-mono text-accent-danger/80">Raw CLI</p>
                <p className="font-mono text-brand-cyan">specrails</p>

                <p className="text-muted-foreground">One prompt — it guesses what you meant.</p>
                <p className="text-foreground">One spec — generated from your prompt.</p>

                <p className="text-muted-foreground">One agent doing everything alone.</p>
                <p className="text-foreground">A team of agents, each with a job.</p>

                <p className="text-muted-foreground">Edits straight into main.</p>
                <p className="text-foreground">Each spec on its own rail — parallel, no collisions.</p>

                <p className="text-muted-foreground">Hope it&apos;s right.</p>
                <p className="text-foreground">Know it&apos;s right.</p>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">Works with <span className="text-foreground">Claude, Codex, and Gemini</span> — bring your own API key. You own the rails, not the vendor.</p>

              <p className="mt-3 text-sm font-medium text-foreground">Same models. A system around them that turns vibes into certainty.</p>

              <div className="mt-6">
                <Button asChild variant="cyan" className="motion-safe:animate-download-pulse">
                  <Link to="/download">Download specrails <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---------- The visual contrast ---------- */}
          <Reveal delay={200} className="relative">
            {/* faint drifting brand orb behind the board (light-mode color moment) */}
            <div
              className="brand-orb -top-10 right-0 h-40 w-40 bg-brand-violet/15 motion-safe:animate-drift-b"
              aria-hidden="true"
            />

            <div
              className="relative grid grid-rows-[auto_auto_1fr] gap-3"
              aria-hidden="true"
            >
              {/* BEFORE — agents without rails: a tangle */}
              <div className="rounded-frame border border-accent-danger/30 bg-surface-2 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-danger/80">
                    Without rails
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-pill border border-accent-danger/40 bg-accent-danger/10 px-2 py-0.5 font-mono text-[10px] text-accent-danger">
                    <ShieldX className="h-3 w-3" />
                    merge conflict
                  </span>
                </div>

                {/* a chaotic tangle of crossing agent paths */}
                <div className="relative h-28">
                  <svg
                    viewBox="0 0 320 112"
                    className="h-full w-full overflow-visible text-rail"
                    fill="none"
                  >
                    <path
                      d="M8 18 C 110 18, 80 96, 200 60 S 300 30, 312 88"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="opacity-50"
                    />
                    <path
                      d="M8 92 C 90 40, 180 100, 240 30 S 300 96, 312 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="opacity-50"
                    />
                    <path
                      d="M8 56 C 120 100, 100 8, 220 80 S 280 12, 312 56"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="opacity-50"
                    />
                    {/* collision flash where paths cross */}
                    <circle
                      cx="206"
                      cy="58"
                      r="9"
                      className="fill-accent-danger/20 stroke-accent-danger"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* loose unaligned spec pills */}
                  <span className="absolute left-1 top-2 h-3 w-3 rotate-12 rounded-full bg-gradient-brand opacity-70" />
                  <span className="absolute right-2 top-1 h-3 w-3 -rotate-12 rounded-full bg-gradient-brand opacity-70" />
                  <span className="absolute bottom-1 left-1/3 h-3 w-3 rotate-45 rounded-full bg-gradient-brand opacity-70" />
                </div>
              </div>

              {/* the transform arrow / spec label */}
              <div className="flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-border/70" />
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-border/70 bg-surface-2 px-3 py-1 font-mono text-[10px] text-muted-foreground">
                  spec on rails
                  <ArrowRight className="h-3 w-3 text-brand-cyan" />
                </span>
                <span className="h-px w-8 bg-border/70" />
              </div>

              {/* AFTER — a clean spec / rails board */}
              <div className="rounded-frame border border-border/70 bg-surface-2 p-5 shadow-glow-elevated">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-cyan">
                    On rails
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-pill border border-accent-success/40 bg-accent-success/10 px-2 py-0.5 font-mono text-[10px] text-accent-success">
                    <CheckCircle2 className="h-3 w-3" />
                    gate passed
                  </span>
                </div>

                {/* three specs, each on its own rail, at a different stage */}
                <div className="space-y-3">
                  {/* stage axis — labels the four nodes below */}
                  <div className="grid grid-cols-[5rem_1fr_4.5rem] items-center gap-2.5">
                    <span />
                    <div className="flex items-center justify-between px-0.5">
                      {STAGES.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span />
                  </div>

                  <SpecRail name="auth-spec" stage={3} status="Shipped" tone="text-accent-success" done />
                  <SpecRail name="billing-spec" stage={2} status="Review" tone="text-brand-cyan" running />
                  <SpecRail name="docs-spec" stage={1} status="Building" tone="text-accent-warning" />
                </div>

                {/* the security gate footer */}
                <div className="mt-4 flex items-center justify-between rounded-card border border-border/70 bg-surface-1/60 px-3 py-2">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    security-reviewer
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent-danger">
                    <ShieldX className="h-3 w-3" />
                    can BLOCK
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
