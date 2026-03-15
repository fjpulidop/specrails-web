import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AGENTS } from "@/data/agents";

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
          className={`text-muted-foreground text-center max-w-2xl mx-auto mb-4 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          11 specialized agents working in concert, each with a distinct role and
          the right model for the job.
        </p>
        <div
          className={`text-center mb-12 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            to="/agents"
            className="text-sm text-dracula-purple hover:text-dracula-pink transition-colors"
          >
            Compare all agents →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AGENTS.map((a, i) => (
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
