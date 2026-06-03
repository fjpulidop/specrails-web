import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Terminal, LayoutDashboard, ArrowRight, Zap } from "lucide-react";
import { AGENTS } from "@/data/agents";

interface Product {
  name: string;
  tagline: string;
  icon: typeof Terminal;
  iconClass: string;
  iconBg: string;
  taglineClass: string;
  dotClass: string;
  ctaClass: string;
  hoverBorder: string;
  capabilities: string[];
  cta: { label: string; href: string };
}

const products: Product[] = [
  {
    name: "specrails-core",
    tagline: "The Engine",
    icon: Terminal,
    iconClass: "text-dracula-cyan",
    iconBg: "bg-dracula-cyan/10",
    taglineClass: "text-dracula-cyan",
    dotClass: "bg-dracula-cyan",
    ctaClass: "text-dracula-cyan",
    hoverBorder: "hover:border-dracula-cyan/50",
    capabilities: [
      `${AGENTS.length} specialized AI agents`,
      "Structured pipeline (idea → ship)",
      "Institutional memory across sessions",
      "Parallel execution in git worktrees",
      "Confidence scoring & security gate",
    ],
    cta: { label: "Get Started with Core", href: "/core" },
  },
  {
    name: "specrails-hub",
    tagline: "The Control Center",
    icon: LayoutDashboard,
    iconClass: "text-dracula-purple",
    iconBg: "bg-dracula-purple/10",
    taglineClass: "text-dracula-purple",
    dotClass: "bg-dracula-purple",
    ctaClass: "text-dracula-purple",
    hoverBorder: "hover:border-dracula-purple/50",
    capabilities: [
      "Multi-project dashboard",
      "Real-time pipeline visualization",
      "Ticket management (3 views)",
      "Analytics & cost tracking",
      "Streaming logs & activity feed",
    ],
    cta: { label: "Explore the Hub", href: "#hero" },
  },
];

const ProductsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="products" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Two Products. <span className="gradient-text">One Platform.</span>
        </h2>
        <p
          className={`text-muted-foreground text-center max-w-2xl mx-auto mb-16 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Core powers the engine. Hub is the cockpit. Together they give you
          full visibility and control over your AI development pipeline.
        </p>

        <div className="grid lg:grid-cols-2 gap-6 relative">
          {/* Connecting visual element */}
          <div
            className={`hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-dracula-current border border-border/30 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-dracula-pink" />
            </div>
          </div>

          {products.map((product, i) => (
            <div
              key={product.name}
              className={`glass-card p-8 transition-all duration-500 hover:-translate-y-1 ${product.hoverBorder} ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${150 + i * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-lg ${product.iconBg} inline-flex`}>
                  <product.icon className={`w-6 h-6 ${product.iconClass}`} />
                </div>
                <div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {product.name}
                  </span>
                  <h3 className={`text-xl font-bold ${product.taglineClass}`}>
                    {product.tagline}
                  </h3>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {product.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${product.dotClass} mt-1.5 shrink-0`}
                    />
                    {cap}
                  </li>
                ))}
              </ul>

              <a
                href={product.cta.href}
                className={`inline-flex items-center gap-2 text-sm font-medium ${product.ctaClass} hover:underline underline-offset-4 transition-colors`}
              >
                {product.cta.label}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
