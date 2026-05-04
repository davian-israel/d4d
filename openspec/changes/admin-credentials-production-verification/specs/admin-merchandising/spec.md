# Capability: admin-merchandising (delta)

## ADDED Requirements

### Requirement: Production admin credentials verification

Before treating the **production** merchandising console as operational, operators **SHALL** verify that **credentials-based sign-in** works for the **production administrator** provisioned via the documented production seed process (or equivalent documented operator procedure). Development default usernames and passwords **SHALL NOT** be used as evidence of production readiness.

#### Scenario: Post-deploy admin reaches the dashboard

- **WHEN** an operator opens the **production** deployment’s **`/login`** page, submits the **production** admin email and password that were defined when seeding (or securely updated afterward), and is redirected to the admin area
- **THEN** the application **SHALL** render the **admin dashboard** without an authentication failure that would block merchandising work

#### Scenario: Production verification uses production origin

- **WHEN** performing this verification
- **THEN** the operator **SHALL** use the **production** site origin (custom domain or production deployment URL), **not** only a local or preview URL, unless preview is explicitly designated as the promoted environment under review
