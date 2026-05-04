# Admin feature matrix

Maps **AdminShell** navigation targets to routes, server-side behavior, and Playwright coverage (`web/e2e/`).

| Nav label | Route | Server actions / API | Automated coverage |
|-----------|--------|----------------------|--------------------|
| Overview | `/admin` | Layout + session | [`admin-navigation.spec.ts`](../e2e/admin-navigation.spec.ts), [`storefront.spec.ts`](../e2e/storefront.spec.ts) (sign-in), [`visual-parity.spec.ts`](../e2e/visual-parity.spec.ts) |
| Categories | `/admin/categories` | [`createCategory`](../src/lib/actions/admin/categories.ts) | [`admin-surface.spec.ts`](../e2e/admin-surface.spec.ts) (create + Saved), [`visual-parity.spec.ts`](../e2e/visual-parity.spec.ts) (landmark) |
| Products | `/admin/products`, `/admin/products/[id]/edit` | [`products.ts`](../src/lib/actions/admin/products.ts) | [`admin-navigation.spec.ts`](../e2e/admin-navigation.spec.ts), [`admin-products.spec.ts`](../e2e/admin-products.spec.ts) |
| Featured | `/admin/featured` | [`featured.ts`](../src/lib/actions/admin/featured.ts) | [`admin-surface.spec.ts`](../e2e/admin-surface.spec.ts) (add placement), [`visual-parity.spec.ts`](../e2e/visual-parity.spec.ts) |
| Sales | `/admin/sales` | Read-only [`Order`](../prisma/schema.prisma) list | [`admin-surface.spec.ts`](../e2e/admin-surface.spec.ts) (order email visible), [`visual-parity.spec.ts`](../e2e/visual-parity.spec.ts) |
| API | `GET /api/admin/categories` | Role check in route | [`admin-surface.spec.ts`](../e2e/admin-surface.spec.ts) (401 unauthenticated) |

**Seeded admin login** (default `SEED_ENV`, see [`README`](../README.md)): `admin@destiny4divine.test` / `Admin12345!` — must match [`e2e/helpers.ts`](../e2e/helpers.ts) `loginAsAdmin` and [`prisma/seed.ts`](../prisma/seed.ts) `resolveSeedCredentials()`.
