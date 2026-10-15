import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactSection } from "@/components/home/ContactSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { Strengths } from "@/components/home/Strengths";
import { education } from "@/content/profile";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

/** schema.org Person record so search engines can connect the site to its owner. */
function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: getSiteUrl().toString(),
    image: new URL("/opengraph-image", getSiteUrl()).toString(),
    jobTitle: "Software engineer",
    description: site.positioning,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: education.institution,
    },
    sameAs: [site.links.github, site.links.linkedin],
  };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      {projects.length > 0 ? (
        <div className="border-t border-line">
          <FeaturedProjects />
        </div>
      ) : null}
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
