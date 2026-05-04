import { test, expect } from "@playwright/test";
import { submitAddToCart } from "./helpers";

test.describe("Storefront", () => {
  test("home links to catalog", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("hero-shop").click();
    await expect(page).toHaveURL(/\/catalog$/);
  });

  test("browse product and add to cart", async ({ page }) => {
    await page.goto("/catalog");
    const firstCard = page.getByTestId("product-card").first();
    await expect(firstCard).toBeVisible();
    await firstCard.getByRole("link").click();
    await expect(page).toHaveURL(/\/product\//);
    await submitAddToCart(page);
    await page.goto("/cart");
    await expect(page.getByTestId("checkout-link")).toBeVisible({ timeout: 15_000 });
  });

  test("catalog grid add to cart shows quantity badge", async ({ page }) => {
    await page.goto("/catalog");
    const card = page.getByTestId("product-card").first();
    await expect(card).toBeVisible();
    const responsePromise = page.waitForResponse(
      (r) =>
        r.request().method() === "POST" &&
        Boolean(r.request().headerValue("next-action")) &&
        r.ok(),
      { timeout: 20_000 },
    );
    await card.getByTestId("add-to-cart").click();
    await responsePromise;
    await expect(card.getByTestId("catalog-cart-qty-badge")).toHaveText("1", { timeout: 15_000 });
  });

  test("contact form shows validation for invalid email", async ({ page }) => {
    await page.goto("/contact");
    await page.getByTestId("contact-name").fill("Test User");
    await page.getByTestId("contact-email").fill("not-an-email");
    await page.getByTestId("contact-message").fill("Hello");
    await page.getByTestId("contact-submit").click();
    await expect(page.getByTestId("contact-email-error")).toBeVisible();
  });
});

test.describe("Admin", () => {
  test("admin can sign in and see dashboard", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login/);
    await page.getByTestId("login-email").fill("admin@destiny4divine.test");
    await page.getByTestId("login-password").fill("Admin12345!");
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("admin-dashboard")).toBeVisible();
  });
});

test.describe("Checkout (mock payments)", () => {
  test("completes mock checkout from cart", async ({ page }) => {
    await page.goto("/catalog");
    await page.getByTestId("product-card").first().getByRole("link").click();
    await expect(page).toHaveURL(/\/product\//);
    await submitAddToCart(page);
    await page.goto("/checkout");
    await expect(page.getByTestId("checkout-email")).toBeVisible({ timeout: 15_000 });
    await page.getByTestId("checkout-email").fill("guest@example.com");
    await page.getByTestId("checkout-submit").click();
    await expect(page).toHaveURL(/\/thank-you/, { timeout: 20_000 });
  });
});
