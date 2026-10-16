import Image from "next/image";
import { heroImage } from "@/content/hero-image.generated";
import { site } from "@/content/site";
import { cx } from "@/lib/cx";

/** True when content/hero-image.(jpg|jpeg|png|webp|avif) exists. */
export const hasHeroImage = heroImage !== null;

/**
 * The homepage hero image, shown in place of the contour figure when
 * content/hero-image.* exists. Any aspect ratio works; it keeps its own shape.
 * Imported statically, so a replaced image gets a new URL and never shows a
 * stale cached copy.
 */
export function HeroImage({ className }: { className?: string }) {
  if (!heroImage) return null;
  return (
    <div
      className={cx(
        "overflow-hidden rounded-lg border border-line bg-soft",
        className,
      )}
    >
      <Image
        src={heroImage}
        alt={site.heroImageAlt}
        // Matches the hero grid: 26rem column from 1280px, 24rem from 1024px,
        // otherwise stacked under the text at up to 42rem wide.
        sizes="(min-width: 1280px) 26rem, (min-width: 1024px) 24rem, (min-width: 640px) 42rem, calc(100vw - 2.5rem)"
        preload
        placeholder="blur"
        className="block h-auto w-full"
      />
    </div>
  );
}
