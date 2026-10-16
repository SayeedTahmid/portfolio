import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import type { ProjectImage } from "@/content/types";
import { cx } from "@/lib/cx";

/**
 * Tall or square figures are narrowed so they are at most this tall (48rem, about
 * 770px) and fit on a laptop screen. Wide figures are unaffected. The full-size
 * link under every figure shows all the detail.
 */
const MAX_FIGURE_HEIGHT_REM = 48;

type ProjectFigureProps = {
  image: ProjectImage;
  caption?: string;
  /** Responsive `sizes` hint; defaults to the case-study text column. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * A real project image at its own aspect ratio: never stretched, cropped or
 * enlarged past its own pixel width (narrow screenshots are centred instead).
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
  const maxWidthRem = (MAX_FIGURE_HEIGHT_REM * image.width) / image.height;
  return (
    <figure
      className={cx("mx-auto space-y-3", className)}
      style={{ maxWidth: `${maxWidthRem.toFixed(2)}rem` }}
    >
      <div className="flex justify-center overflow-hidden rounded-lg border border-line bg-soft">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          // Never wider than the file itself, so small screenshots stay sharp.
          style={{ maxWidth: `${image.width}px` }}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="flex flex-col gap-1 text-sm text-fg-muted sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        {caption ? <span>{caption}</span> : null}
        {/* Plain link to the original file, so small text in dense figures stays readable. */}
        <TextLink
          href={image.src}
          external
          className="inline-flex min-h-6 shrink-0 items-center self-start"
        >
          Open full size
        </TextLink>
      </figcaption>
    </figure>
  );
}
