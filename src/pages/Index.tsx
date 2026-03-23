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
import DemoSection from "@/components/DemoSection";
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
    title: "specrails — AI Coding Assistant for Dev Teams",
    description:
      "specrails is the AI coding assistant that turns Claude Code and OpenAI Codex into your full dev team — architect, engineers, QA, and release manager. From idea to production code.",
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
      <AgentsSection />
      <PipelineSection />
      <DemoSection />
      <FeaturesSection />
      <CliCompatibilitySection />
      <InstallSection />
      <CommandsSection />
      <PrinciplesSection />
      <RoadmapSection />
      <FooterSection />
      <SectionNav sectionIds={["hero","problem","ecosystem","hub-showcase","agents","pipeline","demo","features","cli-compat","install","commands","principles","roadmap","footer"]} />
      <AnimatedLogo />
    </div>
  );
};

export default Index;
