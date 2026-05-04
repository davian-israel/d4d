import { test, expect } from "@playwright/test";
import { getProdAdminCredentials } from "./credentials";
import { loginProdAdminToDashboard } from "./auth-helpers";

test.describe("Live site — admin", () => {
  test("signs in and reaches dashboard", async ({ page }) => {
    const creds = getProdAdminCredentials();
    test.skip(!creds, "Set PLAYWRIGHT_PROD_ADMIN_PASSWORD to run admin live tests");

    await loginProdAdminToDashboard(page, creds!.email, creds!.password);
  });

  test("shell navigation opens Products from menu", async ({ page }) => {
    const creds = getProdAdminCredentials();
    test.skip(!creds, "Set PLAYWRIGHT_PROD_ADMIN_PASSWORD to run admin live tests");

    await loginProdAdminToDashboard(page, creds!.email, creds!.password);

    await page.getByTestId("admin-nav").getByRole("link", { name: "Products" }).click();
    await expect(page).toHaveURL(/\/admin\/products$/);
    await expect(page.getByRole("heading", { name: /product inventory/i })).toBeVisible();
  });
});
