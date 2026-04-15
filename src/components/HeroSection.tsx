import { useEffect, useState, useRef } from "react";
import { GitHubStarsButton } from "./GitHubStarsButton";
import { cn } from "@/lib/utils";

// ---------- data ----------

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

interface ProductConfig {
  id: string;
  label: string;
  repo: string;
  accentColor: "cyan" | "purple";
  tabs: InstallTab[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const coreTabs: InstallTab[] = [
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

const hubTabs: InstallTab[] = [
  {
    id: "install",
    label: "Install",
    lines: [
      { text: "$ npm install -g specrails-hub", color: "text-dracula-green", delay: 0 },
      { text: "\u2192 Installing packages...", color: "text-dracula-foreground", delay: 700 },
      { text: "\u2713 specrails-hub@latest ready", color: "text-dracula-purple", delay: 1200 },
      { text: "$ specrails-hub start", color: "text-dracula-green", delay: 1700 },
      { text: "\u2713 Dashboard live \u2192 localhost:4200", color: "text-dracula-purple", delay: 2200 },
      { text: "$ # Open localhost:4200 in your browser", color: "text-dracula-pink", delay: 2700 },
    ],
  },
  {
    id: "add-project",
    label: "Add Project",
    lines: [
      { text: "$ specrails-hub add ./my-project", color: "text-dracula-green", delay: 0 },
      { text: "\u2192 Scanning for specrails-core...", color: "text-dracula-foreground", delay: 700 },
      { text: "\u2713 specrails-core found \u00b7 14 agents", color: "text-dracula-purple", delay: 1200 },
      { text: "\u2713 Project registered to hub", color: "text-dracula-purple", delay: 1700 },
      { text: "\u2713 Real-time monitoring active", color: "text-dracula-purple", delay: 2100 },
      { text: "$ # Pipeline stats live in dashboard", color: "text-dracula-pink", delay: 2600 },
    ],
  },
];

const products: ProductConfig[] = [
  {
    id: "core",
    label: "specrails-core",
    repo: "fjpulidop/specrails-core",
    accentColor: "cyan",
    tabs: coreTabs,
    primaryCta: { label: "Get Started with Core", href: "/docs/claude-getting-started" },
  },
  {
    id: "hub",
    label: "specrails-hub",
    repo: "fjpulidop/specrails-hub",
    accentColor: "purple",
    tabs: hubTabs,
    primaryCta: { label: "View Hub Demo \u2192", href: "#hub-showcase" },
    secondaryCta: { label: "Installation Guide", href: "/docs/hub-installation" },
  },
];

// ---------- components ----------

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

interface ProductSwitcherProps {
  active: number;
  onChange: (index: number) => void;
}

const ProductSwitcher = ({ active, onChange }: ProductSwitcherProps) => (
  <div className="relative inline-flex items-center rounded-full border border-border/30 bg-background/20 backdrop-blur-sm p-1">
    {/* sliding pill */}
    <span
      aria-hidden
      className={cn(
        "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full",
        "transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
        active === 0
          ? "left-1 bg-dracula-cyan/15 border border-dracula-cyan/30 shadow-[0_0_18px_rgba(139,233,253,0.25)]"
          : "left-1/2 bg-dracula-purple/15 border border-dracula-purple/30 shadow-[0_0_18px_rgba(189,147,249,0.3)]"
      )}
    />
    {products.map((p, i) => (
      <button
        key={p.id}
        onClick={() => onChange(i)}
        data-testid={`product-${p.id}`}
        className={cn(
          "relative z-10 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-mono",
          "transition-colors duration-200",
          active === i
            ? p.accentColor === "cyan"
              ? "text-dracula-cyan"
              : "text-dracula-purple"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            active === i && p.accentColor === "cyan"
              ? "bg-dracula-cyan shadow-[0_0_8px_rgba(139,233,253,0.9)]"
              : active === i && p.accentColor === "purple"
              ? "bg-dracula-purple shadow-[0_0_8px_rgba(189,147,249,0.9)]"
              : "bg-muted-foreground/40"
          )}
        />
        {p.label}
      </button>
    ))}
  </div>
);

interface TabbedTerminalProps {
  product: ProductConfig;
}

const TabbedTerminal = ({ product }: TabbedTerminalProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const currentTab = product.tabs[activeTab] ?? product.tabs[0];

  useEffect(() => {
    setActiveTab(0);
    setAnimKey((k) => k + 1);
  }, [product.id]);

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

  const isCyan = product.accentColor === "cyan";

  return (
    <div
      className={cn(
        "terminal p-0 max-w-2xl mx-auto w-full transition-all duration-500",
        isCyan
          ? "shadow-[0_0_60px_rgba(139,233,253,0.07)]"
          : "shadow-[0_0_60px_rgba(189,147,249,0.12)]"
      )}
      data-testid="tabbed-terminal"
    >
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20 relative">
        <div className="terminal-dot bg-dracula-red" />
        <div className="terminal-dot bg-dracula-yellow" />
        <div className="terminal-dot bg-dracula-green" />
        <span className="absolute left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <span className={isCyan ? "text-dracula-cyan" : "text-dracula-purple"}>
            Get started
          </span>{" "}
          &mdash;{" "}
          {isCyan ? "choose your setup" : "running in 2 steps"}
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex justify-center border-b border-border/20">
        {product.tabs.map((tab, index) => (
          <button
            key={tab.id}
            data-testid={`tab-${tab.id}`}
            onClick={() => handleTabClick(index)}
            aria-selected={index === activeTab}
            className={cn(
              "px-4 py-2.5 text-xs font-mono transition-colors border-b-2 -mb-px",
              index === activeTab
                ? isCyan
                  ? "text-dracula-cyan border-dracula-cyan"
                  : "text-dracula-purple border-dracula-purple"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Terminal content */}
      <div className="p-4 text-left text-sm leading-relaxed h-[196px] overflow-hidden">
        {currentTab.lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={cn(line.color, "animate-fade-up")}>
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleLines < currentTab.lines.length && (
          <span
            className={cn(
              "inline-block w-2 h-4 animate-pulse",
              isCyan ? "bg-dracula-cyan" : "bg-dracula-purple"
            )}
          />
        )}
      </div>
    </div>
  );
};

// ---------- section ----------

const HeroSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [displayedProduct, setDisplayedProduct] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleProductChange = (index: number) => {
    if (index === displayedProduct) return;
    setSelectedProduct(index);
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayedProduct(index);
      setIsTransitioning(false);
    }, 150);
  };

  const product = products[displayedProduct];
  const isHub = displayedProduct === 1;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
    >
      <ParticleBackground />

      {/* Ambient radial glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1
          data-logo="hero"
          className="font-mono text-5xl md:text-7xl font-bold mb-8 invisible"
        >
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
          Your AI Development Team.
          <br />
          <span className="gradient-text">From Idea to Production Code.</span>
        </p>

        {/* Supporting line */}
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-4xl mx-auto mb-8 animate-fade-up delay-200">
          From idea to production code with{" "}
          <span className="text-dracula-cyan">specrails-core</span>. Visualize
          everything with{" "}
          <span className="text-dracula-purple">specrails-hub</span>.
        </p>

        {/* Provider compatibility */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-up delay-200">
          <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-wider">
            Works with
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-dracula-orange/25 bg-dracula-orange/5 text-xs font-mono text-dracula-orange">
              <span className="w-1.5 h-1.5 rounded-full bg-dracula-orange/80" />
              Claude
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-dracula-green/25 bg-dracula-green/5 text-xs font-mono text-dracula-green">
              <span className="w-1.5 h-1.5 rounded-full bg-dracula-green/80" />
              Codex
            </span>
          </div>
        </div>

        {/* Product switcher */}
        <div className="flex justify-center mb-6 animate-fade-up delay-200">
          <ProductSwitcher active={selectedProduct} onChange={handleProductChange} />
        </div>

        {/* Terminal */}
        <div
          className={cn(
            "animate-fade-up delay-300 transition-all duration-150",
            isTransitioning
              ? "opacity-0 translate-y-1 scale-[0.99]"
              : "opacity-100 translate-y-0 scale-100"
          )}
        >
          <TabbedTerminal product={product} />
        </div>

        {/* CTAs */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 animate-fade-up delay-400",
            "transition-all duration-150",
            isTransitioning ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
          )}
        >
          <a
            href={product.primaryCta.href}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isHub
                ? "bg-dracula-purple/10 border border-dracula-purple/30 text-dracula-purple hover:bg-dracula-purple/20"
                : "bg-dracula-cyan/10 border border-dracula-cyan/30 text-dracula-cyan hover:bg-dracula-cyan/20"
            )}
          >
            {product.primaryCta.label}
          </a>
          {isHub && (
            <a
              href={product.secondaryCta.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors bg-foreground/5 border border-border/30 text-muted-foreground hover:text-foreground"
            >
              {product.secondaryCta.label}
            </a>
          )}
        </div>

        {/* GitHub Stars */}
        <div
          className={cn(
            "mt-3 animate-fade-up delay-400 transition-all duration-150",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
        >
          <GitHubStarsButton repo={product.repo} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
