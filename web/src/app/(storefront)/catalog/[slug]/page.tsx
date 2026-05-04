import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCartQuantityByProductId } from "@/lib/cart";
import { CatalogProductCard } from "@/components/catalog-product-card";

interface CatalogCollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CatalogCollectionPage({ params }: CatalogCollectionPageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) notFound();

  const products = await prisma.product.findMany({
    where: { published: true, categoryId: category.id },
    orderBy: { name: "asc" },
    include: { category: true },
  });

  const qtyByProduct = await getCartQuantityByProductId();

  return (
    <main className="selection:bg-primary-container selection:text-white">
      <section className="mb-12 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6 font-body text-sm text-on-surface-variant">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/catalog" className="text-primary underline underline-offset-4">
                  Catalog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-on-surface">{category.name}</li>
            </ol>
          </nav>
          <h1 className="font-headline text-4xl text-primary md:text-5xl">{category.name}</h1>
          <p className="mt-4 max-w-xl font-body text-on-surface-variant">
            Pieces in this collection — same cart and checkout as the full catalog.
          </p>
        </div>
      </section>

      <section className="mb-20 px-6 md:px-12">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id}>
              <CatalogProductCard
                product={{
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  categoryName: p.category.name,
                  priceCents: p.priceCents,
                  currencyCode: p.currencyCode,
                  imageUrl: p.imageUrl,
                  stockQuantity: p.stockQuantity,
                }}
                cartQuantity={qtyByProduct[p.id] ?? 0}
              />
            </li>
          ))}
        </ul>
        {products.length === 0 ? (
          <p className="mt-8 text-on-surface-variant">
            No products in this collection yet.{" "}
            <Link href="/catalog" className="text-primary underline">
              Browse the full catalog
            </Link>
            .
          </p>
        ) : null}
      </section>
    </main>
  );
}
