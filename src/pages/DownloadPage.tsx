import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Apple,
  ArrowRight,
  BookOpen,
  Coffee,
  Download,
  ExternalLink,
  Github,
  HardDrive,
  Heart,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/lib/utils";
import {
  detectPlatform,
  downloadForPlatform,
  formatBytes,
  PLATFORM_LABELS,
  PlatformKey,
  RELEASES_FALLBACK_URL,
  useReleaseManifest,
} from "@/hooks/useReleaseManifest";

interface PlatformCardConfig {
  key: PlatformKey;
  title: string;
  subtitle: string;
  badge: string;
  Icon: typeof Apple;
  accent: string;
  glow: string;
}

const PLATFORMS: PlatformCardConfig[] = [
  {
    key: "darwin-arm64",
    title: "macOS",
    subtitle: "Apple Silicon · M1, M2, M3, M4",
    badge: ".dmg · signed & notarised",
    Icon: Apple,
    accent: "text-dracula-cyan",
    glow: "from-dracula-cyan/20",
  },
  {
    key: "windows-x64",
    title: "Windows",
    subtitle: "Intel / AMD · 64-bit",
    badge: ".exe · NSIS installer",
    Icon: HardDrive,
    accent: "text-dracula-purple",
    glow: "from-dracula-purple/20",
  },
  {
    key: "windows-arm64",
    title: "Windows",
    subtitle: "ARM64 · Snapdragon, Surface Pro X",
    badge: ".exe · NSIS installer",
    Icon: HardDrive,
    accent: "text-dracula-pink",
    glow: "from-dracula-pink/20",
  },
];

