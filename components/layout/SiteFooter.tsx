import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

const contactLinks = [
  { href: `mailto:${site.email}`, label: "Email" },
  { href: site.links.github, label: "GitHub" },
  { href: site.links.linkedin, label: "LinkedIn" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <Container className="flex flex-col gap-4 py-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name}, {site.location}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {contactLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
