/*
 * TEMPLATE: copy this whole folder, rename the copy to your project's slug
 * (lowercase-with-hyphens, e.g. "weather-dashboard"), then edit the copy.
 * Folders starting with "_" are ignored, so this template never appears on the site.
 *
 * Only state what a reader could check (a repo, a report, your resume), and list it
 * in `evidence`. Delete any optional field you can't fill truthfully.
 * Full guide: docs/MANAGING-CONTENT.md
 */
import { github, resume } from "../../sources.ts";
import type { Project } from "../../types.ts";

const project: Project = {
  // Must match the folder name. Becomes the URL: /projects/weather-dashboard
  slug: "weather-dashboard",
  title: "Weather dashboard",
  // One or two sentences, at most 260 characters. Used on cards and share previews.
  summary:
    "A short, specific description of what the project does and who it is for.",
  category: "software", // "ml-research" | "software" | "embedded"
  status: "completed", // "completed" | "ongoing" | "paused" (shown as "On hold")
  year: 2026,

  // Optional details (delete the ones you don't need) ------------------------
  context: "Course or setting, e.g. Software Engineering (CSE327)",
  team: { kind: "solo" }, // or: { kind: "team", size: 3 }
  role: "What you personally did, if it was a team project.",

  // 1–4 concrete points, each backed by a source in `evidence`.
  highlights: ["One thing the project does or achieved."],

  stack: ["TypeScript", "React"],

  links: [
    { kind: "repo", href: github("weather-dashboard"), label: "Source code" },
    // { kind: "demo", href: "https://example.vercel.app", label: "Live demo" },
  ],
  // If there are no public links, delete `links` and explain instead:
  // availabilityNote: "The code is private.",

  evidence: [resume],

  // Homepage position 1–4 (delete this line to keep it off the homepage):
  // featured: 1,

  // A real screenshot: put the file in public/projects/<slug>/ first.
  // image: {
  //   src: "/projects/weather-dashboard/screenshot.png",
  //   width: 1440, // the validator tells you the right numbers if these are wrong
  //   height: 900,
  //   alt: "Describe what the screenshot shows.",
  // },

  // A full case study: see content/projects/crowd-action-detection/case-study.ts
  // caseStudy: myCaseStudy,
};

export default project;
