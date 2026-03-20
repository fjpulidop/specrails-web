import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Method = "npx" | "git";

const InstallSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [method, setMethod] = useState<Method>("npx");

  return (
    <section id="install" className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Installation in <span className="gradient-text">2 Steps</span>
        </h2>

        <p
          className={`text-muted-foreground text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Two methods, same result. Pick your style.
        </p>

        {/* Method tabs */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex rounded-lg bg-muted p-1 gap-1">
            <button
              onClick={() => setMethod("npx")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                method === "npx"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              npx
            </button>
            <button
              onClick={() => setMethod("git")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                method === "git"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Git Clone
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full gradient-btn flex items-center justify-center text-sm font-bold">1</span>
              <h3 className="font-semibold">Install the templates</h3>
            </div>
            <div className="terminal p-0">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border/20">
                <div className="terminal-dot bg-dracula-red" />
                <div className="terminal-dot bg-dracula-yellow" />
                <div className="terminal-dot bg-dracula-green" />
                <span className="text-xs text-muted-foreground ml-2">
                  {method === "npx" ? "npx" : "git clone"}
                </span>
              </div>
              <div className="p-4 text-sm font-mono space-y-1">
                {method === "npx" ? (
                  <div><span className="text-dracula-green">$</span> npx specrails-core@latest init --root-dir <span className="text-dracula-orange">&lt;your-project&gt;</span></div>
                ) : (
                  <>
                    <div><span className="text-dracula-green">$</span> git clone https://github.com/fjpulidop/specrails-core.git</div>
                    <div><span className="text-dracula-green">$</span> ./specrails/install.sh --root-dir <span className="text-dracula-orange">&lt;your-project&gt;</span></div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full gradient-btn flex items-center justify-center text-sm font-bold">2</span>
              <h3 className="font-semibold">Configure with the wizard</h3>
            </div>
            <div className="terminal p-0">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border/20">
                <div className="terminal-dot bg-dracula-red" />
                <div className="terminal-dot bg-dracula-yellow" />
                <div className="terminal-dot bg-dracula-green" />
              </div>
              <div className="p-4 text-sm font-mono space-y-1">
                <div><span className="text-dracula-green">$</span> cd <span className="text-dracula-orange">&lt;your-project&gt;</span></div>
                <div><span className="text-dracula-green">$</span> claude</div>
                <div><span className="text-dracula-purple">&gt;</span> <span className="text-dracula-cyan">/setup</span></div>
              </div>
            </div>
          </div>
        </div>

        <p
          className={`text-muted-foreground text-xs text-center mt-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Requirements: <span className="text-dracula-green">git</span> + <span className="text-dracula-cyan">Claude Code CLI</span>. Optional: npm, GitHub CLI, JIRA CLI
        </p>

        <p
          className={`text-muted-foreground text-xs text-center mt-3 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Estimated install time: ~15 minutes (may vary depending on your project).
          <br />
          This project does not collect telemetry or access your source code. All code is{" "}
          <a href="https://github.com/fjpulidop/specrails-core" target="_blank" rel="noopener noreferrer" className="text-dracula-purple hover:underline">open source on GitHub</a>.
        </p>
      </div>
    </section>
  );
};

export default InstallSection;
