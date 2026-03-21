import { useEffect, useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { GitHubStarsButton } from "@/components/GitHubStarsButton";

const INSTALL_COMMAND = "npx specrails-core@latest init";

const gitCloneLines = [
  { text: "$ git clone https://github.com/fjpulidop/specrails-core.git", color: "text-dracula-green", delay: 0 },
  { text: "$ ./specrails/install.sh --root-dir <your-project>", color: "text-dracula-green", delay: 800 },
  { text: "", color: "text-foreground", delay: 1200 },
  { text: "✅ Templates installed", color: "text-dracula-cyan", delay: 1600 },
  { text: "✅ Commands installed", color: "text-dracula-cyan", delay: 2000 },
  { text: "🚀 Ready! Run /setup in Claude Code or Codex", color: "text-dracula-pink", delay: 2400 },
];

const npxLines = [
  { text: "$ npx specrails-core@latest init --root-dir <your-project>", color: "text-dracula-green", delay: 0 },
  { text: "", color: "text-foreground", delay: 600 },
  { text: "✅ Templates installed", color: "text-dracula-cyan", delay: 1000 },
  { text: "✅ Commands installed", color: "text-dracula-cyan", delay: 1400 },
  { text: "🚀 Ready! Run /setup in Claude Code or Codex", color: "text-dracula-pink", delay: 1800 },
];

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

    // Observe the parent section — absolute canvas gets its size from there
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

const AnimatedTerminal = ({ lines, label }: { lines: typeof gitCloneLines; label: string }) => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [lines]);

  return (
    <div className="terminal p-0 flex-1 min-w-0">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20">
        <div className="terminal-dot bg-dracula-red" />
        <div className="terminal-dot bg-dracula-yellow" />
        <div className="terminal-dot bg-dracula-green" />
        <span className="text-xs text-muted-foreground ml-2">{label}</span>
      </div>
      <div className="p-4 text-left text-sm leading-relaxed h-[200px] overflow-hidden">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`${line.color} animate-fade-up`}>
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block w-2 h-4 bg-dracula-green animate-pulse" />
        )}
      </div>
    </div>
  );
};

const InstallCommand = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available in test/SSR environments
    }
  };

  return (
    <div className="terminal p-0 max-w-lg mx-auto w-full">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20">
        <div className="terminal-dot bg-dracula-red" />
        <div className="terminal-dot bg-dracula-yellow" />
        <div className="terminal-dot bg-dracula-green" />
        <span className="text-xs text-muted-foreground ml-2 font-mono">Terminal</span>
      </div>
      <div className="flex items-center justify-between px-4 py-3.5 gap-4">
        <code className="font-mono text-sm md:text-base text-left">
          <span className="text-muted-foreground select-none">$ </span>
          <span className="text-dracula-green">{INSTALL_COMMAND}</span>
        </code>
        <button
          onClick={handleCopy}
          aria-label="Copy install command"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 px-2 py-1 rounded border border-border/20 hover:border-border/50"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-dracula-green" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
      <ParticleBackground />

      {/* Ambient radial glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 data-logo="hero" className="font-mono text-5xl md:text-7xl font-bold mb-8 invisible">
          <span>spec</span>
          <span>rails</span>
        </h1>

        {/* Open source badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/30 bg-background/30 backdrop-blur-sm text-xs font-mono text-muted-foreground mb-8 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-dracula-green animate-pulse" />
          Open Source &middot; MIT License
        </div>

        {/* Tagline — large, bold, two lines */}
        <p className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-up delay-100 leading-tight">
          Your AI Development Team.<br />
          <span className="gradient-text">From Idea to Production Code.</span>
        </p>

        {/* Supporting line */}
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
          A system of 12 specialized agents that works with Claude Code and OpenAI Codex — from
          Product Discovery &rarr; Architecture &rarr; Implementation &rarr; Review &rarr; Ship
        </p>

        {/* Install command — primary CTA */}
        <div className="mb-6 animate-fade-up delay-300">
          <InstallCommand />
          <p className="text-xs text-muted-foreground mt-2.5 font-mono">
            No account required &middot; Runs locally
          </p>
        </div>

        {/* Secondary CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16 animate-fade-up delay-400">
          <GitHubStarsButton />
          <a href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group">
            Read the docs
            <span className="transition-transform group-hover:translate-x-0.5 inline-block">&rarr;</span>
          </a>
        </div>

        {/* Terminal previews */}
        <div className="flex flex-col md:flex-row gap-4 animate-fade-up delay-500">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
              <span className="text-dracula-purple">Option A</span> &mdash; npx
            </p>
            <AnimatedTerminal lines={npxLines} label="npx" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
              <span className="text-dracula-cyan">Option B</span> &mdash; git clone
            </p>
            <AnimatedTerminal lines={gitCloneLines} label="git clone" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
