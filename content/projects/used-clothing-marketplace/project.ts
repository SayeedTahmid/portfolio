import { github } from "../../sources.ts";
import type { Project } from "../../types.ts";

const project: Project = {
  slug: "used-clothing-marketplace",
  title: "Used clothing marketplace database",
  summary:
    "A relational MySQL database for a second-hand clothing marketplace, covering users, listings, orders, payments and reviews.",
  category: "software",
  status: "completed",
  year: 2025,
  highlights: [
    "Seven tables linked by nine foreign-key constraints, two of them with cascading deletes.",
    "Constraint tests that confirm duplicate primary keys and unique values are rejected and that cascades behave as designed.",
    "Analytical queries for top sellers, total sales per product and each customer's spending.",
  ],
  stack: ["MySQL", "SQL"],
  links: [
    {
      kind: "repo",
      href: github("Used-Cloth-Marketplace-DBMS"),
      label: "Source code",
    },
  ],
  image: {
    src: "/projects/used-clothing-marketplace/cascade-delete-test.png",
    width: 888,
    height: 338,
    alt: "MySQL Workbench test: deleting category 40, then selecting clothes in that category returns an empty result, confirming the cascading delete.",
  },
  evidence: [
    {
      label: "Used-Cloth-Marketplace-DBMS repository",
      href: github("Used-Cloth-Marketplace-DBMS"),
    },
  ],
  // Position on the homepage (1–4). Remove this line to unfeature.
  featured: 3,
};

export default project;
