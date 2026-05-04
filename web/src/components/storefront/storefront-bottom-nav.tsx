"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STOREFRONT_MAIN_NAV_ITEMS } from "@/lib/storefront-main-nav";

const cartItem = {
  href: "/cart",
  label: "Cart",
  id: "cart",
  icon: "shopping_cart" as const,
  match: (pathname: string) =>
    pathname.startsWith("/cart") || pathname.startsWith("/checkout"),
};

/** Bottom bar: primary IA + cart (mobile). Omit Sign-in link to limit tab count; use header/drawer for /login. */
const bottomNavSource = STOREFRONT_MAIN_NAV_ITEMS.filter((i) => i.id !== "sign-in");

const bottomItems = [
  ...bottomNavSource.slice(0, 3),
  cartItem,
  ...bottomNavSource.slice(3),
] as const;

export function StorefrontBottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[2rem] border-t border-stone-200/10 bg-[#fff8f1]/80 px-2 pb-6 pt-3 shadow-[0_-10px_40px_rgba(118,46,0,0.05)] backdrop-blur-2xl md:hidden">
      {bottomItems.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={`${item.href}-${item.label}`}
            href={item.href}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center transition-transform ${
              active ? "scale-110 text-[#762e00]" : "text-stone-400 opacity-60 hover:opacity-100"
            }`}
            data-testid={`storefront-bottom-nav-${item.id}`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={
                active
                  ? ({ fontVariationSettings: "'FILL' 1" } as React.CSSProperties)
                  : undefined
              }
            >
              {item.icon}
            </span>
            <span className="mt-1 max-w-[4.5rem] truncate text-center font-sans text-[9px] font-medium uppercase tracking-wider">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
