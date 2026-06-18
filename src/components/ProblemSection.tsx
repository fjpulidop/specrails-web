import { ArrowRight, ShieldX, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** A single neutral rail with a glossy brand pill — the brand metaphor, on. */
const RailLane = ({
  label,
  glideX,
  delay,
  running = false,
}: {
  label: string;
  glideX: string;
  delay: string;
  running?: boolean;
}) => (
  <div
    className={cn(
      "relative flex items-center rounded-pill border border-border/70 bg-surface-1/70 px-2 py-1.5",
      running && "motion-safe:animate-lane-pulse",
    )}
  >
    {/* the rail */}
    <div className="relative h-1.5 flex-1 rounded-pill bg-rail/30 overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 w-1/2 rounded-pill bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent bg-[length:200%_100%] motion-safe:animate-rail-flow"
        style={{ animationDelay: delay }}
      />
    </div>
    {/* the glossy spec pill riding the rail */}
    <span
      className="absolute left-3 h-3.5 w-3.5 rounded-full bg-gradient-brand shadow-glow-brand motion-safe:animate-rail-glide"
      style={{ ["--glide-x" as string]: glideX, animationDelay: delay }}
      aria-hidden="true"
    />
    <span className="ml-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
      {label}
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
                <Button asChild variant="cyan">
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

                {/* three parallel lanes — each spec on its own rail */}
                <div className="space-y-2.5">
                  <RailLane label="auth-spec" glideX="90px" delay="0s" running />
                  <RailLane label="billing-spec" glideX="120px" delay="0.5s" />
                  <RailLane label="docs-spec" glideX="70px" delay="1s" />
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
