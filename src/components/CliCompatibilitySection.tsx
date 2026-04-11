import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, Minus } from "lucide-react";

const rows: { feature: string; claudeCode: boolean; codex: boolean }[] = [
  { feature: "Installation via npx", claudeCode: true, codex: true },
  { feature: "Installation via git clone", claudeCode: true, codex: true },
  { feature: "Agent pipeline (architect → dev → review → PR)", claudeCode: true, codex: true },
  { feature: "/specrails:enrich TUI", claudeCode: true, codex: true },
  { feature: "Spec-Driven Development (OpenSpec)", claudeCode: true, codex: true },
  { feature: "Parallel git worktrees", claudeCode: true, codex: true },
  { feature: "Institutional memory", claudeCode: true, codex: true },
  { feature: "VPC product discovery", claudeCode: true, codex: true },
  { feature: "Skills / slash commands", claudeCode: true, codex: true },
  { feature: "Security gate (OWASP scan)", claudeCode: true, codex: true },
  { feature: "doctor diagnostics", claudeCode: true, codex: true },
];

const Tick = ({ ok }: { ok: boolean }) =>
  ok ? (
    <Check className="w-4 h-4 text-dracula-green mx-auto" aria-label="Supported" />
  ) : (
    <Minus className="w-4 h-4 text-dracula-comment mx-auto" aria-label="Not supported" />
  );

const CliCompatibilitySection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="cli-compat" className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Works with <span className="gradient-text">Any AI CLI</span>
        </h2>

        <p
          className={`text-muted-foreground text-center mb-12 max-w-xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          specrails is LLM-agnostic. Claude Code and OpenAI Codex are both first-class citizens —
          same agents, same pipeline, same features.
        </p>

        <div
          className={`glass-card overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20">
                <th className="text-left px-5 py-4 text-muted-foreground font-medium">Feature</th>
                <th className="text-center px-4 py-4 font-semibold text-dracula-purple w-32">
                  Claude Code
                </th>
                <th className="text-center px-4 py-4 font-semibold text-dracula-cyan w-32">
                  OpenAI Codex
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-border/10 last:border-0 transition-colors hover:bg-dracula-current/10 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <td className="px-5 py-3 text-foreground">{row.feature}</td>
                  <td className="px-4 py-3 text-center">
                    <Tick ok={row.claudeCode} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Tick ok={row.codex} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CliCompatibilitySection;
