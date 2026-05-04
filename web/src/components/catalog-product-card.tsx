"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatCents } from "@/lib/money";

export interface CatalogProductCardProduct {
  id: string;
  slug: string;
  name: string;
  categoryName: string;
  priceCents: number;
  currencyCode: string;
  imageUrl: string | null;
  stockQuantity: number;
}

interface CatalogProductCardProps {
  product: CatalogProductCardProduct;
  cartQuantity: number;
}

export function CatalogProductCard({ product, cartQuantity }: CatalogProductCardProps) {
  const router = useRouter();
  const outOfStock = product.stockQuantity < 1;
  const ariaLabel =
    cartQuantity > 0
      ? `Add to cart, ${cartQuantity} already in cart`
      : "Add to cart";

  return (
    <div className="space-y-4" data-testid="product-card">
      <Link href={`/product/${product.slug}`} className="group block space-y-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-highest">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : null}
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-on-surface-variant">
            {product.categoryName}
          </p>
          <h3 className="font-headline text-xl text-on-surface">{product.name}</h3>
          <p className="text-sm font-semibold text-primary">
            {formatCents(product.priceCents, product.currencyCode)}
          </p>
        </div>
      </Link>
      <div className="flex justify-end">
        <div className="relative inline-flex">
          <AddToCartButton
            productId={product.id}
            variant="icon"
            disabled={outOfStock}
            onAfterAdd={() => router.refresh()}
            submitAriaLabel={ariaLabel}
          />
          {cartQuantity > 0 ? (
            <span
              className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-on-primary shadow-md"
              data-testid="catalog-cart-qty-badge"
              aria-hidden
            >
              {cartQuantity > 99 ? "99+" : cartQuantity}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
