import { HeroSection } from "@/components/HeroSection";
import { ShowreelSection } from "@/components/ShowreelSection";
import { AboutSection } from "@/components/AboutSection";
import { WorksSection } from "@/components/WorksSection";
import { ServicesSection } from "@/components/ServicesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ShowreelSection />
      <AboutSection />
      <WorksSection />
      <ServicesSection />
      {/* More sections coming soon */}
    </>
  );
}
