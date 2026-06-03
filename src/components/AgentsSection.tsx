import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AGENTS } from "@/data/agents";
import { cn } from "@/lib/utils";

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
        <div
          className={`flex justify-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-dracula-cyan/20 bg-dracula-cyan/5 text-xs font-mono text-dracula-cyan/70">
            Powered by specrails-core
          </span>
        </div>
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          The Solution:{" "}
          <span className="gradient-text">A Complete AI Agent Team</span>
        </h2>
        <p
          className={`text-muted-foreground text-center max-w-2xl mx-auto mb-4 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Three agents are core and always run — Architect, Developer, and Reviewer.
          The rest are optional specialists. The{" "}
          <code className="font-mono text-sm px-1 rounded bg-dracula-current text-dracula-cyan">
            implement
          </code>{" "}
          command dispatches the right Developer dynamically by task keywords, and the
          Reviewer sub-specializes into Frontend or Backend reviewers when installed.
        </p>
        <div
          className={`text-center mb-12 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            to="/agents"
            className="text-sm text-primary hover:text-dracula-cyan transition-colors"
          >
            Compare all agents →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENTS.map((a, i) => (
            <div
              key={a.name}
              className={cn(
                "glass-card p-5 transition-all duration-500",
                a.core && "border-primary/40",
                `hover:${a.glow} hover:border-opacity-60`,
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-dracula-current">
                  <a.icon className={`w-5 h-5 ${a.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm">{a.name}</h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${modelColors[a.model]}`}>
                      {a.model}
                    </span>
                    {a.core && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                        Core
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{a.desc}</p>
              {a.note && (
                <p className="mt-2 text-[11px] text-primary/80 font-mono leading-relaxed">{a.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
