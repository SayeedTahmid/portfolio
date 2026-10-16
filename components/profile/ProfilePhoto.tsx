import Image from "next/image";
import { profilePhoto } from "@/content/profile-photo.generated";
import { site } from "@/content/site";
import { cx } from "@/lib/cx";

/** True when content/profile-photo.(jpg|jpeg|png|webp|avif) exists. */
export const hasProfilePhoto = profilePhoto !== null;

type ProfilePhotoProps = {
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * The profile photo, or nothing at all when there is no photo. The frame follows
 * the photo's own shape between 4:5 portrait and square, so portrait and square
 * photos show uncropped; taller or wider photos fill the frame from the centre,
 * biased towards the top so faces stay in view. Imported statically, so a
 * replaced photo gets a new URL and never shows a stale cached copy.
 */
export function ProfilePhoto({
  sizes,
  priority = false,
  className,
}: ProfilePhotoProps) {
  if (!profilePhoto) return null;
  const ratio = Math.min(
    1,
    Math.max(4 / 5, profilePhoto.width / profilePhoto.height),
  );
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-lg border border-line bg-soft",
        className,
      )}
      style={{ aspectRatio: ratio.toFixed(4) }}
    >
      <Image
        src={profilePhoto}
        alt={`Portrait of ${site.name}`}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className="object-cover object-[50%_25%]"
      />
    </div>
  );
}
