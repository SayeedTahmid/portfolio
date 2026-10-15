import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type TechTagListProps = {
  items: readonly string[];
  /** Show only the first N items, followed by "+M more". */
  limit?: number;
  label?: string;
  className?: string;
};

/** Non-interactive technology labels. Deliberately flat so they never look clickable. */
export function TechTagList({
  items,
  limit,
  label = "Technologies",
  className,
}: TechTagListProps) {
  const shown = limit ? items.slice(0, limit) : items;
  const hidden = items.length - shown.length;

  return (
    <ul aria-label={label} className={cx("flex flex-wrap gap-1.5", className)}>
      {shown.map((item) => (
        <li key={item}>
          <TechTag>{item}</TechTag>
        </li>
      ))}
      {hidden > 0 ? (
        <li>
          <TechTag muted>+{hidden} more</TechTag>
        </li>
      ) : null}
    </ul>
  );
}

function TechTag({
  children,
  muted = false,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-xs",
        muted ? "text-fg-muted" : "bg-soft text-fg",
      )}
    >
      {children}
    </span>
  );
}
