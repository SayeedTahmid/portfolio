import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionHeadingProps = {
  /** Used as the heading id, so the section can point at it with aria-labelledby. */
  id: string;
  title: string;
  description?: ReactNode;
  /** Optional link or button aligned with the heading, e.g. "All projects". */
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  id,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <h2
          id={id}
          className="text-section font-semibold tracking-tight text-fg"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-[60ch] text-fg-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
