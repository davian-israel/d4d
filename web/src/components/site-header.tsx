import Link from "next/link";
import { auth } from "@/auth";

const links = [
  { href: "/catalog", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-20 border-b border-outline-variant/15 bg-surface/80 backdrop-blur-[20px]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-headline text-lg tracking-tight text-primary sm:text-xl"
        >
          Destiny4Divine
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/cart" className="hover:text-primary transition-colors" data-testid="nav-cart">
            Cart
          </Link>
          {session?.user ? (
            <>
              {session.user.role === "ADMIN" ? (
                <Link href="/admin" className="hover:text-primary transition-colors">
                  Admin
                </Link>
              ) : null}
              <Link href="/account" className="hover:text-primary transition-colors">
                Account
              </Link>
            </>
          ) : (
            <Link href="/login" className="hover:text-primary transition-colors">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
