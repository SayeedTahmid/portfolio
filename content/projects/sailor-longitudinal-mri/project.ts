import { github, resume } from "../../sources.ts";
import type { Project } from "../../types.ts";

const project: Project = {
  slug: "sailor-longitudinal-mri",
  title: "Auditing longitudinal brain-tumor growth prediction",
  summary:
    "An audit of a longitudinal MRI prediction method published in IEEE TMI (2025), which showed the method was statistically indistinguishable from simply copying the previous scan forward.",
  category: "ml-research",
  status: "paused",
  year: 2026,
  context: "Independent research (SAILOR)",
  highlights: [
    "Traced the result to a conditioning variable that acted as a positional proxy, and to 19 sessions with zero-filled masks.",
    "Engineered a tested Python research package with permutation controls and provenance checks to rule out data leakage.",
    "Preprocessed and quality-checked two glioma cohorts totaling 118 patients (EBRAINS, 27; LUMIERE, 91), and identified reliability failures in LUMIERE's automated segmentations.",
  ],
  stack: ["Python", "NumPy", "nibabel", "PyTorch", "pytest"],
  image: {
    src: "/projects/sailor-longitudinal-mri/proposed-framework.png",
    width: 1536,
    height: 1024,
    alt: "Planning diagram titled Treatment-Aware Longitudinal Neuro-Oncology Framework with Residual Diffusion. It proposes taking one patient's MRI history (three or more time points), extracting 3D features with a pretrained 3D foundation-model encoder, encoding the sequence with a temporal transformer and the treatment records with a treatment encoder, fusing them by cross-attention, and conditioning a residual diffusion model that predicts the change from the latest scan to produce the future MRI and tumour mask. Side panels list candidate models, evaluation metrics, baselines (persistence, a TaDiff reproduction and 3D-GlioPREDICT), ablations, the data (SAILOR on EBRAINS, 27 patients, about 270 sessions), a hardware estimate and the expected outcomes.",
    caption:
      "The pipeline originally planned for the whole project. The audit showed the SAILOR dataset could not support it, so it was never built; work will resume if a suitable public longitudinal dataset becomes available. The hardware estimate and expected outcomes are the original planning assumptions, not results.",
  },
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
