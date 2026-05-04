## 1. Schema & migration

- [x] Add `stockQuantity` (Int, default 0) and `currencyCode` (String, default `"CAD"`) to `Product`.
- [x] Apply Prisma migration for existing databases.

## 2. Assets & seed

- [x] Copy `d4d/*.png` → `web/public/d4d/`.
- [x] Extend `prisma/seed.ts` (or module) with all D4D-derived products: CAD `priceCents`, `stockQuantity`, slugs, descriptions, category links, `imageUrl` under `/d4d/...`.
- [x] Preserve test/admin users and legacy sample products with stock > 0 (e2e compatibility).

## 3. Storefront & commerce

- [x] Format prices using product `currencyCode` where shown.
- [x] Show stock / availability on product detail (and optionally catalog when low).
- [x] Enforce stock in `addToCart`, `setCartItemQuantity`, and `completeCheckout` (+ decrement on paid orders).

## 4. Admin

- [x] Admin “New product” includes stock and currency; Zod + server action persist fields.

## 5. Spec

- [x] Add `specs/d4d-catalog-seed/spec.md` capability notes.
