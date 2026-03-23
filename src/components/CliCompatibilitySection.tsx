import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, Minus } from "lucide-react";

const rows: { feature: string; hub: boolean; claudeCode: boolean; codex: boolean; mcp: boolean }[] = [
  { feature: "Installation via npx", hub: true, claudeCode: true, codex: true, mcp: false },
  { feature: "Installation via npm", hub: true, claudeCode: false, codex: false, mcp: true },
  { feature: "Agent pipeline (architect → dev → review → PR)", hub: true, claudeCode: true, codex: true, mcp: false },
  { feature: "/setup wizard", hub: true, claudeCode: true, codex: true, mcp: false },
  { feature: "Spec-Driven Development (OpenSpec)", hub: true, claudeCode: true, codex: true, mcp: true },
  { feature: "Parallel git worktrees", hub: true, claudeCode: true, codex: true, mcp: false },
  { feature: "Institutional memory", hub: true, claudeCode: true, codex: true, mcp: true },
  { feature: "VPC product discovery", hub: true, claudeCode: true, codex: true, mcp: false },
  { feature: "Skills / slash commands", hub: true, claudeCode: true, codex: true, mcp: false },
  { feature: "Security gate (OWASP scan)", hub: true, claudeCode: true, codex: true, mcp: false },
  { feature: "doctor diagnostics", hub: true, claudeCode: true, codex: true, mcp: true },
  { feature: "Dashboard & analytics", hub: true, claudeCode: false, codex: false, mcp: false },
  { feature: "Multi-project management", hub: true, claudeCode: false, codex: false, mcp: true },
  { feature: "Real-time pipeline monitoring", hub: true, claudeCode: false, codex: false, mcp: false },
  { feature: "AI chat per project", hub: true, claudeCode: false, codex: false, mcp: false },
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
      <div className="container mx-auto max-w-4xl">
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
          specrails is LLM-agnostic.{" "}
          <span className="text-dracula-green font-medium">Hub</span> supports all providers per project.
        </p>

        <div
          className={`glass-card overflow-x-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20">
                <th className="text-left px-5 py-4 text-muted-foreground font-medium">Feature</th>
                <th className="text-center px-3 py-4 font-semibold text-dracula-green w-24">
                  Hub
                </th>
                <th className="text-center px-3 py-4 font-semibold text-dracula-purple w-28">
                  Claude Code
                </th>
                <th className="text-center px-3 py-4 font-semibold text-dracula-cyan w-24">
                  Codex
                </th>
                <th className="text-center px-3 py-4 font-semibold text-dracula-orange w-20">
                  MCP
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
                  <td className="px-3 py-3 text-center">
                    <Tick ok={row.hub} />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Tick ok={row.claudeCode} />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Tick ok={row.codex} />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Tick ok={row.mcp} />
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
