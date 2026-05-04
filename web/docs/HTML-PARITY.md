# HTML prototype → Next.js routes

Reference files are under the repo root (sibling to `web/`).

| Prototype folder | Primary `code.html` | Next route |
|------------------|---------------------|------------|
| `home_page_sacred_style` | `code.html` | `/` |
| `home_with_featured_carousel` | `code.html` | `/featured` |
| `catalog_sacred_style` | `code.html` | `/catalog` |
| `product_detail_sacred_style` | `code.html` | `/product/[slug]` |
| `cart_sacred_style` | `code.html` | `/cart` |
| `checkout_sacred_style` | `code.html` | `/checkout` |
| `contact_us_sacred_style` | `code.html` | `/contact` |
| `admin_dashboard_sacred_style` | `code.html` | `/admin` |
| `manage_categories_sacred_style` | `code.html` | `/admin/categories` |
| `manage_featured_products` | `code.html` | `/admin/featured` |
| `manage_products_sacred_style` | `code.html` | `/admin/products` |
| `manage_sales_sacred_style` | `code.html` | `/admin/sales` |

## Shared styling

All Sacred Earth prototypes embed the same `tailwind-config` color/font/radius extension in `<script id="tailwind-config">`. Shared `<style>` blocks typically include:

- `.material-symbols-outlined`
- `.editorial-shadow` (and sometimes `.editorial-gradient`, `.glass-panel`)
- `.no-scrollbar` / `.hide-scrollbar`
- `body { min-height: max(884px, 100dvh); }`

These are centralized in `web/src/app/globals.css` for the Next app (no Tailwind CDN in production).
