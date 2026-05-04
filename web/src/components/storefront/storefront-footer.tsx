import Link from "next/link";

export function StorefrontFooter() {
  return (
    <footer className="bg-surface-container-low px-6 pb-32 pt-20 md:pb-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="space-y-6 md:col-span-2">
          <div className="font-headline text-3xl italic tracking-tighter text-primary">
            Destiny4Divine
          </div>
          <p className="max-w-sm text-on-surface-variant">
            A modern scriptorium crafting lifestyle goods for the intentional soul. Rooted in
            tradition, designed for today.
          </p>
          <div className="flex gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-primary">
              <span className="material-symbols-outlined">public</span>
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-primary">
              <span className="material-symbols-outlined">alternate_email</span>
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline text-lg text-primary">Shop</h4>
          <ul className="space-y-2 text-on-surface-variant">
            <li>
              <Link href="/catalog" className="transition-colors hover:text-primary">
                All Collections
              </Link>
            </li>
            <li>
              <Link href="/featured" className="transition-colors hover:text-primary">
                Featured carousel
              </Link>
            </li>
            <li>
              <Link href="/catalog" className="transition-colors hover:text-primary">
                Best Sellers
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline text-lg text-primary">Support</h4>
          <ul className="space-y-2 text-on-surface-variant">
            <li>
              <Link href="/contact" className="transition-colors hover:text-primary">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/account" className="transition-colors hover:text-primary">
                Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-7xl flex-col justify-between gap-4 border-t border-outline-variant/20 pt-8 text-xs uppercase tracking-widest text-on-surface-variant/60 md:flex-row">
        <p>© 2024 Destiny4Divine. All Rights Reserved.</p>
        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
