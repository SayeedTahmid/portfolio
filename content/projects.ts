import type { Project, ProjectCategory, Source } from "./types.ts";

/*
 * Project registry: the single source of truth for project cards, case-study
 * pages, the sitemap and metadata. Every statement here is drawn from a document
 * listed in that project's `evidence`. Don't add claims that no source supports.
 */

const resume: Source = {
  label: "Résumé, October 2026",
  href: "/syed-tahmid-manzoor-resume.pdf",
};

const github = (repo: string) => `https://github.com/SayeedTahmid/${repo}`;

export const projects: readonly Project[] = [
  {
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
  },
  {
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
      "Leads the deep-learning pipeline for volumetric tumor segmentation on the BraTS-PEDs 2024 release.",
      "Rescoped the problem, dataset and evaluation protocol under a fixed deadline after the initial approach proved unviable.",
    ],
    stack: ["Python", "PyTorch"],
    availabilityNote:
      "The code is private while the research is in progress. No results are published here until the work is complete.",
    evidence: [resume],
  },
  {
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
        label: "Accuracy",
        value: "98.85% ± 0.11",
        detail: "6,364 aligned instances, four gas classes",
        source: { label: "CSE465 final report, Summer 2026 (not public)" },
      },
      {
        label: "Expected calibration error",
        value: "0.0029",
        detail: "native confidence gate",
        source: { label: "CSE465 final report, Summer 2026 (not public)" },
      },
      {
        label: "Trainable parameters",
        value: "1.31%",
        detail: "1.14 M, with the ViT-B/16 backbone frozen",
        source: { label: "CSE465 final report, Summer 2026 (not public)" },
      },
      {
        label: "Accuracy drop under continuous sensor noise",
        value: "4.19 points",
        detail: "98.95% to 94.76%, best seed",
        source: { label: "CSE465 final report, Summer 2026 (not public)" },
      },
    ],
    stack: ["Python", "PyTorch", "ViT-B/16", "LoRA", "FT-Transformer"],
    availabilityNote: "The report and code are not public.",
    evidence: [
      resume,
      { label: "CSE465 final report, Summer 2026 (not public)" },
    ],
  },
  {
    slug: "crowd-action-detection",
    title: "Crowd action detection with CLIP",
    summary:
      "Classifies crowd video as dancing, fighting or walking by training a small classifier head on a frozen CLIP ViT-B/32 backbone, with a live demo on Hugging Face Spaces.",
    category: "ml-research",
    status: "completed",
    year: 2026,
    team: { kind: "solo" },
    highlights: [
      "Built a dataset of 837 short crowd clips from publicly available footage, split 585 / 126 / 126 for training, validation and test.",
      "Kept the CLIP backbone frozen and trained only a two-layer classifier head on its image embeddings.",
      "Deployed a Gradio interface that takes a short video clip and returns the predicted action with confidence scores.",
    ],
    metrics: [
      {
        label: "Test accuracy",
        value: "96%",
        detail: "126 held-out clips",
        source: {
          label: "Repository README, results table",
          href: github("Crowd-action-detection-VLM"),
        },
      },
      {
        label: "Fighting-class F1",
        value: "0.88",
        detail: "weakest class; some fighting clips are read as walking",
        source: {
          label: "Repository README, results table",
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
    evidence: [
      resume,
      {
        label: "Crowd-action-detection-VLM repository",
        href: github("Crowd-action-detection-VLM"),
      },
    ],
  },
  {
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
  },
  {
    slug: "os-algorithm-simulator",
    title: "OS algorithm simulator and performance analyzer",
    summary:
      "A browser-based simulator for 12 operating-system algorithms, with an analyzer that compares CPU schedulers on the same workload.",
    category: "software",
    status: "completed",
    year: 2026,
    highlights: [
      "Six CPU schedulers, four memory-management algorithms, and Banker's algorithm with deadlock detection, all running client-side with no backend.",
      "A comparative analyzer that benchmarks schedulers on a shared workload by waiting, turnaround and response time, with Gantt and time-series charts.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts"],
    links: [
      {
        kind: "demo",
        href: "https://os-algo-sim-plum.vercel.app",
        label: "Live demo",
      },
      { kind: "repo", href: github("OS-AlgoSim"), label: "Source code" },
    ],
    evidence: [
      resume,
      { label: "OS-AlgoSim repository", href: github("OS-AlgoSim") },
    ],
  },
  {
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
  },
  {
    slug: "flood-early-warning",
    title: "Smart flood early-warning system",
    summary:
      "A low-cost STM32 device that fuses water level, its rate of rise, humidity and soil moisture into a flood-risk index with three alert tiers.",
    category: "embedded",
    status: "completed",
    year: 2026,
    context:
      "Microprocessors and Interfacing lab (CSE331L), North South University",
    team: {
      kind: "team",
      size: 3,
      collaborators: ["Tanvir Bin Zahid", "Farhan Tajwar Robe"],
    },
    role: "Interrupt-driven firmware in bare-metal C.",
    highlights: [
      "A weighted risk index drives a SAFE / WARNING / EVACUATE state machine, with a hysteresis band to stop it flickering between tiers.",
      "Bare-metal C with the HAL disabled for direct register access: a 1 ms SysTick interrupt tracks the water's rate of rise while a 100 ms main loop updates an I2C OLED, an LED bank and a PWM buzzer.",
      "Needs no internet connection, so alerts don't depend on mobile networks during a flood.",
    ],
    metrics: [
      {
        label: "Bill of materials",
        value: "BDT 1,835",
        detail: "complete prototype, Dhaka electronics market prices",
        source: { label: "CSE331L project report (not public)" },
      },
    ],
    stack: [
      "C",
      "STM32F103C8T6",
      "ARM Cortex-M3",
      "STM32CubeIDE",
      "I2C",
      "ADC",
      "PWM",
    ],
    availabilityNote: "The firmware and report are not public.",
    evidence: [resume, { label: "CSE331L project report (not public)" }],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Projects shown on the home page, in this order. Change the slugs to change the selection. */
export const featuredSlugs = [
  "crowd-action-detection",
  "multi-tenant-crm",
  "used-clothing-marketplace",
  "pediatric-brain-tumor-segmentation",
] as const;

export function getFeaturedProjects(): Project[] {
  return featuredSlugs.flatMap((slug) => {
    const project = getProject(slug);
    return project ? [project] : [];
  });
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category);
}
