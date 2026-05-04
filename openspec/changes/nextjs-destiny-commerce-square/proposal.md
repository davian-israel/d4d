## Why

The repo currently holds static HTML/Tailwind prototypes for **Destiny4Divine** (storefront, checkout, account, contact, and admin flows) plus two written design systems. There is no production application, typed validation, payments, persistence, or automated verification. This change defines requirements to build a **real Next.js commerce site** that matches the editorial “Sacred Earth & Grace” direction, processes payments with **Square**, stores data in **PostgreSQL via Prisma**, deploys on **Vercel**, and proves behavior with **Playwright**—so shipping is safe and repeatable.

## What Changes

- **New** Next.js (App Router) application with server-first rendering, API routes/server actions as appropriate, and environment-based configuration for dev vs production.
- **New** data layer: Prisma schema, migrations strategy split for **development** (e.g. Vercel Postgres / Neon for dev) vs **production** (dedicated prod DB + explicit migration path—no accidental `db push` in prod).
- **New** input validation with **Zod** for forms, server actions, and external webhooks (e.g. Square).
- **New** **Square** integration: catalog/cart alignment where applicable, payment/token flow for checkout, webhook verification, idempotent order completion.
- **New** feature set aligned with existing prototypes: marketing home (with featured products), catalog, product detail, cart, checkout, contact, customer profile; protected **admin** for categories, products, featured merchandising, and sales/order views.
- **New** **Playwright** suite: smoke + critical-path E2E (browse → cart → checkout happy path with test doubles/mocks where Square sandbox requires), admin auth gates, and regression coverage for key forms validated with Zod.
- **New** deployment on **Vercel** (preview + production), including secrets for DB, Square, and session/auth if used.
- **Design**: implement a **clean, modern** UI that follows **`sacred_earth_grace/DESIGN.md`** as the primary system (Noto Serif + Work Sans, surface hierarchy, no harsh borders, gradients/glass per guidelines). **`zest_bloom/DESIGN.md`** informs optional accents (spacing, editorial asymmetry, chip patterns) where it does not conflict with the primary palette.

## Capabilities

### New Capabilities

- `storefront-experience`: Public marketing and shopping UX—home, featured carousel, catalog, product detail, cart, responsive layout, accessibility baseline, design tokens per Sacred Earth & Grace.
- `checkout-payments-square`: Checkout flow, order creation, Square payment processing, webhooks, error handling, and reconciliation with persisted orders.
- `customer-account`: Profile, order history linked to customer identity (session/auth approach to be detailed in design).
- `admin-merchandising`: Authenticated admin for categories, products, featured placements, and read-oriented sales/order management.
- `data-prisma-postgres`: Prisma models, migrations policy (dev vs prod), seed strategy for local/dev, connection pooling notes for serverless.
- `validation-observability`: Zod schemas shared between client and server, structured errors, logging/monitoring hooks suitable for Vercel.
- `quality-playwright-ci`: Playwright configuration, test data strategy, CI-friendly runs, and coverage of features above.

### Modified Capabilities

- _(None — `openspec/specs/` has no existing capability specs yet.)_

## Impact

- **New repository surface**: Next.js app root, `prisma/`, Playwright `e2e/`, CI workflow, Vercel project linkage.
- **New dependencies**: `next`, `react`, `prisma`, `@prisma/client`, `zod`, Square SDK/API client, `@playwright/test`, database driver as required by hosting.
- **External systems**: Square (sandbox + production), Vercel Postgres or compatible PostgreSQL for dev, production PostgreSQL, DNS/SSL via Vercel.
- **Secrets**: `DATABASE_URL` (dev/prod), Square access tokens & webhook signatures, any auth secrets (NextAuth or other per design).
- **Human process**: separate migration discipline for production (documented promotion pipeline, backups, rollback).
