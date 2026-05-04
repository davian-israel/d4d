## Context

- **Source folder**: repo-root `d4d/` — PNG exports (hero, story, favourites grid). There is no machine-readable CSV; **product facts** are taken from visible copy (SKU refs #106, #204, #304, #500, story mugs, category bullets).
- **Pricing**: All seeded `priceCents` are **Canadian dollars** (minor units). `currencyCode` is **`CAD`** unless overridden later for multi-currency.
- **Images**: Binary assets are copied into **`web/public/d4d/`** so `imageUrl` can be site-relative (e.g. `/d4d/D4D-Product-Catalogue-03-23-2026_10_56_PM.png`) without remote hosts.

## Decisions

1. **Stock**: `stockQuantity` is authoritative for **add-to-cart** and **checkout**; paid orders **decrement** in the same transaction as order persistence and cart clear (after payment success).
2. **Currency display**: `formatCents(amount, currencyCode)` uses `Intl` with **`en-CA`** for `CAD` and **`en-US`** for `USD` (fallback).
3. **Categories**: D4D-aligned slugs — `faith-mugs`, `faith-apparel`, `faith-home`, `faith-gifts` — alongside existing wellness/ritual rows if still seeded.
4. **Featured**: Seed picks a small set of D4D favourites for the home carousel after migration.

## Risks / follow-ups

- Catalogue PNGs are **composite** layouts; per-SKU photography can be split later into individual files.
- **Square** and order totals remain in **integer cents**; production may need explicit CAD policy for payment APIs.
