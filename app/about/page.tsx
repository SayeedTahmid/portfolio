import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "About" };

/** TEMPORARY stub so navigation links resolve. Built in Phase 5. */
export default function AboutPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-[-0.02em] font-stretch-85%">
        About
      </h1>
    </Container>
  );
}
