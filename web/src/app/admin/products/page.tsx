import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminProductCreateForm } from "@/components/admin/admin-product-create-form";

function formatPrice(cents: number, currency: string) {
  return `${(cents / 100).toFixed(2)} ${currency}`;
}

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: { name: "asc" },
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const categoryOptions = categories.map((c) => ({ id: c.id, name: c.name }));

  return (
    <div className="space-y-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="mb-2 block font-label text-xs uppercase tracking-[0.2em] text-outline">
            Curation hub
          </span>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
            Product inventory
          </h1>
          <p className="mt-2 text-secondary">Create and publish items for the storefront.</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-outline-variant/10 bg-surface-container-low">
        <table className="w-full min-w-[640px] text-left text-sm" data-testid="admin-products-table">
          <thead className="border-b border-outline-variant/15 font-label text-xs uppercase tracking-widest text-secondary">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-outline-variant/10" data-testid="admin-product-row">
                <td className="px-4 py-3 font-medium text-on-surface">{p.name}</td>
                <td className="px-4 py-3 text-on-surface-variant">{p.slug}</td>
                <td className="px-4 py-3 text-on-surface-variant">{p.category.name}</td>
                <td className="px-4 py-3">{formatPrice(p.priceCents, p.currencyCode)}</td>
                <td className="px-4 py-3">{p.stockQuantity}</td>
                <td className="px-4 py-3">{p.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-primary underline"
                    data-testid="admin-product-edit"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 ? (
          <p className="p-6 text-on-surface-variant" data-testid="admin-products-empty">
            No products yet.
          </p>
        ) : null}
      </div>

      <AdminProductCreateForm categories={categoryOptions} />
    </div>
  );
}
