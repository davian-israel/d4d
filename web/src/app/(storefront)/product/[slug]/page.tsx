import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { AddToCartButton } from "@/components/add-to-cart-button";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, published: true },
    include: { category: true },
  });
  if (!product) notFound();

  const detailLines = product.description
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const secondarySrc = product.imageUrl;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-32 pt-6 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="relative group">
            <div className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-tl-xl border-l-2 border-t-2 border-primary/20 md:block" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface-container-highest shadow-lg lg:aspect-auto lg:min-h-[420px]">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              ) : null}
            </div>
          </div>
          {secondarySrc ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-container-highest">
                <Image
                  src={secondarySrc}
                  alt={`${product.name} detail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-container-highest">
                <Image
                  src={secondarySrc}
                  alt={`${product.name} lifestyle`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-10 lg:sticky lg:top-32 lg:col-span-5">
          <header className="space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-xs font-medium uppercase tracking-widest text-secondary">
                {product.category.name} / {product.slug.slice(0, 24)}
              </span>
              <span className="font-headline text-2xl font-bold text-primary">
                {formatCents(product.priceCents, product.currencyCode)}
              </span>
            </div>
            <h1 className="font-headline text-4xl leading-tight text-on-surface md:text-5xl">
              {product.name}
            </h1>
            <p className="font-light leading-relaxed text-secondary">
              {detailLines[0] ?? product.description}
            </p>
            <p className="text-sm text-on-surface-variant" data-testid="product-stock">
              {product.stockQuantity < 1
                ? "Out of stock"
                : product.stockQuantity <= 5
                  ? `Only ${product.stockQuantity} left in stock`
                  : `${product.stockQuantity} in stock`}
            </p>
          </header>

          <div className="rounded-xl border-l-4 border-primary bg-secondary-container/30 p-8 backdrop-blur-sm">
            <p className="text-center font-headline text-lg italic leading-relaxed text-primary">
              &ldquo;For you are my rock and my fortress; and for your name&apos;s sake you lead me
              and guide me.&rdquo;
            </p>
            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-widest text-primary/70">
              Psalm 31:3
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6">
              <div className="mt-1 flex gap-4">
                <span className="material-symbols-outlined text-primary">
                  featured_seasonal_and_gifts
                </span>
                <div>
                  <h4 className="text-sm font-semibold">Sanctuary gifting</h4>
                  <p className="mt-1 text-xs text-secondary">
                    Includes hand-pressed scripture card and linen dust bag on qualifying orders.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <AddToCartButton
                productId={product.id}
                variant="hero"
                disabled={product.stockQuantity < 1}
              />
              <p className="text-center text-[10px] uppercase tracking-[0.2em] text-secondary/60">
                Ethically crafted in limited batches
              </p>
            </div>
          </div>

          {detailLines.length > 1 ? (
            <div className="space-y-6 pt-8">
              <details className="group border-t border-outline-variant/20 pt-6" open>
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="font-label text-sm font-semibold uppercase tracking-widest">
                    Craftsmanship details
                  </span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <ul className="mt-4 space-y-3 text-sm leading-loose text-secondary">
                  {detailLines.slice(1).map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40" />
                      {line}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
