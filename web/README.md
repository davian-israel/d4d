# Destiny4Divine — web

Next.js storefront + admin for the OpenSpec change `nextjs-destiny-commerce-square`.

## Local setup

1. Copy `.env.example` to `.env.local` and set `DATABASE_URL` and `AUTH_SECRET` (or run `openssl rand -base64 32` for `AUTH_SECRET`). To copy variables from a linked Vercel project after you add them in the dashboard (e.g. Neon `DATABASE_URL`), run `vercel env pull .env.vercel.production --environment production -y` in `web/` and merge into `.env.local` — see comments in `.env.example`.
2. Start Docker (Docker Desktop, OrbStack, etc.), then from this directory: `docker compose up -d`

`npm run db:migrate`, `db:deploy`, and `db:seed` load **`.env.local`** via `dotenv-cli` (Prisma does not read `.env.local` by itself).
3. `npm install`
4. `npm run db:migrate`
5. `npm run db:seed`
6. `npm run dev`

### Admin console

- **URL:** `/admin` (e.g. `http://localhost:3000/admin` locally).
- **Sign in** uses **Auth.js** credentials (`User.passwordHash`).

### Local admin verification (Playwright)

From `web/` with **Postgres** up, `.env.local` set, and default seed (see **Seeded logins** below):

1. `npm install`
2. `npm run db:migrate` and `npm run db:seed`
3. `npx playwright install chromium` (once per machine, or when Playwright reports a missing browser)
4. `npm run build` — the default Playwright config starts `next start` for `test:e2e`, which needs a prior build
5. `npm run test:e2e`  
   - Admin-only: `npx playwright test e2e/admin-navigation.spec.ts e2e/admin-products.spec.ts e2e/admin-surface.spec.ts`  
   - `PLAYWRIGHT_BASE_URL` / `use.baseURL` default to `http://localhost:3000` (see `playwright.config.ts`).

`loginAsAdmin` in `e2e/helpers.ts` must use the same admin email and password as the default seed output (`prisma/seed.ts`). Feature coverage by area: [docs/ADMIN-FEATURE-MATRIX.md](docs/ADMIN-FEATURE-MATRIX.md).

**Note:** A full parallel `test:e2e` run can deplete product stock and leave add-to-cart buttons disabled in storefront tests. If storefront specs fail with a disabled **Add to cart** button, re-seed the database and re-run, or use fewer workers.

### Seeded logins (local / default seed only)

After `npm run db:seed` with **default** settings (`SEED_ENV` unset):

| Role | Email | Password |
|------|--------|----------|
| Admin | `admin@destiny4divine.test` | `Admin12345!` |
| Customer | `customer@destiny4divine.test` | `Admin12345!` |

Use the **admin** row to manage catalog and merchandising. **Do not** use these defaults in production.

### Production database: migrate + seed

1. Point `DATABASE_URL` at the **production** Postgres instance (often via a gitignored env file or CI secret).
2. Apply schema: `npm run db:deploy` (or `dotenv -e <your-prod-env-file> -- npx prisma migrate deploy`).
3. Seed **catalog + admin** with explicit production mode and a **strong** password (minimum 12 characters). Example:

   ```bash
   cd web
   SEED_ENV=production \
   SEED_ADMIN_EMAIL="admin@yourdomain.com" \
   SEED_ADMIN_PASSWORD="<your-strong-password-here>" \
   dotenv -e .env.production.local -- npx prisma db seed
   ```

   Replace `.env.production.local` with whatever file holds production `DATABASE_URL`. **Never** commit real production passwords.

4. Optional second user (e.g. demo customer): set `SEED_CUSTOMER_EMAIL` and `SEED_CUSTOMER_PASSWORD` (also min 12 characters in production).

**What seed fills:** `User` (admin + optional customer), `Category`, `Product`, `FeaturedPlacement`. **Not seeded:** carts, orders, contact submissions, webhook events, sessions — those are created at runtime.

## Scripts

- `npm run lint` / `npm run format`
- `npm run db:migrate` — development migrations
- `npm run db:deploy` — production-style `prisma migrate deploy`
- `npm run db:seed`
- `npm run test:e2e` — Playwright (requires DB migrated + seeded; run `npm run build` first for `next start` in CI). Does **not** hit production.
- `npm run test:e2e:production` — Playwright against the **live** site (default `https://destiny4d.xyz`). Set **`PLAYWRIGHT_PROD_ADMIN_PASSWORD`** (and optional `PLAYWRIGHT_PROD_BASE_URL`, `PLAYWRIGHT_PROD_ADMIN_EMAIL`, customer vars). Never commit real passwords. **Skips** customer test unless `PLAYWRIGHT_PROD_CUSTOMER_*` are set. Does **not** complete checkout (no real charges). **Admin tests** only pass if that password matches the admin user in the **same** Postgres instance your deployment uses (`vercel env pull` → seed that `DATABASE_URL`, then deploy).

## Docs

- [docs/ADMIN-FEATURE-MATRIX.md](docs/ADMIN-FEATURE-MATRIX.md) — admin routes, actions, and e2e mapping
- [docs/MIGRATIONS.md](docs/MIGRATIONS.md) — dev vs production migrations
- [docs/VERCEL.md](docs/VERCEL.md) — environment variables and deploy notes
- [docs/PRODUCTION-CHECKLIST.md](docs/PRODUCTION-CHECKLIST.md)

Design reference: parent repo `sacred_earth_grace/DESIGN.md` and HTML prototypes in sibling folders.
