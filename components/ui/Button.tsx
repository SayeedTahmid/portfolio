import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium whitespace-nowrap transition-colors duration-150 ease-standard";

const variants: Record<Variant, string> = {
  primary: "bg-btn text-on-btn hover:bg-btn-hover",
  // The outline uses line-control (>= 3:1) so the button's boundary is visible.
  secondary:
    "border border-line-control bg-surface text-fg hover:border-accent hover:bg-soft",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

/** Class names for anything that should look like a button (links or <button>s). */
export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
): string {
  return cx(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Decorative icon after the label; hidden from assistive technology. */
  icon?: ReactNode;
};

type ButtonLinkProps = CommonProps &
  (
    | { href: Route; external?: never }
    | {
        /** External URL, mailto: link, or a static file in /public. */
        href: string;
        external: true;
      }
  );

/** A link styled as a button. Internal routes are type-checked against the app's routes. */
export function ButtonLink(props: ButtonLinkProps) {
  const { children, variant, size, className, icon } = props;
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {children}
      {icon ? (
        <span aria-hidden="true" className="inline-flex">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (props.external) {
    return (
      <a href={props.href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={props.href} className={classes}>
      {content}
    </Link>
  );
}
