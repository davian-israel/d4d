import { test, expect } from "@playwright/test";
import { submitAddToCart } from "./helpers";

/** Covers OpenSpec §6.2: route landmarks at mobile + desktop (proxy for side-by-side HTML review). */
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

const seededProductSlug = "sacred-honey-elixir";

for (const vp of viewports) {
  test.describe(`Storefront landmarks (${vp.name})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("home", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByTestId("hero-shop")).toBeVisible();
    });

    test("featured", async ({ page }) => {
      await page.goto("/featured");
      await expect(page.getByRole("heading", { name: /curated batch/i })).toBeVisible();
    });

    test("catalog", async ({ page }) => {
      await page.goto("/catalog");
      await expect(page.getByTestId("product-card").first()).toBeVisible();
    });

    test("product detail", async ({ page }) => {
      await page.goto(`/product/${seededProductSlug}`);
      await expect(page.getByTestId("add-to-cart")).toBeVisible();
    });

    test("contact", async ({ page }) => {
      await page.goto("/contact");
      await expect(page.getByTestId("contact-form")).toBeVisible();
    });

    test("cart", async ({ page }) => {
      await page.goto("/cart");
      await expect(page.getByRole("heading", { name: /curated journey/i })).toBeVisible();
    });

    test("checkout (with line items)", async ({ page }) => {
      await page.goto("/catalog");
      await page.getByTestId("product-card").first().getByRole("link").click();
      await expect(page).toHaveURL(/\/product\//);
      await submitAddToCart(page);
      await page.goto("/checkout");
      await expect(page.getByTestId("checkout-form")).toBeVisible({ timeout: 15_000 });
      await expect(page.getByRole("heading", { name: /order summary/i })).toBeVisible();
    });
  });
}

test.describe("Admin landmarks (desktop)", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("dashboard, categories, products, featured, sales", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login/);
    await page.getByTestId("login-email").fill("admin@destiny4divine.test");
    await page.getByTestId("login-password").fill("Admin12345!");
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("admin-dashboard")).toBeVisible();

    await page.goto("/admin/categories");
    await expect(page.getByRole("heading", { name: /category vault/i })).toBeVisible();

    await page.goto("/admin/products");
    await expect(page.getByRole("heading", { name: /product inventory/i })).toBeVisible();

    await page.goto("/admin/featured");
    await expect(page.getByRole("heading", { name: /manage featured/i })).toBeVisible();

    await page.goto("/admin/sales");
    await expect(page.getByRole("heading", { name: /sales management/i })).toBeVisible();
  });
});
