import { LayoutDashboard, Terminal, MonitorDot, GitBranch, Activity } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Mock dashboard item data for the visual mockup
const MOCK_TASKS = [
  { label: "feat: add auth middleware", agent: "Dev", status: "in_progress", color: "text-dracula-cyan" },
  { label: "write API docs", agent: "Writer", status: "in_review", color: "text-dracula-yellow" },
  { label: "fix payment edge case", agent: "QA", status: "done", color: "text-dracula-green" },
  { label: "deploy to staging", agent: "DevOps", status: "todo", color: "text-dracula-comment" },
];

const STATUS_DOT: Record<string, string> = {
  in_progress: "bg-dracula-cyan",
  in_review:   "bg-dracula-yellow",
  done:        "bg-dracula-green",
  todo:        "bg-dracula-comment",
};

const HubSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="hub" className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: copy */}
          <div>
            <div
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-dracula-purple mb-4">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Local Dashboard
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {/* Headline placeholder — final copy from SPEA-134 */}
                Your AI team,{" "}
                <span className="gradient-text">at a glance</span>
              </h2>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {/* Body placeholder — final copy from SPEA-134 */}
                specrails-hub gives you a real-time local dashboard to monitor your
                agents, track tasks, and manage your development pipeline — all
                without leaving your machine.
              </p>

              {/* Differentiator comparison */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="glass-card p-4 border-dracula-cyan/30 hover:glow-cyan">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-dracula-cyan" />
                    <span className="text-sm font-semibold text-dracula-cyan font-mono">specrails-core</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    CLI + AI agents. Runs workflows, writes code, submits PRs.
                  </p>
                </div>
                <div className="glass-card p-4 border-dracula-purple/30 hover:glow-purple">
                  <div className="flex items-center gap-2 mb-2">
                    <LayoutDashboard className="w-4 h-4 text-dracula-purple" />
                    <span className="text-sm font-semibold text-dracula-purple font-mono">specrails-hub</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Local dashboard UI. Monitor, assign tasks, review runs.
                  </p>
                </div>
              </div>

              <a
                href="/docs/hub"
                className="inline-flex items-center gap-2 text-sm text-dracula-purple hover:text-dracula-pink transition-colors"
              >
                Learn more about specrails-hub →
              </a>
            </div>
          </div>

          {/* Right: mock dashboard */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="glass-card p-2 glow-purple">
              {/* Browser chrome */}
              <div className="bg-[hsl(var(--dracula-darker))] rounded-lg overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <span className="terminal-dot bg-dracula-red" />
                  <span className="terminal-dot bg-dracula-yellow" />
                  <span className="terminal-dot bg-dracula-green" />
                  <div className="flex-1 flex items-center justify-center">
                    <span className="text-xs font-mono text-muted-foreground bg-dracula-current/50 px-3 py-0.5 rounded-full">
                      localhost:4288 — specrails hub
                    </span>
                  </div>
                </div>

                {/* Dashboard body */}
                <div className="flex" style={{ minHeight: "260px" }}>
                  {/* Sidebar */}
                  <div className="w-44 border-r border-white/5 p-3 flex flex-col gap-1">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2 px-2">
                      specrails-hub
                    </p>
                    {[
                      { icon: Activity, label: "Dashboard", active: true },
                      { icon: GitBranch, label: "Tasks" },
                      { icon: MonitorDot, label: "Agents" },
                    ].map(({ icon: Icon, label, active }) => (
                      <div
                        key={label}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs font-mono transition-colors ${
                          active
                            ? "bg-dracula-purple/20 text-dracula-purple"
                            : "text-muted-foreground hover:bg-dracula-current/50"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Main content */}
                  <div className="flex-1 p-4">
                    <p className="text-[11px] font-semibold text-foreground mb-3">Active Tasks</p>
                    <div className="flex flex-col gap-2">
                      {MOCK_TASKS.map((task) => (
                        <div
                          key={task.label}
                          className="flex items-center gap-2 glass-card px-3 py-2"
                        >
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[task.status]}`} />
                          <span className="text-[11px] font-mono text-foreground/80 flex-1 truncate">
                            {task.label}
                          </span>
                          <span className={`text-[10px] font-mono ${task.color}`}>
                            [{task.agent}]
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3 font-mono">
              ↑ specrails-hub running locally
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HubSection;
