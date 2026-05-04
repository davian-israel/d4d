"use client";

import { useActionState } from "react";
import { createCategory } from "@/lib/actions/admin/categories";

interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  _count: { products: number };
}

export function AdminCategoriesClient({ categories }: { categories: CategoryRow[] }) {
  const [state, action] = useActionState(createCategory, null);

  return (
    <div className="space-y-12">
      <section className="flex flex-col justify-between gap-6 border-b border-outline-variant/20 pb-8 md:flex-row md:items-end">
        <div className="space-y-2">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Inventory management
          </p>
          <h1 className="font-headline text-4xl text-on-surface md:text-5xl">Category vault</h1>
          <p className="max-w-md font-body text-on-surface-variant">
            Organize your sacred collections through curated taxonomies and inventory flow control.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 rounded-[2rem] bg-surface-container-low p-8 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-2xl text-on-surface">Collections</h2>
            <span className="material-symbols-outlined text-outline">analytics</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.length === 0 ? (
              <p className="text-sm text-on-surface-variant">No categories yet. Add one below.</p>
            ) : (
              categories.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-sm"
                >
                  <p className="font-headline text-lg text-on-surface">{c.name}</p>
                  <p className="mt-1 font-mono text-xs text-on-surface-variant">{c.slug}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-primary">
                    {c._count.products} products
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[2rem] bg-surface-container-high p-8">
          <h2 className="mb-6 font-headline text-2xl text-on-surface">Add category</h2>
          <form action={action} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
                Name
              </label>
              <input
                name="name"
                required
                className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 text-on-surface outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
              />
              {state && "fieldErrors" in state && state.fieldErrors?.name ? (
                <p className="mt-1 text-sm text-red-700">{state.fieldErrors.name}</p>
              ) : null}
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-secondary">
                Slug (kebab-case)
              </label>
              <input
                name="slug"
                required
                className="mt-2 w-full rounded-xl border-0 bg-surface-container-lowest px-4 py-3 text-on-surface outline outline-1 outline-outline-variant/20 focus:outline-2 focus:outline-primary/30"
              />
              {state && "fieldErrors" in state && state.fieldErrors?.slug ? (
                <p className="mt-1 text-sm text-red-700">{state.fieldErrors.slug}</p>
              ) : null}
            </div>
            <button
              type="submit"
              className="editorial-gradient mt-4 flex w-full items-center justify-center gap-2 rounded-full py-4 font-medium text-on-primary shadow-lg transition-opacity hover:opacity-95"
              data-testid="admin-category-submit"
            >
              <span className="material-symbols-outlined">add</span>
              Add category
            </button>
            {state && "ok" in state && state.ok ? (
              <p className="text-sm text-green-800">Saved.</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
