import { test, expect } from "@playwright/test";

test.describe("City Detail Page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to a city page - Lisbon should always exist
    await page.goto("/cities/digital-nomad-guide-lisbon");
  });

  test("should display city name and country", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Lisbon");
    await expect(page.getByText(/Portugal\s*•\s*Europe/).first()).toBeVisible();
  });

  test("should display nomad score", async ({ page }) => {
    await expect(page.getByText("Nomad score", { exact: true })).toBeVisible();
  });

  test("should display cost breakdown", async ({ page }) => {
    const breakdown = page.getByRole("heading", { name: /Cost Breakdown/i }).locator("..");
    await expect(breakdown.getByText(/^accommodation$/i)).toBeVisible();
    await expect(breakdown.getByText(/^food$/i)).toBeVisible();
  });

  test("should display internet speed", async ({ page }) => {
    const quickStats = page.getByRole("heading", { name: "Quick Stats" }).locator("..").locator("..");
    await expect(quickStats.getByText("Internet Speed", { exact: true })).toBeVisible();
    await expect(quickStats.getByText(/Mbps/).first()).toBeVisible();
  });

  test("should display safety information", async ({ page }) => {
    const quickStats = page.getByRole("heading", { name: "Quick Stats" }).locator("..").locator("..");
    await expect(quickStats.getByText("Safety Score", { exact: true })).toBeVisible();
  });

  test("should display visa information", async ({ page }) => {
    const quickStats = page.getByRole("heading", { name: "Quick Stats" }).locator("..").locator("..");
    await expect(quickStats.getByText("Nomad Visa", { exact: true })).toBeVisible();
  });

  test("should have navigation back to home", async ({ page }) => {
    const logoLink = page.locator("header").getByRole("link", { name: /Nomad.*Pointe/i }).first();
    await logoLink.click();
    await expect(page).toHaveURL("/");
  });

  test("should display related cities", async ({ page }) => {
    // Scroll to bottom to see related cities
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    // Should show some related/other cities
    const similarSection = page
      .getByRole("heading", { name: "Similar Destinations" })
      .locator("..")
      .locator("..");

    const count = await similarSection.locator('a[href^="/cities/"]').count();
    expect(count).toBeGreaterThan(0);
  });
});

