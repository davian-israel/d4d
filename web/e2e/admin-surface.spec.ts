import { test, expect } from "@playwright/test";
import { loginAsAdmin, submitAddToCart } from "./helpers";

// Admin shell + forms expect a comfortable width (config default is a narrow mobile viewport).
test.use({ viewport: { width: 1280, height: 900 } });

function nextActionOk(response: import("@playwright/test").Response): boolean {
  return (
    response.request().method() === "POST" &&
    Boolean(response.request().headerValue("next-action")) &&
    response.ok()
  );
}

test.describe("Admin categories", () => {
  test("create category shows Saved and appears in list", async ({ page }) => {
    const slug = `e2e-cat-${Date.now()}`;
    await loginAsAdmin(page);
    await page.goto("/admin/categories");

    await page.locator('input[name="name"]').fill(`E2E Category ${slug}`);
    await page.locator('input[name="slug"]').fill(slug);
    const savePost = page.waitForResponse((r) => nextActionOk(r), { timeout: 20_000 });
    await page.getByTestId("admin-category-submit").click();
    await savePost;

    await expect(page.getByText("Saved.")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(slug, { exact: true })).toBeVisible();
  });
});

test.describe("Admin featured", () => {
  test("add placement increases featured list", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/featured");

    const addForm = page.locator("form").filter({ has: page.locator('select[name="productId"]') });
    const placementList = addForm.locator("..").locator("> ul");

    const countBefore = await placementList.locator("> li").count();
    await addForm.locator('select[name="productId"]').selectOption({ index: 0 });
    await addForm.getByRole("button", { name: /add/i }).click();

    await expect(placementList.locator("> li")).toHaveCount(countBefore + 1, { timeout: 30_000 });
  });
});

test.describe("Admin sales", () => {
  test("sales table shows guest email after checkout", async ({ page }) => {
    await page.goto("/catalog");
    // Avoid the first catalog card: other specs often use `.first()` and deplete stock in parallel runs.
    const card = page.getByTestId("product-card").nth(5);
    await card.getByRole("link").first().click();
    await page.waitForURL(/\/product\/[^/]+/, { timeout: 15_000 });

    await submitAddToCart(page);
    await page.goto("/checkout");
    await expect(page.getByTestId("checkout-email")).toBeVisible({ timeout: 15_000 });
    await page.getByTestId("checkout-email").fill("guest-sales-e2e@example.com");
    const checkoutPost = page.waitForResponse((r) => nextActionOk(r), { timeout: 25_000 });
    await page.getByTestId("checkout-submit").click();
    await checkoutPost;
    await expect(page).toHaveURL(/\/thank-you|\/account\/orders/, { timeout: 25_000 });

    await loginAsAdmin(page);
    await page.goto("/admin/sales");
    await expect(page.getByRole("heading", { name: /sales management/i })).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "guest-sales-e2e@example.com", exact: true }).first(),
    ).toBeVisible({ timeout: 15_000 });
  });
});

test.describe("Admin API guard", () => {
  test("GET /api/admin/categories returns 401 without admin session", async ({ request }) => {
    const res = await request.get("/api/admin/categories");
    expect(res.status()).toBe(401);
  });
});
