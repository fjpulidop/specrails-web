import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Github, ArrowRight, Apple } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useReleaseManifest,
  downloadFromState,
  RELEASES_FALLBACK_URL,
} from "@/hooks/useReleaseManifest";

// ---------- particle background (canvas, decorative) ----------

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    let running = false;

    const initParticles = (w: number, h: number) => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(189, 147, 249, 0.15)";
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(139, 233, 253, ${0.08 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    const parent = canvas.parentElement;
    if (!parent) return;

    const ro = new ResizeObserver(() => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = w;
      canvas.height = h;
      if (!running) {
        initParticles(w, h);
        running = true;
        draw();
      } else {
        for (const p of particles) {
          p.x = Math.min(p.x, w);
          p.y = Math.min(p.y, h);
        }
      }
    });
    ro.observe(parent);
    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// ---------- browser chrome frame (desktop) + screenshot (mobile) ----------

interface HubDemoFrameProps {
  isDesktop: boolean;
}

const HubDemoFrame = ({ isDesktop }: HubDemoFrameProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeMissing, setIframeMissing] = useState(false);

  // Lazy-load the iframe only after the hero is in view, and only if the
  // hub-demo build actually exists. Probe via manifest content-type so SPA
  // fallback HTML doesn't give us a false positive.
  useEffect(() => {
    if (!isDesktop || !frameRef.current) return;
    const el = frameRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        fetch("/hub-demo/manifest.json", { method: "GET" })
          .then((res) => {
            const ct = res.headers.get("content-type") ?? "";
            if (res.ok && ct.includes("application/json")) {
              setShouldLoadIframe(true);
            } else {
              setIframeMissing(true);
            }
          })
          .catch(() => setIframeMissing(true));
        io.disconnect();
      },
      { rootMargin: "0px 0px 200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isDesktop]);

  return (
    <div
      ref={frameRef}
      className="hero-chrome-ring relative mx-auto w-full max-w-[1100px] rounded-xl overflow-hidden glass-card"
    >
      {/* content — iframe on desktop, screenshot on mobile (frameless) */}
      <div className="relative" style={{ aspectRatio: "16/10" }}>
        {isDesktop ? (
          <>
            {(!iframeLoaded || !shouldLoadIframe) && !iframeMissing && (
              <div className="absolute inset-0 bg-dracula-bg flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-dracula-purple border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {iframeMissing && <HubDemoFallback />}
            {shouldLoadIframe && !iframeMissing && (
              <iframe
                src="/hub-demo/index.html"
                title="specrails-hub demo"
                className="absolute inset-0 w-full h-full border-0"
                onLoad={() => setIframeLoaded(true)}
                sandbox="allow-scripts allow-same-origin"
              />
            )}
          </>
        ) : (
          <img
            src="/hero-hub-screenshot.webp"
            alt="specrails-hub dashboard screenshot"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // Screenshot asset missing — fall back to a subtle placeholder
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>
    </div>
  );
};

const HubDemoFallback = () => (
  <div className="absolute inset-0 bg-dracula-bg flex items-center justify-center">
    <div className="text-center max-w-md px-6">
      <p className="text-lg font-semibold text-foreground/80 mb-2">
        Interactive demo coming soon
      </p>
      <p className="text-sm text-muted-foreground">
        Download the desktop app below to run specrails-hub locally.
      </p>
    </div>
  </div>
);

// ---------- hero section ----------

const DESKTOP_BREAKPOINT = 1024;

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches
      : true,
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const handler = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
};

const HeroSection = () => {
  const isDesktop = useIsDesktop();
  const releaseState = useReleaseManifest();
  const { href: downloadHref, disabled: downloadDisabled, version } =
    downloadFromState(releaseState);

  const versionLabel =
    version !== null
      ? `v${version} · Apple Silicon only`
      : "Apple Silicon only";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
    >
      <ParticleBackground />

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
          Open Source · MIT License{version ? ` · v${version}` : ""}
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-3xl font-bold tracking-tight text-foreground mb-4 animate-fade-up delay-100 leading-tight">
          Your Agentic Development Team.
          <br />
          <span className="gradient-text">From Idea to Production Code.</span>
        </p>

        {/* Supporting line */}
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-8 animate-fade-up delay-200">
          Agentic development, orchestrated by specs — powered by{" "}
          <span className="text-dracula-cyan">specrails-core</span>.
        </p>

        {/* Primary CTA pair (ABOVE the demo, voicebox-style) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up delay-300">
          <a
            href={downloadHref ?? "#"}
            download={!downloadDisabled && downloadHref !== RELEASES_FALLBACK_URL}
            aria-disabled={downloadDisabled}
            aria-label="Download specrails-hub for macOS Apple Silicon"
            className={cn(
              "group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold",
              "transition-all duration-200",
              "bg-dracula-purple text-dracula-background",
              "shadow-[0_12px_30px_-10px_rgba(189,147,249,0.55)]",
              "motion-safe:animate-hero-shimmer overflow-hidden",
              downloadDisabled
                ? "pointer-events-none opacity-60"
                : "hover:bg-dracula-purple/90 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-10px_rgba(189,147,249,0.7)]",
            )}
          >
            <Download className="w-4 h-4" />
            {releaseState.status === "loading"
              ? "Preparing download…"
              : "Download for Mac"}
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
        <div className="mt-3 mb-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-dracula-orange/25 bg-dracula-orange/5 text-xs font-mono text-dracula-orange animate-fade-up delay-400">
          <Apple className="w-3 h-3" />
          {versionLabel}
        </div>

        {/* Demo frame (iframe on desktop, screenshot on mobile) */}
        <div className="animate-fade-up delay-500">
          <HubDemoFrame isDesktop={isDesktop} />
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
