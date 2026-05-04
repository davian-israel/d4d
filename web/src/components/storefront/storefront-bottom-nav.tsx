"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: "home" as const, match: (p: string) => p === "/" },
  {
    href: "/catalog",
    label: "Catalog",
    icon: "auto_stories" as const,
    match: (p: string) => p.startsWith("/catalog") || p.startsWith("/product"),
  },
  {
    href: "/cart",
    label: "Cart",
    icon: "shopping_cart" as const,
    match: (p: string) => p.startsWith("/cart") || p.startsWith("/checkout"),
  },
  {
    href: "/account",
    label: "Profile",
    icon: "person_outline" as const,
    match: (p: string) => p.startsWith("/account"),
  },
  {
    href: "/contact",
    label: "Contact",
    icon: "mail" as const,
    match: (p: string) => p.startsWith("/contact"),
  },
];

export function StorefrontBottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[2rem] border-t border-stone-200/10 bg-[#fff8f1]/80 px-4 pb-6 pt-3 shadow-[0_-10px_40px_rgba(118,46,0,0.05)] backdrop-blur-2xl md:hidden">
      {items.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-transform ${
              active ? "scale-110 text-[#762e00]" : "text-stone-400 opacity-60 hover:opacity-100"
            }`}
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            <span
              className="material-symbols-outlined"
              style={
                active
                  ? ({ fontVariationSettings: "'FILL' 1" } as React.CSSProperties)
                  : undefined
              }
            >
              {item.icon}
            </span>
            <span className="mt-1 font-sans text-[10px] font-medium uppercase tracking-widest">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
