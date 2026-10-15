/**
 * Validates the project registry beyond what TypeScript can check.
 * Run: npm run validate:content   (part of `npm run check`)
 * Requires Node 22.18+ (built-in TypeScript type stripping).
 *
 * Errors fail the run. Warnings flag information still waiting for confirmation;
 * the site omits those fields rather than guessing.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects } from "../content/projects.ts";
import type { Project } from "../content/types.ts";

const PUBLIC_DIR = join(import.meta.dirname, "..", "public");
const errors: string[] = [];
const warnings: string[] = [];

function checkHref(project: Project, where: string, href: string) {
  if (href.startsWith("/")) {
    if (!existsSync(join(PUBLIC_DIR, href))) {
      errors.push(
        `${project.slug}: ${where} points to ${href}, which is not in /public`,
      );
    }
  } else if (!href.startsWith("https://")) {
    errors.push(`${project.slug}: ${where} must use https:// (got ${href})`);
  }
}

const slugs = new Set<string>();
for (const project of projects) {
  const { slug } = project;

  if (slugs.has(slug)) errors.push(`duplicate slug "${slug}"`);
  slugs.add(slug);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.push(`${slug}: slug must be lowercase kebab-case`);
  }

  if (project.summary.length > 260) {
    errors.push(
      `${slug}: summary is ${project.summary.length} characters; keep it under 260 for cards and share previews`,
    );
  }
  if (project.highlights.length < 1 || project.highlights.length > 4) {
    errors.push(
      `${slug}: needs 1–4 highlights (has ${project.highlights.length})`,
    );
  }
  if (project.stack.length === 0) errors.push(`${slug}: stack is empty`);
  if (project.evidence.length === 0) errors.push(`${slug}: lists no evidence`);
  if (project.year < 2020 || project.year > new Date().getFullYear()) {
    errors.push(`${slug}: year ${project.year} is out of range`);
  }

  for (const link of project.links ?? [])
    checkHref(project, `link "${link.label}"`, link.href);
  for (const source of project.evidence) {
    if (source.href)
      checkHref(project, `evidence "${source.label}"`, source.href);
  }
  for (const metric of project.metrics ?? []) {
    if (!metric.source.label.trim())
      errors.push(`${slug}: metric "${metric.label}" has an empty source`);
    if (metric.source.href)
      checkHref(project, `metric "${metric.label}" source`, metric.source.href);
  }
  if (!project.links?.length && !project.availabilityNote) {
    errors.push(
      `${slug}: has no links, so it needs an availabilityNote explaining why`,
    );
  }
  if (project.image) {
    checkHref(project, "image", project.image.src);
    if (!project.image.alt.trim()) errors.push(`${slug}: image needs alt text`);
  }

  if (!project.team)
    warnings.push(`${slug}: team (solo or team) not confirmed yet`);
  if (!project.role && project.team?.kind === "team") {
    warnings.push(`${slug}: personal role in the team not confirmed yet`);
  }
}

const featured = projects.filter((p) => p.featured).length;
if (featured < 2 || featured > 3)
  errors.push(`feature 2–3 projects on the home page (currently ${featured})`);

for (const warning of warnings) console.warn(`warning  ${warning}`);
for (const error of errors) console.error(`error    ${error}`);
console.log(
  `\n${projects.length} projects checked: ${errors.length} error(s), ${warnings.length} warning(s)`,
);
process.exit(errors.length > 0 ? 1 : 0);
