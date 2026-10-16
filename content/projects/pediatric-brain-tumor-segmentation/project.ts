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
  image: {
    src: "/projects/pediatric-brain-tumor-segmentation/full-pipeline.png",
    width: 2400,
    height: 1538,
    alt: "Diagram of the full pipeline in five parts. 1, data and shared preprocessing: BraTS-PED 2024 (257 patients, four MRI sequences), RAS orientation, foreground crop, channel-wise normalisation and 128-cubed patches, a fixed split of 180 training, 25 inner-validation and 52 held-out test patients, training-only augmentation, and four ground-truth labels (ET, NET, CC, ED). 2, stage 1, controlled benchmark: SegResNet, Attention U-Net, DynUNet, Swin UNETR, nnU-Net and a wider SegResNet as a capacity control, under a shared protocol with five random seeds and validation-based checkpoint selection, plus SegResNet loss and modality ablations and scratch versus adult-pretraining transfer for SegResNet and Swin UNETR. 3, stage 2, DynUNet extension: a residual encoder-decoder with deep supervision, attention gates and a false-positive penalty with a patient-adaptive weight. 4, inference: best checkpoint, sliding window, segmentation files in the original space. 5, evaluation and explainability: presence-aware Dice, empty-as-one Dice and official lesion-wise Dice, HD95, false-positive analysis and absence contribution, with seed-vote entropy, attention-gate inspection and Seg-Grad-CAM.",
    caption:
      "The study's pipeline: a fixed 180/25/52 patient split, a five-seed benchmark of six architectures, a DynUNet extended with deep supervision, attention gates and a false-positive penalty, and evaluation under three Dice scoring rules with explainability analyses. Scan images in the diagram are schematic.",
  },
  evidence: [resume],
  // Position on the homepage (1–4). Remove this line to unfeature.
  featured: 4,
};

export default project;
