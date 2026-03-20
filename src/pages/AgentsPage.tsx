import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AgentComparisonMatrix from "@/components/AgentComparisonMatrix";
import { useSeo } from "@/hooks/useSeo";

export default function AgentsPage(): JSX.Element {
  useSeo({
    title: "Agent Comparison Matrix — specrails",
    description:
      "Compare all 12 specrails AI agents by model, pipeline stage, and job category. Find the right AI coding assistant agent for your development workflow.",
    canonical: "https://specrails.dev/agents",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-6 pt-28 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Agent <span className="gradient-text">Comparison Matrix</span>
        </h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          All 12 specrails agents — filter by model, pipeline stage, or job category to find the agent that solves your problem.
        </p>
        <AgentComparisonMatrix />
      </main>
      <FooterSection />
    </div>
  );
}
