import {
  LayoutDashboard,
  Layers,
  Activity,
  BarChart3,
  Command,
  MessageSquare,
  Bell,
  Download,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface HubFeature {
  title: string;
  description: string;
  icon: typeof LayoutDashboard;
  badge: string;
}

const hubFeatures: HubFeature[] = [
  {
    title: "Customizable Dashboard",
    description:
      "Drag, collapse, pin and resize sections with @dnd-kit. Make the dashboard yours.",
    icon: LayoutDashboard,
    badge: "DnD",
  },
  {
    title: "Multi-Project Tabs",
    description:
      "Switch between projects instantly. Each tab holds its own pipeline, agents and analytics.",
    icon: Layers,
    badge: "Tabs",
  },
  {
    title: "Real-Time Pipeline",
    description:
      "Watch your agents work live via WebSocket. Every spec, build and deploy — as it happens.",
    icon: Activity,
    badge: "WebSocket",
  },
  {
    title: "Advanced Analytics",
    description:
      "7 chart types: cost trends, agent throughput, token usage, latency, success rates and more.",
    icon: BarChart3,
    badge: "7 charts",
  },
  {
    title: "Command Grid + \u2318K",
    description:
      "Spec and Rails commands in a visual grid, plus a command palette for power users.",
    icon: Command,
    badge: "\u2318K",
  },
  {
    title: "AI Chat",
    description:
      "Chat with your AI team per project. Ask questions, trigger workflows, review results.",
    icon: MessageSquare,
    badge: "Per-project",
  },
  {
    title: "Alerts & Budget",
    description:
      "Token budget caps, cost alerts and spending breakdowns. Stay in control of AI costs.",
    icon: Bell,
    badge: "Budget",
  },
  {
    title: "Export & Shortcuts",
    description:
      "Export reports, share dashboards, and navigate everything with keyboard shortcuts.",
    icon: Download,
    badge: "Shortcuts",
  },
];

const INSTALL_COMMAND = "npm install -g specrails-hub";

const FeatureCard = ({
  feature,
  isVisible,
  index,
}: {
  feature: HubFeature;
  isVisible: boolean;
  index: number;
}) => {
  const Icon = feature.icon;
  return (
    <div
      data-testid={`hub-feature-${index}`}
      className={`glass-card border border-dracula-green/20 p-5 rounded-xl backdrop-blur-sm bg-background/30 transition-all duration-700 hover:scale-[1.03] hover:border-dracula-green/40 hover:shadow-[0_0_20px_rgba(80,250,123,0.1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${200 + index * 80}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-dracula-green/10 border border-dracula-green/20 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-dracula-green" />
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-dracula-green/30 text-dracula-green">
          {feature.badge}
        </span>
      </div>
      <h3 className="font-semibold text-sm text-foreground mb-1.5">
        {feature.title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};

const HubShowcaseSection = () => {
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
    <section id="hub-showcase" className="py-32 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div
          className={`text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-dracula-green mb-4">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Star Product
          </span>
        </div>

        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-dracula-green">specrails-hub</span>
          {": "}
          <span className="gradient-text">Your AI Operations Center</span>
        </h2>

        <p
          className={`text-muted-foreground text-center max-w-2xl mx-auto mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          The star product of the specrails ecosystem. A real-time local
          dashboard with everything you need to manage your AI development
          team&mdash;all from your browser.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {hubFeatures.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              isVisible={isVisible}
              index={i}
            />
          ))}
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
                Install specrails-hub
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3.5 gap-4">
              <code className="font-mono text-sm md:text-base text-left">
                <span className="text-muted-foreground select-none">$ </span>
                <span className="text-dracula-green">{INSTALL_COMMAND}</span>
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
            No account required &middot; Runs locally &middot; Includes
            specrails-core
          </p>
          <a
            href="#demo"
            className="inline-flex items-center gap-1 text-sm text-dracula-green hover:text-dracula-green/80 transition-colors mt-4 group"
          >
            See the interactive demo
            <span className="transition-transform group-hover:translate-x-0.5 inline-block">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HubShowcaseSection;
