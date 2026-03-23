import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Monitor, Terminal, Plug } from "lucide-react";

type Product = "hub" | "core" | "mcp";

const products: {
  id: Product;
  label: string;
  tagline: string;
  icon: typeof Monitor;
  color: string;
  borderColor: string;
  recommended?: boolean;
  command: string;
  postInstall?: string[];
}[] = [
  {
    id: "hub",
    label: "specrails-hub",
    tagline: "Full dashboard experience. Analytics, chat, multi-project.",
    icon: Monitor,
    color: "text-dracula-green",
    borderColor: "border-dracula-green/60",
    recommended: true,
    command: "npm install -g specrails-hub",
    postInstall: [
      "specrails-hub",
      "# Dashboard ready at localhost:4200",
    ],
  },
  {
    id: "core",
    label: "specrails-core",
    tagline: "12 AI agents in your terminal. For power users.",
    icon: Terminal,
    color: "text-dracula-purple",
    borderColor: "border-dracula-purple/60",
    command: "npx specrails-core@latest init --root-dir <your-project>",
  },
  {
    id: "mcp",
    label: "specrails-mcp",
    tagline: "Connect with Cursor, Windsurf, and more.",
    icon: Plug,
    color: "text-dracula-cyan",
    borderColor: "border-dracula-cyan/60",
    command: "npm install -g specrails-mcp",
  },
];

const InstallSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<Product>("hub");

  const active = products.find((p) => p.id === selected)!;

  return (
    <section id="install" className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Choose Your <span className="gradient-text">Experience</span>
        </h2>

        <p
          className={`text-muted-foreground text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Hub includes Core as a dependency — install once, get everything.
        </p>

        {/* Product selector */}
        <div
          className={`grid grid-cols-3 gap-3 mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`relative p-4 rounded-lg border text-left transition-all ${
                selected === p.id
                  ? `bg-dracula-current/40 ${p.borderColor} shadow-lg`
                  : "border-border/20 hover:border-border/40"
              }`}
            >
              {p.recommended && (
                <span className="absolute -top-2.5 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-dracula-green text-dracula-bg">
                  ★ Recommended
                </span>
              )}
              <p.icon className={`w-5 h-5 mb-2 ${p.color}`} />
              <h3 className="font-semibold text-sm">{p.label}</h3>
              <p className="text-muted-foreground text-xs mt-1">{p.tagline}</p>
            </button>
          ))}
        </div>

        {/* Terminal */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="terminal p-0">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border/20">
              <div className="terminal-dot bg-dracula-red" />
              <div className="terminal-dot bg-dracula-yellow" />
              <div className="terminal-dot bg-dracula-green" />
              <span className="text-xs text-muted-foreground ml-2 font-mono">
                {active.label}
              </span>
            </div>
            <div className="p-4 text-sm font-mono space-y-1">
              <div>
                <span className="text-dracula-green">$</span> {active.command}
              </div>
              {active.postInstall?.map((line, i) => (
                <div key={i}>
                  {line.startsWith("#") ? (
                    <span className="text-dracula-comment">{line}</span>
                  ) : (
                    <>
                      <span className="text-dracula-green">$</span> {line}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p
          className={`text-muted-foreground text-xs text-center mt-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Requirements: <span className="text-dracula-green">Node.js ≥ 18</span> +{" "}
          <span className="text-dracula-cyan">Claude Code</span> or{" "}
          <span className="text-dracula-purple">OpenAI Codex</span>
        </p>

        <p
          className={`text-muted-foreground text-xs text-center mt-3 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          This project does not collect telemetry or access your source code. All code is{" "}
          <a
            href="https://github.com/fjpulidop/specrails-core"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dracula-purple hover:underline"
          >
            open source on GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default InstallSection;
