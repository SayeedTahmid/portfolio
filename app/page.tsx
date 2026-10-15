import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactSection } from "@/components/home/ContactSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { Strengths } from "@/components/home/Strengths";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="border-t border-line">
        <FeaturedProjects />
      </div>
      <div className="border-t border-line bg-surface">
        <Strengths />
      </div>
      <div className="border-t border-line">
        <AboutPreview />
      </div>
      <ContactSection />
    </>
  );
}
