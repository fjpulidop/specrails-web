import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubStarsButton } from "@/components/GitHubStarsButton";
import { ProductFrame } from "@/components/ProductFrame";
import { Reveal } from "@/components/Reveal";
import {
  useReleaseManifest,
  downloadFromState,
  detectPlatform,
  PLATFORM_SHORT,
  RELEASES_FALLBACK_URL,
} from "@/hooks/useReleaseManifest";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const PROVIDERS = ["Claude", "Codex", "Gemini"] as const;

const HeroSection = () => {
  const releaseState = useReleaseManifest();
  const detected = useMemo(() => detectPlatform(), []);
  const { content } = useI18n();
  const { hero } = content;
  const { href: downloadHref, disabled: downloadDisabled, platform } =
    downloadFromState(releaseState, detected);

  const platformShort = PLATFORM_SHORT[platform];
  const downloadLabel =
    releaseState.status === "loading"
      ? "Preparing download..."
      : `${hero.download} · ${platformShort}`;

  return (
    <section
      data-hero
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-12 pt-24"
    >
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 hero-noise pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2 rounded-pill border border-border/70 bg-surface-2/70 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" aria-hidden="true" />
            {hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-6 text-[clamp(2.6rem,6vw,4.8rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            {hero.titleTop}
            <br />
            <span className="gradient-text">{hero.titleGradient}</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 max-w-3xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-6 inline-block rounded-full bg-gradient-brand p-px shadow-[0_8px_30px_-12px_hsl(var(--brand-violet)/0.55)]">
            <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-full bg-surface-1/90 px-3.5 py-2 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
                {hero.worksWith}
              </span>
              <span className="hidden h-3.5 w-px bg-border/70 sm:inline-block" aria-hidden="true" />
              {PROVIDERS.map((provider) => (
                <span
                  key={provider}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-2/70 px-2.5 py-1 font-mono text-xs text-foreground/90 [box-shadow:inset_0_1px_0_hsl(0_0%_100%_/_0.06)]"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-gradient-brand shadow-glow-brand"
                    aria-hidden="true"
                  />
                  {provider}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={downloadHref ?? RELEASES_FALLBACK_URL}
              download={!downloadDisabled && downloadHref !== RELEASES_FALLBACK_URL}
              aria-disabled={downloadDisabled}
              className={cn(
                "gradient-btn cta-sheen inline-flex items-center justify-center gap-2.5 rounded-pill px-7 py-3 text-sm font-semibold transition-transform duration-200",
                downloadDisabled
                  ? "pointer-events-none opacity-60"
                  : "hover:-translate-y-0.5 motion-safe:animate-download-pulse",
              )}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {downloadLabel}
            </a>
            <Button asChild variant="outline" className="rounded-pill px-6">
              <Link to="/docs">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                {hero.docs}
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={350}>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-mono text-muted-foreground">
            {hero.trust.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-4">
                <span>{item}</span>
                {index < hero.trust.length - 1 && (
                  <span className="hidden h-3 w-px bg-border/70 sm:inline-block" aria-hidden="true" />
                )}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={450} className="mt-10 w-full">
          <MissionControlShot />
        </Reveal>

        <Reveal delay={550}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <GitHubStarsButton repo="fjpulidop/specrails-desktop" />
            <a
              href="#product"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-2/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-border hover:text-foreground"
            >
              {content.nav.product}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

function MissionControlShot(): JSX.Element {
  const { content } = useI18n();
  const { hero } = content;

  return (
    <figure className="mx-auto w-full max-w-5xl">
      <ProductFrame
        chrome="none"
        glow
        aspectRatio="1440 / 900"
        className="bg-[#06060c]"
        bodyClassName="overflow-hidden bg-[#06060c]"
      >
        <video
          className="h-full w-full bg-[#06060c] object-cover"
          poster="/product/specrails-mission-control-real.png"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Real Specrails Mission Control launcher inside Specrails Desktop"
        >
          <source src="/product/specrails-mission-control-real.webm" type="video/webm" />
          <source src="/product/specrails-mission-control-real.mp4" type="video/mp4" />
          <img
            src="/product/specrails-mission-control-real.png"
            alt="Real Specrails Mission Control launcher inside Specrails Desktop"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </video>
        <noscript>
          <img
            src="/product/specrails-mission-control-real.png"
            alt="Real Specrails Mission Control launcher inside Specrails Desktop"
            className="h-full w-full object-cover"
          />
        </noscript>
      </ProductFrame>
      <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{hero.launcherLabel}</span>
        <span className="hidden h-3 w-px bg-border sm:inline-block" aria-hidden="true" />
        <span>{hero.launcherSubtitle}</span>
      </figcaption>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {hero.launcherMeta.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border/60 bg-surface-2/70 px-3 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </figure>
  );
}

export default HeroSection;
