## Why

**Production** uses **admin credentials** set at seed time (`SEED_ENV=production`, strong `SEED_ADMIN_PASSWORD`)—not the documented development defaults. A deploy can succeed while **Auth.js**, **DATABASE_URL**, **`AUTH_SECRET`**, or a mismatched seed leaves **no working admin**. Teams need a **normative** reminder to **verify sign-in on the production URL** before hand-off, without storing production passwords in git.

## What Changes

- **OpenSpec**: Add requirements for **production admin credential verification** (post-seed, post-deploy) and clarify separation between **Playwright/CI** (dev seed users) and **production smoke** (operator-held secrets).
- **Runbook**: Extend **`docs/PRODUCTION-CHECKLIST.md`** with an explicit **“verify admin login on production”** gate.

## Capabilities

### Modified Capabilities

- **`admin-merchandising`**: Operators **SHALL** confirm credentials sign-in for the production admin before treating merchandising as live.
- **`quality-playwright-ci`**: Automated admin E2E **SHALL** remain tied to **non-production** defaults or CI-injected secrets, **not** committed production passwords.

## Impact

- **`openspec/changes/admin-credentials-production-verification/**`**: proposal, design, tasks, spec deltas.
- **`web/docs/PRODUCTION-CHECKLIST.md`**: production admin login smoke item.
- **`web/docs/VERCEL.md`**: production admin smoke section and synthetic-monitor policy.

## Baseline references

- [web/README.md](../../../web/README.md) — local vs production seed, `/admin`.
- [production-database-seed/](../production-database-seed/) — `SEED_ENV=production` and admin env vars.
