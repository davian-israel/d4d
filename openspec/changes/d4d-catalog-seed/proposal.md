## Why

The repo contains a **`d4d/`** folder with Destiny4Divine (D4D) catalogue artwork: brand story, Faith Collection hero, “What We Do” assortment, **Our Story** product shots, and **Our Favourites** (#106, #204, #304, #500). Those assets are not yet reflected in the commerce database or storefront. Stakeholders need **real SKUs** with **prices in Canadian dollars**, **inventory counts**, and **seed data** derived from that folder so local/dev environments match the D4D line.

## What Changes

- **Data model**: `Product` gains **`stockQuantity`** (non-negative integer) and **`currencyCode`** (default **`CAD`**) so prices are explicit for Canadian retail.
- **Seed**: New Prisma seed (or seed module) loads **all catalogue-derived products** identified from `d4d/` PNGs, assigns **CAD cent prices** and **stock quantities**, maps them to D4D-oriented categories, and copies (or references) images under **`web/public/d4d/`** for `imageUrl` paths served by Next.js.
- **Storefront**: Product and catalog views show **currency-appropriate formatting** (`en-CA` + ISO code) and **availability**; **cart** and **checkout** enforce **stock** (no oversell; decrement on successful payment).
- **Admin**: “New product” form accepts **stock** and **currency** aligned with validation.
- **OpenSpec**: Capability spec for **d4d-catalog-seed** documents extraction rules, seed maintenance, and shop behaviour for CAD + inventory.

## Capabilities

### New Capabilities

- `d4d-catalog-seed`: Normative mapping from `d4d/` catalogue assets to seeded `Product` rows (names, slugs, descriptions, CAD `priceCents`, `stockQuantity`, categories, public image paths), plus transactional stock decrement on paid checkout.

### Modified Capabilities

- `data-prisma-postgres` (logical): `Product` inventory and currency fields; migrations and seed strategy updated accordingly.

## Impact

- **`web/prisma`**: schema migration, `seed.ts` (+ optional `seed-d4d-products` data module).
- **`web/public/d4d/`**: static copies of catalogue PNGs for seeded `imageUrl` values.
- **`web/src`**: money formatting, product UI, `addToCart` / `setCartItemQuantity`, `completeCheckout` transaction, admin product action + form.
- **E2E**: Existing flows remain valid if legacy seed products keep non-zero stock; slugs used in tests unchanged where possible.
