import Image from "next/image";
import Link from "next/link";
import { getOrCreateCart } from "@/lib/cart";
import { formatCents } from "@/lib/money";
import { removeCartItemForm } from "@/lib/actions/cart";
import { CartLineQuantity } from "@/components/cart-line-quantity";

export default async function CartPage() {
  const cart = await getOrCreateCart();
  const subtotal = cart.items.reduce(
    (sum, i) => sum + i.product.priceCents * i.quantity,
    0,
  );
  const taxCents = 0;

  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-6 md:pt-8">
      <section className="mb-10 md:mb-12">
        <span className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Sacred Selection
        </span>
        <h1 className="font-headline text-4xl leading-tight tracking-tight text-on-surface md:text-5xl">
          Your Curated Journey
        </h1>
        <p className="mt-4 max-w-md border-l-2 border-outline-variant/30 pl-4 font-body italic text-on-surface-variant">
          Items chosen with intention, awaiting their place in your daily rituals of grace.
        </p>
      </section>

      {cart.items.length === 0 ? (
        <p className="text-on-surface-variant">
          Your cart is empty.{" "}
          <Link href="/catalog" className="text-primary underline">
            Browse the catalog
          </Link>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            {cart.items.map((item) => (
              <div key={item.id} className="group flex items-start gap-6">
                <div className="relative h-40 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-surface-container-highest shadow-sm">
                  {item.product.imageUrl ? (
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="128px"
                    />
                  ) : null}
                </div>
                <div className="flex flex-grow flex-col py-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-headline text-xl text-on-surface">{item.product.name}</h3>
                      <p className="mt-1 font-body text-sm text-on-surface-variant">
                        {item.product.category.name}
                        {" · "}
                        Line{" "}
                        {formatCents(
                          item.product.priceCents * item.quantity,
                          item.product.currencyCode,
                        )}
                      </p>
                    </div>
                    <span className="font-headline text-lg text-primary">
                      {formatCents(item.product.priceCents, item.product.currencyCode)}
                    </span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <CartLineQuantity itemId={item.id} quantity={item.quantity} />
                    <form action={removeCartItemForm}>
                      <input type="hidden" name="itemId" value={item.id} />
                      <button
                        type="submit"
                        className="text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-error"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl bg-surface-container-low p-8">
              <h2 className="mb-8 border-b border-outline-variant/20 pb-4 font-headline text-2xl">
                Order Summary
              </h2>
              <div className="mb-8 space-y-4">
                <div className="flex justify-between font-body text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-medium text-on-surface">{formatCents(subtotal)}</span>
                </div>
                <div className="flex justify-between font-body text-on-surface-variant">
                  <span>Shipping</span>
                  <span className="font-medium italic text-on-surface">Calculated at next step</span>
                </div>
                <div className="flex justify-between font-body text-on-surface-variant">
                  <span>Taxes</span>
                  <span className="font-medium text-on-surface">{formatCents(taxCents)}</span>
                </div>
              </div>
              <div className="mb-10 flex items-end justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                  Estimated Total
                </span>
                <span className="font-headline text-3xl text-primary">{formatCents(subtotal + taxCents)}</span>
              </div>
              <Link
                href="/checkout"
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-container py-5 font-body text-sm font-semibold uppercase tracking-wider text-on-primary shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                data-testid="checkout-link"
              >
                Proceed to Checkout
              </Link>
              <div className="mt-8 flex items-center justify-center gap-2 border-t border-outline-variant/10 pt-6 text-[10px] uppercase tracking-widest text-on-surface-variant/60">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span>Secure Checkout Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
