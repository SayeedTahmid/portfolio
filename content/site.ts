import type { Route } from "next";

/**
 * Single source of truth for identity and contact details.
 * Every fact here comes from Tahmid's résumé or his messages; don't add anything unverified.
 */
export const site = {
  name: "Syed Tahmid Manzoor",
  /** One line used in the hero, page titles and share cards. Drafted by Claude; Tahmid to approve. */
  positioning:
    "Software engineer working across full-stack development, machine learning and medical-imaging research.",
  /** Two-sentence introduction under the hero headline. */
  summary:
    "Computer Science and Engineering student at North South University, expected to graduate in December 2026. I build web applications end to end, train and critically evaluate deep-learning models, and write bare-metal firmware for microcontrollers.",
  location: "Dhaka, Bangladesh",
  email: "sayeedtahmid07@gmail.com",
  links: {
    github: "https://github.com/SayeedTahmid",
    linkedin: "https://www.linkedin.com/in/syed-tahmid-manzoor/",
  },
} as const;

export type NavItem = { href: Route; label: string };

export const navItems: NavItem[] = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];
