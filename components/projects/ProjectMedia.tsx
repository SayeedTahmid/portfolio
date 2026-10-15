import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { ProjectImage } from "@/content/types";
import { cx } from "@/lib/cx";

type ProjectMediaProps = {
  image: ProjectImage | undefined;
  /** Responsive `sizes` hint so the browser downloads an appropriately sized file. */
  sizes: string;
  /** Load eagerly; only for an image visible on first paint. */
  priority?: boolean;
  /** Render the "no screenshot yet" panel when there is no image. */
  showPlaceholder?: boolean;
  className?: string;
};

/**
 * A project image in a fixed 16:10 frame. The image keeps its own aspect ratio
 * ("contain" by default), so screenshots and diagrams are never stretched.
 * With no image, an explicitly labelled placeholder is shown instead of a stock
 * picture, so nothing is mistaken for real project evidence.
 */
export function ProjectMedia({
  image,
  sizes,
  priority = false,
  showPlaceholder = true,
  className,
}: ProjectMediaProps) {
  if (!image) {
    if (!showPlaceholder) return null;
    return (
      <div
        className={cx(
          "flex aspect-[16/10] flex-col items-center justify-center gap-2 bg-canvas text-fg-muted",
          "bg-[repeating-linear-gradient(135deg,transparent_0_10px,var(--line)_10px_11px)]",
          className,
        )}
      >
        <ImageOff aria-hidden="true" className="size-5" strokeWidth={1.5} />
        <p className="rounded-sm bg-canvas px-2 text-xs">
          Placeholder: no screenshot added yet
        </p>
      </div>
    );
  }

  return (
    <div
      className={cx(
        "relative aspect-[16/10] overflow-hidden bg-soft",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className={cx(
          "size-full",
          image.fit === "cover" ? "object-cover" : "object-contain p-3",
        )}
      />
    </div>
  );
}
