"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteProduct, updateProduct } from "@/lib/actions/admin/products";
import type { AdminCategoryOption } from "@/components/admin/admin-product-create-form";

interface AdminProductEditFormProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    priceCents: number;
    currencyCode: string;
    stockQuantity: number;
    categoryId: string;
    imageUrl: string | null;
    published: boolean;
  };
  categories: AdminCategoryOption[];
}

export function AdminProductEditForm({ product, categories }: AdminProductEditFormProps) {
  const router = useRouter();
  const [updateState, updateAction] = useActionState(updateProduct, null);
  const [deleteState, deleteAction] = useActionState(deleteProduct, null);

  useEffect(() => {
    if (updateState && "ok" in updateState && updateState.ok) router.refresh();
  }, [updateState, router]);

  return (
    <div className="space-y-10">
      <p>
        <Link href="/admin/products" className="text-primary underline">
          ← Back to inventory
        </Link>
      </p>
      <div className="max-w-2xl rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8">
        <h2 className="font-headline text-lg text-on-surface">Edit product</h2>
        <form action={updateAction} data-testid="admin-product-edit-form" className="mt-6 space-y-4">
          <input type="hidden" name="id" value={product.id} />
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
              Name
            </label>
            <input
              name="name"
              required
              defaultValue={product.name}
              className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
            />
            {updateState && "fieldErrors" in updateState && updateState.fieldErrors?.name ? (
              <p className="mt-1 text-sm text-red-700">{updateState.fieldErrors.name}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
              Slug
            </label>
            <input
              name="slug"
              required
              defaultValue={product.slug}
              className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
            />
            {updateState && "fieldErrors" in updateState && updateState.fieldErrors?.slug ? (
              <p className="mt-1 text-sm text-red-700">{updateState.fieldErrors.slug}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={product.description}
              className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
              Price (minor units, e.g. cents)
            </label>
            <input
              name="priceCents"
              type="number"
              min={1}
              required
              defaultValue={product.priceCents}
              className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
              Currency
            </label>
            <select
              name="currencyCode"
              defaultValue={product.currencyCode}
              className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
            >
              <option value="CAD">CAD</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
              Stock quantity
            </label>
            <input
              name="stockQuantity"
              type="number"
              min={0}
              required
              defaultValue={product.stockQuantity}
              className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
              Category
            </label>
            <select
              name="categoryId"
              required
              defaultValue={product.categoryId}
              className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
              Image URL (optional)
            </label>
            <input
              name="imageUrl"
              defaultValue={product.imageUrl ?? ""}
              className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={product.published} />
            Published
          </label>
          <button
            type="submit"
            data-testid="admin-product-update-submit"
            className="editorial-gradient rounded-full px-8 py-3 text-sm font-medium text-on-primary shadow-lg"
          >
            Save changes
          </button>
          {updateState && "ok" in updateState && updateState.ok ? (
            <p className="text-sm text-green-800" data-testid="admin-product-update-success">
              Saved.
            </p>
          ) : null}
        </form>
      </div>

      <div className="max-w-2xl rounded-2xl border border-outline-variant/20 bg-surface-container-low p-8">
        <h3 className="font-headline text-lg text-on-surface">Danger zone</h3>
        <p className="mt-2 text-sm text-on-surface-variant">
          Delete only if this SKU has never been ordered. Otherwise unpublish above.
        </p>
        <form action={deleteAction} className="mt-4">
          <input type="hidden" name="id" value={product.id} />
          <button
            type="submit"
            data-testid="admin-product-delete-submit"
            className="rounded-full border border-red-800/40 bg-transparent px-6 py-2 text-sm font-medium text-red-800"
          >
            Delete product
          </button>
        </form>
        {deleteState && "ok" in deleteState && !deleteState.ok && "error" in deleteState ? (
          <p className="mt-2 text-sm text-red-700" data-testid="admin-product-delete-error">
            {deleteState.error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
