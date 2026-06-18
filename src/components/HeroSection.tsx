import { useMemo } from "react";
import { Download } from "lucide-react";
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
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden"
    >
      {/* Static brand glow — no animated canvas */}
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 hero-noise pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Wordmark sizing/docking anchor — AnimatedLogo measures this element's
            box to seat the docking wordmark. Kept invisible (occupies layout);
            the real accessible headline is the <h1> below. */}
        <div
          data-logo="hero"
          aria-hidden="true"
          className="font-mono text-5xl md:text-7xl font-bold mb-8 invisible select-none"
        >
          specrails
        </div>

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
          <p className="mt-6 max-w-2xl text-balance text-base md:text-lg leading-relaxed text-muted-foreground">
            specrails is an agentic software development system. You write a spec — what to build and why. A team of AI agents designs, builds, reviews, and ships the PR.
          </p>
        </Reveal>

        {/* CTA pair */}
        <Reveal delay={300} className="w-full">
          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href={downloadHref ?? RELEASES_FALLBACK_URL}
              download={!downloadDisabled && downloadHref !== RELEASES_FALLBACK_URL}
              aria-disabled={downloadDisabled}
              aria-label={`Download specrails-desktop for ${platformShort}`}
              className={cn(
                "gradient-btn cta-sheen group inline-flex w-full items-center justify-center gap-2.5",
                "rounded-pill px-7 py-3.5 text-sm font-semibold sm:w-auto",
                "transition-transform duration-200",
                downloadDisabled
                  ? "pointer-events-none opacity-60"
                  : "hover:-translate-y-0.5",
              )}
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
              {downloadLabel}
            </a>

            <div className="inline-flex items-center gap-2 rounded-pill border border-border/70 bg-surface-2/60 pl-4 pr-1.5 py-2.5 font-mono text-xs text-foreground/80">
              <code>npx specrails-core@latest init</code>
              <CopyButton value="npx specrails-core@latest init" label="Copy CLI command" />
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <a href="#pipeline" className="text-xs text-muted-foreground hover:text-foreground transition-colors">See how it works ↓</a>
          </div>
        </Reveal>

        {/* Trust row */}
        <Reveal delay={400}>
          <div className="mt-8 flex flex-col items-center gap-4">
            <GitHubStarsButton />
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-mono text-muted-foreground">
              <span>MIT licensed</span>
              <span className="hidden h-3 w-px bg-border/70 sm:inline-block" aria-hidden="true" />
              <span>macOS &amp; Windows · signed builds</span>
            </div>
          </div>
        </Reveal>

        {/* Hero product frame — the Rails showcase, with the one hero glow */}
        <Reveal delay={500} className="mt-14 w-full">
          <div className="mx-auto w-full max-w-4xl">
            <DemoVideo
              label="specrails-desktop — localhost:4200"
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
