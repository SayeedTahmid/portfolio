import { expect, test } from "@playwright/test";
import { projects } from "../content/projects.ts";

const pages = [
  "/",
  "/projects",
  "/about",
  ...projects.map((p) => `/projects/${p.slug}`),
];

test.describe("metadata", () => {
  test("every page has its own title, description, canonical and share card", async ({
    page,
    request,
  }) => {
    const titles = new Set<string>();
    for (const path of pages) {
      await page.goto(path);
      const meta = (selector: string) =>
        page.locator(selector).first().getAttribute("content");

      const title = await page.title();
      expect(titles.has(title), `duplicate title on ${path}`).toBe(false);
      titles.add(title);

      expect((await meta('meta[name="description"]'))?.length).toBeGreaterThan(
        40,
      );

      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      const expectedPath = path === "/" ? "" : path;
      expect(canonical, path).toMatch(
        new RegExp(`^https?://[^/]+${expectedPath}/?$`),
      );
      expect(await meta('meta[property="og:url"]'), path).toBe(canonical);

      const ogTitle = await meta('meta[property="og:title"]');
      expect(await meta('meta[name="twitter:title"]'), path).toBe(ogTitle);

      const ogImage = await meta('meta[property="og:image"]');
      expect(ogImage, path).toBeTruthy();
      const image = await request.get(new URL(ogImage ?? "").pathname);
      expect(image.status(), ogImage ?? "").toBe(200);
      expect(image.headers()["content-type"]).toBe("image/png");
    }
  });

  test("sitemap lists every page", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const path of pages) {
      expect(xml).toContain(`${path === "/" ? "" : path}</loc>`);
    }
    expect(xml.match(/<loc>/g)).toHaveLength(pages.length);
  });

  test("robots.txt and icons are served", async ({ request }) => {
    expect((await request.get("/robots.txt")).status()).toBe(200);
    expect((await request.get("/icon.svg")).status()).toBe(200);
    expect((await request.get("/apple-icon")).status()).toBe(200);
  });

  test("the homepage has a valid Person JSON-LD record", async ({ page }) => {
    await page.goto("/");
    const raw = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const data = JSON.parse(raw ?? "{}") as Record<string, unknown>;
    expect(data["@type"]).toBe("Person");
    expect(data["name"]).toBe("Syed Tahmid Manzoor");
  });
});
