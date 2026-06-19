import { useMemo } from "react";
import { Download, LayoutDashboard, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoVideo } from "@/components/DemoVideo";
import { Reveal } from "@/components/Reveal";
import { GitHubStarsButton } from "@/components/GitHubStarsButton";
import { CopyButton } from "@/components/CopyButton";
import {
  useReleaseManifest,
  downloadFromState,
  detectPlatform,
  PLATFORM_SHORT,
  RELEASES_FALLBACK_URL,
} from "@/hooks/useReleaseManifest";

// ---------- hero section ----------

const HeroSection = () => {
  const releaseState = useReleaseManifest();
  const detected = useMemo(() => detectPlatform(), []);
  const { href: downloadHref, disabled: downloadDisabled, platform } =
    downloadFromState(releaseState, detected);

  const platformShort = PLATFORM_SHORT[platform];
  const downloadLabel =
    releaseState.status === "loading"
      ? "Preparing download…"
      : `Download for ${platformShort}`;

  return (
    <section
      data-hero
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12 overflow-hidden"
    >
      {/* Static brand glow — no animated canvas */}
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 hero-noise pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow — static, no pulsing "online" dot */}
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2 rounded-pill border border-border/70 bg-surface-2/70 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" aria-hidden="true" />
            MIT · Local-first · Open source
          </span>
        </Reveal>

        {/* Headline */}
        <Reveal delay={100}>
          <h1 className="mt-6 font-bold tracking-[-0.03em] leading-[1.04] text-[clamp(2.5rem,6vw,4.5rem)]">
            Describe it.
            <br />
            <span className="gradient-text">A team of agents ships it.</span>
          </h1>
        </Reveal>

        {/* Subhead — brand + neutral only */}
        <Reveal delay={200}>
          <p className="mt-5 max-w-2xl text-balance text-base md:text-lg leading-relaxed text-muted-foreground">
            Specrails is an agentic software development system. Describe what you
            want; a team of AI agents turns it into a spec and ships the PR.
          </p>
        </Reveal>

        {/* Compatibility — premium glass bar with a lit gradient hairline */}
        <Reveal delay={250}>
          <div className="mt-6 inline-block rounded-full bg-gradient-brand p-px shadow-[0_8px_30px_-12px_hsl(var(--brand-violet)/0.55)]">
            <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-full bg-surface-1/90 px-3.5 py-2 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
                Works with
              </span>
              <span className="hidden h-3.5 w-px bg-border/70 sm:inline-block" aria-hidden="true" />
              {["Claude", "Codex", "Gemini"].map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-2/70 px-2.5 py-1 font-mono text-xs text-foreground/90 [box-shadow:inset_0_1px_0_hsl(0_0%_100%_/_0.06)]"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-gradient-brand shadow-glow-brand"
                    aria-hidden="true"
                  />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Two ways to start — the Desktop app vs the Core CLI, each in a lit card */}
        <Reveal delay={300} className="w-full">
          <div className="mx-auto mt-7 grid w-full max-w-3xl items-stretch gap-4 sm:grid-cols-2">
            {/* ── Specrails (Desktop) — download the app ── */}
            <div className="rounded-2xl bg-gradient-brand p-px shadow-[0_14px_50px_-20px_hsl(var(--brand-violet)/0.6)]">
              <div className="flex h-full flex-col gap-3.5 rounded-2xl bg-surface-1/95 p-4 text-left backdrop-blur">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-brand-violet/40 bg-brand-violet/10 text-brand-violet">
                    <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-none">Specrails (Desktop)</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                      the app
                    </p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  The local cockpit — download, drag specs onto rails, and watch
                  them ship.
                </p>
                <div className="mt-auto flex flex-col gap-2.5">
                  <a
                    href={downloadHref ?? RELEASES_FALLBACK_URL}
                    download={!downloadDisabled && downloadHref !== RELEASES_FALLBACK_URL}
                    aria-disabled={downloadDisabled}
                    aria-label={`Download Specrails (Desktop) for ${platformShort}`}
                    className={cn(
                      "gradient-btn cta-sheen group inline-flex w-full items-center justify-center gap-2.5 rounded-pill px-6 py-3 text-sm font-semibold transition-transform duration-200",
                      downloadDisabled
                        ? "pointer-events-none opacity-60"
                        : "hover:-translate-y-0.5 motion-safe:animate-download-pulse",
                    )}
                  >
                    <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {downloadLabel}
                  </a>
                  <GitHubStarsButton repo="fjpulidop/specrails-desktop" className="w-full" />
                </div>
              </div>
            </div>

            {/* ── Specrails (Core) — the open-source CLI ── */}
            <div className="rounded-2xl bg-gradient-brand p-px shadow-[0_14px_50px_-20px_hsl(var(--brand-cyan)/0.55)]">
              <div className="flex h-full flex-col gap-3.5 rounded-2xl bg-surface-1/95 p-4 text-left backdrop-blur">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan">
                    <Terminal className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-none">Specrails (Core)</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                      the CLI
                    </p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Open source. One command drops the agent pipeline into any git
                  repo.
                </p>
                <div className="mt-auto flex flex-col gap-2.5">
                  <div className="inline-flex w-full items-center gap-2 rounded-pill border border-border/70 bg-surface-2/60 py-2.5 pl-4 pr-1.5 font-mono text-xs text-foreground/80">
                    <code className="flex-1 truncate">npx specrails-core@latest init</code>
                    <CopyButton value="npx specrails-core@latest init" label="Copy CLI command" />
                  </div>
                  <GitHubStarsButton repo="fjpulidop/specrails-core" className="w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="#pipeline"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-2/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-border hover:text-foreground"
            >
              See how it works
              <span className="motion-safe:animate-bounce" aria-hidden="true">↓</span>
            </a>
          </div>
        </Reveal>

        {/* Trust row */}
        <Reveal delay={400}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-mono text-muted-foreground">
            <span>MIT licensed</span>
            <span className="hidden h-3 w-px bg-border/70 sm:inline-block" aria-hidden="true" />
            <span>macOS &amp; Windows</span>
          </div>
        </Reveal>

        {/* Hero product frame — the Rails showcase, with the one hero glow */}
        <Reveal delay={500} className="mt-12 w-full">
          <div className="mx-auto w-full max-w-4xl">
            <DemoVideo
              label="Specrails (Desktop) — localhost:4200"
              poster="/hub/hub-dashboard.png"
              srcBase="/demos/hero"
              ready={false}
              glow
              aspectRatio="16 / 9"
              placeholderText="Watch one spec go from idea to a shipped pull request — press play."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
