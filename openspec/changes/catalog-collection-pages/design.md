## URL model

- **All products:** `/catalog` (unchanged).
- **One collection (category):** `/catalog/<categorySlug>` where `<categorySlug>` matches `Category.slug` from Prisma (e.g. `faith-mugs`, `wellness`).

## Behaviour

- **Resolve category** by `slug`; if none exists, return **404** (`notFound()`).
- **Query:** `product.findMany({ where: { published: true, categoryId }, ... })` ordered consistently with the main catalog (e.g. by name).
- **UI:** Reuse **`CatalogProductCard`** and cart quantity helper; mirror hero/section hierarchy enough to feel cohesive with `/catalog` without duplicating the full marketing hero if it hurts clarity (collection title + short line + product grid is sufficient).
- **Accessibility:** Collection tiles remain **real links** (`<Link>`) with meaningful targets (not all pointing to `/catalog`).

## Seed

- **Rule:** Count published seeded products per category **≥ 5** after a full seed run.
- Add the **fewest** new unique `slug` rows needed (currently four per category → add **one** per category across six categories).

## Non-goals

- Admin UI to “manage collection landing copy” (static heading from category `name` is enough).
- New `Collection` model — **Category** is the collection.
