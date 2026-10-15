import { resume } from "../../sources.ts";
import type { Project } from "../../types.ts";

const project: Project = {
  slug: "pediatric-brain-tumor-segmentation",
  title: "3D brain-tumor segmentation from pediatric MRI",
  summary:
    "A deep-learning pipeline for volumetric tumor segmentation on BraTS-PEDs 2024 (257 labeled cases), built by a three-person senior design team.",
  category: "ml-research",
  status: "ongoing",
  year: 2026,
  context:
    "Senior Design Project (CSE499A, continuing in CSE499B), North South University",
  advisor: "Riasat Khan, Associate Professor, ECE",
  team: { kind: "team", size: 3 },
  role: "Leads the deep-learning pipeline.",
  highlights: [
    "Rescoped the problem, dataset and evaluation protocol under a fixed deadline after the initial approach proved unviable.",
  ],
  stack: ["Python", "PyTorch"],
  availabilityNote:
    "The code is private while the research is in progress. No results are published here until the work is complete.",
  evidence: [resume],
  // Position on the homepage (1–4). Remove this line to unfeature.
  featured: 4,
};

export default project;
