import { test, expect } from "@playwright/test";
import { ADMIN_SHELL_DESTINATIONS } from "./admin-shell-destinations";
import { loginAsAdmin } from "./helpers";

/**
 * OpenSpec playwright-admin-login-all-pages: after credential login, every primary
 * admin URL loads with a stable landmark (complements shell-driven tests in admin-navigation.spec.ts).
 */
test.use({ viewport: { width: 1280, height: 900 } });

test("admin login can load every primary admin page", async ({ page }) => {
  await loginAsAdmin(page);
  await expect(page.getByTestId("admin-dashboard")).toBeVisible();

  for (const dest of ADMIN_SHELL_DESTINATIONS) {
    await page.goto(dest.href);
    await expect(page).toHaveURL(dest.path);
    await dest.assert(page);
  }
});
