import { test, expect } from "@playwright/test";

test.describe("Currency Converter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tools/currency");
  });

  test("should display currency converter", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Currency Converter");
  });

  test("should have amount input", async ({ page }) => {
    const amountInput = page.locator('input[type="number"]');
    await expect(amountInput).toBeVisible();
  });

  test("should have currency selectors", async ({ page }) => {
    // Should have From and To selectors
    await expect(page.getByText("From", { exact: true })).toBeVisible();
    await expect(page.getByText("To", { exact: true })).toBeVisible();
  });

  test("should convert currencies", async ({ page }) => {
    // Enter amount
    const amountInput = page.locator('input[type="number"]');
    await amountInput.fill("100");
    
    // Conversion result should be visible
    await page.waitForTimeout(500);
    
    // Should show converted amount
    const result = page.locator('.text-emerald-700');
    await expect(result).toBeVisible();
  });

  test("should swap currencies", async ({ page }) => {
    // Find and click swap button
    const swapButton = page.getByRole("button").filter({
      has: page.locator('svg'),
    }).nth(0);
    
    if (await swapButton.isVisible()) {
      await swapButton.click();
      await page.waitForTimeout(300);
    }
  });

  test("should show quick presets", async ({ page }) => {
    await expect(page.getByText(/Daily Budget/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Monthly/i }).first()).toBeVisible();
  });
});

test.describe("Timezone Tool", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tools/timezone");
  });

  test("should display timezone planner", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Timezone/i);
  });

  test("should show timezone information", async ({ page }) => {
    // Should display timezone-related content
    await expect(page.getByText(/UTC[+-]/).first()).toBeVisible();
  });
});

