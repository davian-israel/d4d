import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { AddToCartButton } from "@/components/add-to-cart-button";

export default async function FeaturedCarouselPage() {
  const placements = await prisma.featuredPlacement.findMany({
    orderBy: { sortOrder: "asc" },
    include: { product: true },
  });

  return (
    <main className="pb-12 pt-6">
      <section className="px-6 py-16">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-background md:text-4xl">
              The Curated Batch
            </h1>
            <p className="text-on-surface-variant">Handpicked editorial offerings — mobile-first carousel.</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant text-on-surface transition-colors hover:bg-surface-container"
              aria-label="Previous"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant text-on-surface transition-colors hover:bg-surface-container"
              aria-label="Next"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="no-scrollbar flex snap-x gap-8 overflow-x-auto pb-8">
          {placements.map((f) => (
            <article
              key={f.id}
              className="group min-w-[320px] shrink-0 snap-start md:min-w-[400px]"
              data-testid="featured-carousel-card"
            >
              <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-lg bg-surface-container-lowest">
                {f.product.imageUrl ? (
                  <Image
                    src={f.product.imageUrl}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="400px"
                  />
                ) : null}
                <div className="absolute bottom-6 right-6">
                  <AddToCartButton productId={f.product.id} variant="icon" />
                </div>
                <div className="absolute left-6 top-6 rounded-full bg-surface/90 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur">
                  Featured
                </div>
              </div>
              <Link href={`/product/${f.product.slug}`}>
                <h2 className="mb-1 font-headline text-2xl font-bold">{f.product.name}</h2>
              </Link>
              <div className="flex items-center justify-between">
                <span className="font-medium text-on-surface-variant">Sacred Earth</span>
                <span className="font-headline text-xl font-extrabold text-primary">
                  {formatCents(f.product.priceCents, f.product.currencyCode)}
                </span>
              </div>
            </article>
          ))}
          {placements.length === 0 ? (
            <p className="text-on-surface-variant">No featured products yet. Seed the database.</p>
          ) : null}
        </div>
      </section>

      <section className="mx-6 mb-20 rounded-xl bg-surface-container-low px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-2xl md:h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="order-1 space-y-6 md:order-2">
            <span className="mb-6 block text-xs font-bold uppercase tracking-[0.3em] text-secondary">
              The Philosophy
            </span>
            <h2 className="mb-8 font-headline text-4xl font-bold leading-tight text-on-background md:text-5xl">
              Crafting a Divine <span className="italic text-primary">Daily Ritual.</span>
            </h2>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              Destiny4Divine curates essentials that bridge high-fashion editorial and the comfort of
              your living room — same pacing as the prototype carousel page, with Sacred Earth
              tokens.
            </p>
            <Link
              href="/catalog"
              className="mt-10 inline-flex items-center gap-4 font-extrabold text-primary transition-all duration-300 hover:gap-6"
            >
              Shop the collection
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
