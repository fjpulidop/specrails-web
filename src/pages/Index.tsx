import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSeo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ProductRecordings from "@/components/ProductRecordings";
import {
  CompanionShowcase,
  DocumentationShowcase,
  ProductFeatures,
  ProductHero,
  ProductWorkflow,
} from "@/components/ProductLanding";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_COPY } from "@/lib/product-copy";

export default function Index() {
  const { hash } = useLocation();
  const { languageId } = useI18n();
  const c = PRODUCT_COPY[languageId];
  useSeo({
    title: `Specrails — ${c.title} ${c.accent}`,
    description: c.intro,
    canonical: "https://specrails.dev/",
  });
  useEffect(() => {
    if (/^#[a-zA-Z][\w-]*$/.test(hash)) {
      const element = document.getElementById(hash.slice(1));
      element?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }, [hash]);
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface-2 focus:px-4 focus:py-2"
      >
        {c.skip}
      </a>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="px-5 outline-none sm:px-8"
      >
        <ProductHero />
        <div id="product" className="scroll-mt-24">
          <ProductRecordings showHeading={false} />
        </div>
        <ProductWorkflow />
        <ProductFeatures />
        <CompanionShowcase />
        <DocumentationShowcase />
      </main>
      <FooterSection />
    </div>
  );
}
