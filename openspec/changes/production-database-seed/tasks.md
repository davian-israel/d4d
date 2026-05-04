## 1. Spec

- [x] Add delta `specs/data-prisma-postgres/spec.md` (production seed + table coverage).

## 2. Seed

- [x] Implement `SEED_ENV=production` gate and `SEED_ADMIN_*` / optional `SEED_CUSTOMER_*`.
- [x] Keep dev defaults for Playwright and local DX.

## 3. Documentation

- [x] Update `web/README.md` — `/admin`, local admin defaults, production seed commands, security note.
- [x] Update `web/.env.example` — seed variables.
- [x] Update `web/docs/PRODUCTION-CHECKLIST.md` — seed step.

## 4. Verify

- [x] Local: `npm run db:seed` still succeeds.
- [x] Dry-run: `SEED_ENV=production` without password fails fast with clear error.
