import { expect, test } from "@playwright/test";
import { projects } from "../content/projects.ts";

test.describe("case studies", () => {
  for (const project of projects) {
    test(`${project.slug} renders its title, core sections and metadata`, async ({
      page,
    }) => {
      const response = await page.goto(`/projects/${project.slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(project.title);
      await expect(page).toHaveTitle(new RegExp(`^${project.title}`));
      for (const heading of [
        "Overview",
        "Technologies used",
        "Links and sources",
      ]) {
        await expect(
          page.getByRole("heading", { level: 2, name: heading }),
        ).toBeVisible();
      }
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(canonical).toMatch(new RegExp(`/projects/${project.slug}$`));
    });
  }

  test("the complete example shows all twelve sections in order", async ({
    page,
  }) => {
    await page.goto("/projects/crowd-action-detection");
    const headings = await page
      .locator("article section > h2")
      .allTextContents();
    expect(headings).toEqual([
      "Overview",
      "Problem and motivation",
      "My role and contributions",
      "Requirements and constraints",
      "Architecture and technical design",
      "Implementation details",
      "Technologies used",
      "Challenges and engineering decisions",
      "Results and evaluation",
      "Limitations and future improvements",
      "Screenshots and figures",
      "Links and sources",
    ]);
  });

  test("sections without verified content are hidden", async ({ page }) => {
    await page.goto("/projects/pediatric-brain-tumor-segmentation");
    for (const hidden of [
      "Results and evaluation",
      "Architecture and technical design",
      "Screenshots and figures",
    ]) {
      await expect(page.getByRole("heading", { name: hidden })).toHaveCount(0);
    }
    await expect(page.getByText("The code is private")).toBeVisible();
  });

  test("every metric states which data it was measured on", async ({
    page,
  }) => {
    await page.goto("/projects/crowd-action-detection");
    const metrics = page.locator("#results ~ div dl > div");
    await expect(metrics).toHaveCount(3);
    await expect(metrics.nth(0)).toContainText("Held-out test set");
    await expect(metrics.nth(2)).toContainText("Validation set");
  });

  test("figures load at their real aspect ratio", async ({ page }) => {
    await page.goto("/projects/crowd-action-detection");
    const images = page.locator("main img");
    const count = await images.count();
    expect(count).toBeGreaterThan(1);
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
        .toBeGreaterThan(0);
      const ratios = await img.evaluate((el: HTMLImageElement) => {
        const box = el.getBoundingClientRect();
        return {
          shown: box.width / box.height,
          natural: el.naturalWidth / el.naturalHeight,
        };
      });
      expect(Math.abs(ratios.shown - ratios.natural)).toBeLessThan(0.02);
    }
  });

  test("previous and next links lead to other case studies", async ({
    page,
  }) => {
    await page.goto("/projects/crowd-action-detection");
    const pager = page.getByRole("navigation", { name: "More projects" });
    const hrefs = await pager
      .locator("a")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
    expect(hrefs).toHaveLength(2);
    for (const href of hrefs) {
      expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/);
      expect(href).not.toBe("/projects/crowd-action-detection");
    }
  });

  test("an unknown project returns 404", async ({ request }) => {
    const response = await request.get("/projects/does-not-exist");
    expect(response.status()).toBe(404);
  });
});
