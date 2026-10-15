/**
 * Skills as listed on Tahmid's résumé (October 2026), grouped the same way.
 * MySQL is added because the Used-Cloth-Marketplace-DBMS repository demonstrates it.
 */
export type SkillGroup = {
  label: string;
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    label: "Languages",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "C",
      "C++",
      "Java",
      "Kotlin",
      "SQL",
    ],
  },
  {
    label: "Machine learning",
    items: [
      "PyTorch",
      "Vision Transformers (ViT, CLIP)",
      "LoRA fine-tuning",
      "3D medical image segmentation",
      "Model calibration",
      "Ablation design",
    ],
  },
  {
    label: "Web, backend and data",
    items: [
      "React",
      "Flask",
      "REST APIs",
      "Tailwind CSS",
      "Vite",
      "Firebase (Firestore, Auth)",
      "MySQL",
      "n8n",
    ],
  },
  {
    label: "Embedded systems",
    items: [
      "Bare-metal C on STM32 / ARM Cortex-M",
      "Interrupts",
      "I2C, ADC, PWM",
    ],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "Google Colab",
      "Hugging Face",
      "Vercel",
      "LaTeX",
      "pytest",
      "CUDA",
    ],
  },
];
