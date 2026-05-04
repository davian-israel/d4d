import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { AddToCartButton } from "@/components/add-to-cart-button";

const HERO_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB9HV1CBVCswNH-ZIIa6qi1MS3ptl6WXTkR-BIWE0nnrNYSf5z7Op-UhuPwdXQ8HmkS-qAF_w81LXW1tAJbMSULY72u5z9BLgsbnO-z4EaTOnYOwqRczjgjAuYPqavU-6TrMAPV0gn88nERJ3GowxVXu5qbuYPUoxppvDB6JRZwYf2yB1i4cJFkc_SiXVS5TRjbyPw_aKXREIn2V0_Vg7V5QD6De9SemxuVwiaiq13r-alzLorsOLVvsGqDvh01jsuW1HhjD55qk2yy";

export default async function HomePage() {
  const featuredProducts = await prisma.featuredPlacement.findMany({
    orderBy: { sortOrder: "asc" },
    take: 3,
    include: { product: true },
  });

  return (
    <main className="relative overflow-hidden" data-testid="storefront-home-page">
      <section className="relative flex min-h-[751px] items-center overflow-hidden px-6 py-20 md:px-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMG}
            alt=""
            fill
            className="scale-105 object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Est. 2024
            </span>
            <h1 className="font-headline text-5xl leading-[1.1] tracking-tight text-primary md:text-7xl lg:text-8xl">
              Not Just Ink, <br />
              <span className="font-light italic">but a Calling</span>
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            Wear your testimony. Our collection blends sacred wisdom with modern editorial grace,
            crafted for those who walk in purpose.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/catalog"
              className="rounded-full bg-gradient-to-r from-primary to-primary-container px-8 py-4 font-medium text-on-primary editorial-shadow transition-transform hover:scale-105"
              data-testid="hero-shop"
            >
              Explore Collection
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-surface-container-high px-8 py-4 font-medium text-on-surface transition-colors hover:bg-surface-container-highest"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="space-y-2">
              <h2 className="font-headline text-4xl text-primary">Browse by Vessel</h2>
              <p className="max-w-md font-headline italic text-on-surface-variant">
                Select the medium that speaks to your daily journey.
              </p>
            </div>
          </div>
          <div className="grid h-auto grid-cols-1 gap-6 md:h-[600px] md:grid-cols-4 lg:grid-cols-6">
            <Link
              href="/catalog"
              className="relative min-h-[220px] overflow-hidden rounded-xl bg-surface-container-highest md:col-span-2 md:min-h-0 lg:col-span-3"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-headline mb-2 text-3xl">Hoodies</h3>
                <p className="text-sm uppercase tracking-widest opacity-80">Comfort in Spirit</p>
              </div>
            </Link>
            <Link
              href="/catalog"
              className="relative min-h-[220px] overflow-hidden rounded-xl bg-surface-container-highest md:col-span-2 md:min-h-0 lg:col-span-3"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-headline mb-2 text-3xl">T-Shirts</h3>
                <p className="text-sm uppercase tracking-widest opacity-80">Everyday Testimony</p>
              </div>
            </Link>
            <Link
              href="/catalog"
              className="relative min-h-[220px] overflow-hidden rounded-xl bg-surface-container-highest md:col-span-2 md:min-h-0 lg:col-span-2"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-headline text-2xl">Drinkware</h3>
              </div>
            </Link>
            <Link
              href="/catalog"
              className="relative min-h-[220px] overflow-hidden rounded-xl bg-surface-container-highest md:col-span-2 md:min-h-0 lg:col-span-4"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-headline text-2xl">Tote Bags</h3>
                <p className="text-sm uppercase tracking-widest opacity-80">Carry the Word</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-3xl rounded-[3rem] border border-white/20 bg-secondary-container/30 p-12 text-center editorial-shadow backdrop-blur-xl md:p-20">
          <span className="material-symbols-outlined mb-6 text-4xl text-primary">auto_stories</span>
          <h2 className="font-headline text-2xl italic leading-relaxed text-primary md:text-4xl">
            &quot;Thy word is a lamp unto my feet, and a light unto my path. We curate vessels that
            embody this light in every thread and fiber.&quot;
          </h2>
          <div className="mx-auto mt-8 h-px w-24 bg-primary opacity-30" />
          <p className="mt-6 font-body text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
            The Destiny Manifesto
          </p>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="space-y-2">
              <h2 className="font-headline text-5xl text-primary">Sacred Selections</h2>
              <p className="text-on-surface-variant">Our current most-cherished offerings.</p>
            </div>
            <Link
              href="/featured"
              className="group flex items-center gap-2 font-medium text-primary"
              data-testid="featured-carousel"
            >
              View featured carousel
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_right_alt
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {featuredProducts.map((f, i) => (
              <div
                key={f.id}
                className={`group space-y-6 ${i === 1 ? "md:translate-y-12" : ""}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-highest">
                  {f.product.imageUrl ? (
                    <Image
                      src={f.product.imageUrl}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                  <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <AddToCartButton productId={f.product.id} variant="icon" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Link href={`/product/${f.product.slug}`}>
                    <h3 className="font-headline text-xl text-primary">{f.product.name}</h3>
                  </Link>
                  <p className="text-sm text-on-surface-variant">From the collection</p>
                  <p className="pt-2 font-medium text-primary">
                    {formatCents(f.product.priceCents, f.product.currencyCode)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mt-24 overflow-hidden bg-surface-container px-6 py-24">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-2xl space-y-8 text-center">
          <h2 className="font-headline text-4xl text-primary">Join the Congregation</h2>
          <p className="leading-relaxed text-on-surface-variant">
            Receive first access to new collections, spiritual reflections, and exclusive offerings
            delivered to your digital doorstep.
          </p>
          <form className="flex flex-col gap-2 sm:flex-row">
            <input
              className="flex-grow rounded-full border-none bg-white px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary"
              placeholder="Email Address"
              type="email"
              name="newsletter"
            />
            <button
              type="button"
              className="rounded-full bg-primary px-8 py-4 font-medium text-on-primary transition-colors hover:bg-primary-container"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
