import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { cx } from "@/lib/cx";
import { ContourFigure } from "./ContourFigure";
import { hasHeroImage, HeroImage } from "./HeroImage";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-14 pb-20 sm:pt-24 sm:pb-28"
    >
      <Container
        className={cx(
          "grid items-center gap-12",
          // A hero image gets a wider column than the contour figure.
          hasHeroImage
            ? "lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_26rem]"
            : "lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_24rem]",
        )}
      >
        <div>
          <p className="font-mono text-sm text-fg-muted">{site.role}</p>
          <h1
            id="hero-heading"
            className="mt-5 max-w-[17ch] text-hero font-semibold tracking-tight text-fg"
          >
            {site.headline}
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg text-fg-muted">
            {site.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="/projects"
              size="lg"
              icon={<ArrowRight className="size-4" strokeWidth={2} />}
            >
              Explore projects
            </ButtonLink>
            <ButtonLink
              href={site.resume.href}
              external
              size="lg"
              variant="secondary"
            >
              View résumé
            </ButtonLink>
          </div>
        </div>
        {hasHeroImage ? (
          // Shown on every screen size: beside the text on desktop, below it otherwise.
          <HeroImage className="w-full max-w-2xl lg:max-w-none" />
        ) : (
          <ContourFigure className="hidden w-full lg:block" />
        )}
      </Container>
    </section>
  );
}
