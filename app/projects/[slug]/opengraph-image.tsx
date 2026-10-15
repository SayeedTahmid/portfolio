import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { categoryLabels } from "@/content/types";
import { ogSize, renderOgImage } from "@/lib/og/render";

export const alt = "Case study preview card by Syed Tahmid Manzoor";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  // Cache Components needs at least one param; with no projects, a placeholder
  // slug is prerendered and simply resolves to the 404 page.
  if (projects.length === 0) return [{ slug: "no-projects" }];
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return renderOgImage({
    eyebrow: `Case study · ${categoryLabels[project.category]}`,
    title: project.title,
    ...(project.summary.length <= 140 ? { subtitle: project.summary } : {}),
  });
}
