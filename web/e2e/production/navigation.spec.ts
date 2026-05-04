import { test, expect } from "@playwright/test";

const primaryNavGuest = [
  { id: "home", path: /\/$/, landmark: "storefront-home-page" },
  { id: "catalog", path: /\/catalog$/, landmark: "storefront-catalog-page" },
  { id: "featured", path: /\/featured$/, landmark: "storefront-featured-page" },
  { id: "contact", path: /\/contact$/, landmark: "storefront-contact-page" },
  { id: "sign-in", path: /\/login/, landmark: "storefront-login-page" },
  {
    id: "account",
    path: /\/login/,
    landmark: "storefront-login-page",
  },
] as const;

function storefrontNavLink(page: import("@playwright/test").Page, layout: "mobile" | "desktop", id: string) {
  const tid = `storefront-nav-link-${id}`;
  if (layout === "mobile") {
    return page.getByTestId("storefront-nav-drawer").getByTestId(tid);
  }
  return page.getByTestId("storefront-nav-desktop").getByTestId(tid);
}

async function clickStorefrontNav(
  page: import("@playwright/test").Page,
  layout: "mobile" | "desktop",
  id: string,
) {
  if (layout === "mobile") {
    await page.getByTestId("storefront-mobile-menu-button").click();
  }
  await storefrontNavLink(page, layout, id).click();
}

for (const layout of ["mobile", "desktop"] as const) {
  test.describe(`Live site — main navigation (${layout})`, () => {
    test.use(
      layout === "mobile"
        ? { viewport: { width: 390, height: 844 } }
        : { viewport: { width: 1280, height: 900 } },
    );

    test("primary header nav reaches each destination (guest)", async ({ page }) => {
      for (const dest of primaryNavGuest) {
        await page.goto("/");
        await expect(page.getByTestId("storefront-home-page")).toBeVisible({ timeout: 30_000 });
        await clickStorefrontNav(page, layout, dest.id);
        await expect(page).toHaveURL(dest.path);
        await expect(page.getByTestId(dest.landmark)).toBeVisible({ timeout: 30_000 });
      }
    });
  });
}
