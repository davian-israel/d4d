## Context

The repo contains **authoritative Stitch exports**: single-file HTML prototypes with **Tailwind CDN**, duplicated **`tailwind.config` inline** blocks (identical token sets), page-specific **`<style>`** rules, and **mobile-first** class patterns (`px-6 md:px-12`, `hidden md:flex` drawers, `sticky` top bars, `min-height: max(884px, 100dvh)` on `body` in several files). The Next.js app under `web/` currently implements a **condensed** theme and layouts. This change refactors the app toward **HTML fidelity** while retaining server logic (Prisma, Zod, Auth.js, Square server APIs).

## Goals / Non-Goals

**Goals:**

- **Pixel- and class-fidelity** to each reference `code.html` for the routes listed in the proposal (structure, utility classes, responsive behavior), adapted only where dynamic data or React hydration requires it.
- **Single shared design module**: one Tailwind theme extension matching the prototype `theme.extend` (colors, `fontFamily.headline` / `body` / `label`, `borderRadius`), plus **global CSS** porting shared rules from prototype `<style>` blocks (Material Symbols font-variation, `.editorial-shadow`, `.editorial-gradient`, `.glass-panel`, `.no-scrollbar`, body min-height rules as appropriate).
- **Mobile-first**: default styles target small viewports; `md`/`lg` enhancements **SHALL** mirror the reference HTML—not desktop-first refactors.
- **Square-only** real payments: Web Payments SDK integration on checkout; server creates payments via Square; **no production mock pay**.

**Non-Goals:**

- Replacing Tailwind with a different CSS framework.
- Pixel-perfect replication of **static** image URLs where licensing or performance requires substitutions (use equivalents but preserve layout).
- Rewriting backend domain models unless required for UI parity.

## Decisions

1. **Tailwind delivery**: Remove reliance on **`cdn.tailwindcss.com` in production**; compile the **same** extended theme in the Next/Tailwind build (v4 `@theme` / config) so class names from HTML **continue to work** without runtime CDN.

2. **Style extraction**: Check in a **`prototype-tokens`** reference (comment block or small JSON) keyed by folder name for traceability; implement tokens once in `web` and **diff-check** critical pages against HTML during review.

3. **Material Symbols**: Load via **Google Fonts** link (as in HTML) or `next/script` + CSS; keep `.material-symbols-outlined` rules in **`globals.css`**.

4. **Checkout / Square**: Client component **isolates** Square Web Payments SDK; passes **payment token / source** to existing server action; **production** rejects requests without valid Square configuration and without a token (no silent mock).

5. **Route mapping** (suggested, adjust if routing conventions differ):

   - `/` ← `home_page_sacred_style`
   - `/home/featured` or `/featured` ← `home_with_featured_carousel` (pick one; document)
   - `/catalog` ← `catalog_sacred_style`
   - `/product/[slug]` ← `product_detail_sacred_style`
   - `/cart` ← `cart_sacred_style`
   - `/checkout` ← `checkout_sacred_style`
   - `/contact` ← `contact_us_sacred_style`
   - `/admin` ← `admin_dashboard_sacred_style`
   - `/admin/categories` ← `manage_categories_sacred_style`
   - `/admin/featured` ← `manage_featured_products` (featured placements)
   - `/admin/products` ← `manage_products_sacred_style`
   - `/admin/sales` ← `manage_sales_sacred_style`

## Risks / Trade-offs

- **[Risk] Class drift** during data binding → **Mitigation**: section-level components copied from HTML; visual regression (Playwright screenshots) optional follow-up.
- **[Risk] Square SDK + Next App Router** (CSP, client-only) → **Mitigation**: documented `next.config` headers; load SDK only on checkout.
- **[Trade-off] Duplicated HTML** across prototypes → centralize tokens; **do not** duplicate inline `tailwind.config` per page in React.

## Migration Plan

1. Land shared theme + globals; verify one page (home) against HTML.
2. Port storefront routes in dependency order: layout/header → home → catalog → product → cart → checkout (Square) → contact.
3. Port admin routes; ensure **mobile** nav/drawer matches HTML.
4. Remove or **strictly gate** `MOCK_PAYMENTS` (dev/CI only); update env docs.
5. Run Playwright smoke on mobile viewport profiles (`375px` width minimum).

## Open Questions

- Exact **URL** for “home with featured” (`/featured` vs `/home/featured`).
- Whether **user profile** HTML (`user_profile_sacred_style`) is in scope for this pass (not listed in latest ask—defer unless added).
