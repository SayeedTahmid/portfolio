/**
 * Biography, education and activities. Facts come from Tahmid's resume (October 2026)
 * and his project reports. The prose is a DRAFT for Tahmid to approve or rewrite.
 */

/** Short introduction for the homepage's About preview (2 paragraphs). */
export const aboutPreview: readonly string[] = [
  "I study Computer Science and Engineering at North South University in Dhaka and expect to graduate in December 2026. My work moves between building software end to end and testing machine-learning research closely.",
  "Some of my most useful findings have come from checking published results. Auditing a method for predicting brain-tumor growth, I found it performed no better than copying the previous scan forward; reproducing a gas-detection study, I showed its reported accuracy depended on how the data was split.",
];

/** Longer introduction for the About page. */
export const aboutFull: readonly string[] = [
  ...aboutPreview,
  "On the software side I have built a multi-tenant CRM across a Flask API, a React and TypeScript web client and a native Kotlin Android app, a browser-based simulator for operating-system algorithms, and a MySQL marketplace database. I have also written bare-metal firmware for an STM32 microcontroller.",
  "My current research is a senior design project on 3D brain-tumor segmentation from pediatric MRI, alongside an independent audit of longitudinal tumor-growth prediction.",
];

export const education = {
  institution: "North South University",
  location: "Dhaka, Bangladesh",
  degree: "B.Sc. in Computer Science and Engineering",
  graduation: "Expected December 2026",
  coursework: [
    "Deep Learning",
    "Machine Learning",
    "Design and Analysis of Algorithms",
    "Data Structures",
    "Database Systems",
    "Operating Systems",
    "Software Engineering",
    "Microprocessors and Interfacing",
  ],
} as const;

export const activities: readonly string[] = [
  "Football for the North South University main team, in the ASCENT Cup and BGMEA corporate tournaments.",
  "Member of the NSU Games and Sports Club.",
];
