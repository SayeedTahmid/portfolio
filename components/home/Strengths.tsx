import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechTagList } from "@/components/ui/TechTag";
import { skillGroups } from "@/content/skills";

/** Grouped skills as plain labels; no proficiency bars or percentages. */
export function Strengths() {
  return (
    <section aria-labelledby="strengths-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="strengths-heading"
          title="Technical strengths"
          description="Languages, frameworks and tools I have used in coursework, research and the projects on this site."
        />
        <div className="mt-10 divide-y divide-line border-y border-line">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="grid gap-3 py-5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:items-baseline sm:gap-8"
            >
              <h3 className="text-sm font-medium text-fg">{group.label}</h3>
              <TechTagList items={group.items} label={group.label} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
