# Design System Strategy: Editorial Earth & Grace

## 1. Overview & Creative North Star

**Creative North Star: The Modern Scriptorium**
This design system is envisioned as a digital sanctuary. It moves away from the aggressive, fast-paced "app" aesthetic and toward the contemplative pacing of a high-end lifestyle editorial. By blending the warmth of traditional terracotta and cream with a sophisticated, high-contrast typographic scale, we create a "Modern Scriptorium"—an experience that feels both ancient in its wisdom and contemporary in its execution.

To break the "template" look, this system utilizes:
*   **Intentional Asymmetry:** Grid layouts are purposefully disrupted with overlapping elements and offset text blocks to mimic the feel of a curated physical catalogue.
*   **Breathing Room:** We use an expansive spacing scale to ensure every product and message feels significant.
*   **Tonal Depth:** Rather than using lines to separate ideas, we use the shifting weight of light and shadow on natural surfaces.

---

## 2. Colors

The palette is rooted in the "Sacred Earth" of the Mediterranean and the "Grace" of soft, atmospheric light.

### Palette Highlights
*   **Primary (#762E00) & Primary Container (#9C3F00):** Deep, resonant terracotta. Used for key actions and soulful accents.
*   **Surface Hierarchy (#FFF8F1 to #E8E1DA):** A range of warm creams and stone neutrals that form the "paper" of our digital editorial.

### Design Rules
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit against a `surface` background to create a soft, seamless transition.
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of fine vellum. An inner card should use `surface-container-highest` when placed on a `surface-container-low` background to provide natural depth without visual clutter.
*   **The "Glass & Gradient" Rule:** To provide visual "soul," use subtle linear gradients (e.g., `primary` to `primary_container`) for main CTAs. Floating navigation or modal elements should utilize "Glassmorphism" (semi-transparent surface colors with a `20px` backdrop-blur) to maintain a sense of environmental light.

---

## 3. Typography

The typographic pairing is a conversation between the decorative and the functional.

*   **Display & Headlines (Noto Serif):** A high-contrast, elegant serif. This carries the brand’s voice—traditional, authoritative, and graceful. Headlines should use generous tracking and, occasionally, italicized emphasis for an editorial touch.
*   **Body & Titles (Work Sans):** A clean, modern sans-serif. It provides a neutral, legible counterpoint to the serif, ensuring that even long-form scripture or product descriptions are effortless to read.

**Scale Philosophy:** 
We use a high-contrast scale. `display-lg` (3.5rem) is used sparingly for moments of inspiration, while `body-md` (0.875rem) remains grounded and highly readable on our cream surfaces.

---

## 4. Elevation & Depth

We reject the standard "drop shadow" in favor of **Ambient Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking tokens. Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, tactile "lift."
*   **Ambient Shadows:** When a true "floating" state is required (e.g., a primary action button or a modal), use an ultra-diffused shadow. 
    *   *Shadow Color:* A tinted version of `on-surface` at 5% opacity. 
    *   *Blur:* 32px to 64px.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.
*   **Organic Curves:** Follow the `Roundedness Scale`. Most containers use `DEFAULT` (0.5rem), but signature product images should use `xl` (1.5rem) or custom asymmetric radii (e.g., top-left and bottom-right only) to mimic organic, hand-crafted shapes.

---

## 5. Components

### Buttons
*   **Primary:** A gradient fill from `primary` to `primary_container`. Text in `on_primary`. Roundedness: `full`.
*   **Secondary:** `surface_container_high` background with `on_surface` text. No border.
*   **Tertiary:** Text-only in `primary` with a subtle `label-md` weight.

### Cards & Lists
*   **Forbid Dividers:** Do not use horizontal lines. Separate list items using the spacing scale (e.g., `spacing.5` or `1.7rem`) or subtle background alternations between `surface` and `surface-container-low`.
*   **Product Cards:** Images should be nested in `surface-container-highest` with a `lg` corner radius. The typography should sit flush to the left, using `title-md` for the product name and `body-sm` for descriptions.

### Input Fields
*   **Style:** Minimalist. A bottom-only "Ghost Border" using `outline-variant` at 20% opacity. 
*   **Focus State:** The bottom border transitions to a 2px `primary` (Terracotta) weight.

### Signature Component: The "Editorial Quote"
*   A specialized container using a semi-transparent `secondary_container` background, `backdrop-blur`, and centered `headline-md` Noto Serif text. Used for scripture or mission-critical messaging.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins to create an "art gallery" feel.
*   **Do** allow images to bleed off the edge of the container in hero sections.
*   **Do** use the full range of `surface-container` tokens to create a rich, tactile UI.
*   **Do** ensure all text on `primary` colors meets a 4.5:1 contrast ratio for accessibility.

### Don't
*   **Don't** use pure black (#000000) for text. Use `on_surface` (#1E1B17) to maintain warmth.
*   **Don't** use hard, 1px dark borders. They shatter the "Sacred Earth" organic feel.
*   **Don't** crowd elements. If a layout feels busy, increase the spacing to the next tier in the scale.
*   **Don't** use standard "Material Design" blue or high-vibrancy "digital" colors; stick strictly to the earthy, tonal palette.