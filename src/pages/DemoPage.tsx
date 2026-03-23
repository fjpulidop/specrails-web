import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import HubDemoSection from "@/components/HubDemoSection";
import { useSeo } from "@/hooks/useSeo";

export default function DemoPage(): JSX.Element {
  useSeo({
    title: "Interactive Demo — specrails-hub",
    description:
      "Try specrails-hub in action. Explore the dashboard, pipeline, command grid, and analytics with mock OpenClaw project data.",
    canonical: "https://specrails.dev/demo",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HubDemoSection />
      </main>
      <FooterSection />
    </div>
  );
}
