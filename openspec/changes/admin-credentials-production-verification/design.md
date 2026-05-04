## Verification model

| Environment | Admin user source | How to verify |
|-------------|-------------------|---------------|
| **Local / Preview / CI** | Prisma seed defaults (or env overrides) | Playwright `loginAsAdmin` + dev DB |
| **Production** | `SEED_ENV=production` + `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (or prior upsert) | **Manual** smoke on **production origin**: `/login` → dashboard at `/admin` |

Production verification **SHALL NOT** require checking production secrets into the repo. Operators use the password they set during seed (password manager / vault).

## Preconditions (production)

- Migrations applied; seed run with production admin at least once (or admin row otherwise known-good).
- `AUTH_SECRET` and `DATABASE_URL` for Production match the running deployment.
- `AUTH_TRUST_HOST` / Vercel trusted host behaviour documented (see [VERCEL.md](../../../web/docs/VERCEL.md)).

## Non-goals

- Mandatory Playwright runs against production (would require storing prod credentials in CI).
- Password rotation UX (separate change).
