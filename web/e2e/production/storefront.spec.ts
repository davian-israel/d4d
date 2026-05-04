import { test, expect } from "@playwright/test";
import { submitAddToCart } from "../helpers";

test.describe("Live site — storefront smoke", () => {
  test("home hero navigates to catalog", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("storefront-home-page")).toBeVisible();
    await page.getByTestId("hero-shop").click();
    await expect(page).toHaveURL(/\/catalog$/);
    await expect(page.getByTestId("storefront-catalog-page")).toBeVisible();
  });

  test("catalog → product PDP loads", async ({ page }) => {
    await page.goto("/catalog");
    const firstCard = page.getByTestId("product-card").first();
    await expect(firstCard).toBeVisible({ timeout: 30_000 });
    await firstCard.getByRole("link").first().click();
    await expect(page).toHaveURL(/\/product\//);
    await expect(page.getByTestId("add-to-cart")).toBeVisible();
  });

  test("featured page loads", async ({ page }) => {
    await page.goto("/featured");
    await expect(page.getByTestId("storefront-featured-page")).toBeVisible();
    await expect(page.getByRole("heading", { name: /curated batch/i })).toBeVisible();
  });

  test("contact form shows validation for invalid email", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByTestId("storefront-contact-page")).toBeVisible();
    await page.getByTestId("contact-name").fill("Live Smoke User");
    await page.getByTestId("contact-email").fill("not-an-email");
    await page.getByTestId("contact-message").fill("Hello from production smoke");
    await page.getByTestId("contact-submit").click();
    await expect(page.getByTestId("contact-email-error")).toBeVisible();
  });

  test("add to cart and open checkout UI (no purchase)", async ({ page }) => {
    await page.goto("/catalog");
    const firstCard = page.getByTestId("product-card").first();
    await expect(firstCard).toBeVisible({ timeout: 30_000 });
    await firstCard.getByRole("link").first().click();
    await expect(page).toHaveURL(/\/product\//);
    await submitAddToCart(page);

    await page.goto("/cart");
    await expect(page.getByTestId("checkout-link")).toBeVisible({ timeout: 25_000 });
    await page.getByTestId("checkout-link").click();

    await expect(page.getByTestId("checkout-form")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByTestId("checkout-email")).toBeVisible();
    // Production requires Square — do not submit; avoid thank-you / charges.
  });
});
