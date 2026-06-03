import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Download, Github, ArrowRight, Apple } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroMesh } from "@/components/HeroMesh";
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
  const { href: downloadHref, disabled: downloadDisabled, version, platform } =
    downloadFromState(releaseState, detected);

  const platformShort = PLATFORM_SHORT[platform];
  const platformPill =
    platform === "darwin-arm64"
      ? "Apple Silicon"
      : platform === "windows-x64"
        ? "Windows x64"
        : "Windows ARM64";
  const versionLabel =
    version !== null
      ? `v${version} · ${platformPill} · macOS, Windows x64 & ARM64`
      : `${platformPill} · macOS, Windows x64 & ARM64`;

  return (
    <section
      data-hero
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
    >
      <HeroMesh />

      {/* Ambient radial glow with motion-safe breathing loop */}
      <div className="absolute inset-0 hero-glow motion-safe:animate-hero-breath pointer-events-none" />

      {/* Subtle noise overlay for luxe feel (only when asset is served) */}
      <div className="absolute inset-0 hero-noise pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        <h1
          data-logo="hero"
          className="font-mono text-5xl md:text-7xl font-bold mb-6 invisible"
        >
          <span>spec</span>
          <span>rails</span>
        </h1>

        {/* Open source badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/30 bg-background/30 backdrop-blur-sm text-xs font-mono text-muted-foreground mb-6 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-dracula-green animate-pulse" />
          Open Source · MIT License
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-3xl font-bold tracking-tight text-foreground mb-4 animate-fade-up delay-100 leading-tight">
          Your Agentic Development Team.
          <br />
          <span className="gradient-text">From Idea to Production Code.</span>
        </p>

        {/* Supporting line */}
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-8 animate-fade-up delay-200">
          <span className="text-dracula-green">Spec-driven</span> +{" "}
          <span className="text-dracula-pink">test-driven</span> agents, powered by{" "}
          <span className="text-dracula-cyan">specrails-core</span> on{" "}
          <span className="text-dracula-purple">Claude Code</span> &{" "}
          <span className="text-dracula-orange">Codex</span>.
        </p>

        {/* Primary CTA pair (ABOVE the demo, voicebox-style) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up delay-300">
          <a
            href={downloadHref ?? "#"}
            download={!downloadDisabled && downloadHref !== RELEASES_FALLBACK_URL}
            aria-disabled={downloadDisabled}
            aria-label={`Download specrails-hub for ${platformPill}`}
            className={cn(
              "group relative hidden sm:inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold",
              "transition-all duration-200",
              "bg-primary text-primary-foreground",
              "shadow-[0_12px_30px_-10px_rgba(0,195,210,0.55)]",
              "motion-safe:animate-hero-shimmer overflow-hidden",
              downloadDisabled
                ? "pointer-events-none opacity-60"
                : "hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-10px_rgba(0,195,210,0.7)]",
            )}
          >
            <Download className="w-4 h-4" />
            {releaseState.status === "loading"
              ? "Preparing download…"
              : `Download for ${platformShort}`}
          </a>

          <a
            href="https://github.com/fjpulidop/specrails-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-foreground/5 border border-border/30 text-foreground hover:bg-foreground/10 transition-colors"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>

        {/* Version pill */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-dracula-orange/25 bg-dracula-orange/5 text-xs font-mono text-dracula-orange animate-fade-up delay-400">
          {platform === "darwin-arm64" && <Apple className="w-3 h-3" />}
          {versionLabel}
        </div>

        {/* Core text link */}
        <div className="mt-8 animate-fade-up delay-500">
          <Link
            to="/core"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            Prefer the CLI? See{" "}
            <span className="text-dracula-cyan">specrails-core</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
