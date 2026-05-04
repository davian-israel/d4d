import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers";

/**
 * Covers OpenSpec admin-navigation-verification: shell menu drives routing
 * (desktop sidebar + mobile drawer), not only direct URL loads.
 */
const destinations = [
  {
    label: "Overview",
    path: /\/admin$/,
    assert: async (page: import("@playwright/test").Page) => {
      await expect(page.getByTestId("admin-dashboard")).toBeVisible();
    },
  },
  {
    label: "Categories",
    path: /\/admin\/categories$/,
    assert: async (page: import("@playwright/test").Page) => {
      await expect(page.getByRole("heading", { name: /category vault/i })).toBeVisible();
    },
  },
  {
    label: "Products",
    path: /\/admin\/products$/,
    assert: async (page: import("@playwright/test").Page) => {
      await expect(page.getByRole("heading", { name: /product inventory/i })).toBeVisible();
    },
  },
  {
    label: "Featured",
    path: /\/admin\/featured$/,
    assert: async (page: import("@playwright/test").Page) => {
      await expect(page.getByRole("heading", { name: /manage featured/i })).toBeVisible();
    },
  },
  {
    label: "Sales",
    path: /\/admin\/sales$/,
    assert: async (page: import("@playwright/test").Page) => {
      await expect(page.getByRole("heading", { name: /sales management/i })).toBeVisible();
    },
  },
] as const;

async function clickAdminNavLink(
  page: import("@playwright/test").Page,
  layout: "mobile" | "desktop",
  label: string,
) {
  if (layout === "mobile") {
    await page.getByTestId("admin-mobile-menu-button").click();
    await page.getByTestId("admin-nav-drawer").getByRole("link", { name: label }).click();
  } else {
    await page.getByTestId("admin-nav").getByRole("link", { name: label }).click();
  }
}

for (const layout of ["mobile", "desktop"] as const) {
  test.describe(`Admin shell navigation (${layout})`, () => {
    test.use(
      layout === "mobile"
        ? { viewport: { width: 390, height: 844 } }
        : { viewport: { width: 1280, height: 900 } },
    );

    test("every primary nav item lands on the correct page", async ({ page }) => {
      await loginAsAdmin(page);
      await expect(page.getByTestId("admin-dashboard")).toBeVisible();

      for (const dest of destinations) {
        await clickAdminNavLink(page, layout, dest.label);
        await expect(page).toHaveURL(dest.path);
        await dest.assert(page);
      }
    });

    test("Products → Edit reaches edit form (seeded sacred-honey-elixir)", async ({ page }) => {
      await loginAsAdmin(page);
      await clickAdminNavLink(page, layout, "Products");
      await expect(page).toHaveURL(/\/admin\/products$/);

      await page
        .getByTestId("admin-product-row")
        .filter({ hasText: "sacred-honey-elixir" })
        .getByTestId("admin-product-edit")
        .click();

      await expect(page).toHaveURL(/\/admin\/products\/[^/]+\/edit$/);
      await expect(page.getByTestId("admin-product-edit-form")).toBeVisible({ timeout: 15_000 });
    });
  });
}