const PlatformCard = ({
  config,
  highlighted,
}: {
  config: PlatformCardConfig;
  highlighted: boolean;
}) => {
  const releaseState = useReleaseManifest();
  const { href, disabled, version, size, sha256 } = downloadForPlatform(
    releaseState,
    config.key,
  );
  const { Icon } = config;

  return (
    <div
      className={cn(
        "group relative rounded-2xl p-[1px] transition-all duration-300",
        highlighted
          ? "bg-gradient-to-br from-dracula-purple/60 via-dracula-pink/40 to-dracula-cyan/40 shadow-[0_24px_60px_-20px_rgba(189,147,249,0.45)]"
          : "bg-gradient-to-br from-border/40 to-border/10 hover:from-dracula-purple/30 hover:to-dracula-cyan/20",
      )}
    >
      <div className="relative h-full rounded-2xl bg-background/90 backdrop-blur-xl p-6 flex flex-col overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-60 bg-gradient-to-br to-transparent",
            config.glow,
          )}
        />

        {highlighted && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-dracula-purple/20 border border-dracula-purple/40 text-[10px] font-mono uppercase tracking-wider text-dracula-purple">
            <Sparkles className="w-3 h-3" /> Detected
          </span>
        )}

        <div className="relative flex items-center gap-3 mb-4">
          <div
            className={cn(
              "flex items-center justify-center w-11 h-11 rounded-xl bg-foreground/5 border border-border/30",
              config.accent,
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground leading-tight">
              {config.title}
            </h3>
            <p className="text-xs text-muted-foreground">{config.subtitle}</p>
          </div>
        </div>

        <div className="relative flex flex-col gap-1.5 text-xs font-mono mb-6">
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <span className="text-muted-foreground/50">version</span>
            <span className="text-foreground">
              {releaseState.status === "loading"
                ? "…"
                : version !== null
                  ? `v${version}`
                  : "latest"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <span className="text-muted-foreground/50">format</span>
            <span className={config.accent}>{config.badge}</span>
          </div>
          {size !== null && (
            <div className="flex items-center gap-2 text-muted-foreground/80">
              <span className="text-muted-foreground/50">size</span>
              <span className="text-foreground">{formatBytes(size)}</span>
            </div>
          )}
          {sha256 && (
            <div
              className="flex items-center gap-2 text-muted-foreground/60 truncate"
              title={sha256}
            >
              <span className="text-muted-foreground/50">sha256</span>
              <span className="truncate">{sha256.slice(0, 16)}…</span>
            </div>
          )}
        </div>

        <a
          href={href ?? "#"}
          download={!disabled && href !== RELEASES_FALLBACK_URL}
          aria-disabled={disabled}
          aria-label={`Download specrails-hub for ${PLATFORM_LABELS[config.key]}`}
          className={cn(
            "relative mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden",
            "bg-primary text-primary-foreground shadow-[0_10px_28px_-12px_rgba(0,195,210,0.6)]",
            disabled
              ? "pointer-events-none opacity-60"
              : "hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(0,195,210,0.75)]",
          )}
        >
          <Download className="w-4 h-4" />
          {releaseState.status === "loading"
            ? "Preparing…"
            : `Download for ${config.title}`}
        </a>

        {config.key === "windows-x64" && (
          <p className="relative mt-3 text-[11px] text-muted-foreground/70 leading-snug">
            Unsigned in v1 — Windows SmartScreen will warn. Click{" "}
            <span className="text-foreground/80">More info → Run anyway</span>.
          </p>
        )}
        {config.key === "windows-arm64" && (
          <p className="relative mt-3 text-[11px] text-muted-foreground/70 leading-snug">
            Native ARM64 build — no x64 emulation. SmartScreen warning applies.
          </p>
        )}
        {config.key === "darwin-arm64" && (
          <p className="relative mt-3 text-[11px] text-muted-foreground/70 leading-snug">
            Signed & notarised by Apple — opens cleanly. Intel Macs: build coming.
          </p>
        )}
      </div>
    </div>
  );
};

const SupportCard = () => (
  <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-dracula-pink/60 via-dracula-purple/40 to-dracula-cyan/40 shadow-[0_28px_70px_-20px_rgba(255,121,198,0.45)]">
    <div className="relative rounded-2xl bg-background/90 backdrop-blur-xl p-8 md:p-10 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-60 bg-gradient-to-br from-dracula-pink/25 to-transparent" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-50 bg-gradient-to-br from-dracula-cyan/20 to-transparent" />

      <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
        <div className="flex md:flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-dracula-pink/15 border border-dracula-pink/30 flex items-center justify-center">
            <Heart className="w-7 h-7 text-dracula-pink" />
          </div>
          <span className="md:hidden text-sm font-semibold text-foreground">
            Support specrails
          </span>
        </div>

        <div className="space-y-3 text-left">
          <h2 className="hidden md:block text-2xl md:text-3xl font-bold tracking-tight">
            <span className="gradient-text">Free, forever.</span>{" "}
            <span className="text-foreground">Built by one developer.</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I'm Javier, a software developer who loves building apps. After more
            than <span className="text-foreground font-medium">15 years</span>{" "}
            shipping software, specrails is my{" "}
            <span className="text-foreground font-medium">
              first leap into open source
            </span>{" "}
            — and it's a project I plan to keep that way: free, with{" "}
            <span className="text-dracula-green">no telemetry</span>, no
            malware, no paywalls, no dark patterns.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If specrails is useful to you and you'd like to help me keep it
            alive, a coffee on Ko-fi goes a long way. No pressure — the app
            stays free either way.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dracula-green/10 border border-dracula-green/30 text-[11px] font-mono text-dracula-green">
              <ShieldCheck className="w-3 h-3" /> No telemetry
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dracula-cyan/10 border border-dracula-cyan/30 text-[11px] font-mono text-dracula-cyan">
              MIT License
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dracula-purple/10 border border-dracula-purple/30 text-[11px] font-mono text-dracula-purple">
              100% open source
            </span>
          </div>
        </div>

        <a
          href="https://ko-fi.com/D1D81Y002C"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-dracula-pink text-dracula-background shadow-[0_14px_32px_-12px_rgba(255,121,198,0.7)] hover:bg-dracula-pink/90 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
        >
          <Coffee className="w-4 h-4" />
          Support on Ko-fi
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  </div>
);

interface InfoCard {
  Icon: typeof BookOpen;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
  accent: string;
  glow: string;
}

const INFO_CARDS: InfoCard[] = [
  {
    Icon: BookOpen,
    title: "While you wait, read the docs",
    description:
      "Pipeline phases, agent profiles, hub features. Everything you need to make the most of specrails from minute one.",
    href: "/docs",
    cta: "Open documentation",
    accent: "text-dracula-cyan",
    glow: "from-dracula-cyan/20",
  },
  {
    Icon: MessageSquare,
    title: "Got questions?",
    description:
      "Open a discussion or file an issue on GitHub — I read every one. Bug reports, feature ideas, weird edge cases all welcome.",
    href: "https://github.com/fjpulidop/specrails-hub/discussions",
    cta: "Join the discussion",
    external: true,
    accent: "text-dracula-pink",
    glow: "from-dracula-pink/20",
  },
  {
    Icon: Github,
    title: "Source on GitHub",
    description:
      "Read the code, star the repos, send a PR. specrails-hub (desktop app) and specrails-core (the agent engine) are both fully open.",
    href: "https://github.com/fjpulidop/specrails-hub",
    cta: "Browse the source",
    external: true,
    accent: "text-dracula-purple",
    glow: "from-dracula-purple/20",
  },
];

const InfoCardView = ({ card }: { card: InfoCard }) => {
  const { Icon } = card;
  const isCore = card.Icon === Github;
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-border/40 to-border/10 hover:from-dracula-purple/30 hover:to-dracula-cyan/20 transition-all duration-300">
      <div className="relative h-full rounded-2xl bg-background/90 backdrop-blur-xl p-6 flex flex-col overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-50 bg-gradient-to-br to-transparent",
            card.glow,
          )}
        />
        <div
          className={cn(
            "relative flex items-center justify-center w-11 h-11 rounded-xl bg-foreground/5 border border-border/30 mb-4",
            card.accent,
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="relative text-base font-semibold text-foreground mb-2">
          {card.title}
        </h3>
        <p className="relative text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
          {card.description}
        </p>

        <div className="relative flex flex-col gap-2">
          <a
            href={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noopener noreferrer" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2.5 transition-all",
              card.accent,
            )}
          >
            {card.cta}
            {card.external ? (
              <ExternalLink className="w-3.5 h-3.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </a>
          {isCore && (
            <a
              href="https://github.com/fjpulidop/specrails-core"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-dracula-cyan transition-colors"
            >
              <Terminal className="w-3 h-3" />
              specrails-core (CLI)
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const DownloadPage = () => {
  useSeo({
    title: "Download specrails-hub — macOS, Windows x64 & ARM64",
    description:
      "Download the specrails-hub desktop app for macOS (Apple Silicon), Windows x64 and Windows ARM64. Free, open source, no telemetry. Always the latest release.",
    canonical: "https://specrails.dev/download",
  });

  const detected = useMemo(() => detectPlatform(), []);
  const releaseState = useReleaseManifest();
  const version =
    releaseState.status === "ready" ? releaseState.manifest.version : null;
  const releasedAt =
    releaseState.status === "ready" ? releaseState.manifest.releasedAt : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-glow motion-safe:animate-hero-breath pointer-events-none" />
        <div className="absolute inset-0 hero-noise pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/30 bg-background/30 backdrop-blur-sm text-xs font-mono text-muted-foreground mb-6 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-dracula-green animate-pulse" />
            Open Source · MIT · No telemetry
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 animate-fade-up delay-100">
            Download <span className="gradient-text">specrails-hub</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6 animate-fade-up delay-200">
            The local dashboard for your agentic dev team. Pick your platform —
            every download below always points at the latest release.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-2 animate-fade-up delay-300">
            {version && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-dracula-orange/25 bg-dracula-orange/5 text-xs font-mono text-dracula-orange">
                Latest · v{version}
              </span>
            )}
            {releasedAt && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/30 bg-background/30 text-xs font-mono text-muted-foreground">
                Released {new Date(releasedAt).toLocaleDateString()}
              </span>
            )}
            {releaseState.status === "error" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-dracula-red/25 bg-dracula-red/5 text-xs font-mono text-dracula-red">
                Manifest unreachable — fallback links active
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Platform cards */}
      <section className="relative px-6 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5 animate-fade-up delay-400">
          {PLATFORMS.map((p) => (
            <PlatformCard
              key={p.key}
              config={p}
              highlighted={detected === p.key}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-6 text-center text-xs text-muted-foreground/70 animate-fade-up delay-500">
          Looking for a specific version?{" "}
          <a
            href="https://github.com/fjpulidop/specrails-hub/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dracula-cyan hover:underline inline-flex items-center gap-1"
          >
            All releases on GitHub <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* Support / Ko-fi */}
      <section className="relative px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <SupportCard />
        </div>
      </section>

      {/* Info cards */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              While the download finishes…
            </h2>
            <p className="text-muted-foreground text-sm">
              Get oriented, ask questions, or dive into the source.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {INFO_CARDS.map((c) => (
              <InfoCardView key={c.title} card={c} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default DownloadPage;
