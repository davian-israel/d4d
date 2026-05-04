## Why

Operators depend on **credentials login** and **every merchandising console route** staying reachable after deploys. **`admin-navigation.spec.ts`** already walks shell links on mobile and desktop, but there is no OpenSpec requirement that explicitly binds **“sign in as admin”** to **“every primary admin destination loads successfully”** as a single auditable flow. Adding a normative spec plus a focused Playwright scenario (or tightening an existing one) makes regressions in auth redirects or missing routes visible in CI.

## What Changes

- **OpenSpec**: Add requirements under **`quality-playwright-ci`** (and lightly under **`admin-merchandising`**) that the automated suite **SHALL** verify admin credential login and loading of **all** primary admin shell destinations (`/admin`, `/admin/categories`, `/admin/products`, `/admin/featured`, `/admin/sales`).
- **Tests**: Implement or extend **`web/e2e/`** Playwright coverage so one clear test (or describe block) performs **`loginAsAdmin`**, then asserts **URL + page landmark** for each destination; reuse **`helpers.ts`** and align with **`AdminShell`** nav order.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- **`quality-playwright-ci`**: Add an explicit requirement that Playwright verifies **admin login** and **navigation to every primary admin shell route** (deterministic seeded credentials).
- **`admin-merchandising`**: Add a short requirement that **all** primary admin routes exposed in the shell remain **reachable** after successful admin authentication in the test environment.

## Impact

- **`web/e2e/*.spec.ts`**: new file or extensions to existing navigation spec; possible shared route table next to tests.
- **CI**: existing Playwright job picks up the test; no API or schema changes.
