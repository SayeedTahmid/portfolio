import type { Source } from "./types.ts";

/** Shared evidence sources and helpers used by project files. */

export const resume: Source = {
  label: "Resume, October 2026",
  href: "/syed-tahmid-manzoor-resume.pdf",
};

/** URL of one of Tahmid's GitHub repositories. */
export const github = (repo: string) =>
  `https://github.com/SayeedTahmid/${repo}`;
