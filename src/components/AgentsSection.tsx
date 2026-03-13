import {
  Briefcase, Search, Cpu, Code, Server, Monitor, TestTubes, CheckCircle, Shield,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const agents = [
  { name: "Product Manager", model: "Opus", desc: "Strategy and discovery. Analyzes the market, brainstorms features, and scores them with Value Proposition Canvas", icon: Briefcase, color: "text-dracula-purple", border: "border-dracula-purple", glow: "glow-purple" },
  { name: "Product Analyst", model: "Haiku", desc: "Read-only audit. Compares specs vs actual code and generates divergence reports", icon: Search, color: "text-dracula-cyan", border: "border-dracula-cyan", glow: "glow-cyan" },
  { name: "Architect", model: "Sonnet", desc: "Translates specs into technical designs, ordered tasks, and risk assessments", icon: Cpu, color: "text-dracula-orange", border: "border-dracula-orange", glow: "glow-orange" },
  { name: "Developer", model: "Sonnet", desc: "Full-stack polyglot engineer. 4 phases: Understand → Plan → Implement → Verify", icon: Code, color: "text-dracula-green", border: "border-dracula-green", glow: "glow-green" },
  { name: "Backend Developer", model: "Sonnet", desc: "Server-side specialist for parallel frontend/backend pipelines", icon: Server, color: "text-dracula-yellow", border: "border-dracula-yellow", glow: "glow-yellow" },
  { name: "Frontend Developer", model: "Sonnet", desc: "UI/UX specialist with pixel-perfect precision", icon: Monitor, color: "text-dracula-pink", border: "border-dracula-pink", glow: "glow-pink" },
  { name: "Test Writer", model: "Sonnet", desc: "Generates test suites with >80% coverage. Auto-detects frameworks", icon: TestTubes, color: "text-dracula-cyan", border: "border-dracula-cyan", glow: "glow-cyan" },
  { name: "Reviewer", model: "Sonnet", desc: "Final quality checkpoint. Runs CI, autonomously fixes issues (up to 3 attempts)", icon: CheckCircle, color: "text-dracula-orange", border: "border-dracula-orange", glow: "glow-orange" },
  { name: "Security Reviewer", model: "Opus", desc: "Security auditor. Scans 11 credential patterns and OWASP vulnerabilities. Can BLOCK deployment", icon: Shield, color: "text-dracula-red", border: "border-dracula-red", glow: "glow-red" },
];

const modelColors: Record<string, string> = {
  Opus: "bg-dracula-purple/20 text-dracula-purple",
  Sonnet: "bg-dracula-cyan/20 text-dracula-cyan",
  Haiku: "bg-dracula-green/20 text-dracula-green",
};

const AgentsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="agents" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          The Solution:{" "}
          <span className="gradient-text">A Complete AI Agent Team</span>
        </h2>
        <p
          className={`text-muted-foreground text-center max-w-2xl mx-auto mb-16 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          9 specialized agents working in concert, each with a distinct role and
          the right model for the job.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((a, i) => (
            <div
              key={a.name}
              className={`glass-card p-5 transition-all duration-500 hover:${a.glow} hover:border-opacity-60 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms`, borderColor: undefined }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-dracula-current`}>
                  <a.icon className={`w-5 h-5 ${a.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm">{a.name}</h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${modelColors[a.model]}`}>
                      {a.model}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
