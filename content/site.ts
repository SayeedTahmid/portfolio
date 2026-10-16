import type { Route } from "next";

/**
 * Identity, contact details and site-wide copy.
 * Change personal details here only; every component reads from this file.
 */
export const site = {
  name: "Syed Tahmid Manzoor",
  /** Short label above the hero headline. */
  role: "Software engineer and CSE student at North South University",
  /** PLACEHOLDER copy supplied by Tahmid, to be replaced with his final wording. */
  headline: "Building useful software. Exploring intelligent systems.",
  /** PLACEHOLDER copy supplied by Tahmid, to be replaced with his final wording. */
  description:
    "I develop software applications and explore challenging engineering problems across software development, AI, and research.",
  /** Used for page descriptions and share previews. */
  positioning:
    "Software engineer working across full-stack development, machine learning and medical-imaging research.",
  location: "Dhaka, Bangladesh",
  email: "sayeedtahmid07@gmail.com",
  links: {
    github: "https://github.com/SayeedTahmid",
    linkedin: "https://www.linkedin.com/in/syed-tahmid-manzoor/",
  },
  resume: {
    href: "/syed-tahmid-manzoor-resume.pdf",
    label: "Résumé (PDF)",
  },
  /**
   * Description of content/hero-image.* for screen readers and search engines.
   * Update it whenever you replace the image. Unused when there is no hero image
   * (the homepage then shows the contour figure).
   */
  heroImageAlt:
    "Illustration of a developer working at a desk at night, with code and a brain scan on the monitors, football memorabilia on the wall and the words Code, Build, Play, Repeat.",
  /**
   * Show a labelled "no screenshot yet" panel on project cards that have no image.
   * Set to false to hide the panels before launch if screenshots are still missing.
   */
  showMediaPlaceholders: true,
} as const;

export type NavItem = { href: Route; label: string };

export const navItems: NavItem[] = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];
