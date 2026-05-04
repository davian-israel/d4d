import { expect, type Page } from "@playwright/test";

/** Mirrors primary links in `src/components/admin/admin-shell.tsx` (Overview … Sales). */
export interface AdminShellDestination {
  label: string;
  href: string;
  path: RegExp;
  assert: (page: Page) => Promise<void>;
}

export const ADMIN_SHELL_DESTINATIONS: readonly AdminShellDestination[] = [
  {
    label: "Overview",
    href: "/admin",
    path: /\/admin$/,
    assert: async (page) => {
      await expect(page.getByTestId("admin-dashboard")).toBeVisible();
    },
  },
  {
    label: "Categories",
    href: "/admin/categories",
    path: /\/admin\/categories$/,
    assert: async (page) => {
      await expect(page.getByRole("heading", { name: /category vault/i })).toBeVisible();
    },
  },
  {
    label: "Products",
    href: "/admin/products",
    path: /\/admin\/products$/,
    assert: async (page) => {
      await expect(page.getByRole("heading", { name: /product inventory/i })).toBeVisible();
    },
  },
  {
    label: "Featured",
    href: "/admin/featured",
    path: /\/admin\/featured$/,
    assert: async (page) => {
      await expect(page.getByRole("heading", { name: /manage featured/i })).toBeVisible();
    },
  },
  {
    label: "Sales",
    href: "/admin/sales",
    path: /\/admin\/sales$/,
    assert: async (page) => {
      await expect(page.getByRole("heading", { name: /sales management/i })).toBeVisible();
    },
  },
];
