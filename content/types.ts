/**
 * Content model for projects. The types encode the site's honesty rules:
 * - every metric carries a source a reader could check
 * - links are optional, and a button renders only when its link exists
 * - team information is optional: when unconfirmed it is omitted, never guessed
 *
 * Imports in content/ use explicit .ts extensions so scripts/validate-content.ts
 * can load these files with Node's built-in TypeScript support.
 */

export type ProjectCategory = "ml-research" | "software" | "embedded";

export const categoryOrder: readonly ProjectCategory[] = [
  "ml-research",
  "software",
  "embedded",
];

export const categoryLabels: Record<ProjectCategory, string> = {
  "ml-research": "Machine learning and research",
  software: "Software engineering",
  embedded: "Embedded systems",
};

export type ProjectStatus = "completed" | "ongoing";

export const statusLabels: Record<ProjectStatus, string> = {
  completed: "Completed",
  ongoing: "Ongoing",
};

/** Where a claim can be checked. `href` is absent for documents that aren't public. */
export type Source = {
  label: string;
  href?: string;
};

export type Metric = {
  label: string;
  value: string;
  /** What the number was measured on, e.g. "126 held-out clips". */
  detail?: string;
  source: Source;
};

export type Team =
  | { kind: "solo" }
  | {
      kind: "team";
      size: number;
      /** Names only where they appear on a shared document Tahmid provided. */
      collaborators?: readonly string[];
    };

export type ProjectLink = {
  kind: "repo" | "demo";
  href: string;
  label: string;
  /** Shown next to the link, e.g. "May take a minute to wake up." */
  note?: string;
};

export type ProjectImage = {
  /** Path under /public. */
  src: `/projects/${string}`;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One or two sentences for cards and share previews. */
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  /** Course, programme or setting, e.g. "Junior Design Project (CSE299), North South University". */
  context?: string;
  advisor?: string;
  team?: Team;
  /** What Tahmid personally did. Omitted until confirmed. */
  role?: string;
  /** 2–4 concrete points, each traceable to a source in `evidence`. */
  highlights: readonly string[];
  metrics?: readonly Metric[];
  stack: readonly string[];
  links?: readonly ProjectLink[];
  /** Explains missing links, e.g. private code. */
  availabilityNote?: string;
  /** Documents the summary, highlights and metrics were drawn from. */
  evidence: readonly Source[];
  featured?: boolean;
  image?: ProjectImage;
};
