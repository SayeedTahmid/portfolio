import { expect, test } from "@playwright/test";

test.describe("skip link", () => {
  test("is the first tab stop and moves focus to the main content", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
  });
});

test.describe("theme", () => {
  test("applies the stored theme before the page becomes interactive (no flash)", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem("theme", "dark");
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "interactive") {
          (
            window as unknown as { themeAtInteractive?: string | undefined }
          ).themeAtInteractive = document.documentElement.dataset["theme"];
        }
      });
    });
    await page.goto("/");
    const themeAtInteractive = await page.evaluate(
      () =>
        (window as unknown as { themeAtInteractive?: string | undefined })
          .themeAtInteractive,
    );
    expect(themeAtInteractive).toBe("dark");
  });

  test("follows the OS setting while set to System", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme-preference", "system");
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.emulateMedia({ colorScheme: "light" });
    await expect(html).toHaveAttribute("data-theme", "light");
  });

  test("a chosen theme persists across reloads", async ({ page, isMobile }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
    // Click the visible icon label, as a person would; the radio input itself is visually hidden.
    await page
      .locator('label[title="Dark theme"]')
      .locator("visible=true")
      .click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(
      page.getByRole("radio", { name: "Dark" }).locator("visible=true"),
    ).toBeChecked();

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme-preference",
      "dark",
    );
  });
});

test.describe("navigation", () => {
  test("marks the current page", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop nav only");
    await page.goto("/projects");
    const nav = page
      .getByRole("navigation", { name: "Main" })
      .locator("visible=true");
    await expect(nav.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(nav.getByRole("link", { name: "About" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  test("mobile menu opens, closes on Escape, and closes after navigating", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "mobile menu only");
    await page.goto("/");
    const menu = page.locator("#site-menu");
    const toggle = page.getByRole("button", { name: "Menu" });

    await toggle.click();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();

    await toggle.click();
    await menu.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(menu).toBeHidden();
    await expect(
      page.getByRole("heading", { level: 1, name: "About" }),
    ).toBeVisible();
  });
});
