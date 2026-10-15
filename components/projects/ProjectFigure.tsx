import Image from "next/image";
import type { ProjectImage } from "@/content/types";
import { cx } from "@/lib/cx";

type ProjectFigureProps = {
  image: ProjectImage;
  caption?: string;
  /** Responsive `sizes` hint; defaults to the case-study text column. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * A real project image at its own aspect ratio: never stretched or cropped.
 * Width and height come from the content registry (checked against the file by
 * the content validator), so the browser reserves space and nothing shifts.
 */
export function ProjectFigure({
  image,
  caption,
  sizes = "(min-width: 1152px) 50rem, (min-width: 1024px) calc(100vw - 22rem), 100vw",
  priority = false,
  className,
}: ProjectFigureProps) {
  return (
    <figure className={cx("space-y-3", className)}>
      <div className="overflow-hidden rounded-lg border border-line bg-soft">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      {caption ? (
        <figcaption className="text-sm text-fg-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
