import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AgentComparisonMatrix from "@/components/AgentComparisonMatrix";

export default function AgentsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-6 pt-28 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Agent <span className="gradient-text">Comparison Matrix</span>
        </h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          All 11 specrails agents — filter by model, pipeline stage, or job category to find the agent that solves your problem.
        </p>
        <AgentComparisonMatrix />
      </main>
      <FooterSection />
    </div>
  );
}
