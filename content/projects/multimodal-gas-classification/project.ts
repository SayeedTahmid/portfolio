import { resume } from "../../sources.ts";
import type { Project, Source } from "../../types.ts";

const cse465Report: Source = {
  label: "CSE465 final report, Summer 2026 (not public)",
};

const project: Project = {
  slug: "multimodal-gas-classification",
  title: "Robust multimodal gas classification",
  summary:
    "Reproduced a 2025 gas-detection study and exposed flaws in its data and evaluation, then, with two teammates, designed a thermal-imaging and sensor-array model that separates sensor faults from genuine uncertainty.",
  category: "ml-research",
  status: "completed",
  year: 2026,
  context: "Deep Learning (CSE465), North South University",
  advisor: "Riasat Khan, Associate Professor, ECE",
  team: {
    kind: "team",
    size: 3,
    collaborators: ["Farhana Mehazbin Tusti", "Md. Rizuan Al Masud Raeen"],
  },
  role: "Augmentation and preprocessing, the six standalone-model comparison, state-of-the-art benchmarking, an ablation study, and the conclusions.",
  highlights: [
    "In the reproduction, uncovered 602 duplicate images, an undocumented 300× resolution discrepancy, and two reportedly distinct models with identical predictions (McNemar p = 1.0).",
    "Showed that a depth-5 decision tree matched the published deep model under random splits but collapsed under temporal splits, isolating an evaluation-protocol artifact.",
    "The final model separates confidence into each modality's physical consistency and its complementarity with the other, combining a ViT-B/16 (rank-8 LoRA) thermal-image pathway with an FT-Transformer for the sensor array.",
  ],
  metrics: [
    {
      label: "Expected calibration error",
      value: "0.0029",
      evaluation: "test",
      detail:
        "native confidence gate, held-out test split of 956 clean recordings",
      source: cse465Report,
    },
    {
      label: "Accuracy",
      value: "98.85% ± 0.11",
      evaluation: "test",
      detail:
        "mean of 3 seeds on the same split; equal to the strongest baselines, so the gain is in calibration, not accuracy",
      source: cse465Report,
    },
    {
      label: "Accuracy drop under continuous sensor noise",
      value: "4.19 points",
      evaluation: "test",
      detail: "98.95% to 94.76%, best seed",
      source: cse465Report,
    },
    {
      label: "Trainable parameters",
      value: "1.31%",
      evaluation: "other",
      detail: "1.14 M, with the ViT-B/16 backbone frozen",
      source: cse465Report,
    },
  ],
  stack: ["Python", "PyTorch", "ViT-B/16", "LoRA", "FT-Transformer"],
  availabilityNote: "The report and code are not public.",
  evidence: [resume, cse465Report],
};

export default project;
