import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Settings, Rocket, Layers, ClipboardList, ShieldCheck, HelpCircle } from "lucide-react";

const commands = [
  { cmd: "/specrails:enrich", desc: "Interactive TUI installer. Select agents, choose models, configure your workflow — or run --from-config for non-interactive team setup.", badge: "TUI + install-config.yaml", icon: Settings, color: "text-dracula-purple" },
  { cmd: "/specrails:implement", desc: "The flagship command. Runs the full pipeline end-to-end — setup, architecture, implementation, review and ship.", badge: "End-to-end pipeline", icon: Rocket, color: "text-dracula-pink" },
  { cmd: "/specrails:batch-implement", desc: "Multi-feature orchestrator. Computes dependency graphs, detects cycles, and executes in waves (Kahn's algorithm).", badge: "Multi-feature", icon: Layers, color: "text-dracula-cyan" },
  { cmd: "/specrails:get-backlog-specs", desc: "Backlog management prioritized by VPC scoring against user personas. Parses prerequisites and topological-sorts features for safe ordering.", badge: "Product-driven", icon: ClipboardList, color: "text-dracula-green" },
  { cmd: "/specrails:compat-check", desc: "Backwards compatibility analyzer. Detects breaking API, schema, and contract changes, then generates a migration guide with a recommended rollout strategy.", badge: "Compatibility", icon: ShieldCheck, color: "text-dracula-orange" },
  { cmd: "/specrails:why", desc: "AI-powered in-context help. Search agent decision rationale and architectural explanations recorded throughout the pipeline.", badge: "Decision search", icon: HelpCircle, color: "text-dracula-yellow" },
];

const CommandsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="commands" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="gradient-text">Commands</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {commands.map((c, i) => (
            <div
              key={c.cmd}
              className={`glass-card p-6 transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <c.icon className={`w-5 h-5 ${c.color}`} />
                <code className={`font-mono font-bold ${c.color}`}>{c.cmd}</code>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{c.desc}</p>
              <span className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-dracula-current text-muted-foreground">
                {c.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommandsSection;
