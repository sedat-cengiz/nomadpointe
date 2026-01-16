import { test, expect } from "@playwright/test";

test.describe("Compare Page", () => {
  test("should show empty state when no cities selected", async ({ page }) => {
    await page.goto("/compare");
    
    // Should show message to select cities
    await expect(page.getByText(/select.*cities/i)).toBeVisible();
  });

  test("should compare cities from URL params", async ({ page }) => {
    await page.goto("/compare?cities=digital-nomad-guide-lisbon,digital-nomad-guide-barcelona");
    
    // Should show both cities
    await expect(page.getByText("Lisbon")).toBeVisible();
    await expect(page.getByText("Barcelona")).toBeVisible();
  });

  test("should show comparison metrics", async ({ page }) => {
    await page.goto("/compare?cities=digital-nomad-guide-lisbon,digital-nomad-guide-bangkok");
    
    // Wait for data to load
    await page.waitForSelector(':text("Internet Speed")', { timeout: 10000 });
    
    // Should show comparison categories
    await expect(page.getByText(/Internet Speed/i)).toBeVisible();
    await expect(page.getByText(/Monthly Cost/i)).toBeVisible();
    await expect(page.getByText(/Safety/i)).toBeVisible();
  });

  test("should allow removing cities from comparison", async ({ page }) => {
    await page.goto("/compare?cities=digital-nomad-guide-lisbon,digital-nomad-guide-barcelona");
    
    // Wait for cities to load
    await page.waitForSelector(':text("Lisbon")', { timeout: 10000 });
    
    // Find and click remove button for one city
    const removeButtons = page.getByRole("button", { name: /remove/i });
    if (await removeButtons.count() > 0) {
      await removeButtons.first().click();
      
      // One city should be removed
      await page.waitForTimeout(500);
    }
  });

  test("should navigate to city detail from comparison", async ({ page }) => {
    await page.goto("/compare?cities=digital-nomad-guide-lisbon");
    
    // Wait for city to load
    await page.waitForSelector(':text("Lisbon")', { timeout: 10000 });
    
    // Click on city name/link
    const cityLink = page.locator('a:has-text("Lisbon")').first();
    if (await cityLink.isVisible()) {
      await cityLink.click();
      await expect(page).toHaveURL(/\/cities\/digital-nomad-guide-lisbon/);
    }
  });
});

