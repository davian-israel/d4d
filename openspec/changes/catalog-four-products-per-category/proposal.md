## Why

The storefront **catalog** is organized by **category**. Uneven product counts (e.g. one item in **Faith home** and three in **Faith mugs**) make category pages look empty or unbalanced. Stakeholders want a **predictable grid**: **four sellable products per category** in seed data, each with a **real product image** (bundled under `web/public/d4d/`) so dev, preview, and production demos look complete.

## What Changes

- **OpenSpec**: Extend **`d4d-catalog-seed`** with normative rules for **per-category product counts** and **image coverage** for all seeded catalog categories (D4D faith categories plus legacy **wellness** / **ritual** demo rows).
- **Seed**: Update **`web/prisma/d4d-products.ts`** so each of **`d4dCategorySlugs`** has **exactly four** products with **`imageUrl`** paths under **`/d4d/...`**. Update **`web/prisma/seed.ts`** so **wellness** and **ritual** each have **four** products, using the same bundled assets (or existing Unsplash URLs only where already established—prefer **`/d4d/`** for new rows).
- **Featured list**: Adjust **`d4dFeaturedSlugs`** only if a referenced slug is removed; keep **four** featured items that still exist after the catalog expansion.

## Capabilities

### Modified Capabilities

- **`d4d-catalog-seed`**: Seed SHALL satisfy **four products per catalog category** with **non-empty `imageUrl`** for every row (D4D categories + legacy demo categories).

## Impact

- **`web/prisma/d4d-products.ts`**, **`web/prisma/seed.ts`**
- **`openspec/changes/catalog-four-products-per-category/specs/d4d-catalog-seed/spec.md`** (delta to capability)
- **E2E**: Prefer **preserving** existing product slugs used in tests; add new slugs only where needed for count parity.
