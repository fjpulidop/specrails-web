import { useEffect, useState, useRef } from "react";
import { Copy, Check, Terminal, LayoutDashboard, Network } from "lucide-react";
import { GitHubStarsButton } from "@/components/GitHubStarsButton";

const INSTALL_COMMAND = "npm install -g specrails-hub";

const hubInstallLines = [
  { text: "$ npm install -g specrails-hub", color: "text-dracula-green", delay: 0 },
  { text: "", color: "text-foreground", delay: 600 },
  { text: "$ specrails-hub", color: "text-dracula-green", delay: 1000 },
  { text: "", color: "text-foreground", delay: 1400 },
  { text: "\u2713 Dashboard ready at localhost:4200", color: "text-dracula-cyan", delay: 1800 },
  { text: "$ # Your projects, pipeline & analytics \u2014 all here", color: "text-dracula-pink", delay: 2200 },
];

interface ProductCard {
  name: string;
  tagline: string;
  icon: typeof Terminal;
  accent: string;
  border: string;
  glow: string;
  command: string;
  featured?: boolean;
  badges: string[];
}

const products: ProductCard[] = [
  {
    name: "specrails-core",
    tagline: "The engine. 12 agents in your terminal.",
    icon: Terminal,
    accent: "text-dracula-cyan",
    border: "border-dracula-cyan/30",
    glow: "",
    command: "npx specrails-core@latest init",
    badges: ["Terminal", "12 Agents", "CLI"],
  },
  {
    name: "specrails-hub",
    tagline: "Your control center. The star product.",
    icon: LayoutDashboard,
    accent: "text-dracula-green",
    border: "border-dracula-green/60",
    glow: "shadow-[0_0_30px_rgba(80,250,123,0.15)]",
    command: "npm install -g specrails-hub",
    featured: true,
    badges: ["Dashboard", "Multi-Project", "Analytics"],
  },
  {
    name: "specrails-mcp",
    tagline: "Connect with any AI.",
    icon: Network,
    accent: "text-dracula-purple",
    border: "border-dracula-purple/30",
    glow: "",
    command: "npm install -g specrails-mcp",
    badges: ["MCP", "8 Tools", "15+ Resources"],
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

const AnimatedTerminal = ({ lines, label }: { lines: typeof hubInstallLines; label: string }) => {
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

const ProductCardComponent = ({ product }: { product: ProductCard }) => {
  const Icon = product.icon;
  return (
    <div
      data-testid={`product-card-${product.name}`}
      className={`glass-card border ${product.border} ${product.glow} p-6 rounded-xl backdrop-blur-sm bg-background/30 transition-all duration-300 hover:scale-[1.02] ${
        product.featured ? "md:scale-110 md:z-10 md:py-8" : ""
      }`}
    >
      {product.featured && (
        <div className="text-xs font-mono text-dracula-green mb-3 uppercase tracking-wider">
          Recommended
        </div>
      )}
      <div className={`flex items-center gap-2 mb-3 ${product.accent}`}>
        <Icon className="w-5 h-5" />
        <span className="font-mono font-bold text-sm">{product.name}</span>
      </div>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
        {product.tagline}
      </p>
      <code className="text-xs font-mono text-muted-foreground block mb-3 bg-background/50 px-2 py-1.5 rounded">
        $ {product.command}
      </code>
      <div className="flex flex-wrap gap-1.5">
        {product.badges.map((badge) => (
          <span
            key={badge}
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border border-border/30 ${
              product.featured ? "text-dracula-green border-dracula-green/30" : "text-muted-foreground"
            }`}
          >
            {badge}
          </span>
        ))}
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

        {/* Open source badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/30 bg-background/30 backdrop-blur-sm text-xs font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-dracula-green animate-pulse" />
            Open Source &middot; MIT &middot; Free
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-dracula-green/30 bg-background/30 backdrop-blur-sm text-xs font-mono text-dracula-green">
            Dashboard &middot; Multi-Project &middot; Analytics
          </div>
        </div>

        {/* Tagline */}
        <p className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-up delay-100 leading-tight">
          Your AI Development Team.<br />
          <span className="gradient-text">One Hub to Rule Them All.</span>
        </p>

        {/* Supporting line */}
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
          specrails-hub is your AI control center &mdash; 12 specialized agents, real-time pipeline, cost analytics and AI chat, all from your browser.
          Prefer the terminal? specrails-core is still there.
        </p>

        {/* Install command — primary CTA */}
        <div className="mb-6 animate-fade-up delay-300">
          <InstallCommand />
          <p className="text-xs text-muted-foreground mt-2.5 font-mono">
            No account required &middot; Runs locally &middot; Includes specrails-core
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

        {/* Three product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 animate-fade-up delay-500 md:items-center">
          {products.map((product) => (
            <ProductCardComponent key={product.name} product={product} />
          ))}
        </div>

        {/* Terminal preview — Hub install flow */}
        <div className="max-w-2xl mx-auto animate-fade-up delay-500">
          <p className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">
            <span className="text-dracula-green">Get started</span> &mdash; Hub install
          </p>
          <AnimatedTerminal lines={hubInstallLines} label="specrails-hub" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
