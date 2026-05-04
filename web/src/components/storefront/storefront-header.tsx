"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { STOREFRONT_MAIN_NAV_ITEMS } from "@/lib/storefront-main-nav";

function DesktopNavLink({
  href,
  label,
  id,
  active,
}: {
  href: string;
  label: string;
  id: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      data-testid={`storefront-nav-link-${id}`}
      className={`font-sans text-sm font-medium tracking-wide transition-colors ${
        active
          ? "text-[#762e00] underline decoration-2 underline-offset-4"
          : "text-stone-600 hover:text-[#762e00]"
      }`}
    >
      {label}
    </Link>
  );
}

function DrawerNavLink({
  href,
  label,
  id,
  icon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  id: string;
  icon: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      data-testid={`storefront-nav-link-${id}`}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
        active
          ? "bg-[#762e00]/15 text-[#762e00] shadow-sm"
          : "text-stone-700 hover:bg-stone-100/80 hover:text-[#762e00]"
      }`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export function StorefrontHeader() {
  const pathname = usePathname() ?? "/";
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#fff8f1]/90 px-4 py-4 backdrop-blur-xl md:px-6">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="z-10 flex min-w-[3rem] items-center md:min-w-0 md:flex-1 md:gap-6">
            <button
              type="button"
              className="rounded-full p-2 text-[#762e00] transition-colors hover:bg-stone-100/50 active:opacity-70 md:hidden"
              data-testid="storefront-mobile-menu-button"
              aria-expanded={drawerOpen}
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <nav
              className="hidden flex-wrap items-center gap-x-4 lg:gap-x-6 md:flex"
              data-testid="storefront-nav-desktop"
              aria-label="Main"
            >
              {STOREFRONT_MAIN_NAV_ITEMS.map((item) => (
                <DesktopNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  id={item.id}
                  active={item.match(pathname)}
                />
              ))}
            </nav>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-headline text-2xl italic tracking-tighter text-[#762e00] md:static md:translate-x-0 md:translate-y-0"
          >
            Destiny4Divine
          </Link>

          <div className="z-10 flex min-w-[3rem] justify-end">
            <Link
              href="/cart"
              className="rounded-full p-2 text-[#762e00] transition-colors hover:bg-stone-100/50 active:opacity-70"
              aria-label="Cart"
              data-testid="storefront-cart-link"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
            </Link>
          </div>
        </div>
      </header>

      {drawerOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[70] bg-black/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-[80] flex w-[min(100vw-3rem,18rem)] flex-col rounded-r-3xl bg-[#fff8f1] py-8 shadow-2xl transition-transform duration-200 md:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        data-testid="storefront-nav-drawer"
        aria-hidden={!drawerOpen}
      >
        <div className="px-6">
          <p className="font-headline text-lg italic text-[#762e00]">Menu</p>
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-1 px-3" aria-label="Main">
          {STOREFRONT_MAIN_NAV_ITEMS.map((item) => (
            <DrawerNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              id={item.id}
              icon={item.icon}
              active={item.match(pathname)}
              onNavigate={() => setDrawerOpen(false)}
            />
          ))}
        </nav>
        <div className="px-4 pb-6">
          <Link
            href="/cart"
            onClick={() => setDrawerOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-[#762e00] px-4 py-3 text-sm font-medium text-white"
            data-testid="storefront-drawer-cart-link"
          >
            <span className="material-symbols-outlined text-lg">shopping_bag</span>
            View cart
          </Link>
        </div>
      </aside>
    </>
  );
}
