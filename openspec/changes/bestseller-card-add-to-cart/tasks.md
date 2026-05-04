## 1. Listing card UI

- [x] Add **Add to cart** control to each product card on the bestseller/catalog grid (`/catalog` or dedicated route).
- [x] Show **quantity badge** when cart contains that `productId`; hide when quantity is 0.

## 2. Data wiring

- [x] Load cart for current session on the listing page and compute **per-product quantities**; keep in sync after add (revalidate/refresh or client mutation).

## 3. A11y & polish

- [x] Badge/control has sufficient contrast; **aria** or label communicates “N in cart” for assistive tech.

## 4. Quality

- [x] Playwright: from catalog/bestseller grid, add item → assert badge shows **1** (and optionally **2** after second add).
