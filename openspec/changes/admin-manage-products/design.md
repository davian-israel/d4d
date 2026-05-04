## Decisions

1. **Primary key for edit URLs**: Use stable **`Product.id`** (cuid) in admin routes; **slug** remains unique for storefront URLs but may change in an edit only if no conflicting row exists (optional feature—initial pass may treat slug as immutable on edit to avoid broken links).
2. **Update schema**: Reuse **`adminProductSchema`** with optional refinements (e.g. **`id`** field for updates only in an `updateProductSchema`).
3. **Deletion**: Prefer **guard**: `deleteProduct` **SHALL** fail with a clear error if `orderLine.count({ where: { productId } }) > 0`. If count is zero, delete product; Prisma will handle **`FeaturedPlacement`** (`onDelete: Cascade`); **`CartItem`** rows may still block delete depending on DB foreign-key behaviour—implementers **SHOULD** delete orphaned cart lines for that product or document **Restrict** and surface a message.
4. **List performance**: Start with server-rendered list of all products or paginated `findMany` (order by `name`); add search/filter in a later iteration unless trivial.
5. **Playwright-first delivery**: Implementers **SHALL** (a) add Playwright coverage for every admin product behaviour in this change, (b) run the suite (`npm run test:e2e` or documented subset), (c) implement app code until tests pass. Test maintenance rule: **only modify failing tests** or **add** missing cases—leave **passing** tests unchanged unless a product requirement explicitly changes.

## Non-goals (this change)

- Bulk CSV import, image upload to blob storage (URL field remains).
- Audit log table for admin mutations.
