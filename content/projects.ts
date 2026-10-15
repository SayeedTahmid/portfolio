import { projectModules } from "./projects/index.generated.ts";
import type { Project, ProjectCategory } from "./types.ts";

/*
 * Project registry. Each project is a folder in content/projects/ containing a
 * project.ts; the folder list is discovered automatically
 * (scripts/generate-content-index.ts), so adding or deleting a folder is all it
 * takes to add or remove a project everywhere: cards, case-study pages, the
 * sitemap, share images and tests.
 */

/** All projects, newest first, then alphabetically. */
export const projects: readonly Project[] = [...projectModules].sort(
  (a, b) => b.year - a.year || a.title.localeCompare(b.title),
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Homepage projects in their `featured` order. If no project is featured (for
 * example after removing the featured ones), the four newest are shown instead.
 */
export function getFeaturedProjects(): Project[] {
  const featured = projects
    .filter((project) => project.featured !== undefined)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
  return featured.length > 0 ? featured : projects.slice(0, 4);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category);
}
