## Context

The **Next.js** app under `web/` implements admin UX in `web/src/app/admin/*` with **`AdminShell`** navigation (`web/src/components/admin/admin-shell.tsx`). **Authorization** uses **`requireAdmin()`** in server actions (`web/src/lib/actions/admin/*.ts`) and role checks on **`/api/admin/*`**. Existing Playwright coverage includes **`admin-navigation.spec.ts`** (shell-driven nav + products edit reachability) and **`admin-products.spec.ts`** (inventory, create validation, full product lifecycle, delete blocked with orders). **`visual-parity.spec.ts`** loads several admin URLs but does not assert CRUD on categories, featured, or sales behavior.

Local verification assumes **PostgreSQL**, **`pnpm`** (or project-standard package manager), **`prisma migrate`**, and **`prisma db seed`** so seeded users (`admin@destiny4divine.test` per `loginAsAdmin`) and catalog data exist.

## Goals / Non-Goals

**Goals:**

- Produce a **single admin feature matrix** mapping UI routes → primary user-visible outcomes → existing vs missing automated tests.
- Run and document **local Playwright** for all admin specs; extend tests **only where specs demand coverage** and current suite is smoke-only.
- Keep **non-admin access denial** in scope for at least one automated scenario if not already covered elsewhere.

**Non-Goals:**

- Redesigning admin IA or visual design.
- Production deployment or staging-only credentials (see separate **admin-credentials-production-verification** change if needed).
- Full E2E of Square payment webhooks unless already part of sales page tests.

## Decisions

1. **Matrix lives in tasks + spec scenarios, not a duplicate long-lived doc** unless implementation adds a short `web/docs` note. Rationale: avoids drift; OpenSpec tasks checklist is the source of “reviewed” items.
2. **Prefer extending `web/e2e/` over new harnesses.** Reuse `loginAsAdmin`, `data-testid` patterns from products/navigation tests.
3. **Gap-fill tests are minimal behavioral assertions** (e.g. create category → visible in list; featured save → success banner) rather than exhaustive edge cases in the first pass.
4. **Local host target**: Playwright `baseURL` from project config (typically `http://127.0.0.1:3000`); document “start dev server before `pnpm exec playwright test`” in tasks.

**Alternatives considered:** Relying on manual QA only (rejected — specs require SHALL-level verification paths); a single giant integration test file (rejected — harder to maintain; mirror existing per-area specs).

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Flaky tests from timing or seed order | Use existing `waitForResponse` / visibility patterns; pin assertions to seeded slugs where possible. |
| Sales page needs orders in DB | Use seed data or a short setup step in the test (checkout flow already exists in `admin-products` delete-block test). |
| Duplicate coverage with `admin-navigation` | New tests focus on **mutations** and **area-specific** headings, not re-walking all nav links. |

## Migration Plan

Not applicable — documentation and tests only; no database migration.

## Open Questions

- Whether **customer** attempting `/admin` should be covered in this change or an existing auth e2e file (confirm with `grep` before implementing tasks).
