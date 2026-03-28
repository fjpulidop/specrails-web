import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  BarChart3, GitBranch, Eye, Brain, ShieldCheck, Layers, Wand2,
  Gauge, AlertTriangle, Users, ListOrdered, Terminal,
} from "lucide-react";

const features = [
  { title: "CLI Agnostic", desc: "Works with Claude Code and OpenAI Codex. Both CLIs are first-class citizens — same agents, same pipeline, same features.", icon: Terminal, accent: "text-dracula-green", hoverGlow: "hover:glow-green" },
  { title: "Value Proposition Canvas", desc: "Integrated VPC framework. Evaluates features by mapping Products & Services, Pain Relievers, and Gain Creators against Customer Jobs, Pains, and Gains. Scoring 0-5 per persona.", icon: BarChart3, accent: "text-dracula-purple", hoverGlow: "hover:glow-purple" },
  { title: "Parallel Execution", desc: "Multiple features are implemented simultaneously in isolated git worktrees. Conflict-aware merge with intelligent resolution.", icon: GitBranch, accent: "text-dracula-green", hoverGlow: "hover:glow-green" },
  { title: "Spec-Driven Development", desc: "Each agent is specialized in one part of the software development process using SDD with OpenSpec.", icon: Eye, accent: "text-dracula-cyan", hoverGlow: "hover:glow-cyan" },
  { title: "Institutional Memory", desc: "Each agent maintains persistent memory. Learned patterns, architectural decisions, and recurring fixes accumulate across sessions.", icon: Brain, accent: "text-dracula-pink", hoverGlow: "hover:glow-pink" },
  { title: "Security Gate", desc: "The Security Reviewer scans credentials (11 patterns) and OWASP vulnerabilities before every deploy. BLOCKED status prevents shipping.", icon: ShieldCheck, accent: "text-dracula-red", hoverGlow: "hover:glow-red" },
  { title: "Multi-Stack", desc: "Python, Node, Go, Rust, Java, Ruby, .NET, React, Vue, Angular, Svelte, Next.js, PostgreSQL, MongoDB, Redis, and more.", icon: Layers, accent: "text-dracula-orange", hoverGlow: "hover:glow-orange" },
  { title: "Smart Setup", desc: "Analyzes your real codebase (imports, patterns, conventions, CI) instead of applying generic templates. Self-cleans after installation.", icon: Wand2, accent: "text-dracula-purple", hoverGlow: "hover:glow-purple" },
  { title: "Confidence Scoring", desc: "Reviewer agents self-assess output quality across 5 aspects (correctness, security, tests, docs, performance). A configurable gate blocks shipping below threshold.", icon: Gauge, accent: "text-dracula-yellow", hoverGlow: "hover:glow-yellow" },
  { title: "Failure Learning Loop", desc: "When the reviewer flags a failure, a post-mortem record is written to memory. Future developer agents load these records as guardrails, preventing repeated mistakes.", icon: AlertTriangle, accent: "text-dracula-orange", hoverGlow: "hover:glow-orange" },
  { title: "Layer-Specific Reviews", desc: "Dedicated frontend and backend reviewer agents run in parallel, applying domain expertise to UI patterns and API contracts independently.", icon: Users, accent: "text-dracula-cyan", hoverGlow: "hover:glow-cyan" },
  { title: "Dependency-Aware Ordering", desc: "/specrails:product-backlog parses Prerequisites fields, builds a dependency DAG, and topological-sorts features so the safest implementation order is always chosen.", icon: ListOrdered, accent: "text-dracula-green", hoverGlow: "hover:glow-green" },
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
