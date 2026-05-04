# Design System Specification: The Sensory Gastronome

## 1. Overview & Creative North Star
**Creative North Star: The Editorial Epicurean**
This design system moves away from the "utility-first" look of standard food delivery apps and moves toward a high-end, editorial experience. It treats food items not as mere SKUs, but as featured content in a premium lifestyle magazine. 

By leveraging intentional asymmetry, overlapping imagery, and a radical commitment to tonal depth over structural lines, we create a "Sensory Gastronome" experience. The goal is to make the user feel the "freshness" and "vibrance" through white space, sophisticated layering, and a typography-first hierarchy that breathes.

---

## 2. Colors
Our palette is rooted in the warmth of the hearth and the freshness of the garden. We use a sophisticated interplay of deep oranges (`primary`) and garden greens (`secondary`) set against a creamy, appetizing background (`surface`).

### The "No-Line" Rule
To maintain a high-end feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts or subtle tonal transitions.
*   **Primary Sectioning:** Use `surface` (#fff4ef) for the main canvas.
*   **Secondary Sectioning:** Use `surface-container-low` (#ffede4) to define distinct content areas.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
*   **Base:** `surface` (#fff4ef)
*   **Layer 1 (The Page):** `surface-container-low` (#ffede4)
*   **Layer 2 (The Card):** `surface-container-lowest` (#ffffff) sitting on Layer 1. This creates a soft, natural "lift" without needing a drop shadow.

### The "Glass & Gradient" Rule
For floating action elements (like a "View Cart" bar), use Glassmorphism. Apply a semi-transparent version of `surface_container_highest` (#ffd4b9) with a 20px backdrop-blur. 
For main CTAs, use a signature gradient: `primary` (#9c3f00) transitioning into `primary_container` (#ff7a2f) at a 135-degree angle to provide a "cooked" visual soul.

---

## 3. Typography
We use **Plus Jakarta Sans** across the board. Its modern, geometric yet friendly curves perfectly complement our rounded UI.

*   **The Hero Statement:** Use `display-lg` for category titles (e.g., "Morning Harvest"). These should often be slightly offset or overlapping a product image to break the grid.
*   **The Appetizer (Headlines):** `headline-md` is our workhorse for product names. It should feel authoritative and bold.
*   **The Detail (Labels):** Use `label-md` for metadata like "15-20 min" or "Vegan." This should always be paired with `on-surface-variant` (#7f512e) to maintain a soft secondary hierarchy.

---

## 4. Elevation & Depth
In this system, depth is a feeling, not a structure. 

### The Layering Principle
Hierarchy is achieved by "stacking" surface tiers. Place a `surface-container-lowest` card on a `surface-container-low` background. The subtle 2-3% shift in lightness is enough to signify a new container without the "clutter" of a border.

### Ambient Shadows
When an element must float (e.g., a modal or a primary button), use **Ambient Shadows**:
*   **Blur:** 24px - 40px
*   **Opacity:** 6%
*   **Color:** Use `on-surface` (#4a2506) rather than black. This ensures the shadow feels like a warm reflection of the content.

### The "Ghost Border" Fallback
If an element lacks contrast against a specific background, use a **Ghost Border**: `outline-variant` (#dba078) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Pill-shaped (Rounded `full`). Gradient of `primary` to `primary_container`. Text color: `on_primary` (#fff0ea).
*   **Secondary:** Rounded `md` (1.5rem). Background: `secondary_container` (#b9eeab). Text: `on_secondary_container` (#2d5a27). Use these for "Add to Cart" within product lists.

### Cards & Product Catalogs
*   **The Forbiddance:** No divider lines. Use Spacing `6` (2rem) to separate cards.
*   **Style:** Rounded `lg` (2rem). Use `surface-container-lowest` for the card body. 
*   **Imagery:** Images should bleed off the top of the card or be "broken" (floating slightly outside the card container) to create an editorial feel.

### Chips (Filters)
*   **Selection Chips:** Rounded `full`. Unselected: `surface-container-high` (#ffdcc6). Selected: `secondary` (#386631) with `on_secondary` (#d2ffc4) text.

### Input Fields
*   **Style:** Rounded `sm` (0.5rem). 
*   **Background:** `surface-container-highest` (#ffd4b9). 
*   **Active State:** Use a 2px "Ghost Border" of `primary` (#9c3f00) at 40% opacity.

### Featured Component: "The Chef’s Overlay"
For high-end dishes, use a "Hero Card" that spans 90% of the screen width. Use a `display-sm` title that overlaps the product image by 20px (Spacing `6`). This intentional collision creates a bespoke, non-template look.

---

## 6. Do's and Don'ts

### Do:
*   **Use Asymmetry:** Allow product images to be larger than their containers.
*   **Embrace Negative Space:** Use Spacing `12` (4rem) or `16` (5.5rem) between major sections to let the "vibrance" of the colors shine.
*   **Layer with Intent:** Always check if a background color shift can replace a line.

### Don't:
*   **Don't use #000000:** Ever. Use `on-background` (#4a2506) for text and `inverse-surface` (#1c0900) for deep neutrals.
*   **Don't use standard Grids:** Avoid the "3-column uniform grid." Try a "Big-Small-Small" masonry layout for product catalogs to keep the eye moving.
*   **Don't use Sharp Corners:** Even for small elements like checkboxes, use at least Rounded `sm`. Our world is soft and organic.

---

## 7. Spacing Summary
*   **Internal Padding:** Use Spacing `4` (1.4rem).
*   **External Margins:** Use Spacing `6` (2rem).
*   **Section Gaps:** Use Spacing `10` (3.5rem) to `16` (5.5rem).