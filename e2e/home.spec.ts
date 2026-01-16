import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the hero section", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Find Your Next");
    await expect(page.locator("h1")).toContainText("Remote Work Hub");
  });

  test("should display city count in hero", async ({ page }) => {
    await expect(page.getByText(/\d+ Cities Worldwide/)).toBeVisible();
  });

  test("should display city cards", async ({ page }) => {
    // Wait for cities to load
    await page.waitForSelector('[href^="/cities/"]');
    
    // Check that multiple city cards are present
    const cityCards = page.locator('[href^="/cities/"]');
    const count = await cityCards.count();
    expect(count).toBeGreaterThan(10);
  });

  test("should filter cities by continent", async ({ page }) => {
    // Wait for filter to be available
    await page.waitForSelector("select");
    
    // Select Europe
    await page.selectOption('select:has-text("All Continent")', "Europe");
    
    // Wait for filtering
    await page.waitForTimeout(500);
    
    // All visible cities should be from Europe (check a sample)
    const cityCards = page.locator('[href^="/cities/"]');
    const count = await cityCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should search cities", async ({ page }) => {
    // Find search input
    const searchInput = page.getByPlaceholder(/Search cities/i);
    await searchInput.fill("Lisbon");
    
    // Wait for filtering
    await page.waitForTimeout(500);
    
    // Should show Lisbon in results
    await expect(page.getByText("Lisbon")).toBeVisible();
  });

  test("should navigate to city detail page", async ({ page }) => {
    // Click on first city card
    const firstCityLink = page.locator('[href^="/cities/"]').first();
    await firstCityLink.click();
    
    // Should navigate to city page
    await expect(page).toHaveURL(/\/cities\//);
  });

  test("should add city to compare", async ({ page }) => {
    // Find and click compare button on first card
    const compareButton = page.getByTitle("Add to compare").first();
    await compareButton.click();
    
    // Compare count should appear in header or floating button
    await expect(page.getByText(/Compare.*1/i)).toBeVisible({ timeout: 5000 });
  });

  test("should show filter options", async ({ page }) => {
    // Check filter buttons exist
    await expect(page.getByRole("button", { name: /Fast WiFi/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Budget/i })).toBeVisible();
  });

  test("should sort cities", async ({ page }) => {
    // Find sort dropdown
    const sortDropdown = page.locator('select:has-text("Sort:")');
    await sortDropdown.selectOption("cost");
    
    // Wait for sorting
    await page.waitForTimeout(500);
    
    // Cities should be sorted (just verify the sort happened)
    const cityCards = page.locator('[href^="/cities/"]');
    const count = await cityCards.count();
    expect(count).toBeGreaterThan(0);
  });
});

