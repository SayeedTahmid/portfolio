import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type TextLinkProps = {
  children: ReactNode;
  className?: string;
} & (
  | { href: Route; external?: never }
  | {
      /** External URL, mailto: link, or a static file in /public. */
      href: string;
      external: true;
    }
);

/**
 * The site's single link style (the `link` utility in globals.css): accent colour
 * plus an underline, so links never rely on colour alone. Hover thickens the
 * underline and deepens the colour.
 */
export function TextLink(props: TextLinkProps) {
  const classes = cx("link", props.className);
  if (props.external) {
    return (
      <a href={props.href} className={classes}>
        {props.children}
      </a>
    );
  }
  return (
    <Link href={props.href} className={classes}>
      {props.children}
    </Link>
  );
}
