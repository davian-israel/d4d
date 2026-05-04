## 1. Spec

- [x] Add delta `specs/storefront-experience/spec.md` (main navigation IA).
- [x] Add delta `specs/quality-playwright-ci/spec.md` (storefront menu E2E).

## 2. Implementation

- [x] Shared **`storefront-main-nav`** config (items, matchers, test ids).
- [x] **`StorefrontHeader`**: desktop links + mobile drawer; stable test ids.
- [x] **`StorefrontBottomNav`**: add **Featured**; align labels/paths with primary IA.
- [x] Page landmarks: **Home**, **Catalog**, **Featured**, **Contact**, **Login**, **Account** `data-testid`s.

## 3. Playwright

- [x] **`e2e/storefront-navigation.spec.ts`**: mobile + desktop; every primary link via menu; guest **Account**; customer **Account** after **`loginAsCustomer`**.
- [x] **`e2e/helpers.ts`**: **`loginAsCustomer`** using seeded **`customer@destiny4divine.test`**.

## 4. Verify

- [x] `npx playwright test` (with env + DB seed per project docs).
