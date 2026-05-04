## Why

The **Admin Console** exposes **Overview**, **Categories**, **Products** (list + per-product **edit**), **Featured**, and **Sales**. Product management is split across **inventory list**, **create form**, and **`/admin/products/[id]/edit`**. Today, Playwright mostly **direct-navigates** with `page.goto` rather than exercising the **shell menu** (sidebar on `md+`, **drawer** on small viewports). Regressions in **mobile nav** (hidden links until the menu opens) can ship unnoticed.

## What Changes

- **OpenSpec**: Add normative notes for **admin shell navigation** and **product management route surface**, and require **automated verification** via **Playwright** on **desktop and mobile** widths.
- **Tests** (implementation phase): Extend **`web/e2e/`** so an admin session **walks every primary nav link** from the UI (not only `goto`), including **opening the mobile drawer** when needed; assert **URL** and a **page landmark** per route; cover **Products → Edit** for a seeded or created product where practical.

## Capabilities

### Modified Capabilities

- **`admin-merchandising`**: Admin **shell** SHALL expose reliable navigation to all merchandising sub-areas; **product management** SHALL remain reachable without dead links.
- **`quality-playwright-ci`**: Playwright SHALL validate **admin menu navigation** on **at least two viewports** (mobile + desktop patterns).

## Impact

- **`web/e2e/*.spec.ts`**: new or extended describe blocks; possible **`data-testid`** on nav controls if selectors need stability (`admin-nav` already exists on desktop aside).
- **`src/components/admin/admin-shell.tsx`**: optional a11y/test hooks (e.g. **`data-testid="admin-menu-open"`** on the mobile menu button) if tests require them.

## Baseline (current routes)

| Nav label   | Path                    | Product management notes        |
|------------|-------------------------|----------------------------------|
| Overview   | `/admin`                | Dashboard                        |
| Categories | `/admin/categories`     | CRUD categories                  |
| Products   | `/admin/products`       | Table + create; **Edit** → `/admin/products/[id]/edit` |
| Featured   | `/admin/featured`       | Featured placements              |
| Sales      | `/admin/sales`          | Orders / sales view              |
