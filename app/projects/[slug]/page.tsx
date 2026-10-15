import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getProject, projects } from "@/content/projects";

/** Every case study is prerendered at build time; unknown slugs reach notFound(). */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

/** TEMPORARY: minimal case-study page. The full case-study layout comes in Phase C. */
export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Container className="py-16">
      <h1 className="text-hero font-semibold tracking-tight">
        {project.title}
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg text-fg-muted">
        {project.summary}
      </p>
    </Container>
  );
}
