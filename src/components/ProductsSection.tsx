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
 * The single glossy "spec" object riding rails from the terminal into the Hub.
 * Desktop: a horizontal track bridging the two frames. Mobile: a vertical
 * flow connector. Decorative — aria-hidden, gated by reduced-motion.
 */
function RailConnector({
  orientation,
  reduced,
}: {
  orientation: "horizontal" | "vertical";
  reduced: boolean;
}) {
  if (orientation === "vertical") {
    const vGlide = { "--glide-x": "calc(100% - 2.5rem)" } as CSSProperties;
    return (
      <div className="relative mx-auto h-16 w-12" aria-hidden="true">
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
    );
  }

  const hGlide = { "--glide-x": "calc(100% - 2.5rem)" } as CSSProperties;
  return (
    <div className="relative h-12 w-full" aria-hidden="true">
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
            Three ways to{" "}
            <span className="gradient-text">ride the rails.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Now that you get the idea, here's how to use it — start with one
            command in your terminal, add a cockpit when you want to watch,
            reach for your phone when you step away.
          </p>
        </Reveal>

        {/* Three-column layout. The spec object travels left → right
            on desktop, top → bottom on mobile. */}
        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {/* ── specrails-core: a crisp mono CLI ───────────────────────── */}
          <Reveal delay={100} className="flex flex-col">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-card border border-border/70 bg-surface-2 text-brand-cyan">
                <Terminal className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  specrails-core
                </p>
                <h3 className="text-lg font-semibold tracking-tight">
                  The open-source engine
                </h3>
              </div>
            </div>

            <ProductFrame chrome="mac" label="zsh — specrails-core">
              <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed">
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

            <ul className="mt-5 space-y-2.5">
              {CORE_CAPABILITIES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 font-mono text-xs text-rail">
              MIT · Claude, Codex &amp; Gemini · bring your own API key
            </p>

            <Button
              asChild
              variant="cyan"
              className="mt-5 w-full sm:w-auto sm:self-start"
            >
              <Link to="/core">
                Get the CLI
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>

          {/* ── Connector 1: core → desktop ─────────────────────────────── */}
          <Reveal
            delay={200}
            className="flex items-center justify-center lg:px-1"
          >
            {/* desktop: horizontal bridge */}
            <div className="hidden w-28 lg:block">
              <RailConnector orientation="horizontal" reduced={reduced} />
            </div>
            {/* mobile / tablet: vertical flow */}
            <div className="lg:hidden">
              <RailConnector orientation="vertical" reduced={reduced} />
            </div>
          </Reveal>

          {/* ── specrails-desktop: the local cockpit ───────────────────────── */}
          <Reveal delay={300} className="flex flex-col">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-card border border-border/70 bg-surface-2 text-brand-violet">
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  specrails-desktop
                </p>
                <h3 className="text-lg font-semibold tracking-tight">
                  The local cockpit
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
              variant="outline"
              className="mt-5 w-full sm:w-auto sm:self-start"
            >
              <Link to="/download">
                Download for desktop
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>

          {/* ── Connector 2: desktop → companion ────────────────────────── */}
          <Reveal
            delay={400}
            className="flex items-center justify-center lg:px-1"
          >
            {/* desktop: horizontal bridge */}
            <div className="hidden w-28 lg:block">
              <RailConnector orientation="horizontal" reduced={reduced} />
            </div>
            {/* mobile / tablet: vertical flow */}
            <div className="lg:hidden">
              <RailConnector orientation="vertical" reduced={reduced} />
            </div>
          </Reveal>

          {/* ── specrails-companion: your phone ─────────────────────────── */}
          <Reveal delay={500} className="flex flex-col">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-card border border-border/70 bg-surface-2 text-brand-cyan">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  specrails-companion
                </p>
                <h3 className="text-lg font-semibold tracking-tight">
                  your phone
                </h3>
              </div>
            </div>

            <ProductFrame chrome="mac" label="specrails-companion — web">
              <div className="space-y-3 p-5 text-[13px] leading-relaxed">
                <p className="text-foreground">
                  Control your desktop pipeline from your phone.
                </p>
                <p className="text-muted-foreground">
                  Pairs to specrails-desktop peer-to-peer over WebRTC (DTLS).
                </p>
                <p className="text-muted-foreground">
                  A zero-knowledge mailbox relays only the ~5-second handshake.
                </p>
                <p className="text-muted-foreground">
                  Your data never leaves your devices.
                </p>
              </div>
            </ProductFrame>

            <ul className="mt-5 space-y-2.5">
              {COMPANION_CAPABILITIES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 font-mono text-xs text-rail">
              for: anyone who walks away from the desk but not the work.
            </p>

            <Button
              asChild
              variant="outline"
              className="mt-5 w-full sm:w-auto sm:self-start"
            >
              <a
                href="https://specrails.dev/companion-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the companion
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={300} className="mt-10 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            Start anywhere. All three share the same spec.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductsSection;
