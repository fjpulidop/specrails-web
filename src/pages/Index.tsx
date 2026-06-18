import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSeo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PipelineSection from "@/components/PipelineSection";
import DemoSection from "@/components/DemoSection";
import ProblemSection from "@/components/ProblemSection";
import ProductsSection from "@/components/ProductsSection";
import FooterSection from "@/components/FooterSection";
import SectionNav from "@/components/SectionNav";

const SECTION_IDS = [
  "hero",
  "pipeline",
  "demo",
  "problem",
  "products",
  "footer",
];

const Index = () => {
  const { hash } = useLocation();

  useSeo({
    title: "specrails — Describe it. A team of agents ships it.",
    description:
      "specrails is an agentic software development system. Describe what you want; a team of AI agents — running on Claude, Codex, or Gemini — generates the spec and ships the PR.",
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface-2 focus:px-4 focus:py-2 focus:text-foreground focus:shadow-glow-elevated"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        {/* Comprehension → desire → download: hero → how it works → demo proof → why specrails → the ecosystem → footer. */}
        <HeroSection />
        <PipelineSection />
        <DemoSection />
        <ProblemSection />
        <ProductsSection />
      </main>
      <FooterSection />
      <SectionNav sectionIds={SECTION_IDS} />
    </div>
  );
};

export default Index;
