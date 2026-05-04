## Context

The workspace contains static HTML prototypes (Tailwind via CDN) for **Destiny4Divine**—home, catalog, product detail, cart, checkout, contact, profile, and an admin console—using **Sacred Earth & Grace** color tokens and **Noto Serif / Work Sans**. Written guidance lives in `sacred_earth_grace/DESIGN.md` (primary) and `zest_bloom/DESIGN.md` (secondary: editorial asymmetry, spacing, alternate palette cues). There is no runnable app, database, or payment integration today.

Constraints from the request: **Next.js**, **Zod** validation, **Square** payments, **Prisma** + **PostgreSQL**, **Vercel** hosting, **Playwright** E2E, separate **dev vs production** database/migration discipline, and UI that is clean, modern, and faithful to the design MD guidance.

## Goals / Non-Goals

**Goals:**

- Ship a deployable Next.js storefront + admin that mirrors the prototype **information architecture** and **visual language** (surface hierarchy, no harsh section borders, warm terracotta primary, serif/sans pairing per Sacred Earth & Grace).
- Persist catalog, cart/session or equivalent, customers, orders, and admin entities in PostgreSQL via Prisma.
- Validate all externally influenced inputs (forms, webhooks, server actions) with Zod; return structured field errors for UX.
- Integrate Square for checkout payment capture with verified webhooks and idempotent order finalization.
- Automate verification with Playwright (local + CI), covering critical paths and regression-prone validation flows.
- Document and implement a **clear split**: development database (e.g. Vercel Postgres / Neon) with iterative migrations vs production promotions using an explicit migration workflow (no silent schema drift).

**Non-Goals:**

- Rebuilding unrelated brands or replacing Square with another PSP in this change.
- Full inventory sync with Square Catalog as the system of record (optional future); initial scope is **web cart + internal DB catalog** with Square handling **payments** unless proposal expands.
- Native mobile apps.

## Decisions

1. **Framework**: Next.js **App Router**, **React Server Components** by default; client components only for interactive islands (cart drawer, checkout payment SDK if required, admin tables). **Rationale**: aligns with user stack preferences and Vercel deployment.

2. **Styling**: **Tailwind CSS** + CSS variables / theme tokens mapped from Sacred Earth & Grace (and selective patterns from Zest Bloom for spacing/editorial layout). **Rationale**: prototypes are Tailwind-native; fastest path to match existing HTML. **Alternative considered**: CSS Modules—rejected for velocity vs prototypes.

3. **Auth**: **Auth.js (NextAuth v5)** or **Clerk**—pick **Auth.js with Prisma adapter** if minimizing vendor cost; otherwise Clerk for speed. **Default in this design**: **Auth.js + email magic link or OAuth** for customers; **separate admin role** on `User` (`role: ADMIN | CUSTOMER`). **Rationale**: single user table, works on Vercel, integrates with Prisma. **Open** if the team prefers Clerk—document in Open Questions.

4. **Validation**: **Zod** schemas colocated under `lib/validation/` (or feature folders), reused in server actions and route handlers; use `z.infer` types. **Rationale**: single source of truth for API and forms.

5. **Payments (Square)**: Use **Square Web Payments SDK** or **server-side Payments API** per Square’s recommended flow for Next.js: create **Payment** linked to `Order` after server-side verification; store `squarePaymentId`, status, and amounts on `Order`. **Webhooks**: verify signature; handle `payment.updated` / `refund` events idempotently with stored event IDs. **Rationale**: reliable server authority; avoids trusting client-only state.

6. **Prisma / DB**: **Two connection URLs**: `DATABASE_URL` (dev/preview) and `DATABASE_URL_PROD` (production)—or Vercel env separation per environment. **Migrations**: `prisma migrate dev` in development; **`prisma migrate deploy` in CI/CD for production** after review. **No** `db push` against production. **Rationale**: user asked for separate migration discipline.

7. **Testing**: **Playwright** with `playwright.config.ts`, `storageState` for admin login (seed admin user in dev/test), and **API mocking** or **Square sandbox** for payment tests. **Rationale**: validates “features working” across UI and server boundaries.

8. **Deployment**: **Vercel** with Preview deployments for branches; production env vars scoped to prod DB and live Square **only** when ready. **Prisma**: enable **connection pooling** (PgBouncer / Vercel Postgres settings) for serverless.

## Risks / Trade-offs

- **[Risk] Square webhook misconfiguration** → **Mitigation**: documented signing key setup, replay testing in sandbox, idempotency keys on order completion.
- **[Risk] Serverless + long DB transactions** → **Mitigation**: short transactions, optimistic UX, queue optional later.
- **[Risk] Auth complexity delays MVP** → **Mitigation**: start with minimal customer auth (order lookup by email + magic link) if needed; admin protected first.
- **[Risk] E2E flakiness** → **Mitigation**: stable `data-testid` hooks, retry policy, seed fixtures, avoid time-based assertions.
- **[Trade-off] Duplicated catalog vs Square Catalog** → Accept internal catalog first; document future sync.

## Migration Plan

1. **Bootstrap**: Next.js app, Prisma schema, initial migration on **dev** DB.
2. **Seed**: categories, sample products, admin user (dev/test only).
3. **Feature slices**: storefront read-only → cart → checkout + Square sandbox → admin CRUD → webhooks.
4. **Production**: create prod DB, run `migrate deploy`, set env vars, smoke test, enable live Square only after checklist.
5. **Rollback**: keep previous deployment in Vercel; DB rollback via forward-only migration fixes (avoid destructive migrations without backup).

## Open Questions

- **Customer identity**: guest checkout only vs required account—impacts Zod schemas and Playwright flows.
- **Auth vendor**: confirm Auth.js vs Clerk for maintenance expectations.
- **Internationalization / tax**: single region MVP assumption unless specified.
- **Email provider**: transactional email for receipts (Resend, etc.) not specified—defer or include minimal logging-only MVP.
