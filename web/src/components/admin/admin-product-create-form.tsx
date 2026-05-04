"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/actions/admin/products";

export interface AdminCategoryOption {
  id: string;
  name: string;
}

interface AdminProductCreateFormProps {
  categories: AdminCategoryOption[];
}

export function AdminProductCreateForm({ categories }: AdminProductCreateFormProps) {
  const router = useRouter();
  const [state, action] = useActionState(createProduct, null);

  useEffect(() => {
    if (state && "ok" in state && state.ok) router.refresh();
  }, [state, router]);

  return (
    <div className="max-w-2xl rounded-2xl border border-outline-variant/10 bg-surface-container-low p-8">
      <h2 className="font-headline text-lg text-on-surface">New product</h2>
      <form action={action} data-testid="admin-product-create-form" className="mt-6 space-y-4">
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
            Name
          </label>
          <input
            name="name"
            required
            className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
          />
          {state && "fieldErrors" in state && state.fieldErrors?.name ? (
            <p className="mt-1 text-sm text-red-700" data-testid="admin-product-create-error-name">
              {state.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
            Slug
          </label>
          <input
            name="slug"
            required
            className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
          />
          {state && "fieldErrors" in state && state.fieldErrors?.slug ? (
            <p className="mt-1 text-sm text-red-700" data-testid="admin-product-create-error-slug">
              {state.fieldErrors.slug}
            </p>
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
            className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
            Currency
          </label>
          <select
            name="currencyCode"
            defaultValue="CAD"
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
            defaultValue={0}
            required
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
            className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
          >
            <option value="">Select…</option>
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
            className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked />
          Published
        </label>
        <button
          type="submit"
          data-testid="admin-product-create-submit"
          className="editorial-gradient rounded-full px-8 py-3 text-sm font-medium text-on-primary shadow-lg"
        >
          Create product
        </button>
        {state && "ok" in state && state.ok ? (
          <p className="text-sm text-green-800" data-testid="admin-product-create-success">
            Created.
          </p>
        ) : null}
      </form>
    </div>
  );
}
