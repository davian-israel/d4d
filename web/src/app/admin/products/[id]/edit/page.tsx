import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminProductEditForm } from "@/components/admin/admin-product-edit-form";

interface AdminProductEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProductEditPage({ params }: AdminProductEditPageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  const categoryOptions = categories.map((c) => ({ id: c.id, name: c.name }));

  return (
    <div>
      <div className="mb-8">
        <span className="mb-2 block font-label text-xs uppercase tracking-[0.2em] text-outline">
          Curation hub
        </span>
        <h1 className="font-headline text-3xl font-bold text-primary">Edit: {product.name}</h1>
      </div>
      <AdminProductEditForm product={product} categories={categoryOptions} />
    </div>
  );
}
