import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";

type ProjectPagerProps = {
  previous: Project | undefined;
  next: Project | undefined;
};

/** Previous / next case study, in registry order. */
export function ProjectPager({ previous, next }: ProjectPagerProps) {
  if (!previous && !next) return null;
  const linkClass =
    "group flex h-full flex-col gap-1 rounded-md border border-line bg-surface p-5 transition-colors duration-150 hover:border-line-control";

  return (
    <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
      {previous ? (
        <Link href={`/projects/${previous.slug}`} className={linkClass}>
          <span className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Previous project
          </span>
          <span className="font-medium text-fg decoration-2 underline-offset-[0.2em] group-hover:underline">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className={`${linkClass} sm:items-end sm:text-right`}
        >
          <span className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
            Next project
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
          <span className="font-medium text-fg decoration-2 underline-offset-[0.2em] group-hover:underline">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
