# Production checklist

- [ ] Production `DATABASE_URL` points to a dedicated Postgres instance (not dev/preview).
- [ ] `AUTH_SECRET` is unique per environment and stored only in Vercel (or your host) secrets.
- [ ] `prisma migrate deploy` runs against production as part of release automation.
- [ ] Square **live** `SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`, and `SQUARE_ENV=production` are set only on Production; Preview uses sandbox.
- [ ] `MOCK_PAYMENTS` is unset or `false` in Production.
- [ ] `SQUARE_WEBHOOK_URL` matches the public Production URL for `/api/webhooks/square`; signature key matches the Square app configuration.
- [ ] Smoke-test Preview (sandbox) before promoting: catalog, cart, checkout, webhook delivery (if enabled).
