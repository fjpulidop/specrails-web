import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  BarChart3, GitBranch, Eye, Brain, ShieldCheck, Layers, Ticket, Wand2,
} from "lucide-react";

const features = [
  { title: "Value Proposition Canvas", desc: "Integrated VPC framework. Evaluates features by mapping Products & Services, Pain Relievers, and Gain Creators against Customer Jobs, Pains, and Gains. Scoring 0-5 per persona.", icon: BarChart3, accent: "text-dracula-purple", hoverGlow: "hover:glow-purple" },
  { title: "Parallel Execution", desc: "Multiple features are implemented simultaneously in isolated git worktrees. Conflict-aware merge with intelligent resolution.", icon: GitBranch, accent: "text-dracula-green", hoverGlow: "hover:glow-green" },
  { title: "Dry-Run Mode", desc: "Preview all changes before touching the real repo. The --dry-run flag generates artifacts in a sandbox, --apply materializes them.", icon: Eye, accent: "text-dracula-cyan", hoverGlow: "hover:glow-cyan" },
  { title: "Institutional Memory", desc: "Each agent maintains persistent memory. Learned patterns, architectural decisions, and recurring fixes accumulate across sessions.", icon: Brain, accent: "text-dracula-pink", hoverGlow: "hover:glow-pink" },
  { title: "Security Gate", desc: "The Security Reviewer scans credentials (11 patterns) and OWASP vulnerabilities before every deploy. BLOCKED status prevents shipping.", icon: ShieldCheck, accent: "text-dracula-red", hoverGlow: "hover:glow-red" },
  { title: "Multi-Stack", desc: "Python, Node, Go, Rust, Java, Ruby, .NET, React, Vue, Angular, Svelte, Next.js, PostgreSQL, MongoDB, Redis, and more.", icon: Layers, accent: "text-dracula-orange", hoverGlow: "hover:glow-orange" },
  { title: "Backlog Integration", desc: "Syncs with GitHub Issues (labels, auto-close via PR) and JIRA (epics, stories, custom fields) automatically.", icon: Ticket, accent: "text-dracula-yellow", hoverGlow: "hover:glow-yellow" },
  { title: "Smart Setup", desc: "Analyzes your real codebase (imports, patterns, conventions, CI) instead of applying generic templates. Self-cleans after installation.", icon: Wand2, accent: "text-dracula-purple", hoverGlow: "hover:glow-purple" },
];

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="features" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Key <span className="gradient-text">Features</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`glass-card p-5 transition-all duration-500 hover:-translate-y-1 ${f.hoverGlow} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`p-2 rounded-lg bg-dracula-current inline-block mb-3`}>
                <f.icon className={`w-5 h-5 ${f.accent}`} />
              </div>
              <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
