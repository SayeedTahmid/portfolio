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
  image: {
    src: "/projects/multi-tenant-crm/dashboard.png",
    width: 1781,
    height: 930,
    alt: "The NextGen CRM web dashboard in dark mode: summary cards for total customers (12), open complaints (13), recent logs (0) and performance (3); shortcuts to manage customers, manage complaints, view all logs and create a log; an AI Recommendations grid of customer cards, each with a View AI Insights button; and the CRM Assistant chat panel open on the right. Customer names and email addresses are covered with grey bars.",
    caption:
      "The web client's dashboard with test data: summary counts, shortcuts, per-customer AI recommendations and the CRM Assistant chat panel. Customer names and email addresses are covered.",
  },
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
