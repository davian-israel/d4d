import { prisma } from "@/lib/prisma";
import {
  addFeaturedPlacement,
  removeFeaturedPlacement,
} from "@/lib/actions/admin/featured";

export default async function AdminFeaturedPage() {
  const [placements, products] = await Promise.all([
    prisma.featuredPlacement.findMany({
      orderBy: { sortOrder: "asc" },
      include: { product: true },
    }),
    prisma.product.findMany({ where: { published: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Curation console
          </span>
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary md:text-5xl">
            Manage featured products
          </h1>
          <p className="mt-2 text-on-surface-variant">
            Showcase selections on the home carousel and featured route.
          </p>
        </div>
      </div>

      <form
        action={addFeaturedPlacement}
        data-testid="admin-featured-add-form"
        className="flex max-w-2xl flex-wrap items-end gap-4 rounded-2xl bg-surface-container-low p-6"
      >
        <div className="min-w-[200px] flex-1">
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
            Product
          </label>
          <select
            name="productId"
            required
            className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-24">
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
            Sort
          </label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={0}
            className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20"
          />
        </div>
        <button
          type="submit"
          data-testid="admin-featured-add-submit"
          className="flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary-container px-6 py-3 text-sm font-bold text-on-primary shadow-lg"
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            add_circle
          </span>
          Add
        </button>
      </form>

      <ul data-testid="admin-featured-list" className="grid gap-4 sm:grid-cols-2">
        {placements.map((f) => (
          <li
            key={f.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Sort {f.sortOrder}
              </p>
              <p className="mt-1 font-headline text-lg">{f.product.name}</p>
            </div>
            <form action={removeFeaturedPlacement}>
              <input type="hidden" name="id" value={f.id} />
              <button type="submit" className="text-sm text-primary underline">
                Remove
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
