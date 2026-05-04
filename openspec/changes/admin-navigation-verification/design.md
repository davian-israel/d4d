## Review checklist (admin + product management)

- **Overview (`/admin`)**: Dashboard metrics / entry; link out to storefront.
- **Categories (`/admin/categories`)**: List/add categories; client form wired to server actions.
- **Products (`/admin/products`)**: **Inventory table** (all products), **New product** form (`createProduct`), row **Edit** → **`/admin/products/[id]/edit`** (`updateProduct`, `deleteProduct`, unpublish).
- **Featured (`/admin/featured`)**: Merchandising order for hero/featured region.
- **Sales (`/admin/sales`)**: Read-oriented orders list/detail.
- **Auth**: Non-admin users redirected from `/admin/**` to login (existing middleware).

## Navigation behaviour

- **Desktop (`md+`)**: Fixed **aside** with **`data-testid="admin-nav"`** and `Link`s for each item; **active** item uses distinct surface classes derived from `usePathname()` (`/admin/products` active when path starts with `/admin/products`, including **edit**).
- **Mobile**: Aside hidden; **header** button **`aria-label="Open menu"`** toggles **drawer**; same `NavLinks` with `onNavigate` closing drawer after click.
- **Tests SHALL**: On **narrow viewport**, **open the menu** before clicking a nav label; on **wide viewport**, click links in **`admin-nav`** directly.

## Test strategy

- Reuse **`loginAsAdmin`** from **`e2e/helpers.ts`**.
- One **parameterized or table-driven** test listing `{ label, pathRegex, landmark }` for Overview, Categories, Products, Featured, Sales.
- **Products drill-in**: From **Products**, open **Edit** on a known seeded row (e.g. slug **`sacred-honey-elixir`**) and assert **`/admin/products/.+/edit`** and edit form **`data-testid="admin-product-edit-form"`** (or equivalent heading).
- **CI**: Same suite runs with **`workers: 1`** for admin DB-heavy flows if flakiness appears (optional tuning).

## Non-goals

- Pixel-perfect visual regression of the drawer animation.
- Load/performance testing of admin routes.
