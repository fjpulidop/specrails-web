import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import AgentsSection from "@/components/AgentsSection";
import PipelineSection from "@/components/PipelineSection";
import DemoSection from "@/components/DemoSection";
import FeaturesSection from "@/components/FeaturesSection";
import InstallSection from "@/components/InstallSection";
import CommandsSection from "@/components/CommandsSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import RoadmapSection from "@/components/RoadmapSection";
import FooterSection from "@/components/FooterSection";
import SectionNav from "@/components/SectionNav";
import AnimatedLogo from "@/components/AnimatedLogo";

const Index = () => {
  const { hash } = useLocation();

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
      <AgentsSection />
      <PipelineSection />
      <DemoSection />
      <FeaturesSection />
      <InstallSection />
      <CommandsSection />
      <PrinciplesSection />
      <RoadmapSection />
      <FooterSection />
      <SectionNav sectionIds={["hero","problem","agents","pipeline","demo","features","install","commands","principles","roadmap","footer"]} />
      <AnimatedLogo />
    </div>
  );
};

export default Index;
