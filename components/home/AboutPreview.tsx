import { ArrowRight } from "lucide-react";
import {
  hasProfilePhoto,
  ProfilePhoto,
} from "@/components/profile/ProfilePhoto";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { aboutPreview } from "@/content/profile";
import { cx } from "@/lib/cx";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-heading" className="py-16 sm:py-24">
      <Container
        className={cx(
          "grid gap-10",
          // Two columns only when there is a photo to show.
          hasProfilePhoto &&
            "md:grid-cols-[13rem_minmax(0,1fr)] md:gap-14 lg:grid-cols-[16rem_minmax(0,1fr)]",
        )}
      >
        <ProfilePhoto
          sizes="(min-width: 1024px) 16rem, (min-width: 768px) 13rem, 10rem"
          className="w-40 md:w-full"
        />
        <div>
          <h2
            id="about-heading"
            className="text-section font-semibold tracking-tight text-fg"
          >
            About me
          </h2>
          <div className="mt-5 max-w-[62ch] space-y-4 text-fg">
            {aboutPreview.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <ButtonLink
            href="/about"
            variant="secondary"
            className="mt-8"
            icon={<ArrowRight className="size-4" strokeWidth={2} />}
          >
            More about me
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
