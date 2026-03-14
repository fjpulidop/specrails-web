import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const InstallSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="install" className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Installation in <span className="gradient-text">2 Steps</span>
        </h2>

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
              </div>
              <div className="p-4 text-sm font-mono space-y-1">
                <div><span className="text-dracula-green">$</span> git clone https://github.com/fjpulidop/specrails.git</div>
                <div><span className="text-dracula-green">$</span> ./specrails/install.sh --root-dir <span className="text-dracula-orange">&lt;your-project&gt;</span></div>
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

        <div className="text-center mt-6">
          <a href="https://github.com/fjpulidop/specrails" target="_blank" rel="noopener noreferrer">
            <Button variant="cyan" size="lg">
              <ExternalLink className="w-4 h-4 mr-2" />
              View full documentation
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstallSection;
