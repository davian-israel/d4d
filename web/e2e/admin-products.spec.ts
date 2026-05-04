import { test, expect } from "@playwright/test";
import { loginAsAdmin, submitAddToCart } from "./helpers";

test.describe("Admin products", () => {
  test("admin sees product inventory table with seeded row", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/products");
    await expect(page).toHaveURL(/\/admin\/products/);
    await expect(page.getByTestId("admin-products-table")).toBeVisible();
    await expect(page.getByTestId("admin-product-row").first()).toBeVisible();
    await expect(page.getByText("Sacred Honey Elixir")).toBeVisible();
  });

  test("create product rejects invalid slug with field error", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/products");
    const form = page.getByTestId("admin-product-create-form");
    await form.locator('input[name="name"]').fill("Bad Slug Test");
    await form.locator('input[name="slug"]').fill("Invalid UpperCase");
    await form.locator('textarea[name="description"]').fill("Desc");
    await form.locator('input[name="priceCents"]').fill("1999");
    await form.locator('input[name="stockQuantity"]').fill("10");
    await form.locator('select[name="categoryId"]').selectOption({ index: 1 });
    await form.getByTestId("admin-product-create-submit").click();
    await expect(page.getByTestId("admin-product-create-error-slug")).toBeVisible({ timeout: 15_000 });
  });

  test("create, edit name, unpublish from catalog, delete", async ({ page }) => {
    const slug = `e2e-admin-prod-${Date.now()}`;
    const name = "E2E Admin Product";

    await loginAsAdmin(page);
    await page.goto("/admin/products");

    const form = page.getByTestId("admin-product-create-form");
    await form.locator('input[name="name"]').fill(name);
    await form.locator('input[name="slug"]').fill(slug);
    await form.locator('textarea[name="description"]').fill("Created by Playwright.");
    await form.locator('input[name="priceCents"]').fill("1500");
    await form.locator('input[name="stockQuantity"]').fill("5");
    await form.locator('select[name="categoryId"]').selectOption({ index: 1 });

    const createPost = page.waitForResponse(
      (r) =>
        r.request().method() === "POST" &&
        Boolean(r.request().headerValue("next-action")) &&
        r.ok(),
      { timeout: 20_000 },
    );
    await form.getByTestId("admin-product-create-submit").click();
    await createPost;
    await expect(page.getByTestId("admin-product-create-success")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("admin-products-table").getByText(name)).toBeVisible();

    await page.goto("/catalog");
    await expect(page.getByText(name)).toBeVisible();

    const editLink = page
      .getByTestId("admin-product-row")
      .filter({ hasText: name })
      .getByTestId("admin-product-edit");
    await page.goto("/admin/products");
    await editLink.click();

    await expect(page).toHaveURL(/\/admin\/products\/[^/]+\/edit/);
    const editForm = page.getByTestId("admin-product-edit-form");
    await editForm.locator('input[name="name"]').fill(`${name} Updated`);
    const savePost = page.waitForResponse(
      (r) =>
        r.request().method() === "POST" &&
        Boolean(r.request().headerValue("next-action")) &&
        r.ok(),
      { timeout: 20_000 },
    );
    await editForm.getByTestId("admin-product-update-submit").click();
    await savePost;
    await expect(page.getByTestId("admin-product-update-success")).toBeVisible({ timeout: 15_000 });

    await page.goto("/admin/products");
    await expect(page.getByTestId("admin-products-table").getByText(`${name} Updated`)).toBeVisible();

    await page
      .getByTestId("admin-product-row")
      .filter({ hasText: `${name} Updated` })
      .getByTestId("admin-product-edit")
      .click();
    await page.getByTestId("admin-product-edit-form").getByRole("checkbox", { name: /published/i }).uncheck();
    const unpublishPost = page.waitForResponse(
      (r) =>
        r.request().method() === "POST" &&
        Boolean(r.request().headerValue("next-action")) &&
        r.ok(),
      { timeout: 20_000 },
    );
    await page.getByTestId("admin-product-update-submit").click();
    await unpublishPost;

    await page.goto("/catalog");
    await expect(page.getByText(`${name} Updated`)).toHaveCount(0);

    await page.goto("/admin/products");
    await page
      .getByTestId("admin-product-row")
      .filter({ hasText: `${name} Updated` })
      .getByTestId("admin-product-edit")
      .click();

    await Promise.all([
      page.waitForURL(/\/admin\/products$/, { timeout: 25_000 }),
      page.getByTestId("admin-product-delete-submit").click(),
    ]);
    await expect(page.getByTestId("admin-products-table").getByText(`${name} Updated`)).toHaveCount(0);
  });

  test("delete is blocked when product has order history", async ({ page }) => {
    await loginAsAdmin(page);

    await page.goto("/catalog");
    const first = page.getByTestId("product-card").first();
    await first.getByRole("link").first().click();
    await page.waitForURL(/\/product\/[^/]+/, { timeout: 15_000 });
    const slugMatch = page.url().match(/\/product\/([^/?]+)/);
    expect(slugMatch).toBeTruthy();
    const slug = slugMatch![1];

    await submitAddToCart(page);
    await page.goto("/checkout");
    await expect(page.getByTestId("checkout-email")).toBeVisible({ timeout: 15_000 });
    await page.getByTestId("checkout-email").fill("guest@example.com");
    const checkoutPost = page.waitForResponse(
      (r) =>
        r.request().method() === "POST" &&
        Boolean(r.request().headerValue("next-action")) &&
        r.ok(),
      { timeout: 25_000 },
    );
    await page.getByTestId("checkout-submit").click();
    await checkoutPost;
    await expect(page).toHaveURL(/\/thank-you|\/account\/orders/, { timeout: 25_000 });

    await page.goto("/admin/products");
    const row = page.getByTestId("admin-product-row").filter({ hasText: slug });
    await row.getByTestId("admin-product-edit").click();

    const deletePost = page.waitForResponse(
      (r) =>
        r.request().method() === "POST" &&
        Boolean(r.request().headerValue("next-action")) &&
        r.ok(),
      { timeout: 20_000 },
    );
    await page.getByTestId("admin-product-delete-submit").click();
    await deletePost;
    await expect(page.getByTestId("admin-product-delete-error")).toBeVisible({ timeout: 10_000 });
  });
});
