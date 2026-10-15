import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Projects" };

/** TEMPORARY stub so navigation links resolve. Built in Phase 4. */
export default function ProjectsPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-[-0.02em] font-stretch-85%">
        Projects
      </h1>
    </Container>
  );
}
