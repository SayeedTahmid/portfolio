import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { aboutPreview } from "@/content/profile";
import { site } from "@/content/site";
import portrait from "@/content/images/portrait.jpg";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-heading" className="py-16 sm:py-24">
      <Container className="grid gap-10 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-14 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <Image
          src={portrait}
          alt={`Portrait of ${site.name}`}
          sizes="(min-width: 1024px) 16rem, (min-width: 768px) 13rem, 10rem"
          placeholder="blur"
          className="w-40 rounded-lg border border-line md:w-full"
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
