import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  ArrowRight, Users, Zap, Eye, ShieldCheck, Search,
} from "lucide-react";

const principles = [
  { icon: ArrowRight, label: "Mandatory sequence", desc: "No shortcuts, even for simple tasks", color: "text-dracula-purple" },
  { icon: Users, label: "Agent delegation", desc: "The orchestrator never implements directly", color: "text-dracula-pink" },
  { icon: Zap, label: "Parallel where safe", desc: "PMs, Architects, and Devs in parallel; Reviewers in sequence", color: "text-dracula-cyan" },
  { icon: Eye, label: "Dry-run first", desc: "Preview before committing", color: "text-dracula-green" },
  { icon: ShieldCheck, label: "Security as a gate", desc: "The Security Reviewer can block the entire pipeline", color: "text-dracula-red" },
  { icon: Search, label: "Context over convention", desc: "Analyzes real code, doesn't apply generic templates", color: "text-dracula-orange" },
];

const PrinciplesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Design <span className="gradient-text">Principles</span>
        </h2>

        <div className="space-y-4">
          {principles.map((p, i) => (
            <div
              key={p.label}
              className={`glass-card px-5 py-4 flex items-center gap-4 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p.icon className={`w-5 h-5 shrink-0 ${p.color}`} />
              <div>
                <span className="font-semibold text-sm">{p.label}</span>
                <span className="text-muted-foreground text-sm"> — {p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
