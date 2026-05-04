## Scope

- **“Bestseller page”** means the storefront route that **Best Sellers** in the global shop nav targets. Today that is **`/catalog`** (full published product grid). A future **`/bestsellers`** route MAY reuse the same card component; requirements apply to whichever route is the canonical bestseller grid.

## UX

- Each card keeps a **link** to `/product/[slug]` for discovery (title/image area) while the **Add to cart** affordance is distinct (e.g. icon button or compact pill) to avoid nested interactive confusion — pattern: primary click target remains product detail; add control is a **secondary** control with `type="submit"` or explicit button.
- **Badge**: Small pill or corner tag on or adjacent to the add control, showing **integer ≥ 1** when that product is in cart; **hidden** (or `0` not shown) when not in cart.
- **Styling**: Align with Sacred Earth & Grace — subtle surface, no harsh border; badge uses **primary** or **secondary-container** contrast so the digit stays legible at small size.

## Data & rendering

- **Server-first**: Page server component loads products as today.
- **Cart quantities by product**: Resolve current `cart_session` cart and build `Record<productId, quantity>` for **line items** (sum per `productId`). Pass into a **client** card row or wrapper so the badge can update after `addToCartForm` without full page reload if desired; minimum acceptable MVP is **badge correct on load** and after **`router.refresh()`** / revalidation following server action.
- **Single source of truth**: Quantities MUST match `CartItem` rows for the active anonymous or logged-in cart (same rules as PDP).

## Edge cases

- **Stock**: If `stockQuantity` is 0, add control disabled; badge may still show if cart was populated before stock went to zero (edge); checkout path already validates.
- **Multiple adds**: Badge shows **total** quantity for that product in cart, not “last add increment only”.

## Non-goals

- Mini cart drawer on listing.
- Per-variant SKU pickers on listing (products remain single-SKU rows until variants exist).
