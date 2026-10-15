import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Projects" };

/** TEMPORARY stub so navigation links resolve. Built in Phase 4. */
export default function ProjectsPage() {
  return (
    <Container className="py-16">
      <h1 className="text-hero font-semibold tracking-tight">Projects</h1>
    </Container>
  );
}
