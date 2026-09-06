import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { CompanionShowcase } from "@/components/ProductLanding";
import { useI18n } from "@/lib/i18n";
import { PRODUCT_COPY } from "@/lib/product-copy";
import { useSeo } from "@/hooks/useSeo";

export default function CompanionPage() {
  const { languageId } = useI18n();
  const c = PRODUCT_COPY[languageId];
  useSeo({
    title: `Specrails Companion — ${c.companionTitle}`,
    description: c.companionBody,
    canonical: "https://specrails.dev/companion",
  });
  return (
    <>
      <Navbar />
      <main>
        <CompanionShowcase standalone />
      </main>
      <FooterSection />
    </>
  );
}
