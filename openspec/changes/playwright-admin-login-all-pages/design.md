## Context

The app uses **Auth.js** credentials and **`requireAdmin`** for mutations. **`AdminShell`** defines five primary links: Overview, Categories, Products, Featured, Sales (`web/src/components/admin/admin-shell.tsx`). **`loginAsAdmin`** in `web/e2e/helpers.ts` targets the seeded admin user. Existing **`admin-navigation.spec.ts`** exercises shell-driven navigation per layout but is tracked under a different OpenSpec change historically.

## Goals / Non-Goals

**Goals:**

- One **normative** Playwright path: **after successful admin login**, hit **each** primary admin URL (via shell navigation or an explicit ordered `goto` list after login—implementation choice) and assert a **stable landmark** per page (heading or `data-testid`).
- Keep **desktop** and **mobile** coverage consistent with current navigation patterns (sidebar vs drawer).

**Non-Goals:**

- Testing every server action or API route (covered elsewhere).
- Production Playwright credentials (separate production config).

## Decisions

1. **Single source of truth for routes**: Prefer a small exported constant array in the spec file (or shared `e2e/admin-routes.ts`) mirroring `AdminShell` `href` + label + assertion—avoids drift from duplicate strings.
2. **Reuse `loginAsAdmin`** rather than a second login helper.
3. **Implementation**: Either extend **`admin-navigation.spec.ts`** “every primary nav item” test with an explicit comment tying to OpenSpec, or add **`admin-login-all-pages.spec.ts`** that only runs the login + all-pages loop—choose whichever minimizes duplication with the mobile/desktop matrix already in **`admin-navigation.spec.ts`**.

**Alternatives considered:** Only `page.goto` each `/admin/*` without login first (rejected—does not verify the full **login → session → admin** path).

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Duplicate coverage vs `admin-navigation.spec.ts` | Share route table; avoid redundant assertions beyond landmarks. |
| Flaky mobile drawer | Reuse proven **`clickAdminNavLink`** / evaluate-click pattern from existing spec. |

## Migration Plan

None (tests + specs only).

## Open Questions

- Whether CI should run **one** consolidated “login + all pages” test or keep it merged into **`admin-navigation`** describes only.
