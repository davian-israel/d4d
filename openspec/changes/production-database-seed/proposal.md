## Why

**Production** databases need a **repeatable bootstrap**: schema via migrations, then **reference/catalog data** (categories, products, featured placements) plus an **admin user** for `/admin`. Today the seed script exists but is **development-centric** (fixed test email/password) and documentation does not spell out a **safe production** invocation or which **tables** are populated versus intentionally empty.

## What Changes

- **OpenSpec**: Add requirements for **production-capable seeding**: catalog + merchandising + admin (and optional customer) with **credentials supplied via environment** when `SEED_ENV=production`.
- **Seed implementation**: Gate **production mode** on explicit **`SEED_ENV=production`**; require **`SEED_ADMIN_PASSWORD`** (minimum length); allow **`SEED_ADMIN_EMAIL`** override; optionally create customer only when **`SEED_CUSTOMER_EMAIL`** / **`SEED_CUSTOMER_PASSWORD`** are set.
- **Documentation**: **README** — admin URL (`/admin`), local vs production credentials; **`.env.example`** — seed variables; **production checklist** — run seed after migrate deploy.

## Capabilities

### Modified Capabilities

- **`data-prisma-postgres`**: Documented **production seed** path and **reference data** coverage; operational tables (carts, orders, contact submissions, webhook events) remain **empty** unless a future change introduces optional demo rows.

## Impact

- **`web/prisma/seed.ts`**: environment-driven credentials in production mode.
- **`web/README.md`**, **`web/.env.example`**, **`web/docs/PRODUCTION-CHECKLIST.md`**.

## Security

- Production **passwords SHALL NOT** be committed; operators set secrets at invoke time or in a **private** CI secret store. README SHALL state this explicitly.
