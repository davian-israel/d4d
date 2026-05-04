## Why

The merchandising console already exposes **`/admin/products`** with a **New product** form and a **`createProduct`** server action guarded by **`requireAdmin`**. Operators still cannot **see inventory in one place**, **edit** existing rows, **unpublish** without recreating data, or **remove** stray SKUs from the admin UI—only database or seed changes address mistakes. A complete **admin product management** surface reduces reliance on seeds and speeds day-to-day catalog ops.

## What Changes

- **OpenSpec**: Extend **`admin-merchandising`** with explicit requirements for **listing**, **updating**, and **optionally deleting** products from the admin UI, reusing **Zod** validation and **PostgreSQL** persistence.
- **Verification strategy (mandatory)**: **Before** shipping new admin product UI/server behaviour, **author and run Playwright** scenarios that cover **all** admin product capabilities in scope (existing + new). **Expect failures** until implementation lands. While stabilizing the suite, **only add new tests** or **edit tests that fail** (or that assert the wrong behaviour)—**do not** rewrite unrelated passing tests. This keeps regressions visible and avoids churn in green tests.
- **Application** (after tests exist):  
  - **`/admin/products`**: add a **product table or list** (name, slug, category, price, stock, published, link to storefront).  
  - **Server actions**: e.g. **`updateProduct`**, **`deleteProduct`** (or **`setProductPublished`**) beside existing **`createProduct`**, all behind **`requireAdmin`**.  
  - **Edit UX**: dedicated **`/admin/products/[id]/edit`** (or equivalent) with the same fields as create, pre-filled.  
  - **Delete policy**: reject hard-delete when **`OrderLine`** rows reference the product; allow **unpublish** always; optional cascade cleanup of **`FeaturedPlacement`** / **`CartItem`** when safe.

## Capabilities

### Modified Capabilities

- **`admin-merchandising`**: Product management **SHALL** include read/list and update (and delete or unpublish-only per design doc) in addition to create.
- **`quality-playwright-ci`**: Admin product work **SHALL** follow the **Playwright-first** workflow described above.

## Impact

- **`web/src/app/admin/products/`**, **`web/src/lib/actions/admin/products.ts`**, validation module, **`revalidatePath`** for `/admin/products`, `/catalog`, `/catalog/[slug]`, product detail.
- **`web/e2e/`**: New or extended specs for full admin product flows; CI continues to run Playwright per repository workflow.

## Current baseline (for implementers)

- Create path: [`web/src/app/admin/products/page.tsx`](web/src/app/admin/products/page.tsx), [`web/src/lib/actions/admin/products.ts`](web/src/lib/actions/admin/products.ts), [`web/src/lib/validation/admin-product.ts`](web/src/lib/validation/admin-product.ts).
- Existing admin E2E: [`web/e2e/storefront.spec.ts`](web/e2e/storefront.spec.ts) (dashboard sign-in only).
