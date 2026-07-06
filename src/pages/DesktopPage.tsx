import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Command,
  Download,
  Github,
  Kanban,
  LayoutDashboard,
  ListChecks,
  Lock,
  Layers,
  MonitorCheck,
  Smartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Reveal } from "@/components/Reveal";
import { ProductFrame } from "@/components/ProductFrame";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/lib/utils";

// ── feature data ─────────────────────────────────────────────────────

interface Feature {
  Icon: typeof LayoutDashboard;
  eyebrow: string;
  title: string;
  body: string;
  screenshot: string;
  screenshotAlt: string;
  reverse: boolean;
}

const FEATURES: Feature[] = [
  {
    Icon: LayoutDashboard,
    eyebrow: "Rails view",
    title: "Drag specs onto parallel rails",
    body: "Drop any spec card onto a rail lane and the pipeline ignites immediately — architecture, implementation, review and PR all progress in real time. Multiple specs run side by side in isolated git worktrees so they never collide.",
    screenshot: "/hub/hub-dashboard.png",
    screenshotAlt:
      "Specrails (Desktop) dashboard showing three specs on parallel execution rails",
    reverse: false,
  },
  {
    Icon: ListChecks,
    eyebrow: "Job traces",
    title: "Every run, fully traced",
    body: "Each pipeline execution is a job you can open and inspect: phase breakdown, per-agent logs, token usage, cost and final outcome. Nothing happens on your machine that you cannot see.",
    screenshot: "/hub/hub-jobs.png",
    screenshotAlt:
      "Specrails (Desktop) jobs list with phase-by-phase trace of a completed run",
    reverse: true,
  },
  {
    Icon: BarChart3,
    eyebrow: "Analytics",
    title: "Track every AI dollar",
    body: "Cost over time, jobs by status, duration, and token efficiency — per project and aggregated. Charts update as jobs finish. Export to CSV whenever you need it.",
    screenshot: "/hub/hub-analytics.png",
    screenshotAlt:
      "Specrails (Desktop) analytics view with cost-over-time chart and KPI cards",
    reverse: false,
  },
];

interface Pillar {
  Icon: typeof MonitorCheck;
  title: string;
  body: string;
  accent: string;
}

const PILLARS: Pillar[] = [
  {
    Icon: Layers,
    title: "Spec board (List / Kanban / Post-it)",
    body: "All your specs live in one local ticket board. Switch between list, Kanban column, or sticky-note layouts. Nothing syncs to a server — it is all on disk.",
    accent: "text-brand-cyan",
  },
  {
    Icon: Command,
    title: "⌘K command palette",
    body: "Full keyboard navigation throughout. Open specs, switch projects, trigger runs, jump to analytics or jobs — all without touching the mouse.",
    accent: "text-brand-violet",
  },
  {
    Icon: Smartphone,
    title: "Companion on your phone",
    body: "Pairs with Specrails (Companion) peer-to-peer over WebRTC / DTLS. Monitor rails remotely, approve a step, or cancel a run — straight from your phone.",
    accent: "text-brand-cyan",
  },
  {
    Icon: MonitorCheck,
    title: "Manages multiple projects",
    body: "Switch between repositories from one window. Each project keeps its own rails, specs, analytics and job history — all isolated, all local.",
    accent: "text-brand-violet",
  },
  {
    Icon: Sparkles,
    title: "Signed builds, ready to run",
    body: "macOS builds are signed and notarised — they open cleanly without quarantine warnings. Windows builds are signed too. Linux support is coming soon.",
    accent: "text-accent-success",
  },
  {
    Icon: ShieldCheck,
    title: "100% local · no accounts",
    body: "No telemetry, no cloud sync, no sign-up. Your specs, your keys, your machine. Always. MIT licensed and fully open source.",
    accent: "text-accent-success",
  },
];

const TRUST_CHIPS: { label: string; tone: "success" | "cyan" | "violet" }[] = [
  { label: "MIT licensed", tone: "cyan" },
  { label: "100% local", tone: "violet" },
  { label: "No telemetry", tone: "success" },
  { label: "macOS & Windows signed", tone: "cyan" },
];

