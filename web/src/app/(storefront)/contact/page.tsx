import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbdWo5Yc_A2RSKjrJS_SvlEeQG2z7k6S9oMorzH_VSGtKu0oudLUA7wqFoqjvkssybe3EGrr44ecg5J7FlAvjsEKbTSsxbi4f-ST-RCm6a1wicqiJUGD8Ecw-ro5n7yWALcNPbbYWhGDidQtjqUTmwRPfO2jpgD8kY7avlUGs3pERo08IdiXZeKWgJFyFFRK6cf4s3GbDbmW77kKETbGLOeKFux9PhZJ2TUy3ezVA5LWX5mvjqjnc-t_T1dU7eWjtVDmq9QiONB0uw";

const mapImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBwoAd6iWyXeJCBW5N_yJlNrQLhVjYUR7pQX0t3iSr38RXmk0lOFzziANJ8YddTXeykNh6xAAgSeO8YGng7qsCP_8C4ThFlh9gWhcvCUnLgp0Y3cCwqu6lQ3Smpb8r5ILDqL9atngU9ceVfIBwYdOc9Y37Ic4KVychZqB9SvKSsWpClBBV_Vge1WH39O7BlNBtcUfsVUSN-KSzXpmC_gHbnokui39yCWXdua7-TUDStWO9w59iOjYuaoI2rhrQKcd-W88Ohdu3jQACU";

export default function ContactPage() {
  return (
    <main className="min-h-screen pb-32" data-testid="storefront-contact-page">
      <section className="relative flex h-[280px] items-center justify-center overflow-hidden md:h-[353px]">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative z-10 px-6 text-center">
          <h1 className="mb-4 font-headline text-5xl tracking-tight text-primary md:text-7xl">
            We&apos;re here to help
          </h1>
          <p className="mx-auto max-w-xl font-body text-lg leading-relaxed text-on-surface-variant">
            Connect with our sanctuary. Whether you seek guidance, support, or simply a
            conversation, our hearts are open.
          </p>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-12 grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-[0_20px_50px_rgba(118,46,0,0.05)] md:p-12 lg:col-span-7">
          <h2 className="mb-8 font-headline text-3xl italic text-primary">Send a message</h2>
          <ContactForm />
        </div>

        <div className="space-y-8 lg:col-span-5">
          <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-8">
            <h3 className="mb-6 font-headline text-xl text-primary">Quick support</h3>
            <div className="grid grid-cols-1 gap-4">
              <Link
                href="/catalog"
                className="group flex items-center justify-between rounded-lg bg-surface-container-lowest p-4 transition-colors hover:bg-primary"
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary">
                    help_outline
                  </span>
                  <span className="font-body font-medium text-on-surface group-hover:text-on-primary">
                    Browse catalog (FAQs)
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-on-primary">
                  chevron_right
                </span>
              </Link>
              <Link
                href="/account/orders"
                className="group flex items-center justify-between rounded-lg bg-surface-container-lowest p-4 transition-colors hover:bg-primary"
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary">
                    local_shipping
                  </span>
                  <span className="font-body font-medium text-on-surface group-hover:text-on-primary">
                    Track orders (account)
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-on-primary">
                  chevron_right
                </span>
              </Link>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-surface-container-highest">
            <div className="relative h-64 w-full grayscale contrast-125 opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100">
              <Image src={mapImage} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            <div className="glass-panel editorial-gradient absolute bottom-0 left-0 right-0 p-6 text-on-primary">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined mt-1">location_on</span>
                <div>
                  <h4 className="font-headline text-lg italic">Visit the farm store</h4>
                  <p className="font-body text-sm leading-relaxed opacity-90">
                    Via della Pace 44, <br />
                    Siena, IT 53100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto mb-12 mt-24 max-w-4xl px-6">
        <div className="rounded-xl border border-outline-variant/10 bg-secondary-container/30 p-12 text-center backdrop-blur-md">
          <span
            className="material-symbols-outlined mb-4 text-4xl text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            church
          </span>
          <p className="font-headline text-lg italic text-on-secondary-container">
            &ldquo;Let all that you do be done in love.&rdquo;
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-primary/80">
            1 Corinthians 16:14
          </p>
        </div>
      </section>
    </main>
  );
}
