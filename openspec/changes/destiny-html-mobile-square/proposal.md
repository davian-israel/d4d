## Why

The production app in `web/` uses a simplified Tailwind theme and layouts that only loosely reference the **Stitch HTML prototypes** in the repo. Stakeholders want **visual and structural parity** with those pages—**mobile-first**, same **look and feel** (including shared **CSS** patterns from each `code.html`), and **no mock payment path** in real environments: **all charges must go through Square**. This change defines requirements to refactor the Next.js UI to **trace the existing HTML** (structure, class patterns, and inline/component-extracted styles) while keeping current backend capabilities (Prisma, Zod, Auth.js) where they do not conflict.

## What Changes

- **Design source of truth** shifts to the **prototype folders** (e.g. `home_page_sacred_style/code.html`, `home_with_featured_carousel/code.html`, `catalog_sacred_style/code.html`, `cart_sacred_style/code.html`, `checkout_sacred_style/code.html`, `contact_us_sacred_style/code.html`, `product_detail_sacred_style/code.html`, `admin_dashboard_sacred_style/code.html`, `manage_categories_sacred_style/code.html`, `manage_featured_products/code.html`, `manage_products_sacred_style/code.html`, `manage_sales_sacred_style/code.html`): **same Tailwind `theme.extend` color/font/radius tokens** as the `<script id="tailwind-config">` blocks, plus **shared `<style>` rules** (e.g. `.material-symbols-outlined`, `.editorial-shadow`, `.glass-panel`, `.editorial-gradient`, `body` / `min-height` rules) centralized for the Next app instead of CDN one-offs per page.
- **Mobile-first** is mandatory: layouts **default to narrow viewports** first; **`md:` / `lg:`** breakpoints and patterns (e.g. sticky header, drawer `hidden md:flex`, `pb-24 md:pb-0`) **SHALL match** the reference HTML for each route family.
- **Feature coverage** explicitly includes: **cart**, **catalog**, **checkout**, **contact-us**, **home**, **home with featured**, **manage categories**, **manage featured** (featured products UI), **manage products**, **manage sales**—each implemented as a Next route (or route group) **mapped 1:1 to its prototype** for structure and styling.
- **Payments**: **Square only** for real money movement—**Square Web Payments SDK** (or equivalent Square-documented browser flow) **SHALL** supply `source_id` / nonce for server-side payment creation; **`MOCK_PAYMENTS` / non-Square “fake pay” SHALL NOT be enabled in production** (sandbox Square is allowed in non-prod).
- **BREAKING**: Any reliance on **mock checkout** or non-Square card capture in deployed environments **SHALL be removed or gated** so production cannot complete checkout without Square.

## Capabilities

### New Capabilities

- `html-design-system-mobile`: Single shared design layer extracted from prototype HTML—Tailwind config parity, global CSS, Material Symbols, mobile-first defaults, optional `container-queries` alignment with CDN setup.
- `storefront-html-parity`: Next.js pages for home, featured home, catalog, product detail, cart, checkout, contact with markup/class-level fidelity to the corresponding `*_sacred_style` / `home_with_featured_carousel` / `manage_featured_products` HTML (storefront-only folders).
- `admin-html-parity`: Admin dashboard and manage-* pages matching `admin_dashboard_sacred_style`, `manage_categories_sacred_style`, `manage_featured_products`, `manage_products_sacred_style`, `manage_sales_sacred_style` HTML.
- `square-payments-mandatory`: Normative requirements that all payment completion uses Square APIs; production forbids mock payments; sandbox for dev/preview only.

### Modified Capabilities

- _(None — `openspec/specs/` has no archived baseline specs yet.)_

## Impact

- **`web/`** — `globals.css`, Tailwind theme, layouts, page components, checkout client module (Square SDK), removal or strict env-gating of `MOCK_PAYMENTS`, possible new shared components under `web/src/components/html-parity/` or similar.
- **Dependencies** — Square Web Payments SDK script/load pattern; ensure CSP/security headers allow Square domains where required.
- **Testing** — Playwright may need Square sandbox test cards or official test harness; mock-only E2E must be limited to CI with clear separation from production parity tests.
- **Documentation** — `.env.example` and deployment docs updated to state **Square is required** for production checkout.