const toneChip: Record<"success" | "cyan" | "violet", string> = {
  success: "border-accent-success/30 bg-accent-success/10 text-accent-success",
  cyan: "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan",
  violet: "border-brand-violet/30 bg-brand-violet/10 text-brand-violet",
};

// ── page ─────────────────────────────────────────────────────────────

const DesktopPage = () => {
  useSeo({
    title:
      "Specrails (Desktop) — the local cockpit for your AI dev team",
    description:
      "Specrails (Desktop) is a local-first desktop app that drives the specrails pipeline visually. Drag specs onto parallel rails, track every job and AI cost, manage multiple projects — all on your machine. Signed builds for macOS and Windows. MIT, no telemetry.",
    canonical: "https://specrails.dev/desktop",
  });

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

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* Copy column */}
          <div>
            <Reveal>
              <p className="eyebrow inline-flex items-center gap-2 text-brand-violet">
                <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
                Desktop app · macOS &amp; Windows
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-5 font-bold tracking-[-0.03em] leading-[1.04] [font-size:clamp(2.5rem,6vw,4.25rem)]">
                Specrails (Desktop){" "}
                <span className="gradient-text">— your mission control</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                The local cockpit for your agentic dev team. Drag specs onto
                parallel rails, watch pipelines run live, track every AI cost
                — all on your machine, with no accounts and no telemetry.
              </p>
            </Reveal>

            <Reveal
              delay={300}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                asChild
                className="cta-sheen gradient-btn rounded-pill px-5 h-11 text-sm"
              >
                <Link to="/download">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download for desktop
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <a
                href="https://github.com/fjpulidop/specrails-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-pill border border-border/70 bg-surface-2 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand-cyan/50"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                View on GitHub
              </a>
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

          {/* Hero screenshot column */}
          <Reveal delay={200}>
            <ProductFrame
              chrome="mac"
              label="Specrails (Desktop) — local"
              glow
              aspectRatio="16 / 10"
            >
              <img
                src="/hub/hub-dashboard.png"
                alt="Specrails (Desktop) — parallel rails dashboard"
                className="h-full w-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
            </ProductFrame>
            <p className="mt-3 text-center text-xs text-muted-foreground font-mono">
              Drag a spec onto a rail — the pipeline starts immediately.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Feature sections (alternating) ────────────────────────── */}
      {FEATURES.map((f, i) => (
        <section
          key={f.title}
          className={cn(
            "section-spacious px-6",
            i % 2 === 1 ? "section-darker" : "",
          )}
        >
          <div
            className={cn(
              "mx-auto max-w-6xl grid items-center gap-10 lg:grid-cols-2",
              f.reverse ? "" : "",
            )}
          >
            {/* Copy */}
            <Reveal
              className={cn(
                "flex flex-col",
                f.reverse ? "lg:order-2" : "lg:order-1",
              )}
            >
              <p className="eyebrow inline-flex items-center gap-2 text-brand-cyan">
                <f.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {f.eyebrow}
              </p>
              <h2 className="mt-4 section-heading">{f.title}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-prose">
                {f.body}
              </p>
            </Reveal>

            {/* Screenshot */}
            <Reveal
              delay={100}
              className={f.reverse ? "lg:order-1" : "lg:order-2"}
            >
              <ProductFrame
                chrome="mac"
                label="Specrails (Desktop) — local"
                aspectRatio="16 / 10"
              >
                <img
                  src={f.screenshot}
                  alt={f.screenshotAlt}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </ProductFrame>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── Pillars grid ───────────────────────────────────────────── */}
      <section className="section-spacious section-darker px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-brand-violet">Everything on board</p>
            <h2 className="section-heading mt-3">
              Built for the desk,{" "}
              <span className="gradient-text">not the cloud</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every view and control you need to run the specrails pipeline
              lives in one local window — no browser tab required.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={((i % 3) * 100) as 0 | 100 | 200}>
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

      {/* ── Ecosystem bridge ───────────────────────────────────────── */}
      <section className="section-spacious px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl mx-auto text-center">
            <p className="eyebrow text-brand-cyan">The ecosystem</p>
            <h2 className="section-heading mt-3">
              Powered by Core.{" "}
              <span className="gradient-text">Watched from your phone.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Specrails (Desktop) is the cockpit — it spawns the specrails-core
              agent pipeline under the hood and pairs with Specrails (Companion)
              on your phone over a zero-knowledge P2P WebRTC/DTLS link.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {/* Core */}
            <Reveal delay={0}>
              <div className="h-full rounded-card border border-border/70 bg-surface-2 p-5 transition-colors hover:border-brand-cyan/40">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-cyan">
                  Specrails (Core)
                </p>
                <h3 className="mt-2 text-base font-semibold text-foreground">
                  The engine
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The open-source CLI that Specrails (Desktop) spawns. 14
                  specialised agents drive the spec from idea to shipped PR.
                  Install standalone or let Desktop manage it for you.
                </p>
                <Link
                  to="/core"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan transition-colors hover:text-brand-violet"
                >
                  Learn about Core
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            {/* Desktop (centre, elevated) */}
            <Reveal delay={100}>
              <div className="h-full rounded-card border border-brand-violet/30 bg-surface-2 p-5 ring-1 ring-brand-violet/10 shadow-glow-elevated">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-violet">
                  Specrails (Desktop)
                </p>
                <h3 className="mt-2 text-base font-semibold text-foreground">
                  Mission control
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The local cockpit you are looking at. Drives Core visually,
                  manages multiple projects, tracks every job and dollar — all
                  from one signed desktop app.
                </p>
                <Button
                  asChild
                  variant="cyan"
                  size="sm"
                  className="mt-4"
                >
                  <Link to="/download">
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Download
                  </Link>
                </Button>
              </div>
            </Reveal>

            {/* Companion */}
            <Reveal delay={200}>
              <div className="h-full rounded-card border border-border/70 bg-surface-2 p-5 transition-colors hover:border-brand-cyan/40">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-cyan">
                  Specrails (Companion)
                </p>
                <h3 className="mt-2 text-base font-semibold text-foreground">
                  Your phone
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A mobile web app that pairs with Desktop over WebRTC/DTLS.
                  Walk away from your desk and keep watching your rails. The
                  P2P link is encrypted end-to-end — the relay never sees your
                  data.
                </p>
                <a
                  href="https://specrails.dev/companion-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-cyan transition-colors hover:text-brand-violet"
                >
                  Open Companion
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────────────── */}
      <section className="section-spacious section-darker px-6">
        <div className="mx-auto max-w-3xl">
          <GradientHairlineCard className="text-center" emphasised>
            <p className="eyebrow text-brand-violet">Get started</p>
            <h2 className="section-heading mt-3">
              Download your{" "}
              <span className="gradient-text">mission control.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Specrails (Desktop) is free, MIT licensed, and runs entirely on
              your machine. Signed builds for macOS and Windows — no accounts,
              no telemetry, no paywalls.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                className="cta-sheen gradient-btn rounded-pill px-6 h-11 text-sm"
              >
                <Link to="/download">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Specrails (Desktop)
                </Link>
              </Button>
              <a
                href="https://github.com/fjpulidop/specrails-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill border border-border/70 bg-surface-2 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand-cyan/50"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                View source on GitHub
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
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
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Prefer the terminal?{" "}
              <Link
                to="/core"
                className="text-brand-cyan hover:text-brand-violet transition-colors"
              >
                Get specrails-core (CLI)
                <ArrowRight className="inline h-3.5 w-3.5 ml-0.5" aria-hidden="true" />
              </Link>
            </p>
          </GradientHairlineCard>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

// ── shared helpers ────────────────────────────────────────────────────

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
          ? "bg-gradient-to-br from-brand-violet/50 via-brand-cyan/30 to-brand-violet/40"
          : "bg-gradient-to-br from-border/50 to-border/10 hover:from-brand-violet/40 hover:to-brand-cyan/20",
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

export default DesktopPage;
