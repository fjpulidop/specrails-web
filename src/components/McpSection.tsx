import {
  Network,
  FileText,
  Users,
  Brain,
  BookOpen,
  FolderOpen,
  BarChart3,
  Stethoscope,
  Activity,
  List,
  Briefcase,
  LineChart,
  PlayCircle,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface McpItem {
  name: string;
  description: string;
  icon: typeof FileText;
}

const resources: McpItem[] = [
  { name: "Specs", description: "Read project specifications", icon: FileText },
  { name: "Agents config", description: "Agent definitions & roles", icon: Users },
  { name: "Memory", description: "Persistent project memory", icon: Brain },
  { name: "Skills", description: "Available agent skills", icon: BookOpen },
  { name: "Projects", description: "Multi-project registry", icon: FolderOpen },
  { name: "Analytics", description: "Cost & usage metrics", icon: BarChart3 },
];

const tools: McpItem[] = [
  { name: "doctor", description: "Diagnose project health", icon: Stethoscope },
  { name: "hub_status", description: "Check Hub runtime state", icon: Activity },
  { name: "list_projects", description: "Enumerate all projects", icon: List },
  { name: "get_jobs", description: "Query pipeline jobs", icon: Briefcase },
  { name: "get_analytics", description: "Retrieve cost analytics", icon: LineChart },
  { name: "enqueue_job", description: "Launch a pipeline job", icon: PlayCircle },
];

const clients = ["Claude Code", "Cursor", "Windsurf", "Claude Desktop", "Any MCP client"];

const INSTALL_COMMAND = "npm install -g specrails-mcp";

const ConnectivityDiagram = ({ isVisible }: { isVisible: boolean }) => (
  <div
    className={`flex flex-col items-center gap-4 mb-16 transition-all duration-700 delay-200 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
  >
    {/* Client row */}
    <div className="flex flex-wrap justify-center gap-2">
      {clients.map((client, i) => (
        <span
          key={client}
          className={`text-xs font-mono px-3 py-1.5 rounded-lg border border-border/30 text-muted-foreground bg-background/50 transition-all duration-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ transitionDelay: `${300 + i * 80}ms` }}
        >
          {client}
        </span>
      ))}
    </div>

    {/* Arrow down */}
    <div className="flex flex-col items-center gap-1">
      <div className="w-px h-6 bg-gradient-to-b from-border/50 to-dracula-purple/50" />
      <ArrowRight className="w-4 h-4 text-dracula-purple rotate-90" />
    </div>

    {/* MCP node */}
    <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dracula-purple/50 bg-dracula-purple/10 shadow-[0_0_20px_rgba(189,147,249,0.15)]">
      <Network className="w-5 h-5 text-dracula-purple" />
      <span className="font-mono font-bold text-sm text-dracula-purple">specrails-mcp</span>
    </div>

    {/* Arrow down */}
    <div className="flex flex-col items-center gap-1">
      <div className="w-px h-6 bg-gradient-to-b from-dracula-purple/50 to-dracula-green/50" />
      <ArrowRight className="w-4 h-4 text-dracula-green rotate-90" />
    </div>

    {/* Hub + Core row */}
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm font-bold text-dracula-green px-4 py-2 rounded-xl border-2 border-dracula-green/50 bg-dracula-green/10 shadow-[0_0_20px_rgba(80,250,123,0.15)]">
        &#9733; Hub
      </span>
      <span className="text-xs text-muted-foreground">&amp;</span>
      <span className="font-mono text-sm text-dracula-cyan px-4 py-2 rounded-xl border border-dracula-cyan/30 bg-dracula-cyan/5">
        Core
      </span>
    </div>
  </div>
);

const McpItemCard = ({
  item,
  isVisible,
  index,
  accent,
}: {
  item: McpItem;
  isVisible: boolean;
  index: number;
  accent: "purple" | "cyan";
}) => {
  const Icon = item.icon;
  const colorMap = {
    purple: {
      text: "text-dracula-purple",
      border: "border-dracula-purple/20",
      hoverBorder: "hover:border-dracula-purple/40",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(189,147,249,0.1)]",
      bg: "bg-dracula-purple/10",
      iconBorder: "border-dracula-purple/20",
    },
    cyan: {
      text: "text-dracula-cyan",
      border: "border-dracula-cyan/20",
      hoverBorder: "hover:border-dracula-cyan/40",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(139,233,253,0.1)]",
      bg: "bg-dracula-cyan/10",
      iconBorder: "border-dracula-cyan/20",
    },
  };
  const c = colorMap[accent];

  return (
    <div
      data-testid={`mcp-${accent}-${index}`}
      className={`glass-card border ${c.border} p-4 rounded-xl backdrop-blur-sm bg-background/30 transition-all duration-700 hover:scale-[1.03] ${c.hoverBorder} ${c.hoverShadow} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${400 + index * 80}ms` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.iconBorder} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${c.text}`} />
        </div>
        <span className={`font-mono text-sm font-semibold ${c.text}`}>{item.name}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
    </div>
  );
};

const McpSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available in test/SSR environments
    }
  };

  return (
    <section id="mcp" className="py-32 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div
          className={`text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-dracula-purple mb-4">
            <Network className="w-3.5 h-3.5" />
            Universal Connection
          </span>
        </div>

        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-dracula-purple">specrails-mcp</span>
          {": "}
          <span className="gradient-text">Conecta specrails con cualquier IA</span>
        </h2>

        <p
          className={`text-muted-foreground text-center max-w-2xl mx-auto mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Connect your specrails ecosystem with any MCP-compatible AI client.
          Access specs, launch jobs, and query analytics from Claude Code, Cursor, Windsurf, and more.
        </p>

        {/* Connectivity diagram */}
        <ConnectivityDiagram isVisible={isVisible} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Resources column */}
          <div>
            <h3
              className={`text-sm font-mono font-semibold text-dracula-purple mb-4 flex items-center gap-2 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <FileText className="w-4 h-4" />
              Resources <span className="text-muted-foreground font-normal">(read)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resources.map((item, i) => (
                <McpItemCard key={item.name} item={item} isVisible={isVisible} index={i} accent="purple" />
              ))}
            </div>
          </div>

          {/* Tools column */}
          <div>
            <h3
              className={`text-sm font-mono font-semibold text-dracula-cyan mb-4 flex items-center gap-2 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Tools <span className="text-muted-foreground font-normal">(actions)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tools.map((item, i) => (
                <McpItemCard key={item.name} item={item} isVisible={isVisible} index={i} accent="cyan" />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="terminal p-0 max-w-lg mx-auto w-full">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20">
              <div className="terminal-dot bg-dracula-red" />
              <div className="terminal-dot bg-dracula-yellow" />
              <div className="terminal-dot bg-dracula-green" />
              <span className="text-xs text-muted-foreground ml-2 font-mono">
                Install specrails-mcp
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3.5 gap-4">
              <code className="font-mono text-sm md:text-base text-left">
                <span className="text-muted-foreground select-none">$ </span>
                <span className="text-dracula-purple">{INSTALL_COMMAND}</span>
              </code>
              <button
                onClick={handleCopy}
                aria-label="Copy install command"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 px-2 py-1 rounded border border-border/20 hover:border-border/50"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-dracula-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 font-mono">
            Works with any MCP client &middot; 15+ resources &middot; 8 tools
          </p>
        </div>
      </div>
    </section>
  );
};

export default McpSection;
