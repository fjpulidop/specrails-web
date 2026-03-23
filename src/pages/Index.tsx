import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSeo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import EcosystemSection from "@/components/EcosystemSection";
import HubShowcaseSection from "@/components/HubShowcaseSection";
import AgentsSection from "@/components/AgentsSection";
import PipelineSection from "@/components/PipelineSection";
import HubDemoSection from "@/components/HubDemoSection";
import McpSection from "@/components/McpSection";
import FeaturesSection from "@/components/FeaturesSection";
import CliCompatibilitySection from "@/components/CliCompatibilitySection";
import InstallSection from "@/components/InstallSection";
import CommandsSection from "@/components/CommandsSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import RoadmapSection from "@/components/RoadmapSection";
import FooterSection from "@/components/FooterSection";
import SectionNav from "@/components/SectionNav";
import AnimatedLogo from "@/components/AnimatedLogo";

const Index = () => {
  const { hash } = useLocation();

  useSeo({
    title: "specrails — AI Development Hub. Dashboard, Pipeline & Analytics for Your AI Team",
    description:
      "specrails-hub is your AI development control center — 12 agents, real-time pipeline, cost analytics, and multi-project management in one dashboard. Plus terminal-only (Core) and universal AI connectivity (MCP).",
    canonical: "https://specrails.dev/",
  });

  useEffect(() => {
    // Validate hash against allowlist before using as CSS selector (MED-03)
    if (hash && /^#[a-zA-Z][\w-]*$/.test(hash)) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <EcosystemSection />
      <HubShowcaseSection />
      <HubDemoSection />
      <AgentsSection />
      <PipelineSection />
      <McpSection />
      <FeaturesSection />
      <CliCompatibilitySection />
      <InstallSection />
      <CommandsSection />
      <PrinciplesSection />
      <RoadmapSection />
      <FooterSection />
      <SectionNav sectionIds={["hero","problem","ecosystem","hub-showcase","hub-demo","agents","pipeline","mcp","features","cli-compat","install","commands","principles","roadmap","footer"]} />
      <AnimatedLogo />
    </div>
  );
};

export default Index;
