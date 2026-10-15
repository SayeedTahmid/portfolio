import { Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

/** Closing invitation. Every address comes from content/site.ts. */
export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-24"
    >
      <Container>
        <div className="rounded-lg border border-line bg-surface px-6 py-10 sm:px-12 sm:py-14">
          <h2
            id="contact-heading"
            className="text-section font-semibold tracking-tight text-fg"
          >
            Get in touch
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg text-fg-muted">
            For roles, research collaboration or questions about any project
            here, email me or connect on LinkedIn.
          </p>
          <p className="mt-6 text-lg font-medium break-all text-fg">
            {site.email}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={`mailto:${site.email}`}
              external
              size="lg"
              icon={<Mail className="size-4" strokeWidth={2} />}
            >
              Send an email
            </ButtonLink>
            <ButtonLink
              href={site.links.linkedin}
              external
              size="lg"
              variant="secondary"
            >
              LinkedIn
            </ButtonLink>
            <ButtonLink
              href={site.links.github}
              external
              size="lg"
              variant="secondary"
            >
              GitHub
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
