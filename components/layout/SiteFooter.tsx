import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { navItems, site } from "@/content/site";

/**
 * The year is cached and revalidated daily (Cache Components), so it rolls over on
 * 1 January without a redeploy while every page stays prerendered.
 */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const elsewhere = [
  { href: `mailto:${site.email}`, label: "Email" },
  { href: site.links.github, label: "GitHub" },
  { href: site.links.linkedin, label: "LinkedIn" },
  { href: site.resume.href, label: site.resume.label },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line sm:mt-32">
      <Container className="grid gap-10 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-semibold text-fg">{site.name}</p>
          <p className="mt-1 text-sm text-fg-muted">{site.location}</p>
        </div>

        <nav aria-labelledby="footer-site">
          <h2 id="footer-site" className="text-sm font-medium text-fg-muted">
            Site
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <TextLink href="/">Home</TextLink>
            </li>
            {navItems.map((item) => (
              <li key={item.href}>
                <TextLink href={item.href}>{item.label}</TextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2
            id="footer-elsewhere"
            className="text-sm font-medium text-fg-muted"
          >
            Elsewhere
          </h2>
          <ul
            aria-labelledby="footer-elsewhere"
            className="mt-3 space-y-2 text-sm"
          >
            {elsewhere.map((link) => (
              <li key={link.label}>
                <TextLink href={link.href} external>
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container>
        <p className="border-t border-line py-6 text-xs text-fg-muted">
          © <CopyrightYear /> {site.name}
        </p>
      </Container>
    </footer>
  );
}
