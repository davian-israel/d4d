import { test, expect } from "@playwright/test";
import { getProdCustomerCredentials } from "./credentials";

test.describe("Live site — customer", () => {
  test("signs in and sees account profile", async ({ page }) => {
    const creds = getProdCustomerCredentials();
    test.skip(
      !creds,
      "Set PLAYWRIGHT_PROD_CUSTOMER_EMAIL and PLAYWRIGHT_PROD_CUSTOMER_PASSWORD (production customer seed) to run this test",
    );

    await page.goto("/login");
    await page.getByTestId("login-email").fill(creds!.email);
    await page.getByTestId("login-password").fill(creds!.password);
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("storefront-account-page")).toBeVisible({ timeout: 30_000 });
  });
});
