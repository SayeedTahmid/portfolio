import type { ReactNode } from "react";

type CaseStudySectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/** One numbered-free section of a case study. The page only renders sections that have content. */
export function CaseStudySection({
  id,
  title,
  children,
}: CaseStudySectionProps) {
  return (
    <section
      aria-labelledby={id}
      className="border-t border-line pt-10 first:border-t-0 first:pt-0"
    >
      <h2 id={id} className="text-section font-semibold tracking-tight text-fg">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-fg">{children}</div>
    </section>
  );
}

export function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="max-w-[68ch]">
          {paragraph}
        </p>
      ))}
    </>
  );
}

export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="max-w-[68ch] list-disc space-y-2 pl-5 marker:text-accent">
      {items.map((item) => (
        <li key={item.slice(0, 40)}>{item}</li>
      ))}
    </ul>
  );
}
