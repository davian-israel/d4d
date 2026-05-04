# Capability: d4d-catalog-seed (delta)

## Additions — catalog breadth

### Seed data (per-category grid)

- **SHALL** include **exactly four** published `Product` rows for **each** category in **`d4dCategorySlugs`** (`faith-mugs`, `faith-apparel`, `faith-home`, `faith-gifts`), defined in `web/prisma/d4d-products.ts` (or successor module).
- **SHALL** include **exactly four** published `Product` rows for each **legacy** demo category **`wellness`** and **`ritual`** created in `web/prisma/seed.ts`.
- **SHALL** set a **non-empty** `imageUrl` on **every** product in the bullets above; values **SHALL** be served from **`web/public`** (prefer paths under **`/d4d/`** copied from repo `d4d/` catalogue artwork).
- **SHALL** keep seeding **idempotent** via `upsert` on stable `slug` values; new products **SHALL** use new unique slugs.

### Non-goals (unchanged)

- OCR automation, multi-currency conversion — per parent capability.
