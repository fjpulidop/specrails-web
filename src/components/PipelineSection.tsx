import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  FileInput, Lightbulb, ListChecks, PenTool, Code, TestTubes, Rocket,
} from "lucide-react";

const phases = [
  { phase: "0", label: "Input", desc: "Accepts GitHub Issues, free text, or product areas", icon: FileInput, color: "text-dracula-fg", bg: "bg-dracula-current" },
  { phase: "1", label: "Product Discovery", desc: "Parallel Product Manager agents explore and generate ideas", icon: Lightbulb, color: "text-dracula-purple", bg: "bg-dracula-purple/10" },
  { phase: "2", label: "Feature Selection", desc: "Selection and prioritization with VPC scoring", icon: ListChecks, color: "text-dracula-pink", bg: "bg-dracula-pink/10" },
  { phase: "3a", label: "Architecture", desc: "Architect agents design in parallel, detect multi-feature conflicts", icon: PenTool, color: "text-dracula-orange", bg: "bg-dracula-orange/10" },
  { phase: "3b", label: "Implementation", desc: "Developers work in isolated git worktrees in parallel", icon: Code, color: "text-dracula-green", bg: "bg-dracula-green/10" },
  { phase: "3c", label: "Testing", desc: "Test Writers generate comprehensive suites", icon: TestTubes, color: "text-dracula-cyan", bg: "bg-dracula-cyan/10" },
  { phase: "4", label: "Merge, Review & Ship", desc: "Conflict-aware merge, parallel layer reviews (frontend + backend), confidence gate, security scan, CI, deploy", icon: Rocket, color: "text-dracula-pink", bg: "bg-dracula-pink/10" },
];

const PipelineSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="pipeline" className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Pipeline: <span className="gradient-text">From Idea to Code</span>
        </h2>
        <p
          className={`text-muted-foreground text-center mb-16 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          The <span className="font-mono text-dracula-cyan">/specrails:implement</span> command orchestrates the full pipeline.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-dracula-purple/40 via-dracula-pink/40 to-dracula-green/40 hidden md:block" />

          <div className="space-y-6">
            {phases.map((p, i) => (
              <div
                key={p.phase}
                className={`flex gap-4 md:gap-6 items-start transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`shrink-0 w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center relative z-10`}>
                  <p.icon className={`w-5 h-5 ${p.color}`} />
                </div>
                <div className="glass-card p-4 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground">Phase {p.phase}</span>
                    <h3 className={`font-semibold text-sm ${p.color}`}>{p.label}</h3>
                  </div>
                  <p className="text-muted-foreground text-xs">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
