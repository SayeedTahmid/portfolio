/**
 * Skills exactly as listed on Tahmid's resume (October 2026), regrouped for the
 * homepage. Add a skill only after Tahmid confirms it. No proficiency levels.
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
    label: "Frontend",
    items: ["React", "Tailwind CSS", "Vite"],
  },
  {
    label: "Backend and databases",
    items: ["Flask", "REST APIs", "Firebase (Firestore, Auth)", "n8n"],
  },
  {
    label: "AI and machine learning",
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
    label: "Embedded systems",
    items: [
      "Bare-metal C on STM32 / ARM Cortex-M",
      "Interrupts",
      "I2C",
      "ADC",
      "PWM",
    ],
  },
  {
    label: "Development tools",
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
