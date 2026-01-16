import { test, expect } from "@playwright/test";

test.describe("City Detail Page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to a city page - Lisbon should always exist
    await page.goto("/cities/digital-nomad-guide-lisbon");
  });

  test("should display city name and country", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Lisbon");
    await expect(page.getByText("Portugal")).toBeVisible();
  });

  test("should display nomad score", async ({ page }) => {
    await expect(page.getByText(/Score:/)).toBeVisible();
  });

  test("should display cost breakdown", async ({ page }) => {
    await expect(page.getByText(/Accommodation/i)).toBeVisible();
    await expect(page.getByText(/Food/i)).toBeVisible();
  });

  test("should display internet speed", async ({ page }) => {
    await expect(page.getByText(/Mbps/)).toBeVisible();
  });

  test("should display safety information", async ({ page }) => {
    await expect(page.getByText(/Safety/i)).toBeVisible();
  });

  test("should display visa information", async ({ page }) => {
    await expect(page.getByText(/Visa/i)).toBeVisible();
  });

  test("should have navigation back to home", async ({ page }) => {
    const logoLink = page.getByRole("link", { name: /Nomad.*Point/i });
    await logoLink.click();
    await expect(page).toHaveURL("/");
  });

  test("should display related cities", async ({ page }) => {
    // Scroll to bottom to see related cities
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    // Should show some related/other cities
    const otherCityLinks = page.locator('[href^="/cities/"]').filter({
      hasNot: page.locator(':text("Lisbon")'),
    });
    
    const count = await otherCityLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

