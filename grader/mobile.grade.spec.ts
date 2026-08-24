import { expect, test } from "@playwright/test";

const transparentPixel = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

test.beforeEach(async ({ page }) => {
  await page.route("**/api/weather", async (route) => {
    await route.fulfill({
      body: JSON.stringify({
        observedAt: "2026-08-24T12:00",
        summary: "klart väder",
        temperature: 20,
      }),
      contentType: "application/json",
      status: 200,
    });
  });
  await page.route("https://images.unsplash.com/**", async (route) => {
    await route.fulfill({ body: transparentPixel, contentType: "image/png" });
  });
  await page.route("**/_next/image**", async (route) => {
    await route.fulfill({ body: transparentPixel, contentType: "image/png" });
  });
});

test("mobilvyn har ingen horisontell sidskroll", async ({ page }) => {
  await page.goto("/");

  const sizes = await page.evaluate(() => ({
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));

  expect(
    sizes.pageWidth,
    `Sidan är ${sizes.pageWidth}px bred i en ${sizes.viewportWidth}px viewport.`,
  ).toBeLessThanOrEqual(sizes.viewportWidth + 1);
});

test("sökning, filter och detaljsida fungerar på mobil", async ({ page }) => {
  await page.goto("/");

  const forceInteraction = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );

  const search = page.getByRole("searchbox", {
    name: "Sök efter event eller område",
  });
  await search.fill("Södermalm");

  await expect(
    page.getByRole("heading", { name: "Jazz under broarna" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Mat" })
    .click({ force: forceInteraction });
  await expect(page.locator(".event-card")).toHaveCount(1);

  await page
    .getByRole("link", { name: "Läs mer" })
    .click({ force: forceInteraction });
  await expect(page).toHaveURL(/\/events\/sodermalm-food-walk$/);
  await expect(
    page.getByRole("heading", { name: "Södermalm food walk" }),
  ).toBeVisible();
});
