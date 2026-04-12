import { useEffect, useState, useRef } from "react";
import { GitHubStarsButton } from "./GitHubStarsButton";

interface TabLine {
  text: string;
  color: string;
  delay: number;
}

interface InstallTab {
  id: string;
  label: string;
  lines: TabLine[];
}

const installTabs: InstallTab[] = [
  {
    id: "quick",
    label: "Quick Setup",
    lines: [
      { text: "$ npx specrails-core@latest init", color: "text-dracula-green", delay: 0 },
      { text: "\u2192 Provider: claude (auto-detected)", color: "text-dracula-foreground", delay: 600 },
      { text: "\u2192 Tier: quick | Agents: 8/14 | Preset: balanced", color: "text-dracula-foreground", delay: 1000 },
      { text: "\u2713 8 agents \u2192 .claude/agents/", color: "text-dracula-cyan", delay: 1500 },
      { text: "\u2713 12 commands \u2192 .claude/commands/specrails/", color: "text-dracula-cyan", delay: 1900 },
      { text: "$ # Ready to use \u2014 no additional setup needed", color: "text-dracula-pink", delay: 2400 },
    ],
  },
  {
    id: "full",
    label: "Full Setup",
    lines: [
      { text: "$ npx specrails-core@latest init", color: "text-dracula-green", delay: 0 },
      { text: "\u2192 Provider: claude | Tier: full", color: "text-dracula-foreground", delay: 600 },
      { text: "\u2713 Templates installed", color: "text-dracula-cyan", delay: 1000 },
      { text: "$ /specrails:enrich", color: "text-dracula-green", delay: 1400 },
      { text: "\u2713 Codebase analyzed \u00b7 VPC personas generated", color: "text-dracula-cyan", delay: 2000 },
      { text: "\u2713 14 agents configured for your stack", color: "text-dracula-cyan", delay: 2400 },
      { text: "$ # Your AI development team is live", color: "text-dracula-pink", delay: 2900 },
    ],
  },
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

const TabbedTerminal = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const currentTab = installTabs[activeTab];

  useEffect(() => {
    setVisibleLines(0);
    const timers = currentTab.lines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [animKey, currentTab]);

  const handleTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
      setAnimKey((k) => k + 1);
    }
  };

  return (
    <div className="terminal p-0 max-w-2xl mx-auto w-full" data-testid="tabbed-terminal">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20 relative">
        <div className="terminal-dot bg-dracula-red" />
        <div className="terminal-dot bg-dracula-yellow" />
        <div className="terminal-dot bg-dracula-green" />
        <span className="absolute left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <span className="text-dracula-green">Get started</span> &mdash; choose your setup
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex justify-center border-b border-border/20">
        {installTabs.map((tab, index) => (
          <button
            key={tab.id}
            data-testid={`tab-${tab.id}`}
            onClick={() => handleTabClick(index)}
            aria-selected={index === activeTab}
            className={`px-4 py-2.5 text-xs font-mono transition-colors border-b-2 -mb-px ${
              index === activeTab
                ? "text-dracula-green border-dracula-green"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Terminal content */}
      <div className="p-4 text-left text-sm leading-relaxed h-[196px] overflow-hidden">
        {currentTab.lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`${line.color} animate-fade-up`}>
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleLines < currentTab.lines.length && (
          <span className="inline-block w-2 h-4 bg-dracula-green animate-pulse" />
        )}
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

        {/* Tagline */}
        <p className="text-xl md:text-3xl font-bold tracking-tight text-foreground mb-4 animate-fade-up delay-100 leading-tight">
          Your AI Development Team.<br />
          <span className="gradient-text">From Idea to Production Code.</span>
        </p>

        {/* Supporting line */}
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-4xl mx-auto mb-6 animate-fade-up delay-200">
          From idea to production code with <span className="text-dracula-cyan">specrails-core</span>.
          Visualize everything with <span className="text-dracula-purple">specrails-hub</span>.
        </p>

        {/* Tabbed terminal — 3 installation methods */}
        <div className="animate-fade-up delay-300">
          <TabbedTerminal />
        </div>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 animate-fade-up delay-400">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-dracula-cyan/10 border border-dracula-cyan/30 text-dracula-cyan text-sm font-medium hover:bg-dracula-cyan/20 transition-colors"
          >
            Get Started with Core
          </a>
          <a
            href="#hub-showcase"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-dracula-purple/10 border border-dracula-purple/30 text-dracula-purple text-sm font-medium hover:bg-dracula-purple/20 transition-colors"
          >
            Explore the Hub
          </a>
        </div>

        {/* GitHub stars */}
        <div className="mt-3 animate-fade-up delay-400">
          <GitHubStarsButton />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
