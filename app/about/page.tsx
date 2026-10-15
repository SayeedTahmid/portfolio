import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TechTagList } from "@/components/ui/TechTag";
import { TextLink } from "@/components/ui/TextLink";
import portrait from "@/content/images/portrait.jpg";
import { aboutFull, activities, education } from "@/content/profile";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `About ${site.name}: Computer Science and Engineering student at North South University working across software engineering and machine-learning research.`,
  path: "/about",
});

function SubSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-4 border-t border-line pt-10 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10"
    >
      <h2 id={id} className="text-xl font-semibold tracking-snug text-fg">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-14 pb-16 sm:pt-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <h1 className="text-hero font-semibold tracking-tight text-fg">
              About
            </h1>
            <div className="mt-8 max-w-[64ch] space-y-5 text-lg text-fg">
              {aboutFull.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={site.resume.href}
                external
                size="lg"
                icon={<FileText className="size-4" strokeWidth={2} />}
              >
                View résumé
              </ButtonLink>
              <ButtonLink href="/projects" size="lg" variant="secondary">
                See projects
              </ButtonLink>
            </div>
          </div>
          <Image
            src={portrait}
            alt={`Portrait of ${site.name}`}
            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 15rem, 12rem"
            placeholder="blur"
            priority
            className="order-first w-48 rounded-lg border border-line md:order-none md:w-full"
          />
        </div>

        <div className="mt-20 space-y-10">
          <SubSection id="education" title="Education">
            <p className="font-medium text-fg">{education.degree}</p>
            <p className="mt-1 text-fg-muted">
              {education.institution}, {education.location}.{" "}
              {education.graduation}.
            </p>
            <h3 className="mt-6 text-sm font-medium text-fg-muted">
              Relevant coursework
            </h3>
            <TechTagList
              items={education.coursework}
              label="Relevant coursework"
              className="mt-3"
            />
          </SubSection>

          <SubSection id="skills" title="Skills">
            <div className="space-y-5">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="text-sm font-medium text-fg">{group.label}</h3>
                  <TechTagList
                    items={group.items}
                    label={group.label}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection id="activities" title="Outside the lab">
            <ul className="max-w-[64ch] list-disc space-y-2 pl-5 marker:text-accent">
              {activities.map((activity) => (
                <li key={activity}>{activity}</li>
              ))}
            </ul>
          </SubSection>

          <SubSection id="elsewhere" title="Contact">
            <ul className="space-y-2">
              <li>
                <TextLink href={`mailto:${site.email}`} external>
                  {site.email}
                </TextLink>
              </li>
              <li>
                <TextLink href={site.links.linkedin} external>
                  LinkedIn
                </TextLink>
              </li>
              <li>
                <TextLink href={site.links.github} external>
                  GitHub
                </TextLink>
              </li>
            </ul>
          </SubSection>
        </div>
      </Container>
    </div>
  );
}
