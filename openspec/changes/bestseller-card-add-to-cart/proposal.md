## Why

The storefront **Best Sellers** destination (currently the primary product grid shoppers reach from footer/nav “Best Sellers”) only links each tile to product detail. Shoppers expect **one-tap add to cart** from listing pages and a **clear signal** when an item is already in the bag. This change specifies that behaviour so implementation matches merchandising intent and reduces friction to checkout.

## What Changes

- **Storefront — bestseller listing**: On the page that presents the **bestseller / full-catalog grid** used for “Best Sellers” navigation, **each product card** includes an **Add to cart** control (same server action / semantics as PDP).
- **In-cart indicator**: When the current visitor’s cart already contains that product, the card **SHALL** show a **small numeric tag** (badge) with the **quantity** in cart for that SKU (sum of line quantity for that `productId`).
- **Accessibility & stock**: Control respects **published** and **stock** rules (disabled or hidden when out of stock per existing policy); badge is **visible** and **machine-readable** (e.g. `aria-label` or adjacent text) so screen readers announce cart quantity.
- **Tests**: Playwright (or equivalent) covers at least one path: add from listing → badge shows **1**; add again or increase via listing → badge updates (or after navigation refresh, per chosen data strategy).

## Capabilities

### New Capabilities

- `bestseller-listing-cart`: Normative UX for bestseller/catalog grid cards — per-product add to cart + in-cart quantity badge tied to session cart.

### Modified Capabilities

- `storefront-experience` (logical): extends catalog/bestseller listing behaviour; no change to payment or data models required unless a shared “cart summary for product ids” helper is introduced.

## Impact

- **`web/src`** — catalog (or dedicated bestseller route if split later): card layout, likely a small client island for badge + form, optional helper to resolve cart quantities by `productId` for the current session.
- **E2E** — new or extended spec for listing add-to-cart + badge assertion.
