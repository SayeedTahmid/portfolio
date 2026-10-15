import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { Container } from "@/components/ui/Container";
import { navItems, site } from "@/content/site";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-md font-semibold tracking-[-0.01em] text-fg font-stretch-85%"
        >
          {site.name}
        </Link>
        <div className="flex items-center gap-8">
          <SiteNav items={navItems} />
          {/* On phones the switcher lives in the menu, so the header fits at 320px. */}
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
}
