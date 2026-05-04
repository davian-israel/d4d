import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getOrCreateCart } from "@/lib/cart";
import { CheckoutForm } from "@/components/checkout-form";
import { isMockCheckoutAllowed } from "@/lib/payments-policy";
import { formatCents } from "@/lib/money";

export default async function CheckoutPage() {
  const cart = await getOrCreateCart();
  if (cart.items.length === 0) {
    redirect("/cart");
  }

  const session = await auth();
  const lineItems = cart.items.map((i) => ({
    productId: i.productId,
    quantity: i.quantity,
  }));
  const subtotalCents = cart.items.reduce(
    (s, i) => s + i.product.priceCents * i.quantity,
    0,
  );
  const taxCents = 0;
  const totalCents = subtotalCents + taxCents;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-7">
          <nav
            className="mb-12 flex items-center space-x-4 font-label text-sm uppercase tracking-widest"
            aria-label="Checkout steps"
          >
            <span className="step-active">01 Review</span>
            <span className="text-outline-variant">/</span>
            <span className="step-inactive">02 Payment</span>
            <span className="text-outline-variant">/</span>
            <span className="step-inactive">03 Success</span>
          </nav>

          <section className="space-y-8">
            <div className="flex items-baseline justify-between">
              <h2 className="font-headline text-3xl italic tracking-tight">Delivery details</h2>
            </div>
            <div className="space-y-4 rounded-xl bg-surface-container-low p-8">
              <p className="text-lg font-medium leading-relaxed text-on-surface">
                Order updates and receipts go to the email you enter below.
              </p>
              <p className="text-sm text-on-surface-variant">
                Shipping address and fulfillment details can be confirmed with our team after
                purchase if needed.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="font-headline text-3xl italic tracking-tight">Payment method</h2>
            <CheckoutForm
              lineItems={lineItems}
              subtotalCents={subtotalCents}
              defaultEmail={session?.user?.email ?? ""}
              isLoggedIn={Boolean(session?.user)}
              allowMock={isMockCheckoutAllowed()}
              editorial
              showInlineTotal={false}
            />
          </section>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 space-y-8">
            <div className="rounded-2xl bg-surface-container p-8">
              <h3 className="mb-8 border-b border-outline-variant/20 pb-4 font-headline text-2xl">
                Order summary
              </h3>
              <div className="mb-10 space-y-8">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-6">
                    <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container-highest">
                      {item.product.imageUrl ? (
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        Ref · {item.product.slug}
                      </p>
                      <h4 className="mb-1 font-headline text-lg leading-tight">{item.product.name}</h4>
                      <p className="mb-4 text-sm italic text-on-surface-variant">
                        {item.product.category.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span className="font-semibold">
                          {formatCents(
                            item.product.priceCents * item.quantity,
                            item.product.currencyCode,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 border-t border-outline-variant/20 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span>{formatCents(subtotalCents)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Shipping</span>
                  <span className="italic text-primary">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Tax (est.)</span>
                  <span>{formatCents(taxCents)}</span>
                </div>
                <div className="flex justify-between border-t border-outline-variant/20 pt-4 font-headline text-xl">
                  <span>Total</span>
                  <span className="text-primary">{formatCents(totalCents)}</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-secondary-container/30 p-6 text-center backdrop-blur">
              <p className="font-headline text-sm italic text-on-secondary-container">
                &ldquo;May your journey be as purposeful as the garments you wear.&rdquo;
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
