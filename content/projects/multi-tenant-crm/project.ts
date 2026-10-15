import { github, resume } from "../../sources.ts";
import type { Project } from "../../types.ts";

const project: Project = {
  slug: "multi-tenant-crm",
  title: "Multi-tenant CRM system",
  summary:
    "A customer relationship management platform spanning a Flask REST API, a React and TypeScript web client, and a native Kotlin Android app, backed by Firestore.",
  category: "software",
  status: "completed",
  year: 2025,
  context: "Junior Design Project (CSE299), North South University",
  team: { kind: "solo" },
  role: "Built every part: API, web client, Android app and integrations.",
  highlights: [
    "Role-based access control with per-organization (tenant) checks in the Firestore security rules.",
    "Complaint handling with SLA tracking.",
    "Gmail tracking through n8n workflows, a Telegram notification bot and VoIP call management, combined into one customer timeline.",
  ],
  stack: [
    "Python",
    "Flask",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Firebase",
    "Kotlin",
    "n8n",
  ],
  links: [
    {
      kind: "repo",
      href: github("CRMS_Junior_Project_CSE299"),
      label: "Source code",
    },
  ],
  evidence: [
    resume,
    {
      label: "CRMS_Junior_Project_CSE299 repository",
      href: github("CRMS_Junior_Project_CSE299"),
    },
  ],
  // Position on the homepage (1–4). Remove this line to unfeature.
  featured: 2,
};

export default project;
