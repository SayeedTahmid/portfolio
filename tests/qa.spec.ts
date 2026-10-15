import { expect, test, type Page } from "@playwright/test";
import { staticRoutes } from "./routes";

const pages = staticRoutes.filter((route) => !route.includes("does-not-exist"));

test.describe("structure", () => {
  for (const route of staticRoutes) {
    test(`${route}: landmarks and heading order`, async ({ page }) => {
      await page.goto(route);
      await expect(page.getByRole("banner")).toHaveCount(1);
      await expect(page.getByRole("main")).toHaveCount(1);
      await expect(page.getByRole("contentinfo")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);

      // Heading levels never skip downwards (h2 -> h4) in visible content.
      const levels = await page
        .locator("h1:visible, h2:visible, h3:visible, h4:visible")
        .evaluateAll((els) => els.map((el) => Number(el.tagName[1])));
      for (let i = 1; i < levels.length; i++) {
        const prev = levels[i - 1] ?? 1;
        const curr = levels[i] ?? 1;
        expect(
          curr - prev,
          `skip from h${prev} to h${curr}`,
        ).toBeLessThanOrEqual(1);
      }
    });
  }
});

test.describe("theme on every route", () => {
  const expected = { light: "rgb(245, 247, 250)", dark: "rgb(16, 25, 35)" };
  for (const theme of ["light", "dark"] as const) {
    test(`${theme} theme applies on all pages`, async ({ page }) => {
      await page.addInitScript((value) => {
        localStorage.setItem("theme", value);
      }, theme);
      for (const route of staticRoutes) {
        await page.goto(route);
        await expect(page.locator("html"), route).toHaveAttribute(
          "data-theme",
          theme,
        );
        const bg = await page.evaluate(
          () => getComputedStyle(document.documentElement).backgroundColor,
        );
        expect(bg, route).toBe(expected[theme]);
      }
    });
  }

  test("changing theme keeps the open menu and scroll position", async ({
    page,
    isMobile,
  }) => {
    // The homepage is always long enough to scroll, whatever content exists.
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: "Menu" }).click();
      const menu = page.locator("#site-menu");
      await expect(menu).toBeVisible();
      await menu.locator('label[title="Dark theme"]').click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await expect(menu).toBeVisible();
    } else {
      await page.mouse.wheel(0, 1200);
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeGreaterThan(600);
      const before = await page.evaluate(() => window.scrollY);
      await page
        .locator('header label[title="Dark theme"]')
        .locator("visible=true")
        .click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      expect(await page.evaluate(() => window.scrollY)).toBe(before);
    }
  });
});

test.describe("keyboard", () => {
  test("every focusable element on the homepage shows a visible focus indicator", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "keyboard navigation checked on desktop");
    await page.goto("/");
    const seen = new Set<string>();
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const own = getComputedStyle(el);
        const after = getComputedStyle(el, "::after");
        // Theme options are visually hidden radios; their label draws the ring.
        const label = el.closest("label");
        const labelStyle = label ? getComputedStyle(label) : null;
        const visible = (s: CSSStyleDeclaration | null) =>
          !!s && s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2;
        return {
          key: `${el.tagName} ${el.textContent?.trim().slice(0, 40) ?? ""} ${el.getAttribute("href") ?? el.getAttribute("value") ?? ""}`,
          visible: visible(own) || visible(after) || visible(labelStyle),
        };
      });
      if (!info || seen.has(info.key)) continue;
      seen.add(info.key);
      expect(info.visible, `no visible focus on ${info.key}`).toBe(true);
    }
    expect(seen.size).toBeGreaterThan(10);
  });
});

/** WCAG 2.5.8: targets are at least 24x24 CSS px, or spaced so a 24px circle around each doesn't overlap another. */
async function targetSizeViolations(page: Page) {
  return page.evaluate(() => {
    const targets = [
      ...document.querySelectorAll<HTMLElement>(
        "a[href], button, label:has(input[type=radio])",
      ),
    ].filter((el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      if (r.width === 0 || r.height === 0 || s.visibility === "hidden")
        return false;
      // Inline exception: a link inside a sentence of running text.
      const parent = el.parentElement;
      if (
        parent?.tagName === "P" &&
        (parent.textContent?.trim().length ?? 0) >
          (el.textContent?.trim().length ?? 0) + 3
      )
        return false;
      return true;
    });
    const boxes = targets.map((el) => ({ el, r: el.getBoundingClientRect() }));
    const problems: string[] = [];
    for (const { el, r } of boxes) {
      if (r.width >= 24 && r.height >= 24) continue;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const crowded = boxes.some(({ el: other, r: o }) => {
        if (other === el || other.contains(el) || el.contains(other))
          return false;
        const ox = Math.max(o.left, Math.min(cx, o.right));
        const oy = Math.max(o.top, Math.min(cy, o.bottom));
        return Math.hypot(cx - ox, cy - oy) < 12;
      });
      if (crowded) {
        problems.push(
          `${el.tagName} "${el.textContent?.trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`,
        );
      }
    }
    return problems;
  });
}

