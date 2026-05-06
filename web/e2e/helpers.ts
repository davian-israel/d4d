import { expect, type Page, type Response } from "@playwright/test";

function nextActionPost(response: Response): boolean {
  return (
    response.request().method() === "POST" &&
    Boolean(response.request().headerValue("next-action")) &&
    response.ok()
  );
}

/** Waits for Next.js Server Action POST to finish so navigation does not abort the request. */
export async function submitAddToCart(page: Page): Promise<void> {
  const responsePromise = page.waitForResponse(nextActionPost, { timeout: 20_000 });
  const onPdp = /\/product\//.test(page.url());
  const button = onPdp
    ? page.getByTestId("add-to-cart")
    : page.getByTestId("product-card").first().getByTestId("add-to-cart");
  await button.click();
  await responsePromise;
}

export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login/);
  await page.getByTestId("login-email").fill("admin@destiny4divine.test");
  await page.getByTestId("login-password").fill("Admin123456!");
  await page.getByTestId("login-submit").click();
  await expect(page.getByTestId("admin-dashboard")).toBeVisible({ timeout: 15_000 });
}

export async function loginAsCustomer(page: Page): Promise<void> {
  await page.goto("/login");
  await page.getByTestId("login-email").fill("customer@destiny4divine.test");
  await page.getByTestId("login-password").fill("Customer112345!");
  await page.getByTestId("login-submit").click();
  await expect(page.getByTestId("storefront-account-page")).toBeVisible({ timeout: 15_000 });
}

