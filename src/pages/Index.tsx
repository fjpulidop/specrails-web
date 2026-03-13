import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import AgentsSection from "@/components/AgentsSection";
import PipelineSection from "@/components/PipelineSection";
import FeaturesSection from "@/components/FeaturesSection";
import InstallSection from "@/components/InstallSection";
import CommandsSection from "@/components/CommandsSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import RoadmapSection from "@/components/RoadmapSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <AgentsSection />
      <PipelineSection />
      <FeaturesSection />
      <InstallSection />
      <CommandsSection />
      <PrinciplesSection />
      <RoadmapSection />
      <FooterSection />
    </div>
  );
};

export default Index;
