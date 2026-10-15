/**
 * Validates the project registry beyond what TypeScript can check.
 * Run: npm run validate:content   (part of `npm run check`)
 * Requires Node 22.18+ (built-in TypeScript type stripping).
 *
 * Errors fail the run. Warnings flag information still waiting for confirmation;
 * the site omits those fields rather than guessing.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { featuredSlugs, projects } from "../content/projects.ts";
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

/** Pixel size of a PNG or JPEG file, read from its header. */
function imageSize(path: string): { width: number; height: number } | null {
  const b = readFileSync(path);
  if (b.readUInt32BE(0) === 0x89504e47) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) return null;
      const marker = b[i + 1] ?? 0;
      const length = b.readUInt16BE(i + 2);
      if (
        marker >= 0xc0 &&
        marker <= 0xcf &&
        ![0xc4, 0xc8, 0xcc].includes(marker)
      ) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      i += 2 + length;
    }
  }
  return null;
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
    const { src, width, height, alt } = project.image;
    checkHref(project, "image", src);
    if (alt.trim().length < 20) {
      errors.push(
        `${slug}: image alt text should describe what the image shows`,
      );
    }
    const file = join(PUBLIC_DIR, src);
    const actual = existsSync(file) ? imageSize(file) : null;
    if (actual && (actual.width !== width || actual.height !== height)) {
      errors.push(
        `${slug}: image is ${actual.width}x${actual.height} but declared as ${width}x${height}`,
      );
    }
  }

  if (!project.team)
    warnings.push(`${slug}: team (solo or team) not confirmed yet`);
  if (!project.role && project.team?.kind === "team") {
    warnings.push(`${slug}: personal role in the team not confirmed yet`);
  }
}

for (const slug of featuredSlugs) {
  if (!slugs.has(slug))
    errors.push(`featuredSlugs lists "${slug}", which is not a project`);
}
if (featuredSlugs.length < 2 || featuredSlugs.length > 4) {
  errors.push(
    `feature 2–4 projects on the home page (currently ${featuredSlugs.length})`,
  );
}

for (const warning of warnings) console.warn(`warning  ${warning}`);
for (const error of errors) console.error(`error    ${error}`);
console.log(
  `\n${projects.length} projects checked: ${errors.length} error(s), ${warnings.length} warning(s)`,
);
process.exit(errors.length > 0 ? 1 : 0);
