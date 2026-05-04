# Capability: bestseller-listing-cart

## Purpose

Define storefront behaviour for the **bestseller product grid** (canonical route linked as “Best Sellers”): quick **add to cart** per product and a **numeric in-cart indicator** on each card.

## Requirements

### Listing

- **SHALL** render one **Add to cart** actionable control per published product card on the bestseller listing page.
- **SHALL** use the same add-to-cart **server action** semantics as the product detail page (quantity rules, stock limits, session cart).
- **SHALL** allow navigation to product detail from the card (e.g. image/title link) without requiring add-to-cart as the only interaction.

### In-cart badge

- **SHALL** display a **small numeric tag** on (or immediately beside) the add control when the visitor’s cart contains that product.
- **SHALL** show the **total quantity** of that `productId` across all cart lines for that product (typically one line per product).
- **SHALL NOT** show the tag when the quantity is zero (omit or equivalent).

### Accessibility

- **SHALL** expose the in-cart quantity to assistive technology (e.g. `aria-label` on the control or a visually hidden text node).

### Stock

- **SHALL** disable or block add-to-cart when the product is **out of stock** per existing storefront rules.

## Verification

- Automated test **SHALL** assert add-from-grid updates the visible badge count for at least one product.
