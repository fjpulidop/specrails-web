import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSeo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ProductsSection from "@/components/ProductsSection";
import AgentsSection from "@/components/AgentsSection";
import PipelineSection from "@/components/PipelineSection";
import DemoSection from "@/components/DemoSection";
import FeaturesSection from "@/components/FeaturesSection";
import CommandsSection from "@/components/CommandsSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import RoadmapSection from "@/components/RoadmapSection";
import FooterSection from "@/components/FooterSection";
import SectionNav from "@/components/SectionNav";
import AnimatedLogo from "@/components/AnimatedLogo";

const Index = () => {
  const { hash } = useLocation();

  useSeo({
    title: "specrails — AI Development Platform: Core Engine + Hub Dashboard",
    description:
      "specrails turns Claude Code into your full dev team. specrails-core: 14 AI agents from idea to production code. specrails-hub: local dashboard for pipeline visualization, tickets, and analytics.",
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
      <ProductsSection />
      <AgentsSection />
      <PipelineSection />
      <DemoSection />
      <FeaturesSection />
      <CommandsSection />
      <PrinciplesSection />
      <RoadmapSection />
      <FooterSection />
      <SectionNav sectionIds={["hero","problem","products","agents","pipeline","demo","features","commands","principles","roadmap","footer"]} />
      <AnimatedLogo />
    </div>
  );
};

export default Index;
