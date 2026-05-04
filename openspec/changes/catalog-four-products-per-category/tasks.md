## 1. Spec

- [x] Add delta spec under `specs/d4d-catalog-seed/spec.md` for four products per category + image requirements.

## 2. Seed data

- [x] Extend `web/prisma/d4d-products.ts`: exactly **4** products per slug in `d4dCategorySlugs`, each with **`/d4d/...` `imageUrl`**.
- [x] Extend `web/prisma/seed.ts`: **wellness** and **ritual** each have **4** products; use **`/d4d/...`** for new legacy rows (import `d4dImage` or paths from `d4d-products`).
- [x] Confirm `d4dFeaturedSlugs` only references existing slugs.

## 3. Verification

- [x] Run `npx prisma db seed` locally (or dry-run logic review) to ensure no missing category keys and upserts succeed.
