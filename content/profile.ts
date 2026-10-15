/** Education and activities, as stated on Tahmid's résumé (October 2026). */

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
  "Football: North South University main team, playing in the ASCENT Cup and BGMEA corporate tournaments.",
  "Member of the NSU Games and Sports Club.",
];

/** Published résumé. The file lives in /public. */
export const resume = {
  href: "/syed-tahmid-manzoor-resume.pdf",
  label: "Résumé (PDF, 1 page)",
} as const;
