## Why

The public **storefront header** shows a **menu** affordance that does not open navigation, and **desktop** viewports have **no primary text links** to main destinations. **Featured** (`/featured`) and **Sign-in** (`/login`) are easy to miss compared to the **bottom bar** (mobile-only), which also omits **Featured**. Regressions in **primary IA** can ship without automated checks.

## What Changes

- **OpenSpec**: Add requirements for a **main navigation** surface on the storefront that links to **all primary customer routes**: **Home**, **Catalog**, **Contact**, **Featured**, **Sign in**, and **Account** (Cart remains a global header affordance).
- **Implementation**: A **responsive** pattern—**inline links** on `md+`, **drawer** opened from the menu control on small viewports—backed by stable **`data-testid`** hooks.
- **Tests**: Playwright **shall** exercise **every** primary nav destination by **clicking** the navigation control (not **`page.goto` alone**) on **mobile** and **desktop** widths; **Account** shall be covered for **guest** (login redirect) and **signed-in customer** where the harness supports it.

## Capabilities

### Modified Capabilities

- **`storefront-experience`**: Public shell **SHALL** expose consistent **primary navigation** to Home, Catalog, Featured, Contact, Sign-in, and Account.
- **`quality-playwright-ci`**: Playwright **SHALL** validate **storefront menu navigation** on **at least two viewports** (mobile + desktop patterns).

## Impact

- **`web/src/components/storefront/storefront-header.tsx`**: functional menu + desktop links.
- **`web/src/components/storefront/storefront-bottom-nav.tsx`**: align items with primary IA (e.g. **Featured**).
- **`web/e2e/`**: new **`storefront-navigation.spec.ts`** (and helper for customer login if needed).
- **Storefront route files**: optional page-level **`data-testid`** landmarks for assertions.

## Baseline (primary storefront routes)

| Label (UI) | Path        | Notes                          |
|------------|-------------|--------------------------------|
| Home       | `/`         | Marketing home                 |
| Catalog    | `/catalog`  | Includes `/catalog/[slug]` active state |
| Featured   | `/featured` | Curated batch page             |
| Contact    | `/contact`  | Contact surface                |
| Sign in    | `/login`    | Auth entry                     |
| Account    | `/account`  | Profile (redirects if guest)  |
| Cart       | `/cart`     | Global header icon (not duplicated as a text item unless design requires) |
