## Why

The main **catalog** lists every product and shows **The Collections** as a horizontal strip, but each tile links to the same `/catalog` URL. Shoppers cannot land on a **single collection** (category) view. Seed data was sized at **four** products per category; stakeholders want **at least five** published items per collection so collection pages feel substantive.

## What Changes

- **Routing**: Add a **per-collection catalog** route (e.g. `/catalog/[categorySlug]`) that lists **only** published products in that `Category`, with a clear heading and path back to the full catalog.
- **All-catalog UX**: On `/catalog`, each **collection** tile **SHALL** link to its collection catalog URL using the category’s stable **`slug`**.
- **Seed**: Ensure **every** seeded category (D4D faith categories plus **wellness** and **ritual**) has **at least five** published products, each with a non-empty **`imageUrl`** (prefer `/d4d/...` where applicable).
- **OpenSpec**: Extend **storefront-experience** and **d4d-catalog-seed** (or catalog seed notes) with the behaviours and data rules above; add **tasks** for implementation and verification.

## Capabilities

### Modified Capabilities

- **`storefront-experience`**: Collection catalog pages; collection tiles link to filtered catalog.
- **`d4d-catalog-seed`**: Minimum **five** products per seeded category/collection with images.

## Impact

- **`web/src/app/(storefront)/catalog/`** — new dynamic segment; update main `page.tsx` links.
- **`web/prisma/d4d-products.ts`**, **`web/prisma/seed.ts`** — additional seed rows.
- **E2E** (optional follow-up): assert navigation from `/catalog` to a collection URL and product visibility.
