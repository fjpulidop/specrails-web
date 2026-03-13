import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const terminalLines = [
  { text: "$ ./specrails/install.sh --root-dir <your-project>", color: "text-dracula-green", delay: 0 },
  { text: "$ cd <your-project>", color: "text-dracula-green", delay: 600 },
  { text: "$ claude", color: "text-dracula-green", delay: 1200 },
  { text: "> /setup", color: "text-dracula-purple", delay: 1800 },
  { text: "🔍 Analyzing project structure...", color: "text-dracula-cyan", delay: 2400 },
  { text: "📦 Installing agent templates...", color: "text-foreground", delay: 3200 },
  { text: "✅ Product Manager agent ready", color: "text-dracula-purple", delay: 3800 },
  { text: "✅ Architect agent ready", color: "text-dracula-orange", delay: 4200 },
  { text: "✅ Developer agents ready", color: "text-dracula-green", delay: 4600 },
  { text: "✅ Security Reviewer ready", color: "text-dracula-red", delay: 5000 },
  { text: "🚀 specrails installed successfully!", color: "text-dracula-pink", delay: 5600 },
];

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

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
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

const HeroSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-mono text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
          <span className="text-dracula-purple">spec</span>
          <span className="text-dracula-pink">rails</span>
        </h1>

        <p className="text-xl md:text-2xl font-medium text-foreground mb-4 animate-fade-up delay-100">
          Your AI Development Team. From Idea to Production Code.
        </p>

        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
          A system of specialized agents that turns Claude Code into a complete
          pipeline: Product Discovery → Architecture → Implementation → Review →
          Ship
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up delay-300">
          <a href="https://github.com/fjpulidop/specrails" target="_blank" rel="noopener noreferrer">
            <Button variant="gradient" size="lg" className="text-base px-8 py-6">
              <Download className="w-5 h-5 mr-2" />
              Install specrails
            </Button>
          </a>
        </div>

        <div className="terminal max-w-2xl mx-auto p-0 animate-fade-up delay-400">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20">
            <div className="terminal-dot bg-dracula-red" />
            <div className="terminal-dot bg-dracula-yellow" />
            <div className="terminal-dot bg-dracula-green" />
            <span className="text-xs text-muted-foreground ml-2">terminal</span>
          </div>
          <div className="p-4 text-left text-sm leading-relaxed min-h-[220px]">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={`${line.color} animate-fade-up`}>
                {line.text}
              </div>
            ))}
            {visibleLines < terminalLines.length && (
              <span className="inline-block w-2 h-4 bg-dracula-green animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
