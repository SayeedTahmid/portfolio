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

/**
 * Which data a number was measured on. Shown next to every metric so readers can
 * tell a held-out test result from a validation or preliminary one.
 */
export type EvaluationKind = "test" | "validation" | "preliminary" | "other";

export const evaluationLabels: Record<EvaluationKind, string> = {
  test: "Held-out test set",
  validation: "Validation set",
  preliminary: "Preliminary result",
  other: "Measured",
};

export type Metric = {
  label: string;
  value: string;
  evaluation: EvaluationKind;
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
  /** Path under /public. Only real screenshots, diagrams or results from the project itself. */
  src: `/projects/${string}`;
  /** Intrinsic pixel size of the file (checked by the content validator). */
  width: number;
  height: number;
  /** Describe what the image shows and why it matters, not just "screenshot". */
  alt: string;
  caption?: string;
  /**
   * "contain" (default) shows the whole image, letterboxed if needed; right for
   * diagrams, charts and UI screenshots. "cover" fills the frame and may crop.
   */
  fit?: "contain" | "cover";
};

/** A real figure from the project: screenshot, diagram or result plot. */
export type CaseStudyFigure = ProjectImage & { caption: string };

/** Paragraphs of prose. */
export type Prose = readonly string[];

/**
 * Long-form case study. Every field is optional: the page renders a section only
 * when it has verified content, and hides it otherwise. Section order on the page:
 * overview, problem, role, requirements, architecture, implementation,
 * technologies, decisions, results, limitations, figures, resources.
 */
export type CaseStudy = {
  /** Adds to the summary at the top of the page. */
  overview?: Prose;
  problem?: Prose;
  /** What Tahmid personally did, as concrete bullet points. */
  contributions?: readonly string[];
  requirements?: readonly string[];
  architecture?: {
    prose?: Prose;
    /** Main parts of the system, in data-flow order. */
    components?: readonly { name: string; description: string }[];
  };
  implementation?: readonly { title: string; body: Prose }[];
  /** Technologies with the job each one did. Falls back to `stack` when absent. */
  technologies?: readonly { name: string; purpose: string }[];
  decisions?: readonly { title: string; body: string }[];
  /** Narrative around the numbers; the numbers themselves live in `metrics`. */
  results?: Prose;
  limitations?: readonly string[];
  futureWork?: readonly string[];
  figures?: readonly CaseStudyFigure[];
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
  /**
   * Position on the homepage (1 = first). Up to four projects; leave it out to keep
   * a project off the homepage. With none featured, the four newest are shown.
   */
  featured?: 1 | 2 | 3 | 4;
  /** Card thumbnail and the lead image on the case-study page. */
  image?: ProjectImage;
  caseStudy?: CaseStudy;
};
