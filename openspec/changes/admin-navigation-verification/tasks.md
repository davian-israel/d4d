## 1. Spec

- [x] Add delta `specs/admin-merchandising/spec.md` (shell navigation + product management reachability).
- [x] Add delta `specs/quality-playwright-ci/spec.md` (nav tests, mobile + desktop).

## 2. Implementation review

- [x] Confirm `admin-shell.tsx` nav items match all live admin routes; note any orphan routes.

## 3. Playwright

- [x] Add **`e2e/admin-navigation.spec.ts`** — after login, for **mobile** and **desktop** viewports: open drawer when needed, click each nav link, assert URL + landmark.
- [x] Add scenario: **Products** → **Edit** seeded **`sacred-honey-elixir`** → edit form visible.

## 4. Verify

- [x] `npx playwright test` (with project env + seed per existing docs).
- [x] Optional: add **`data-testid="admin-mobile-menu-button"`** and **`admin-nav-drawer`** on mobile shell for stable selectors.
