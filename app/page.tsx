import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechTagList } from "@/components/ui/TechTag";
import { TextLink } from "@/components/ui/TextLink";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

/**
 * TEMPORARY design-system specimen: every shared component in one place, used to
 * verify both themes before the homepage is built. Replaced by the homepage.
 */
export default function HomePage() {
  const withImage = getProject("crowd-action-detection");
  const withoutImage = getProject("multi-tenant-crm");

  return (
    <Container className="space-y-20 py-16 sm:py-24">
      <section aria-labelledby="type">
        <p className="font-mono text-sm text-fg-muted">{site.role}</p>
        <h1
          id="type"
          className="mt-4 max-w-[16ch] text-hero font-semibold tracking-tight text-fg"
        >
          {site.headline}
        </h1>
        <p className="mt-6 max-w-[58ch] text-lg text-fg-muted">
          {site.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            href="/projects"
            size="lg"
            icon={<ArrowRight className="size-4" />}
          >
            Explore projects
          </ButtonLink>
          <ButtonLink
            href={site.resume.href}
            external
            size="lg"
            variant="secondary"
          >
            View résumé
          </ButtonLink>
        </div>
      </section>

      <section aria-labelledby="components" className="space-y-8">
        <SectionHeading
          id="components"
          title="Section heading"
          description="Section headings scale from 30px on phones to 36px on desktop. Body text scales from 16px to 18px."
          action={<TextLink href="/projects">All projects</TextLink>}
        />
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/projects">Primary, medium</ButtonLink>
          <ButtonLink href="/about" variant="secondary">
            Secondary, medium
          </ButtonLink>
          <TextLink href="/about">Text link</TextLink>
          <TextLink href={site.links.github} external>
            External link
          </TextLink>
        </div>
        <TechTagList
          items={["TypeScript", "React", "PyTorch", "MySQL", "Flask", "Kotlin"]}
          limit={4}
        />
        <p className="max-w-[65ch] text-fg">
          Paragraph text with a{" "}
          <TextLink href="/about">link in running text</TextLink>, followed by
          compact metadata below.
        </p>
        <p className="font-mono text-xs text-fg-muted">
          Compact metadata, 12px Geist Mono
        </p>
        <CodeBlock>
          <code>{`const theme = resolveTheme(preference);`}</code>
        </CodeBlock>
      </section>

      <section aria-labelledby="cards" className="space-y-8">
        <SectionHeading id="cards" title="Project cards" />
        <div className="grid gap-6 md:grid-cols-2">
          {withImage ? <ProjectCard project={withImage} /> : null}
          {withoutImage ? <ProjectCard project={withoutImage} /> : null}
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading">
        <SectionHeading id="contact-heading" title="Contact" />
        <p className="mt-4">
          <TextLink href={`mailto:${site.email}`} external>
            {site.email}
          </TextLink>
        </p>
      </section>
    </Container>
  );
}
