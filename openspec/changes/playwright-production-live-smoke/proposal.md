## Why

Regression coverage today runs **only** against a **local** `next start` + seeded Postgres. The **live** storefront at **[destiny4d.xyz](https://destiny4d.xyz/)** can diverge (deploy, env, Square, auth) without an automated safety net. We need a **documented, optional** Playwright project that targets the **production origin** with **operator-supplied credentials**, without coupling CI to production mutations by default.

## What Changes

- **OpenSpec**: Add requirements for a **production / live URL** Playwright configuration, **credential hygiene** (env secrets only), and **scope boundaries** (no real card charges; checkout asserted only to payment step when Square is required).
- **Implementation**: `playwright.production.config.ts`, `e2e/production/*.spec.ts`, exclude that folder from the default `test:e2e` run; **`npm run test:e2e:production`**; README notes.
- **CI**: Remains **local/Postgres** by default; live tests are **manual / scheduled** with GitHub secrets if the team opts in later.

## Capabilities

### Modified Capabilities

- **`quality-playwright-ci`**: Optional **live smoke** suite documented; default pipeline unchanged.

## Impact

- `web/playwright.config.ts` — ignore `e2e/production/**` in default runs.
- `web/playwright.production.config.ts`, `web/e2e/production/**`, `web/package.json`, `web/README.md`.
- `web/docs/VERCEL.md` and `web/docs/PRODUCTION-CHECKLIST.md` — optional live Playwright smoke cross-links.
- `web/src/components/login-form.tsx` — treat `res?.ok === false` as failed credentials before redirect (production sign-in reliability).
- `web/e2e/admin-products.spec.ts` — slug-scoped assertions (strict-mode safe when duplicate E2E rows exist).

## Live URL

- Default base: `https://destiny4d.xyz` (override with `PLAYWRIGHT_PROD_BASE_URL`).
