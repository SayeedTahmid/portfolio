import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type CodeBlockProps = {
  children: ReactNode;
  /** Short description announced to screen readers, e.g. "Training loop". */
  label?: string;
  className?: string;
};

/**
 * Long lines scroll horizontally inside the block instead of widening the page.
 * tabIndex makes the scroll region reachable by keyboard (WCAG 2.1.1, axe
 * scrollable-region-focusable).
 */
export function CodeBlock({
  children,
  label = "Code sample",
  className,
}: CodeBlockProps) {
  return (
    <pre
      tabIndex={0}
      aria-label={label}
      className={cx(
        "overflow-x-auto rounded-md border border-line bg-surface p-4 font-mono text-sm leading-relaxed text-fg",
        className,
      )}
    >
      {children}
    </pre>
  );
}
