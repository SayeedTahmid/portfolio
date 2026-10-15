import Link from "next/link";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

/**
 * TEMPORARY (Phase 1): a specimen page for reviewing tokens, type and both themes.
 * Replaced by the real home page in Phase 3.
 */
export default function HomePage() {
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="text-display font-semibold tracking-[-0.025em] text-fg font-stretch-80%">
        {site.name}
      </h1>
      <p className="mt-6 max-w-[38ch] text-lg text-fg">{site.positioning}</p>
      <p className="mt-4 max-w-[62ch] text-base text-fg-muted">
        {site.summary}
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="inline-flex h-11 items-center rounded-sm bg-primary px-5 text-sm font-semibold text-on-primary"
        >
          View projects
        </Link>
        <Link
          href="/about"
          className="inline-flex h-11 items-center rounded-sm border border-line-strong px-5 text-sm font-semibold text-fg"
        >
          About me
        </Link>
      </div>

      <section className="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-2 [&>*]:min-w-0">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.015em] font-stretch-90%">
            Case-study prose
          </h2>
          <p className="mt-4 max-w-[66ch] font-serif text-md leading-[1.7] text-fg">
            Case studies are set in Source Serif 4 for comfortable long reading.
            A{" "}
            <a
              href="#contact"
              className="text-primary underline underline-offset-4"
            >
              link in running text
            </a>{" "}
            uses the primary colour with an underline, so it never relies on
            colour alone. <em>Italic emphasis</em> comes from the true italic
            font, not a slanted roman.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.015em] font-stretch-90%">
            Surfaces and code
          </h2>
          <div className="mt-4 rounded-md border border-line bg-surface p-5">
            <p className="text-sm text-fg-muted">
              Surface card with a hairline border
            </p>
            <CodeBlock className="mt-3">
              <code>{`const theme = resolveTheme(preference);`}</code>
            </CodeBlock>
          </div>
        </div>
      </section>

      <section id="contact" className="mt-20 border-t border-line pt-10">
        <h2 className="text-2xl font-semibold tracking-[-0.015em] font-stretch-90%">
          Contact
        </h2>
        <p className="mt-4 text-fg-muted">
          <a
            href={`mailto:${site.email}`}
            className="text-primary underline underline-offset-4"
          >
            {site.email}
          </a>
        </p>
      </section>
    </Container>
  );
}
