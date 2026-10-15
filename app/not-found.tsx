import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="pt-20 pb-16 sm:pt-28">
      <Container>
        <p className="font-mono text-sm text-fg-muted">404</p>
        <h1 className="mt-4 text-hero font-semibold tracking-tight text-fg">
          Page not found
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg text-fg-muted">
          This address doesn&apos;t match any page on the site. It may have
          moved, or the link may contain a typo.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/projects" size="lg">
            Browse projects
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="secondary">
            Go to the homepage
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
