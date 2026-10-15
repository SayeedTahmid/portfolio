import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { getProjectsByCategory, projects } from "@/content/projects";
import { categoryLabels, categoryOrder } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Software, machine-learning research and embedded projects by Syed Tahmid Manzoor, each with a case study.",
  path: "/projects",
});

/** All projects, grouped by category. With fewer than ~10 projects, grouping beats a filter UI. */
export default function ProjectsPage() {
  const activeCategories = categoryOrder.filter(
    (category) => getProjectsByCategory(category).length > 0,
  );

  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <h1 className="text-hero font-semibold tracking-tight text-fg">
          Projects
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg text-fg-muted">
          {projects.length} projects across software engineering, machine
          learning research and embedded systems. Each card opens a case study.
        </p>

        {/* Only categories that currently have projects, so no link points at a missing section. */}
        {activeCategories.length > 1 ? (
          <nav aria-label="Project categories" className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {activeCategories.map((category) => (
                <li key={category}>
                  <a href={`#${category}`} className="link">
                    {categoryLabels[category]} (
                    {getProjectsByCategory(category).length})
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {projects.length === 0 ? (
          <p className="mt-14 text-fg-muted">
            No projects are published yet. Check back soon.
          </p>
        ) : null}

        <div className="mt-14 space-y-20">
          {activeCategories.map((category) => {
            const group = getProjectsByCategory(category);
            return (
              <section key={category} aria-labelledby={category}>
                <h2
                  id={category}
                  className="text-section font-semibold tracking-tight text-fg"
                >
                  {categoryLabels[category]}
                </h2>
                <ul className="mt-8 grid gap-6 md:grid-cols-2">
                  {group.map((project) => (
                    <li key={project.slug} className="flex">
                      <ProjectCard project={project} className="w-full" />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
