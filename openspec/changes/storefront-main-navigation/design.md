## Navigation behaviour

- **Desktop (`md+`)**: **Header** exposes **text links** for **Home**, **Catalog**, **Featured**, **Contact**, **Sign in**, and **Account** in a single row (wrapping allowed at `lg` if needed). **Cart** remains an **icon** affordance. Links use **`usePathname()`** for **active** styling; **Catalog** is active on `/catalog`, `/catalog/*`, and `/product/*`.
- **Mobile**: **Header** **menu** button toggles a **left drawer** (backdrop + sliding panel) containing the **same** links with **icons**; **drawer closes** after navigation or overlay tap. **Bottom navigation** remains for thumb reach but **must** include **Featured** and stay consistent with IA.
- **Accessibility**: Menu button **`aria-expanded`** reflects drawer state; drawer **`data-testid="storefront-nav-drawer"`** for tests.

## Test strategy

- **Viewports**: Reuse **admin-navigation** pattern—**~390×844** mobile and **~1280×900** desktop (or project defaults).
- **Desktop**: Click each link in **`storefront-nav-desktop`** (or role **link** with name), assert **URL** + page **`data-testid`** landmark.
- **Mobile**: **`storefront-mobile-menu-button`** → open **`storefront-nav-drawer`** → click each **`storefront-nav-link-<id>`** (or link role) → assert URL + landmark.
- **Account (guest)**: Expect redirect to **`/login`** (with optional `callbackUrl`) and login form visible.
- **Account (customer)**: **`loginAsCustomer`** then **Account** → **`storefront-account-page`** (or profile heading).
- **Cart**: Optional smoke from header icon (existing behaviour) — not required for “all main pages” if Cart is not a text nav item; primary **page list** is the six destinations above.

## Non-goals

- Visual regression/pixel parity for drawer animation.
- Restructuring **`/thank-you`** or **`/checkout`** into primary marketing nav.
