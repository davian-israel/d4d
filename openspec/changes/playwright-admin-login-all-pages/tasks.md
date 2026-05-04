## 1. Implement Playwright coverage

- [x] 1.1 Add a shared list (in-spec constant or `web/e2e/admin-shell-destinations.ts`) of the five **`AdminShell`** routes with labels and landmark assertions, matching [`admin-shell.tsx`](../../../web/src/components/admin/admin-shell.tsx).
- [x] 1.2 Implement a Playwright test that calls **`loginAsAdmin`**, then for each destination either uses the existing **`clickAdminNavLink`** pattern or **`page.goto`** after login; assert URL and landmark for **`/admin`**, **`/admin/categories`**, **`/admin/products`**, **`/admin/featured`**, **`/admin/sales`** (extend [`admin-navigation.spec.ts`](../../../web/e2e/admin-navigation.spec.ts) or add a dedicated spec—avoid duplicating mobile/desktop loops unnecessarily).
- [x] 1.3 Run `npx playwright test` for the touched spec(s) locally with seeded DB; fix selectors if landmarks change.

## 2. Documentation

- [x] 2.1 Optionally add one line to [`web/docs/ADMIN-FEATURE-MATRIX.md`](../../../web/docs/ADMIN-FEATURE-MATRIX.md) referencing the new or updated test name.

## 3. Close out

- [x] 3.1 Run `openspec status --change playwright-admin-login-all-pages` and confirm artifacts remain consistent after implementation.
