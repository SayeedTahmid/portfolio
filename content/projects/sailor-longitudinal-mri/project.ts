import { github, resume } from "../../sources.ts";
import type { Project } from "../../types.ts";

const project: Project = {
  slug: "sailor-longitudinal-mri",
  title: "Auditing longitudinal brain-tumor growth prediction",
  summary:
    "An audit of a longitudinal MRI prediction method published in IEEE TMI (2025), which showed the method was statistically indistinguishable from simply copying the previous scan forward.",
  category: "ml-research",
  status: "ongoing",
  year: 2026,
  context: "Independent research (SAILOR)",
  highlights: [
    "Traced the result to a conditioning variable that acted as a positional proxy, and to 19 sessions with zero-filled masks.",
    "Engineered a tested Python research package with permutation controls and provenance checks to rule out data leakage.",
    "Preprocessed and quality-checked two glioma cohorts totaling 118 patients (EBRAINS, 27; LUMIERE, 91), and identified reliability failures in LUMIERE's automated segmentations.",
  ],
  stack: ["Python", "NumPy", "nibabel", "PyTorch", "pytest"],
  links: [
    {
      kind: "repo",
      href: github("SAILOR_Longitudinal_Research"),
      label: "Source code",
    },
  ],
  evidence: [
    resume,
    {
      label: "SAILOR_Longitudinal_Research repository",
      href: github("SAILOR_Longitudinal_Research"),
    },
  ],
};

export default project;
