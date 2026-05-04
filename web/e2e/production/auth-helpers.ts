import { expect, type Page } from "@playwright/test";

/**
 * Production admin login: full navigation to /admin (not client redirect only).
 * Surfaces credential/DB mismatch with login-error or timeout message.
 */
export async function loginProdAdminToDashboard(page: Page, email: string, password: string): Promise<void> {
  await page.goto("/login?callbackUrl=%2Fadmin");
  await expect(page.getByTestId("storefront-login-page")).toBeVisible({ timeout: 30_000 });
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);

  await page.getByTestId("login-submit").click();

  const loginError = page.getByTestId("login-error");
  try {
    await page.waitForURL(/\/admin(\/)?$/, { timeout: 60_000 });
  } catch {
    if (await loginError.isVisible().catch(() => false)) {
      throw new Error(
        `Admin login rejected (${await loginError.textContent()}). ` +
          `Confirm PLAYWRIGHT_PROD_ADMIN_PASSWORD matches the user in the database used by this deployment ` +
          `(run production seed against the same DATABASE_URL as Vercel).`,
      );
    }
    throw new Error(`Timed out waiting for /admin after login; still on ${page.url()}`);
  }

  await expect(page.getByTestId("admin-dashboard")).toBeVisible({ timeout: 30_000 });
}
