## Seed coverage (by model)

| Model | Production seed | Notes |
|-------|-----------------|--------|
| **User** | Admin required; customer optional | OAuth `Account` rows not created by seed |
| **Category** | Yes | From D4D + legacy slugs |
| **Product** | Yes | Upsert by slug |
| **FeaturedPlacement** | Yes | Rebuilt each run |
| **Cart**, **CartItem** | No | Runtime |
| **Order**, **OrderLine** | No | Runtime |
| **ContactSubmission** | No | Runtime |
| **WebhookEvent** | No | Runtime |
| **Session**, **VerificationToken**, **Account** | No | Auth.js runtime |

## Production invocation

1. Apply migrations: `dotenv -e .env.production.bootstrap -- npx prisma migrate deploy` (or equivalent with production `DATABASE_URL`).
2. Run seed with explicit mode and secrets (example):

   ```bash
   SEED_ENV=production \
   SEED_ADMIN_EMAIL="you@yourdomain.com" \
   SEED_ADMIN_PASSWORD="<strong-secret-min-12-chars>" \
   dotenv -e .env.production.bootstrap -- npx prisma db seed
   ```

3. Optional test customer:

   ```bash
   SEED_CUSTOMER_EMAIL="demo-customer@yourdomain.com" \
   SEED_CUSTOMER_PASSWORD="<strong-secret-min-12-chars>"
   ```

**Never** log passwords; script logs admin email only.

## Development behaviour

Unchanged defaults: `admin@destiny4divine.test` / `Admin12345!` and seeded customer when `SEED_ENV` is not `production`.
