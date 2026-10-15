import { github, resume } from "../../sources.ts";
import type { Project } from "../../types.ts";

const project: Project = {
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
};

export default project;