test.describe("touch targets", () => {
  for (const route of pages) {
    test(`${route}: targets meet WCAG 2.5.8`, async ({ page }) => {
      await page.goto(route);
      expect(await targetSizeViolations(page)).toEqual([]);
    });
  }
});

test.describe("motion", () => {
  test("the hero contour animates only without reduced motion", async ({
    browser,
    isMobile,
  }) => {
    test.skip(isMobile, "the figure is hidden on phones");
    for (const reducedMotion of ["reduce", "no-preference"] as const) {
      const context = await browser.newContext({ reducedMotion });
      const page = await context.newPage();
      await page.goto("/");
      const name = await page
        .locator(".contour-draw")
        .first()
        .evaluate((el) => getComputedStyle(el).animationName);
      expect(name, reducedMotion).toBe(
        reducedMotion === "reduce" ? "none" : "contour-draw",
      );
      await context.close();
    }
  });
});

test.describe("links and images", () => {
  test("every internal link and in-page anchor on the site resolves", async ({
    page,
    request,
    isMobile,
  }) => {
    test.skip(isMobile, "crawl once");
    const checked = new Map<string, number>();
    for (const route of pages) {
      await page.goto(route);
      const hrefs = await page
        .locator("a[href]")
        .evaluateAll((links) => links.map((a) => a.getAttribute("href") ?? ""));
      for (const href of new Set(hrefs)) {
        expect(href, `empty link on ${route}`).not.toMatch(
          /^(#?$|javascript:)/,
        );
        if (!href.startsWith("/") && !href.startsWith("#")) continue;
        const [path, hash] = href.split("#");
        const target = path || route;
        if (!checked.has(target)) {
          checked.set(target, (await request.get(target)).status());
        }
        expect(checked.get(target), `${href} on ${route}`).toBe(200);
        if (hash) {
          const html = await (await request.get(target)).text();
          expect(html, `#${hash} missing on ${target}`).toContain(
            `id="${hash}"`,
          );
        }
      }
    }
    expect(checked.size).toBeGreaterThanOrEqual(3); // at least /, /projects, /about
  });

  for (const route of pages) {
    test(`${route}: images have alt text, load, and aren't upscaled`, async ({
      page,
    }) => {
      await page.goto(route);
      const images = page.locator("main img");
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        if (!(await img.isVisible())) continue;
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            img.evaluate(
              (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
            ),
          )
          .toBe(true);
        // naturalWidth is density-corrected for srcset images, so decode the files
        // themselves: the one actually served, and the original in /public.
        const info = await img.evaluate(async (el: HTMLImageElement) => {
          const decode = async (url: string) => {
            const probe = new Image();
            probe.src = url;
            await probe.decode();
            return probe.naturalWidth;
          };
          const served = new URL(el.currentSrc);
          const original = served.searchParams.get("url");
          return {
            alt: el.alt,
            src: el.currentSrc,
            cssWidth: el.getBoundingClientRect().width,
            shownPixels:
              el.getBoundingClientRect().width * window.devicePixelRatio,
            servedPixels: await decode(el.currentSrc),
            filePixels: original
              ? await decode(original)
              : await decode(el.currentSrc),
          };
        });
        expect(info.alt.trim().length, info.src).toBeGreaterThan(10);
        // Never displayed wider (in CSS px) than the file's own width.
        expect(info.cssWidth, `${info.src} enlarged`).toBeLessThanOrEqual(
          info.filePixels + 1,
        );
        // The served file is sharp enough for the screen, unless the original is smaller.
        expect(
          info.servedPixels,
          `${info.src} too small`,
        ).toBeGreaterThanOrEqual(
          Math.min(info.shownPixels * 0.95, info.filePixels),
        );
      }
    });
  }
});

test.describe("runtime health", () => {
  for (const route of staticRoutes) {
    test(`${route}: no console errors or CSP violations`, async ({ page }) => {
      const problems: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") problems.push(msg.text());
      });
      page.on("pageerror", (error) => problems.push(error.message));
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      // Scroll so lazy images load and are checked too.
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForLoadState("networkidle");
      // The 404 page logs the expected 404 response for its own URL.
      const expected = route.includes("does-not-exist")
        ? problems.filter((p) => !p.includes("404"))
        : problems;
      expect(expected).toEqual([]);
    });
  }

  test("security headers are sent", async ({ request }) => {
    const headers = (await request.get("/")).headers();
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-powered-by"]).toBeUndefined();
  });
});
