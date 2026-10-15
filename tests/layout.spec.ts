import { expect, test } from "@playwright/test";
import { staticRoutes } from "./routes";

// WCAG 1.4.10 Reflow: content must fit 320 CSS px without horizontal scrolling.
const widths = [320, 375];

for (const width of widths) {
  for (const route of staticRoutes) {
    test(`${route} has no horizontal overflow at ${width}px`, async ({
      page,
      isMobile,
    }) => {
      test.skip(!isMobile, "narrow-viewport check");
      await page.setViewportSize({ width, height: 800 });
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
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
