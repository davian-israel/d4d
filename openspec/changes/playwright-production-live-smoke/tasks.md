## 1. Spec

- [x] Add delta `specs/quality-playwright-ci/spec.md` (live smoke suite).

## 2. Playwright

- [x] `playwright.production.config.ts` with configurable base URL (default `https://destiny4d.xyz`).
- [x] Default `playwright.config.ts` ignores `e2e/production/**`.
- [x] `e2e/production/` specs: storefront smoke, navigation, checkout UI gate, admin + optional customer auth.

## 3. Docs

- [x] README: how to run `test:e2e:production` and required env vars.
- [x] **VERCEL.md** — Production smoke section links optional `test:e2e:production`.
- [x] **PRODUCTION-CHECKLIST.md** — optional live Playwright row.

## 4. Verify

- [x] `npx playwright test --config=playwright.production.config.ts` against live URL with admin password from env.

## 5. Related fixes (same effort window)

- [x] **LoginForm:** treat `res?.ok === false` as failed credentials before redirect.
- [x] **admin-products.spec.ts:** slug-scoped assertions (strict-mode safe with duplicate E2E rows).
