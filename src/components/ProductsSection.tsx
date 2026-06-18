import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  Terminal,
  LayoutDashboard,
  ArrowRight,
  ArrowDown,
  Cpu,
  GitBranch,
  ShieldCheck,
  Layers,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductFrame } from "@/components/ProductFrame";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const INIT_COMMAND = "npx specrails-core@latest init";

const CORE_CAPABILITIES = [
  { icon: Cpu, label: "Spec-driven pipeline, idea → PR" },
  { icon: GitBranch, label: "Parallel builds in git worktrees" },
  { icon: ShieldCheck, label: "Security reviewer can block the ship" },
] as const;

const HUB_CAPABILITIES = [
  { icon: Layers, label: "Drag specs onto parallel rails" },
  { icon: LayoutDashboard, label: "Compare, SMASH & draft specs visually" },
  { icon: Terminal, label: "Track every AI cost, 100% local" },
] as const;

const COMPANION_CAPABILITIES = [
  { icon: Smartphone, label: "Control your desktop pipeline from your phone" },
  { icon: ShieldCheck, label: "Pairs peer-to-peer over WebRTC (DTLS)" },
  { icon: ShieldCheck, label: "Zero-knowledge mailbox — never sees your data" },
] as const;

/**
 * The single glossy "spec" object riding rails between products.
 * Desktop: a horizontal track bridging two frames. Mobile: a vertical
 * flow connector. Decorative — aria-hidden, gated by reduced-motion.
 *
 * `label` renders a small mono caption beneath the connector on desktop
 * to express the relationship (e.g. "powers", "mirror").
 */
function RailConnector({
  orientation,
  reduced,
  label,
}: {
  orientation: "horizontal" | "vertical";
  reduced: boolean;
  label?: string;
}) {
  if (orientation === "vertical") {
    const vGlide = { "--glide-x": "calc(100% - 2.5rem)" } as CSSProperties;
    return (
      <div className="flex flex-col items-center gap-1" aria-hidden="true">
        <div className="relative mx-auto h-16 w-12">
          {/* twin rails running down */}
          <span className="absolute inset-y-0 left-[38%] w-px -translate-x-1/2 bg-rail/50" />
          <span className="absolute inset-y-0 left-[62%] w-px -translate-x-1/2 bg-rail/50" />
          {/* energy flowing down */}
          <span
            className={cn(
              "absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[length:100%_200%]",
              "bg-gradient-to-b from-transparent via-brand-cyan/70 to-transparent",
              !reduced && "animate-rail-flow",
            )}
          />
          {/* rotated lane so the horizontal glide reads as downward travel */}
          <div className="absolute left-1/2 top-0 h-full w-px origin-top-left [transform:rotate(90deg)]">
            <span
              className={cn(
                "absolute left-0 top-0 -translate-y-1/2 h-4 w-9 rounded-pill",
                "bg-gradient-brand shadow-glow-brand",
                "[box-shadow:inset_0_1px_0_hsl(0_0%_100%_/_0.45)]",
                !reduced && "animate-rail-glide",
              )}
              style={vGlide}
            />
          </div>
          <ArrowDown className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-4 w-4 text-rail" />
        </div>
        {label && (
          <span className="font-mono text-[10px] text-muted-foreground/60 tracking-widest uppercase">
            {label}
          </span>
        )}
      </div>
    );
  }

  const hGlide = { "--glide-x": "calc(100% - 2.5rem)" } as CSSProperties;
  return (
    <div className="flex flex-col items-center gap-1.5" aria-hidden="true">
      <div className="relative h-12 w-full">
        {/* twin parallel rails */}
        <span className="absolute inset-x-0 top-[40%] h-px -translate-y-1/2 bg-rail/50" />
        <span className="absolute inset-x-0 top-[60%] h-px -translate-y-1/2 bg-rail/50" />
        {/* energy flowing along */}
        <span
          className={cn(
            "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[length:200%_100%]",
            "bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent",
            !reduced && "animate-rail-flow",
          )}
        />
        {/* the glossy spec pill, gliding across */}
        <span
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 h-4 w-9 rounded-pill",
            "bg-gradient-brand shadow-glow-brand",
            "[box-shadow:inset_0_1px_0_hsl(0_0%_100%_/_0.45)]",
            !reduced && "animate-rail-glide",
          )}
          style={hGlide}
        />
        <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-rail" />
      </div>
      {label && (
        <span className="font-mono text-[10px] text-muted-foreground/60 tracking-widest uppercase">
          {label}
        </span>
      )}
    </div>
  );
}

