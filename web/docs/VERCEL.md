# Vercel deployment

## Postgres (Vercel Marketplace / Neon)

**Vercel Postgres as a first-party product is discontinued**; new databases are provisioned via the **Marketplace** (commonly **[Neon](https://vercel.com/marketplace/neon)**).

1. In the [Vercel Dashboard](https://vercel.com/dashboard), open your project (e.g. **web** under team **davianrs-projects**).
2. Go to **Storage** → **Create Database** → choose **Neon** (or another Postgres integration).
3. Complete the flow in the UI (region, plan). When prompted, **link the database to this project** so environment variables are injected automatically.
4. Neon typically provides **`DATABASE_URL`** (pooled) and **`DATABASE_URL_UNPOOLED`** (direct). Point Prisma at the pooled URL for the app:
   - Ensure **`DATABASE_URL`** is set for **Production** (and Preview if you use a branch DB).
   - From your laptop, run migrations against the **direct** connection (avoids pooler issues with `migrate deploy`):

```bash
cd web
export DATABASE_URL="postgresql://...your-neon-direct-or-unpooled-url..."
npx prisma migrate deploy
# Optional: seed dev-like data (do not run destructive seeds on production without review)
# dotenv -e .env.production.local -- npx prisma db seed
```

5. Set **`AUTH_SECRET`** in **Project → Settings → Environment Variables** (generate with `openssl rand -base64 32`). The app treats `VERCEL=1` as trusted host for Auth.js; you can also set **`AUTH_TRUST_HOST=true`** if needed.

## Production URL

After `vercel link` in `web/`, production deployments are available at the team alias, for example:

**https://web-davianrs-projects.vercel.app**

(Each deploy also gets a unique `*.vercel.app` URL; the stable alias is under **Project → Domains**.)

## General checklist

1. **Root directory**: Vercel project **Root Directory** should be **`web`** if the repo contains the Next app only inside `web/`.
2. **Production** environment: set production `DATABASE_URL`, `AUTH_SECRET`, and Square **live** credentials only when ready.
3. **Preview** environments: use a non-production database and Square **sandbox** keys.
4. Build command: **`npm run build`** (runs `prisma generate` then `next build`).
5. Run **`npx prisma migrate deploy`** against the target database whenever you ship schema changes (locally with prod `DATABASE_URL`, or via CI).
6. Set **`SQUARE_WEBHOOK_URL`** to the public URL of `/api/webhooks/square` for that environment and paste the same URL in the Square app’s webhook settings.

### Middleware / Edge bundle

Auth is split into **`auth.config.ts`** (edge-safe, no Prisma) and **`auth.ts`** (Credentials + Prisma) so **middleware stays under Vercel’s 1 MB Edge limit** on Hobby.

## Production smoke (admin)

After a production deploy—and once the database is migrated and seeded with **`SEED_ENV=production`** (see [README](../README.md))—confirm **credentials sign-in** for the merchandising console:

1. Open the **production** site origin (custom domain or deployment URL above).
2. Navigate to **`/login`** and sign in with the **production** admin email and password you set at seed time (not the development defaults).
3. Confirm **`/admin`** loads the admin dashboard.

The full release gate—including this step—is in **[PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md)**. Passing CI or Playwright locally does **not** prove production admin credentials work; always verify on the live production URL.

**Optional automated smoke:** from `web/`, run **`npm run test:e2e:production`** with **`PLAYWRIGHT_PROD_ADMIN_PASSWORD`** (and optional `PLAYWRIGHT_PROD_BASE_URL`) as documented in the [README](../README.md). This hits the **live** origin (default **https://destiny4d.xyz**); it does **not** replace the manual sign-in check until admin credentials match the deployment database.

**Synthetic or uptime monitors:** If you add checks that authenticate as admin, store the login only in your provider’s **secrets** (e.g. vault or monitor UI)—**never** commit production passwords to the repo.

## Environment variables (see `.env.example`)

- `DATABASE_URL`
- `AUTH_SECRET`
- `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`, `SQUARE_ENV` (server; required for real charges)
- `NEXT_PUBLIC_SQUARE_APPLICATION_ID`, `NEXT_PUBLIC_SQUARE_LOCATION_ID`, `NEXT_PUBLIC_SQUARE_ENV` — required in **Production** so the checkout page can load the Web Payments SDK and tokenize cards (sandbox vs production URL follows `NEXT_PUBLIC_SQUARE_ENV`)
- `SQUARE_WEBHOOK_SIGNATURE_KEY`, `SQUARE_WEBHOOK_URL` (optional until webhooks are enabled)
- `MOCK_PAYMENTS` — must be unset or `false` on Vercel Production (mock checkout is blocked there)
- `ALLOW_CHECKOUT_MOCK` — optional; set `false` in preview/staging when you want tokenized checkout even without production

Use **Vercel → Project → Settings → Environment Variables** instead of committing `.env` files. The build log warning about a detected `.env` means you should confirm `.env` is not committed and secrets only live in Vercel.
