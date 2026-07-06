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
import { useI18n } from "@/lib/i18n";

const SECTION_IDS = [
  "hero",
  "product",
  "specs",
  "loops",
  "engineering",
  "footer",
];

const Index = () => {
  const { hash } = useLocation();
  const { content } = useI18n();

  useSeo({
    title: content.seo.title,
    description: content.seo.description,
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
        <HeroSection />
        <ProductsSection />
        <PipelineSection />
        <DemoSection />
        <ProblemSection />
      </main>
      <FooterSection />
      <SectionNav sectionIds={SECTION_IDS} />
    </div>
  );
};

export default Index;
