import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { buildSections } from "@/components/case-study/buildSections";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { ProjectFacts } from "@/components/case-study/ProjectFacts";
import { ProjectPager } from "@/components/case-study/ProjectPager";
import { ProjectFigure } from "@/components/projects/ProjectFigure";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { getProject, projects } from "@/content/projects";
import { categoryLabels, statusLabels } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";

/** Every case study is prerendered at build time; unknown slugs reach notFound(). */
export function generateStaticParams() {
  // Cache Components needs at least one param; with no projects, a placeholder
  // slug is prerendered and simply resolves to the 404 page.
  if (projects.length === 0) return [{ slug: "no-projects" }];
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
    image: "own",
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const sections = buildSections(project);
  const demo = project.links?.find((link) => link.kind === "demo");
  const repo = project.links?.find((link) => link.kind === "repo");

  return (
    <article className="pt-10 pb-16 sm:pt-14">
      <Container>
        <TextLink
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All projects
        </TextLink>

        <header className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div>
            <p className="font-mono text-sm text-fg-muted">
              {categoryLabels[project.category]}
              <span className="sr-only">,</span>
              <span aria-hidden="true" className="px-1.5">
                /
              </span>
              {statusLabels[project.status]} {project.year}
            </p>
            <h1 className="mt-4 max-w-[22ch] text-hero font-semibold tracking-tight text-fg">
              {project.title}
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg text-fg-muted">
              {project.summary}
            </p>
            {demo || repo ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {demo ? (
                  <ButtonLink
                    href={demo.href}
                    external
                    size="lg"
                    icon={<ArrowUpRight className="size-4" strokeWidth={2} />}
                  >
                    {demo.label}
                  </ButtonLink>
                ) : null}
                {repo ? (
                  <ButtonLink
                    href={repo.href}
                    external
                    size="lg"
                    variant={demo ? "secondary" : "primary"}
                    icon={<ArrowUpRight className="size-4" strokeWidth={2} />}
                  >
                    {repo.label}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
            {demo?.note ? (
              <p className="mt-3 text-sm text-fg-muted">{demo.note}</p>
            ) : null}
          </div>
          <ProjectFacts project={project} />
        </header>

        {project.image ? (
          <ProjectFigure
            image={project.image}
            {...(project.image.caption
              ? { caption: project.image.caption }
              : {})}
            sizes="(min-width: 1152px) 70rem, 100vw"
            priority
            className="mt-12"
          />
        ) : null}

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
          <div className="min-w-0 space-y-12">
            {sections.map((section) => (
              <CaseStudySection
                key={section.id}
                id={section.id}
                title={section.title}
              >
                {section.content}
              </CaseStudySection>
            ))}
          </div>

          <nav
            aria-labelledby="toc-heading"
            className="order-first lg:order-none"
          >
            <div className="rounded-md border border-line p-5 lg:sticky lg:top-24 lg:border-0 lg:p-0">
              <h2
                id="toc-heading"
                className="text-sm font-medium text-fg-muted"
              >
                On this page
              </h2>
              <ol className="mt-3 space-y-2 text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="link">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </div>

        <div className="mt-20">
          <ProjectPager
            previous={index > 0 ? projects[index - 1] : undefined}
            next={index < projects.length - 1 ? projects[index + 1] : undefined}
          />
        </div>
      </Container>
    </article>
  );
}
