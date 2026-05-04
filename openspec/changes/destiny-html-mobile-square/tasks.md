## 1. Design system extraction

- [x] 1.1 Audit all prototype `code.html` files and list shared vs page-specific `<style>` rules; document a folder → route mapping in `web`.
- [x] 1.2 Port `tailwind-config` `theme.extend` (colors, fonts, radii) from HTML into the Next/Tailwind build; eliminate CDN Tailwind for production.
- [x] 1.3 Centralize shared CSS (Material Symbols, `.editorial-shadow`, `.editorial-gradient`, `.glass-panel`, `.no-scrollbar`, body `min-height` rules) in `globals.css` (or layered CSS) per `design.md`.
- [x] 1.4 Add Google fonts (Noto Serif, Work Sans) and Material Symbols to match HTML `<head>` links.

## 2. Shared layout / chrome (mobile-first)

- [x] 2.1 Build storefront header/footer/navigation from `home_page_sacred_style` / catalog HTML patterns; verify at 375px and `md+`.
- [x] 2.2 Build admin shell (drawer + desktop sidebar) from `admin_dashboard_sacred_style` / `manage_categories_sacred_style` patterns.

## 3. Storefront pages (HTML parity)

- [x] 3.1 Reimplement `/` using `home_page_sacred_style/code.html` structure and classes.
- [x] 3.2 Add featured home route per `design.md` using `home_with_featured_carousel/code.html`.
- [x] 3.3 Reimplement `/catalog` from `catalog_sacred_style/code.html`; wire to Prisma reads.
- [x] 3.4 Reimplement `/product/[slug]` from `product_detail_sacred_style/code.html`.
- [x] 3.5 Reimplement `/cart` from `cart_sacred_style/code.html`; preserve mobile spacing and surfaces.
- [x] 3.6 Reimplement `/checkout` from `checkout_sacred_style/code.html`; integrate Square Web Payments SDK in the same visual regions as the HTML.
- [x] 3.7 Reimplement `/contact` from `contact_us_sacred_style/code.html`; keep Zod server validation.

## 4. Admin pages (HTML parity)

- [x] 4.1 Reimplement `/admin` dashboard from `admin_dashboard_sacred_style/code.html`.
- [x] 4.2 Reimplement `/admin/categories` from `manage_categories_sacred_style/code.html`.
- [x] 4.3 Reimplement `/admin/featured` from `manage_featured_products/code.html`.
- [x] 4.4 Reimplement `/admin/products` from `manage_products_sacred_style/code.html`.
- [x] 4.5 Reimplement `/admin/sales` from `manage_sales_sacred_style/code.html`.

## 5. Square-only payments

- [x] 5.1 Add Square Web Payments SDK loader and card/token flow on checkout; pass token to server action/API.
- [x] 5.2 Remove or hard-block `MOCK_PAYMENTS` in production; document sandbox vs live env vars in `web/.env.example` and `web/docs/VERCEL.md`.
- [x] 5.3 Ensure server payment creation uses Square only for non-mock paths; add explicit production fail-closed behavior.

## 6. Quality

- [x] 6.1 Update Playwright tests for mobile viewport (min 375px) on home, catalog→cart, and checkout (sandbox or CI-safe harness).
- [x] 6.2 Visual pass: automated Playwright landmark checks at mobile (390×844) and desktop (1280×900) for all mapped storefront routes + admin subpages (`web/e2e/visual-parity.spec.ts`). Optional: spot-check against `code.html` for pixel tweaks.
