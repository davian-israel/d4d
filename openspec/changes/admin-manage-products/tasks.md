## 1. Spec

- [x] Add delta `specs/admin-merchandising/spec.md` (list, update, delete/unpublish rules).
- [x] Add delta `specs/quality-playwright-ci/spec.md` (Playwright-first + “only fix failing tests” workflow).

## 2. Playwright (first — expect red until app matches)

- [x] Add or extend **`web/e2e/`** specs so **every** admin product capability in scope has a scenario: inventory **list** visibility, **create** (valid + invalid if not already covered elsewhere), **update**, **unpublish** and/or **delete** (including **blocked delete** when orders exist, if applicable).
- [x] Run **`npm run test:e2e`** (or project-documented command); record failing cases.
- [x] Adjust tests **only** when they are failing or missing coverage—**do not** refactor unrelated passing tests.

## 3. Server layer

- [x] Add `updateProduct` server action (+ Zod) with `requireAdmin`; revalidate storefront paths.
- [x] Add `deleteProduct` or document unpublish-only + `deleteProduct` with order-line guard; revalidate paths.

## 4. Admin UI

- [x] Extend `/admin/products` with a product list (and link to edit per row).
- [x] Add edit surface (`/admin/products/[id]/edit` or modal) bound to `updateProduct`.

## 5. Verify

- [x] Re-run Playwright until green; if a failure is a **test bug**, fix that test only.
- [x] `npm run lint` in `web/` (new/edited files pass ESLint; pre-existing warnings may remain in other files).
