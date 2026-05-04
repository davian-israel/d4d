# Capability: d4d-catalog-seed (delta)

## MODIFIED — Seed data (minimum density)

- **SHALL** include **at least five** published `Product` rows for **each** category in **`d4dCategorySlugs`** after seed completes.
- **SHALL** include **at least five** published `Product` rows for each legacy demo category **`wellness`** and **`ritual`** created in `web/prisma/seed.ts`.
- **SHALL** keep a **non-empty** `imageUrl` on every product in the bullets above (prefer **`/d4d/...`** paths for D4D-aligned rows).

This supersedes the prior “exactly four” minimum from `catalog-four-products-per-category` for **minimum** count only; implementations MAY ship more than five per category.
