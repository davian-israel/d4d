## Scope

| Area | Live test | Notes |
|------|-----------|--------|
| Home, catalog, PDP, featured | Yes | Read-heavy |
| Main nav (desktop + mobile) | Yes | Same IA as dev |
| Contact invalid email | Yes | No persisted contact row on validation failure |
| Add to cart + cart page | Yes | Mutates cart for anonymous session |
| Checkout UI with line items | Yes | Assert form; **do not** submit paid checkout on production |
| Admin login + dashboard + one shell link | Yes | Requires `PLAYWRIGHT_PROD_ADMIN_PASSWORD` |
| Customer login + account | Yes, if creds provided | Production seed often omits customer; skip when unset |
| Thank-you / mock checkout | **No** | `VERCEL_ENV=production` forbids mock path; real charges out of scope |

## Credentials

- `PLAYWRIGHT_PROD_ADMIN_EMAIL` (optional; default `admin@destiny4divine.test`)
- `PLAYWRIGHT_PROD_ADMIN_PASSWORD` (**required** for admin tests)
- `PLAYWRIGHT_PROD_CUSTOMER_EMAIL` / `PLAYWRIGHT_PROD_CUSTOMER_PASSWORD` (optional pair for customer tests)

## Rate and parallelism

- `workers: 1`, reasonable timeouts for WAN latency.

## Non-goals

- Load testing production.
- Writing production secrets into the repository.
