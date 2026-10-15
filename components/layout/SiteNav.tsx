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
 * Desktop: inline links. Phones: a native popover menu, which provides Escape and
 * click-outside dismissal without extra code. Links close the menu when clicked,
 * because the header persists across navigations and would otherwise stay open.
 * The current page is marked with aria-current and an underline, not colour alone.
 */
export function SiteNav({ items }: SiteNavProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    const menu = menuRef.current;
    if (menu?.matches(":popover-open")) menu.hidePopover();
  };

  return (
    <>
      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex items-center gap-1 text-sm font-medium">
          {items.map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cx(
                    "inline-flex h-10 items-center rounded-sm px-3 decoration-2 underline-offset-[0.45em] transition-colors duration-150 hover:bg-soft hover:text-fg",
                    current
                      ? "text-fg underline decoration-accent"
                      : "text-fg-muted",
                  )}
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
        className="inline-flex h-10 items-center gap-2 rounded-sm border border-line-control px-3 text-sm font-medium text-fg transition-colors duration-150 hover:bg-soft md:hidden"
      >
        <Menu aria-hidden="true" className="size-4" strokeWidth={1.75} />
        Menu
      </button>

      <div
        ref={menuRef}
        id={MENU_ID}
        popover="auto"
        className="fixed inset-x-0 top-16 bottom-auto w-auto border-b border-line bg-surface-raised md:hidden"
      >
        <div className="flex items-center justify-between px-5 pt-3">
          <span className="text-xs text-fg-muted">Menu</span>
          <button
            type="button"
            popoverTarget={MENU_ID}
            popoverTargetAction="hide"
            className="inline-flex size-10 items-center justify-center rounded-sm text-fg-muted transition-colors duration-150 hover:bg-soft hover:text-fg"
          >
            <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Main">
          <ul className="px-5">
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
                      "flex items-center py-3.5 text-lg font-medium text-fg decoration-2 underline-offset-[0.35em]",
                      current && "underline decoration-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center justify-between border-t border-line px-5 py-3">
          <span className="text-sm text-fg-muted">Theme</span>
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
}
