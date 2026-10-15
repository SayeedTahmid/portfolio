import { expect, test } from "@playwright/test";

test.describe("homepage", () => {
  test("has one h1 and the expected sections in order", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    const sections = page.locator("main section[aria-labelledby]");
    const labels = await sections.evaluateAll((nodes) =>
      nodes.map((n) => {
        const id = n.getAttribute("aria-labelledby") ?? "";
        return document.getElementById(id)?.textContent?.trim() ?? "";
      }),
    );
    expect(labels).toEqual([
      "Building useful software. Exploring intelligent systems.",
      "Selected projects",
      "Technical strengths",
      "About me",
      "Get in touch",
    ]);
  });

  test("featured cards each open a case study", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator(
      'section[aria-labelledby="featured-heading"] article',
    );
    await expect(cards).toHaveCount(4);
    const hrefs = await cards
      .locator("h3 a")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
    for (const href of hrefs) expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/);
  });

  test("every link on the page has a real destination", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((links) => [
        ...new Set(links.map((a) => a.getAttribute("href") ?? "")),
      ]);
    for (const href of hrefs) {
      expect(href, "empty or placeholder link").not.toMatch(
        /^(#?$|javascript:)/,
      );
      if (href.startsWith("/") && !href.startsWith("/#")) {
        const response = await request.get(href);
        expect(response.status(), href).toBe(200);
      }
    }
  });

  test("every image has meaningful alt text", async ({ page }) => {
    await page.goto("/");
    const alts = await page
      .locator("main img")
      .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("alt")));
    expect(alts.length).toBeGreaterThan(0);
    for (const alt of alts) expect(alt?.trim().length ?? 0).toBeGreaterThan(10);
  });

  test("Contact in the header jumps to the contact section", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("navigation", { name: "Main" })
      .locator("visible=true")
      .getByRole("link", { name: "Contact" })
      .click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(
      page.getByRole("heading", { name: "Get in touch" }),
    ).toBeInViewport();
  });
});
