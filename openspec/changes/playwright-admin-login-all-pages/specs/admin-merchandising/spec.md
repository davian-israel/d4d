## ADDED Requirements

### Requirement: Primary admin routes remain reachable after administrator authentication

After an administrator signs in through the supported credentials flow, the merchandising console SHALL allow access to **Overview**, **Categories**, **Products**, **Featured**, and **Sales** via the admin shell without requiring direct URL bookmarking only—navigation SHALL reach each area when exercised by automated tests aligned with **`AdminShell`**.

#### Scenario: Authenticated admin opens each shell area

- **WHEN** an administrator completes sign-in and follows the shell navigation to each primary area
- **THEN** each corresponding route SHALL render its operational UI shell (not an error boundary-only page) for that area
