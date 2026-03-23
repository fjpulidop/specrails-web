import { Terminal, LayoutDashboard, Network, ArrowLeftRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface EcosystemProduct {
  name: string;
  subtitle: string;
  copy: string;
  audience: string;
  icon: typeof Terminal;
  accent: string;
  border: string;
  glow: string;
  badge: string;
  featured?: boolean;
}

const ecosystemProducts: EcosystemProduct[] = [
  {
    name: "specrails-core",
    subtitle: "The Engine",
    copy: "specrails-core is the heart of the system \u2014 12 specialized agents that turn your CLI into a full development team. If you prefer pure terminal, core is all you need. But for most users, it's the invisible engine that Hub orchestrates for you.",
    audience: "Power users who live in the terminal",
    icon: Terminal,
    accent: "text-dracula-cyan",
    border: "border-dracula-cyan/30",
    glow: "",
    badge: "The heart \u00b7 12 agents",
  },
  {
    name: "specrails-hub",
    subtitle: "\u2605 The Control Center",
    copy: "specrails-hub is the recommended way to use specrails. A real-time local dashboard with customizable sections (drag, collapse, pin), command palette (\u2318K), cost analytics, live pipeline, AI chat per project \u2014 all without leaving your browser.",
    audience: "Everyone. Teams, leads, and developers who want maximum productivity.",
    icon: LayoutDashboard,
    accent: "text-dracula-green",
    border: "border-dracula-green/60",
    glow: "shadow-[0_0_30px_rgba(80,250,123,0.15)]",
    badge: "\u2605 Recommended \u00b7 Dashboard \u00b7 Multi-project",
    featured: true,
  },
  {
    name: "specrails-mcp",
    subtitle: "The Universal Connection",
    copy: "specrails-mcp connects your specrails ecosystem with any MCP client: Cursor, Windsurf, Claude Desktop and more. Access your projects, launch jobs and query analytics from any AI assistant.",
    audience: "Multi-tool teams",
    icon: Network,
    accent: "text-dracula-purple",
    border: "border-dracula-purple/30",
    glow: "",
    badge: "MCP \u00b7 8 tools \u00b7 15+ resources",
  },
];

const EcosystemDiagram = ({ isVisible }: { isVisible: boolean }) => (
  <div
    className={`flex items-center justify-center gap-2 sm:gap-4 mb-16 transition-all duration-700 delay-200 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
  >
    <span className="font-mono text-xs sm:text-sm text-dracula-cyan">specrails-core</span>
    <ArrowLeftRight className="w-4 h-4 text-muted-foreground shrink-0" />
    <span className="font-mono text-sm sm:text-base text-dracula-green font-bold">\u2605 specrails-hub \u2605</span>
    <ArrowLeftRight className="w-4 h-4 text-muted-foreground shrink-0" />
    <span className="font-mono text-xs sm:text-sm text-dracula-purple">specrails-mcp</span>
  </div>
);

const EcosystemCard = ({
  product,
  isVisible,
  index,
}: {
  product: EcosystemProduct;
  isVisible: boolean;
  index: number;
}) => {
  const Icon = product.icon;
  return (
    <div
      data-testid={`ecosystem-${product.name}`}
      className={`glass-card border ${product.border} ${product.glow} p-6 rounded-xl backdrop-blur-sm bg-background/30 transition-all duration-700 hover:scale-[1.02] ${
        product.featured ? "md:scale-105 md:z-10 md:py-8" : ""
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${300 + index * 150}ms` }}
    >
      {product.featured && (
        <div className="text-xs font-mono text-dracula-green mb-3 uppercase tracking-wider">
          \u2605 Recommended
        </div>
      )}

      <div className={`flex items-center gap-2 mb-2 ${product.accent}`}>
        <Icon className="w-5 h-5" />
        <span className="font-mono font-bold text-base">{product.subtitle}</span>
      </div>

      <h3 className={`font-mono text-sm mb-3 ${product.accent}`}>{product.name}</h3>

      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
        {product.copy}
      </p>

      <p className="text-xs text-muted-foreground/70 mb-4 italic">
        For: {product.audience}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {product.badge.split(" \u00b7 ").map((b) => (
          <span
            key={b}
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border border-border/30 ${
              product.featured
                ? "text-dracula-green border-dracula-green/30"
                : "text-muted-foreground"
            }`}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
};

const EcosystemSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="ecosystem" className="py-32 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          One ecosystem.{" "}
          <span className="gradient-text">One control center.</span>
        </h2>

        <p
          className={`text-muted-foreground text-center max-w-2xl mx-auto mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Three products, one mission. Hub sits at the center, orchestrating
          Core's 12 agents and MCP's universal connectivity.
        </p>

        <EcosystemDiagram isVisible={isVisible} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:items-center mb-12">
          {ecosystemProducts.map((product, i) => (
            <EcosystemCard
              key={product.name}
              product={product}
              isVisible={isVisible}
              index={i}
            />
          ))}
        </div>

        <p
          className={`text-center text-sm text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Start with{" "}
          <span className="text-dracula-green font-mono">specrails-hub</span>{" "}
          for the full experience. Only need the terminal?{" "}
          <span className="text-dracula-cyan font-mono">specrails-core</span>{" "}
          works standalone. Use Cursor or Windsurf?{" "}
          Add{" "}
          <span className="text-dracula-purple font-mono">specrails-mcp</span>.
        </p>
      </div>
    </section>
  );
};

export default EcosystemSection;
