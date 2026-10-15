import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Page-width wrapper with the site's side gutters (16px on phones). */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
}
