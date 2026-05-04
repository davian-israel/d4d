import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCartQuantityByProductId } from "@/lib/cart";
import { CatalogProductCard } from "@/components/catalog-product-card";

export default async function CatalogPage() {
  const products = await prisma.product.findMany({
    where: { published: true },
    orderBy: { name: "asc" },
    include: { category: true },
  });

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  const qtyByProduct = await getCartQuantityByProductId();

  return (
    <main className="selection:bg-primary-container selection:text-white" data-testid="storefront-catalog-page">
      <section className="mb-20 px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-end gap-8 md:flex-row">
          <div className="md:w-1/2">
            <h1 className="font-headline mb-6 text-5xl leading-[1.1] text-primary md:text-7xl">
              Sacred Wear for <br />
              <span className="font-headline italic">The Modern Soul</span>
            </h1>
            <p className="max-w-md font-body text-lg leading-relaxed text-on-surface-variant">
              A curated collection of artifacts and apparel, designed to be a testament of faith in
              the contemporary world.
            </p>
          </div>
          <div className="h-64 w-full overflow-hidden rounded-xl bg-surface-container-highest md:h-[400px] md:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
              alt=""
              width={800}
              height={533}
              className="h-full w-full object-cover mix-blend-multiply opacity-80"
            />
          </div>
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-8 px-6 md:px-12">
          <h2 className="font-headline text-2xl tracking-tight text-primary">The Collections</h2>
        </div>
        <div className="hide-scrollbar flex gap-6 overflow-x-auto px-6 md:px-12">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/catalog/${c.slug}`}
              className="group w-48 flex-none cursor-pointer"
            >
              <div className="mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-surface-container transition-transform group-hover:scale-[1.02]">
                <div className="flex h-full w-full items-center justify-center bg-surface-container-high p-4 text-center font-headline text-sm text-primary">
                  {c.name}
                </div>
              </div>
              <span className="font-body text-xs font-medium uppercase tracking-widest text-secondary">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-20 px-6 md:px-12">
        <div className="mb-12">
          <h2 className="font-headline text-3xl text-primary">Signature Artifacts</h2>
          <div className="mt-4 h-1 w-12 bg-primary" />
        </div>
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
          <p className="mt-8 text-on-surface-variant">No products yet. Run migrations and seed.</p>
        ) : null}
      </section>
    </main>
  );
}
