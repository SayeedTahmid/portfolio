"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import type { NavItem } from "@/content/site";
import { cx } from "@/lib/cx";

const MENU_ID = "site-menu";

function isCurrent(pathname: string, href: string): boolean {
  if (href.includes("#")) return false; // in-page anchors never mark a page as current
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type SiteNavProps = { items: NavItem[] };

/**
 * Desktop: inline links. Mobile: a native popover menu, which gives Escape and
 * click-outside dismissal for free. Links close the menu when clicked, because the
 * header persists across navigations and would otherwise stay open.
 */
export function SiteNav({ items }: SiteNavProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    const menu = menuRef.current;
    if (menu?.matches(":popover-open")) menu.hidePopover();
  };

  const linkClass = (current: boolean) =>
    cx(
      "underline-offset-[6px] decoration-2 hover:text-fg hover:underline",
      current ? "text-fg underline decoration-primary" : "text-fg-muted",
    );

  return (
    <>
      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex items-center gap-7 text-sm font-medium">
          {items.map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={linkClass(current)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        popoverTarget={MENU_ID}
        className="inline-flex h-9 items-center gap-2 rounded-sm border border-line-strong px-3 text-sm font-medium text-fg md:hidden"
      >
        <Menu aria-hidden="true" className="size-4" strokeWidth={1.75} />
        Menu
      </button>

      <div
        ref={menuRef}
        id={MENU_ID}
        popover="auto"
        className="fixed inset-x-0 top-16 bottom-auto w-auto border-b border-line bg-surface shadow-[0_12px_24px_-16px_rgb(9_17_30/0.45)] md:hidden"
      >
        <div className="flex items-center justify-between px-4 pt-3">
          <span className="text-xs text-fg-muted">Menu</span>
          <button
            type="button"
            popoverTarget={MENU_ID}
            popoverTargetAction="hide"
            className="inline-flex size-9 items-center justify-center rounded-sm text-fg-muted hover:text-fg"
          >
            <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Main">
          <ul className="px-4">
            {items.map((item) => {
              const current = isCurrent(pathname, item.href);
              return (
                <li
                  key={item.href}
                  className="border-t border-line first:border-t-0"
                >
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={closeMenu}
                    className={cx(
                      "block py-3 text-lg font-medium",
                      current ? "text-primary" : "text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center justify-between border-t border-line px-4 py-3">
          <span className="text-sm text-fg-muted">Theme</span>
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
}
