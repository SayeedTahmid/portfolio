import { expect, test } from "@playwright/test";
import { staticRoutes } from "./routes";

/**
 * No horizontal overflow (WCAG 1.4.10 Reflow) at narrow phone, standard phone,
 * tablet, laptop and wide-desktop widths.
 */
const widthsByProject: Record<string, number[]> = {
  mobile: [320, 375],
  desktop: [768, 1024, 1280, 1600],
};

for (const route of staticRoutes) {
  test(`${route} has no horizontal overflow at any tested width`, async ({
    page,
  }, testInfo) => {
    const widths = widthsByProject[testInfo.project.name] ?? [];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(0);
    }
  });
}

test("mobile menu fits within the viewport", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu only");
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  const box = await page.locator("#site-menu").boundingBox();
  if (!box) throw new Error("menu is not rendered");
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(320);
});