const ProductsSection = () => {
  const reduced = useReducedMotion();

  return (
    <section id="products" className="section-spacious">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-brand-cyan">The ecosystem</p>
          <h2 className="section-heading mt-3">
            Specrails (Desktop) is{" "}
            <span className="gradient-text">mission control.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            The cockpit where you run everything — powered by the Specrails (Core)
            agent engine, and mirrored to Specrails (Companion) on your phone.
          </p>
        </Reveal>

        {/*
          Asymmetric five-column grid on desktop:
            core (0.85fr) · connector · desktop (1.3fr) · connector · companion (0.85fr)
          Core and companion are intentionally smaller/lighter, desktop is the anchor.
          Mobile stacks vertically: core → desktop → companion.
        */}
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[0.9fr_auto_1.25fr_auto_0.9fr]">

          {/* ── specrails-core: the engine (LEFT, secondary) ────────────── */}
          <Reveal delay={100} className="flex min-w-0 flex-col opacity-90">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-card border border-border/60 bg-surface-2 text-brand-cyan">
                <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  Specrails (Core)
                </p>
                <h3 className="text-base font-semibold tracking-tight text-foreground/80">
                  the engine
                </h3>
              </div>
            </div>

            <ProductFrame chrome="mac" label="zsh — specrails-core">
              <div className="space-y-3 p-4 font-mono text-[12px] leading-relaxed">
                <div className="flex items-center gap-2">
                  <span className="select-none text-brand-cyan">$</span>
                  <span className="flex-1 text-foreground">{INIT_COMMAND}</span>
                  <span className="pointer-events-auto">
                    <CopyButton value={INIT_COMMAND} label="Copy install command" />
                  </span>
                </div>
                <p className="text-muted-foreground">
                  <span className="text-accent-success">✓</span> Pipeline
                  scaffolded · agents installed
                </p>
                <p className="text-rail">
                  Idea → Architecture → Implementation → Review → PR
                </p>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="text-foreground">›</span>
                  spec ready to ride
                  <span
                    className={cn(
                      "ml-0.5 inline-block h-3.5 w-1.5 bg-brand-cyan",
                      !reduced && "animate-caret",
                    )}
                    aria-hidden="true"
                  />
                </p>
              </div>
            </ProductFrame>

            <ul className="mt-4 space-y-2">
              {CORE_CAPABILITIES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <Icon
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-cyan/80"
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 font-mono text-[11px] text-rail">
              MIT · Claude, Codex &amp; Gemini · bring your own API key
            </p>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-4 w-full sm:w-auto sm:self-start"
            >
              <Link to="/core">
                Get the CLI
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </Reveal>

          {/* ── Connector 1: core POWERS desktop ────────────────────────── */}
          <Reveal
            delay={200}
            className="flex min-w-0 items-center justify-center lg:px-1"
          >
            {/* desktop: horizontal bridge */}
            <div className="hidden w-20 lg:flex lg:flex-col lg:items-center">
              <RailConnector orientation="horizontal" reduced={reduced} label="powers" />
            </div>
            {/* mobile / tablet: vertical flow */}
            <div className="lg:hidden">
              <RailConnector orientation="vertical" reduced={reduced} label="powers" />
            </div>
          </Reveal>

          {/* ── specrails-desktop: mission control (CENTER, dominant) ────── */}
          <Reveal delay={300} className="flex min-w-0 flex-col">
            {/* Subtle highlight ring to visually elevate the center column */}
            <div className="flex flex-col rounded-xl border border-brand-violet/20 bg-surface-1/40 p-4 shadow-glow-brand/5 ring-1 ring-brand-violet/10 lg:-mx-1 lg:p-5">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-card border border-brand-violet/40 bg-brand-violet/10 text-brand-violet shadow-glow-brand/30">
                  <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs text-brand-violet/70">
                    Specrails (Desktop)
                  </p>
                  <h3 className="text-xl font-bold tracking-tight">
                    mission control
                  </h3>
                </div>
              </div>

              <ProductFrame chrome="mac" label="specrails-desktop — local">
                <div className="flex gap-3 p-5">
                  {/* mini sidebar */}
                  <div className="hidden w-24 shrink-0 flex-col gap-1.5 sm:flex">
                    {[
                      { label: "Rails", active: true },
                      { label: "Specs", active: false },
                      { label: "Analytics", active: false },
                    ].map((item) => (
                      <span
                        key={item.label}
                        className={cn(
                          "rounded-md px-2 py-1 font-mono text-[11px]",
                          item.active
                            ? "bg-brand-violet/15 text-brand-violet"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>

                  {/* execution rails: parallel lanes */}
                  <div className="flex flex-1 flex-col gap-2">
                    {[
                      {
                        name: "auth-service",
                        state: "Running",
                        dot: "bg-brand-cyan",
                        tone: "text-brand-cyan",
                        running: true,
                      },
                      {
                        name: "billing-api",
                        state: "Review",
                        dot: "bg-accent-warning",
                        tone: "text-accent-warning",
                        running: false,
                      },
                      {
                        name: "landing-page",
                        state: "Ready",
                        dot: "bg-accent-success",
                        tone: "text-accent-success",
                        running: false,
                      },
                    ].map((lane) => (
                      <div
                        key={lane.name}
                        className={cn(
                          "flex items-center gap-2 rounded-card border border-border/70 bg-surface-1 px-3 py-2",
                          lane.running && !reduced && "animate-lane-pulse",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 shrink-0 rounded-full",
                            lane.dot,
                          )}
                        />
                        <span className="flex-1 truncate font-mono text-[11px] text-foreground/80">
                          {lane.name}
                        </span>
                        <span
                          className={cn("font-mono text-[10px]", lane.tone)}
                        >
                          {lane.state}
                        </span>
                      </div>
                    ))}
                    <p className="mt-1 font-mono text-[10px] text-rail">
                      3 rails · $0.42 burn · drag a spec to add a lane
                    </p>
                  </div>
                </div>
              </ProductFrame>

              <ul className="mt-5 space-y-2.5">
                {HUB_CAPABILITIES.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet"
                      aria-hidden="true"
                    />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 font-mono text-xs text-rail">
                macOS &amp; Windows signed builds · no accounts · no telemetry
              </p>

              <Button
                asChild
                variant="cyan"
                className="mt-5 w-full sm:w-auto sm:self-start"
              >
                <Link to="/download">
                  Download for desktop
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          {/* ── Connector 2: desktop MIRRORS to companion ────────────────── */}
          <Reveal
            delay={400}
            className="flex min-w-0 items-center justify-center lg:px-1"
          >
            {/* desktop: horizontal bridge */}
            <div className="hidden w-20 lg:flex lg:flex-col lg:items-center">
              <RailConnector orientation="horizontal" reduced={reduced} label="mirror" />
            </div>
            {/* mobile / tablet: vertical flow */}
            <div className="lg:hidden">
              <RailConnector orientation="vertical" reduced={reduced} label="mirror" />
            </div>
          </Reveal>

          {/* ── specrails-companion: your phone (RIGHT, secondary) ───────── */}
          <Reveal delay={500} className="flex min-w-0 flex-col opacity-90">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-card border border-border/60 bg-surface-2 text-brand-cyan">
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  Specrails (Companion)
                </p>
                <h3 className="text-base font-semibold tracking-tight text-foreground/80">
                  your phone
                </h3>
              </div>
            </div>

            <ProductFrame
              chrome="mac"
              label="Specrails (Companion)"
              aspectRatio="13 / 10"
              bodyClassName="h-full"
            >
              <img
                src="/companion/pairing.png"
                alt="Specrails Companion — pair your phone with Specrails Desktop"
                className="h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </ProductFrame>

            <ul className="mt-4 space-y-2">
              {COMPANION_CAPABILITIES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <Icon
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-cyan/80"
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 font-mono text-[11px] text-rail">
              for: anyone who walks away from the desk but not the work.
            </p>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-4 w-full sm:w-auto sm:self-start"
            >
              <a
                href="https://specrails.dev/companion-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the companion
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={300} className="mt-10 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            Powered by core. Driven from desktop. Watched from your phone.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductsSection;
