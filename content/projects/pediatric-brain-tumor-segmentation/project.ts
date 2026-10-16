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
    "The code is private while the research is in progress. The figure is a qualitative explainability check; segmentation scores will be published when the work is complete.",
  image: {
    src: "/projects/pediatric-brain-tumor-segmentation/seg-grad-cam-edema.png",
    width: 2560,
    height: 2597,
    alt: "A four-by-four grid of axial MRI slices from two cases, 0141 and 0091, with the ground-truth edema outlined in green. For each case, one row shows the DynUNet baseline and one row shows the Row 4 model (+DS +att +FP); the columns show the T1CE scan and Seg-Grad-CAM heat maps at decoder levels upsamples.0, upsamples.1 and upsamples.2. In the baseline rows, the heat maps at upsamples.1 and upsamples.2 fall mostly on the skull and background or are nearly empty. In the Row 4 rows, the heat maps at all three levels sit inside or close to the edema outline.",
    caption:
      "Seg-Grad-CAM for the edema output (seed 42), computed over the ground-truth edema voxels, at three decoder levels for cases 0141 and 0091. In these two cases, the baseline DynUNet's finer decoder levels highlight mostly the skull and background, while the Row 4 model (+DS +att +FP) focuses on the edema at every level. Green outline: ground-truth edema.",
  },
  evidence: [resume],
  // Position on the homepage (1–4). Remove this line to unfeature.
  featured: 4,
};

export default project;
