## 1. Spec

- [x] Add delta `specs/storefront-experience/spec.md` for collection routes and clickable tiles.
- [x] Add delta `specs/d4d-catalog-seed/spec.md` for minimum five products per seeded category.

## 2. Storefront

- [x] Add `web/src/app/(storefront)/catalog/[slug]/page.tsx` with filtered product list and 404 for unknown slug.
- [x] Update `web/src/app/(storefront)/catalog/page.tsx` so each collection `Link` targets `/catalog/${category.slug}`.

## 3. Seed

- [x] Add one product per category in `d4d-products.ts` (four D4D categories) and one each in `seed.ts` legacy arrays for `wellness` and `ritual` (≥ 5 items each).

## 4. Verify

- [x] Run `npx prisma db seed` locally.
- [x] Run `npm run lint` in `web/` (or project-standard check).
