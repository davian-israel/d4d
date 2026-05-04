## ADDED Requirements

### Requirement: Tailwind theme matches prototype script tokens

The system SHALL define Tailwind theme extensions (colors, font families `headline`, `body`, `label`, and border radii) that match the values in the `<script id="tailwind-config">` blocks used across the Stitch `code.html` prototypes for Destiny4Divine (Sacred Earth palette).

#### Scenario: Token parity check

- **WHEN** a developer compares `primary`, `surface`, `on-surface`, and `surface-container-low` tokens in the Next app theme to `home_page_sacred_style/code.html`
- **THEN** the hex values and font family names SHALL be identical unless a documented exception exists

### Requirement: Shared CSS from prototypes is centralized

The system SHALL reproduce prototype global rules—at minimum `.material-symbols-outlined` font-variation settings and shared utilities present across prototypes such as `.editorial-shadow`, `.editorial-gradient`, `.glass-panel`, and `.no-scrollbar` where those classes appear in reference HTML—in a single global stylesheet used by the Next app.

#### Scenario: Utility class behavior

- **WHEN** a page uses the class `editorial-shadow` as in the reference HTML
- **THEN** the rendered shadow SHALL match the prototype CSS definition (same blur/spread/color intent)

### Requirement: Mobile-first defaults

The system SHALL style all updated parity pages mobile-first: base layouts target narrow viewports, with `md:` / `lg:` breakpoints used consistently with the reference HTML for that page family (e.g. drawer visible only from `md`, extra horizontal padding only from `md`).

#### Scenario: Viewport width 375px

- **WHEN** the storefront home page is rendered at 375px width
- **THEN** navigation and hero stacking SHALL match the mobile structure of `home_page_sacred_style/code.html` (no reliance on desktop-only layout as the default)

### Requirement: No production Tailwind CDN dependency

The system SHALL NOT depend on `cdn.tailwindcss.com` for production bundles; styles SHALL be compiled into the Next.js build while preserving class names from the prototypes.

#### Scenario: Production build

- **WHEN** a production build is produced
- **THEN** HTML responses SHALL not require the Tailwind CDN script for correct layout
