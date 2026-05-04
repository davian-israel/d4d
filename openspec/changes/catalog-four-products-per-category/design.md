## Context

- Categories from **`d4dCategorySlugs`**: `faith-mugs`, `faith-apparel`, `faith-home`, `faith-gifts`.
- Legacy categories in **`seed.ts`**: `wellness`, `ritual` (used alongside D4D for sample assortment).
- Images today: **`d4dImage`** maps logical keys to **`/d4d/*.png`** paths copied from repo `d4d/` into **`web/public/d4d/`** during the original catalog-seed work.

## Decisions

1. **Count rule**: **4** published products per category listed above (24 products total across 6 categories).
2. **Images**: New rows **SHALL** use **`imageUrl`** values that resolve under **`web/public`** (prefer **`/d4d/...`** for brand-consistent demos).
3. **Upserts**: Keep **`upsert` by `slug`** so re-seeding is idempotent; new products get new unique slugs.
4. **Featured**: Do not require featured rows to be one-per-category; keep a stable, visually diverse **four**-item hero strip from existing slugs.

## Risks / mitigations

- **Asset missing locally**: If `public/d4d` PNGs are absent in a clone, images 404 until `d4d/*.png` is copied—documented in parent **`d4d-catalog-seed`**; CI/build should still pass.
- **Production re-seed**: Running seed overwrites **`FeaturedPlacement`** and resets demo user passwords—call out in runbooks (unchanged behaviour).

## Migration

- No schema migration; data-only seed changes.
