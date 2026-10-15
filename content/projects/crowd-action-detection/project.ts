import { crowdActionDetection } from "./case-study.ts";
import { github, resume } from "../../sources.ts";
import type { Project } from "../../types.ts";

const project: Project = {
  slug: "crowd-action-detection",
  title: "Crowd action detection with CLIP",
  summary:
    "Classifies crowd video as dancing, fighting or walking by training a small classifier head on a frozen CLIP ViT-B/32 backbone, with a live demo on Hugging Face Spaces.",
  category: "ml-research",
  status: "completed",
  year: 2026,
  team: { kind: "solo" },
  highlights: [
    "Built a dataset of 837 short crowd clips cut from 13 publicly available videos, split 585 / 126 / 126 for training, validation and test.",
    "Kept the CLIP backbone frozen and trained only a two-layer classifier head on its image embeddings.",
    "Deployed a Gradio interface that takes a short video clip and returns the predicted action with confidence scores.",
  ],
  metrics: [
    {
      label: "Test accuracy",
      value: "96%",
      evaluation: "test",
      detail:
        "121 of 126 clips; all test clips come from source videos also used in training",
      source: {
        label: "Repository README and confusion matrix",
        href: github("Crowd-action-detection-VLM"),
      },
    },
    {
      label: "Fighting-class F1",
      value: "0.88",
      evaluation: "test",
      detail: "weakest class; 5 of 24 fighting clips misclassified",
      source: {
        label: "Repository README and confusion matrix",
        href: github("Crowd-action-detection-VLM"),
      },
    },
    {
      label: "Best validation accuracy",
      value: "98.4%",
      evaluation: "validation",
      detail:
        "126 clips; used to choose the checkpoint, so not an unbiased estimate",
      source: {
        label: "Repository README, training log",
        href: github("Crowd-action-detection-VLM"),
      },
    },
  ],
  stack: ["Python", "PyTorch", "OpenAI CLIP", "OpenCV", "Gradio"],
  links: [
    {
      kind: "demo",
      href: "https://huggingface.co/spaces/SayeedTahmid/crowd-action-detection-vlm",
      label: "Live demo",
      note: "Hosted on a free Hugging Face Space, so it may take a minute to wake up.",
    },
    {
      kind: "repo",
      href: github("Crowd-action-detection-VLM"),
      label: "Source code",
    },
  ],
  image: {
    src: "/projects/crowd-action-detection/gradio-demo-dancing.png",
    width: 1352,
    height: 536,
    alt: "The Gradio demo after a festival dance clip is uploaded: the video on the left, and on the right the prediction “dancing” at 62%, with walking at 21% and fighting at 17%.",
  },
  caseStudy: crowdActionDetection,
  evidence: [
    resume,
    {
      label: "Crowd-action-detection-VLM repository",
      href: github("Crowd-action-detection-VLM"),
    },
  ],
  // Position on the homepage (1–4). Remove this line to unfeature.
  featured: 1,
};

export default project;
