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

Seeded logins (development only):

- Admin: `admin@destiny4divine.test` / `Admin12345!`
- Customer: `customer@destiny4divine.test` / `Admin12345!`

## Scripts

- `npm run lint` / `npm run format`
- `npm run db:migrate` — development migrations
- `npm run db:deploy` — production-style `prisma migrate deploy`
- `npm run db:seed`
- `npm run test:e2e` — Playwright (requires DB migrated + seeded; run `npm run build` first for `next start` in CI)

## Docs

- [docs/MIGRATIONS.md](docs/MIGRATIONS.md) — dev vs production migrations
- [docs/VERCEL.md](docs/VERCEL.md) — environment variables and deploy notes
- [docs/PRODUCTION-CHECKLIST.md](docs/PRODUCTION-CHECKLIST.md)

Design reference: parent repo `sacred_earth_grace/DESIGN.md` and HTML prototypes in sibling folders.
