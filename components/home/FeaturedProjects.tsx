import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { getFeaturedProjects, projects } from "@/content/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="featured-heading"
          title="Selected projects"
          description="Software I have built and research I have worked on. Each project has a case study with my role, the technical decisions and the evidence behind any numbers."
          action={
            <TextLink href="/projects">All {projects.length} projects</TextLink>
          }
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <li key={project.slug} className="flex">
              <ProjectCard project={project} className="w-full" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
