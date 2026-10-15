import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TechTagList } from "@/components/ui/TechTag";
import { site } from "@/content/site";
import { categoryLabels, statusLabels, type Project } from "@/content/types";
import { cx } from "@/lib/cx";
import { ProjectMedia } from "./ProjectMedia";

type ProjectCardProps = {
  project: Project;
  /** Heading level inside the surrounding section. */
  headingLevel?: "h2" | "h3";
  /** Responsive image size hint for the grid this card sits in. */
  imageSizes?: string;
  className?: string;
};

/**
 * The whole card opens the case study (the title link is stretched over the card);
 * code and demo links sit above that layer, so each link stays separately usable.
 */
export function ProjectCard({
  project,
  headingLevel: Heading = "h3",
  imageSizes = "(min-width: 1024px) 34rem, (min-width: 640px) 50vw, 100vw",
  className,
}: ProjectCardProps) {
  const externalLinks = project.links ?? [];

  return (
    <article
      className={cx(
        "group relative flex flex-col overflow-hidden rounded-md border border-line bg-surface transition-colors duration-150 hover:border-line-control",
        className,
      )}
    >
      <ProjectMedia
        image={project.image}
        sizes={imageSizes}
        showPlaceholder={site.showMediaPlaceholders}
        className="border-b border-line"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-xs text-fg-muted">
          {categoryLabels[project.category]}
          <span className="sr-only">,</span>
          <span aria-hidden="true" className="px-1.5">
            /
          </span>
          {statusLabels[project.status]} {project.year}
        </p>

        <Heading className="mt-2 text-xl font-semibold tracking-snug text-fg">
          <Link
            href={`/projects/${project.slug}`}
            className="decoration-2 underline-offset-[0.2em] group-hover:underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-md focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-focus"
          >
            {project.title}
          </Link>
        </Heading>

        <p className="mt-2 text-sm text-fg-muted sm:text-base">
          {project.summary}
        </p>

        <TechTagList items={project.stack} limit={5} className="mt-4" />

        {externalLinks.length > 0 ? (
          <ul className="relative z-10 mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm">
            {externalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-1 link"
                >
                  {link.kind === "repo" ? "Code" : "Live demo"}
                  <span className="sr-only"> for {project.title}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={2}
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
