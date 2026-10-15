import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectFigure } from "@/components/projects/ProjectFigure";
import { TechTagList } from "@/components/ui/TechTag";
import { TextLink } from "@/components/ui/TextLink";
import type { Project } from "@/content/types";
import { BulletList, Paragraphs } from "./CaseStudySection";
import { MetricList } from "./MetricList";

export type CaseStudySectionData = {
  id: string;
  title: string;
  content: ReactNode;
};

const has = (
  value: readonly unknown[] | undefined,
): value is readonly unknown[] => Array.isArray(value) && value.length > 0;

/**
 * Builds the case-study sections in a fixed order and drops every section
 * without verified content, so nothing is padded with invented detail.
 */
export function buildSections(project: Project): CaseStudySectionData[] {
  const cs = project.caseStudy ?? {};
  const sections: Array<CaseStudySectionData | null> = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <>
          {has(cs.overview) ? <Paragraphs items={cs.overview} /> : null}
          <BulletList items={project.highlights} />
        </>
      ),
    },
    has(cs.problem)
      ? {
          id: "problem",
          title: "Problem and motivation",
          content: <Paragraphs items={cs.problem} />,
        }
      : null,
    // The role summary is already in the facts box; this section adds the specifics.
    has(cs.contributions)
      ? {
          id: "role",
          title: "My role and contributions",
          content: (
            <>
              {project.role ? (
                <p className="max-w-[68ch]">{project.role}</p>
              ) : null}
              <BulletList items={cs.contributions} />
            </>
          ),
        }
      : null,
    has(cs.requirements)
      ? {
          id: "requirements",
          title: "Requirements and constraints",
          content: <BulletList items={cs.requirements} />,
        }
      : null,
    cs.architecture &&
    (has(cs.architecture.prose) || has(cs.architecture.components))
      ? {
          id: "architecture",
          title: "Architecture and technical design",
          content: (
            <>
              {has(cs.architecture.prose) ? (
                <Paragraphs items={cs.architecture.prose} />
              ) : null}
              {has(cs.architecture.components) ? (
                <ol className="max-w-[68ch] space-y-4">
                  {cs.architecture.components.map((part, index) => (
                    <li
                      key={part.name}
                      className="grid grid-cols-[1.75rem_1fr] gap-x-3"
                    >
                      <span
                        aria-hidden="true"
                        className="pt-0.5 font-mono text-sm text-fg-muted"
                      >
                        {index + 1}.
                      </span>
                      <div>
                        <p className="font-medium text-fg">{part.name}</p>
                        <p className="mt-1 text-fg-muted">{part.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : null}
            </>
          ),
        }
      : null,
    has(cs.implementation)
      ? {
          id: "implementation",
          title: "Implementation details",
          content: cs.implementation.map((part) => (
            <div key={part.title} className="space-y-2">
              <h3 className="text-xl font-semibold tracking-snug">
                {part.title}
              </h3>
              <Paragraphs items={part.body} />
            </div>
          )),
        }
      : null,
    {
      id: "technologies",
      title: "Technologies used",
      content: has(cs.technologies) ? (
        <dl className="max-w-[68ch] divide-y divide-line border-y border-line">
          {cs.technologies.map((tech) => (
            <div
              key={tech.name}
              className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-6"
            >
              <dt className="font-medium text-fg">{tech.name}</dt>
              <dd className="text-fg-muted">{tech.purpose}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <TechTagList items={project.stack} />
      ),
    },
    has(cs.decisions)
      ? {
          id: "decisions",
          title: "Challenges and engineering decisions",
          content: cs.decisions.map((decision) => (
            <div key={decision.title} className="space-y-2">
              <h3 className="text-xl font-semibold tracking-snug">
                {decision.title}
              </h3>
              <p className="max-w-[68ch]">{decision.body}</p>
            </div>
          )),
        }
      : null,
    has(cs.results) || has(project.metrics)
      ? {
          id: "results",
          title: "Results and evaluation",
          content: (
            <>
              {has(cs.results) ? <Paragraphs items={cs.results} /> : null}
              {has(project.metrics) ? (
                <MetricList metrics={project.metrics} />
              ) : null}
            </>
          ),
        }
      : null,
    has(cs.limitations) || has(cs.futureWork)
      ? {
          id: "limitations",
          title: "Limitations and future improvements",
          content: (
            <>
              {has(cs.limitations) ? (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-snug">
                    Limitations
                  </h3>
                  <BulletList items={cs.limitations} />
                </div>
              ) : null}
              {has(cs.futureWork) ? (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xl font-semibold tracking-snug">
                    Future improvements
                  </h3>
                  <BulletList items={cs.futureWork} />
                </div>
              ) : null}
            </>
          ),
        }
      : null,
    has(cs.figures)
      ? {
          id: "figures",
          title: "Screenshots and figures",
          content: (
            <div className="space-y-10">
              {cs.figures.map((figure) => (
                <ProjectFigure
                  key={figure.src}
                  image={figure}
                  caption={figure.caption}
                />
              ))}
            </div>
          ),
        }
      : null,
    {
      id: "resources",
      title: "Links and sources",
      content: (
        <>
          {has(project.links) ? (
            <ul className="space-y-2">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 font-medium link"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                  {link.note ? (
                    <span className="block text-sm text-fg-muted">
                      {link.note}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
          {project.availabilityNote ? (
            <p className="max-w-[68ch] text-fg-muted">
              {project.availabilityNote}
            </p>
          ) : null}
          <div className="pt-2">
            <h3 className="text-sm font-medium text-fg-muted">
              This page is based on
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              {project.evidence.map((source) => (
                <li key={source.label}>
                  {source.href ? (
                    <TextLink href={source.href} external>
                      {source.label}
                    </TextLink>
                  ) : (
                    <span className="text-fg-muted">{source.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      ),
    },
  ];

  return sections.filter((section): section is CaseStudySectionData =>
    Boolean(section),
  );
}
