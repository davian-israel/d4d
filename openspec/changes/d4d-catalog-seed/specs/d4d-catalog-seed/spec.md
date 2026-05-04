# Capability: d4d-catalog-seed

## Purpose

Define how **Destiny4Divine / D4D** catalogue material under `d4d/` is reflected in **PostgreSQL** via Prisma seed: **CAD** pricing, **inventory**, public images, and storefront/admin behaviour.

## Requirements

### Seed data

- **SHALL** include at least one row per **distinct product** identified from `d4d/` artwork (Faith Collection, Our Story, Our Favourites SKUs, and “What We Do” category-derived items where expressed as sellable goods).
- **SHALL** set `priceCents` as **Canadian dollar** minor units and `currencyCode` **`CAD`** for those rows unless documented otherwise.
- **SHALL** set `stockQuantity` to a **non-negative** integer for every product; default for legacy rows after migration **SHALL** be defined in migration/seed so existing environments do not break (`0` is acceptable only if the product is unpublished or replenished in seed).
- **SHALL** use `imageUrl` paths served from **`web/public/d4d/`** (or equivalent) for catalogue PNGs copied from repo `d4d/`.

### Storefront

- **SHALL** display prices using the product’s `currencyCode` (e.g. CAD in `en-CA`).
- **SHALL NOT** allow cart line quantity **greater than** available `stockQuantity` (accounting for quantities already in the cart).
- **SHALL** validate stock again at **checkout** before completing payment; **SHALL** **decrement** `stockQuantity` for each line **only** when payment is **successful** (`PAID` / completed flow), in a **transaction** with order persistence and cart clearing.

### Admin

- **SHALL** allow operators to set **stock** and **currency** when creating products (validation consistent with schema).

## Non-goals

- OCR automation for future catalogue drops (manual or scripted seed updates are acceptable).
- Multi-currency checkout conversion — single currency per product row only.
