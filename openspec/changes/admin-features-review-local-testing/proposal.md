## Why

The merchandising console spans **Overview**, **Categories**, **Products** (list, create, edit, publish/delete rules), **Featured**, and **Sales**, plus **admin-guarded** server actions and **`/api/admin/*`** routes. Navigation and **products** already have strong Playwright coverage, but there is no single **record** of “all admin capabilities reviewed” or a **mandatory local verification path** before merge or release. Operators and developers need a **repeatable local review** so regressions in **categories, featured, sales**, or **auth boundaries** are caught alongside existing product flows.

## What Changes

- **OpenSpec**: Add normative requirements for **full admin surface verification in a local environment** (seeded DB, documented credentials, Playwright + optional manual matrix).
- **Verification workflow**: Define an **admin feature matrix** aligned with `AdminShell` nav and server actions under `web/src/lib/actions/admin/`; require **Playwright** to cover any admin area not yet exercised beyond **smoke `goto`** (e.g. visual-parity only).
- **Documentation / tasks phase**: Capture **commands** to bring up the app locally, run **`prisma` seed**, and execute **`admin-navigation.spec.ts`**, **`admin-products.spec.ts`**, and **targeted additions** for gaps (categories CRUD smoke, featured mutations, sales list).

## Capabilities

### New Capabilities

- None (requirements are **deltas** to existing capabilities below).

### Modified Capabilities

- **`admin-merchandising`**: Add requirements that **every primary admin route and guarded mutation path** is **verifiable locally** with seeded data (automated and/or documented manual steps); clarify **non-admin denial** remains enforceable for `/admin` and admin APIs.
- **`quality-playwright-ci`**: Add requirements for **local execution** of the admin-related Playwright specs against **`localhost`** with a **defined env + seed**, and for **gap closure** when an admin feature lacks behavioral coverage beyond navigation smoke.

## Impact

- **`web/e2e/`**: Possible new or extended specs for **categories**, **featured**, **sales**; reuse **`loginAsAdmin`** from `helpers.ts`.
- **`web/README.md` or `web/docs/`**: Optional short “local admin verification” note if tasks implement docs (follow tasks.md).
- **CI**: Unchanged unless tasks add new specs that must run in pipeline (same Playwright job).

## Baseline (routes & guards)

| Area | Path | Server actions / API (representative) |
|------|------|----------------------------------------|
| Overview | `/admin` | Session + layout |
| Categories | `/admin/categories` | `categories.ts` |
| Products | `/admin/products`, `/admin/products/[id]/edit` | `products.ts` |
| Featured | `/admin/featured` | `featured.ts` |
| Sales | `/admin/sales` | Read-oriented order view |
| API | `/api/admin/categories` | Role check in route handler |
