# Database migrations

## Development

1. Start Postgres (example): `docker compose up -d` from the `web/` directory.
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL`.
3. Apply migrations: `npm run db:migrate` (runs `prisma migrate dev`).
4. Seed sample data: `npm run db:seed`.

## Preview / staging

Use a dedicated database per Vercel Preview environment. Run `prisma migrate deploy` after the deployment’s migration files are merged (automate in CI if possible).

## Production

- Do **not** use `prisma db push` as the primary workflow for production schema changes.
- Review migration SQL in pull requests.
- Release pipeline should run `npm run db:deploy` (`prisma migrate deploy`) against the **production** database **before** or **with** the app version that depends on the new schema.
- Use a separate `DATABASE_URL` for production from development/preview. Keep secrets scoped per Vercel environment.

## Vercel Postgres / PgBouncer

If your runtime `DATABASE_URL` uses connection pooling, configure Prisma with a non-pooled `directUrl` for migrations (see [Prisma docs](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#pgbouncer)). This repo uses a single `DATABASE_URL` by default; add `directUrl` to `schema.prisma` when you introduce a pooler.
