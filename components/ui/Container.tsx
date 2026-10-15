import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Page-width wrapper: 72rem max, 20px gutters on phones, 32px from tablet up. */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
