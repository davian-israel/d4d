## 1. Repository and platform setup

- [x] 1.1 Initialize Next.js (App Router) + TypeScript + Tailwind in repo root (or `apps/web` if monorepo), matching Node version policy for Vercel
- [x] 1.2 Add ESLint/Prettier (or Biome) consistent with team defaults; wire `lint` script
- [x] 1.3 Create Vercel project: Production + Preview envs; document required env vars (`DATABASE_URL`, Square keys, auth secret, webhook signing secret)
- [x] 1.4 Map design tokens from `sacred_earth_grace/DESIGN.md` into Tailwind theme (colors, radii, fonts); add Google fonts for Noto Serif + Work Sans

## 2. Data layer (Prisma + PostgreSQL)

- [x] 2.1 Add Prisma + PostgreSQL provider; define initial schema (User/Customer, Category, Product, FeaturedPlacement, Cart/Order/LineItem, Payment fields, WebhookEvent idempotency)
- [x] 2.2 Create first migration on **dev** DB; document `migrate dev` workflow for local/preview
- [x] 2.3 Add seed script for categories, products, featured items, admin user (dev/test only)
- [x] 2.4 Document **production** promotion: reviewed migrations + `prisma migrate deploy` in CI/CD; forbid `db push` to prod

## 3. Validation and server boundaries

- [x] 3.1 Add shared Zod schemas for contact, profile, admin product/category mutations, checkout payload fragments
- [x] 3.2 Implement server action / route handler error mapping from Zod to stable field errors for UI
- [x] 3.3 Add structured logging helper; redact secrets and card data per validation-observability spec

## 4. Storefront UI (from prototypes)

- [x] 4.1 Build home page with hero + featured carousel region; responsive, editorial spacing (reference `home_page_sacred_style`, `home_with_featured_carousel`)
- [x] 4.2 Build catalog + product detail (reference `catalog_sacred_style`, `product_detail_sacred_style`); wire to Prisma reads
- [x] 4.3 Implement cart UX (reference `cart_sacred_style`) with server-persisted or cookie-backed cart per design decision
- [x] 4.4 Build contact page (reference `contact_us_sacred_style`) with Zod-validated submission persistence or email handoff stub

## 5. Auth and customer account

- [x] 5.1 Implement authentication per `design.md` (Auth.js default) with role on user
- [x] 5.2 Build profile + order history (reference `user_profile_sacred_style`); enforce authorization rules

## 6. Checkout and Square

- [x] 6.1 Implement checkout page UI (reference `checkout_sacred_style`) and server-side order creation with recomputed totals
- [x] 6.2 Integrate Square sandbox: obtain payment method / create payment server-side; store Square IDs on order
- [x] 6.3 Implement webhook endpoint with signature verification + idempotent processing
- [x] 6.4 Handle failure modes (declines, timeouts) with recoverable UX

## 7. Admin merchandising

- [x] 7.1 Build admin shell + dashboard (reference `admin_dashboard_sacred_style`); protect routes
- [x] 7.2 CRUD UIs: categories (`manage_categories_sacred_style`), products (`manage_products_sacred_style`), featured (`manage_featured_products`), sales list (`manage_sales_sacred_style`)
- [x] 7.3 Ensure all admin mutations use Zod + Prisma transactions where needed

## 8. Playwright and CI

- [x] 8.1 Add Playwright config, test `data-testid` hooks on critical controls, seed strategy for deterministic data
- [x] 8.2 Tests: browse → product → add to cart; invalid contact form; admin login → dashboard; checkout path using sandbox/mock per harness decision
- [x] 8.3 Add CI workflow running `playwright install` + tests on PR; document local run commands

## 9. Deployment hardening

- [x] 9.1 Verify Vercel Postgres / pooled connection string and Prisma datasource settings for serverless
- [x] 9.2 Production checklist: separate DB, secrets scoped, Square live mode gated, migration deploy ordering
- [x] 9.3 Smoke test preview vs production; verify webhook URL and signing secret per environment
