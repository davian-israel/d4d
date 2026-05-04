"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/admin", label: "Overview", icon: "dashboard" },
  { href: "/admin/categories", label: "Categories", icon: "category" },
  { href: "/admin/products", label: "Products", icon: "inventory_2" },
  { href: "/admin/featured", label: "Featured", icon: "star" },
  { href: "/admin/sales", label: "Sales", icon: "payments" },
];

function NavLinks({
  onNavigate,
  activePath,
}: {
  onNavigate?: () => void;
  activePath: string;
}) {
  return (
    <>
      {nav.map((item) => {
        const active =
          item.href === "/admin"
            ? activePath === "/admin"
            : activePath === item.href || activePath.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
              active
                ? "bg-primary-container text-on-primary shadow-md"
                : "text-on-surface-variant hover:bg-white/40 hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/admin";
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-surface pb-24 font-body text-on-surface md:pb-0">
      <aside className="fixed inset-y-0 left-0 z-[60] hidden h-full w-72 flex-col rounded-r-3xl bg-[#e8e1da] py-10 shadow-2xl md:flex">
        <div className="px-8">
          <p className="font-headline text-xs font-bold uppercase tracking-widest text-primary/70">
            Destiny4Divine
          </p>
          <p className="font-headline text-2xl text-primary">Admin Console</p>
        </div>
        <nav className="mt-10 flex flex-1 flex-col gap-1 px-4" data-testid="admin-nav">
          <NavLinks activePath={pathname} />
        </nav>
        <div className="px-6 pb-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-on-primary"
          >
            <span className="material-symbols-outlined text-lg">storefront</span>
            View storefront
          </Link>
        </div>
      </aside>

      {drawerOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[70] bg-black/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-[80] flex w-[min(100vw-3rem,18rem)] flex-col rounded-r-3xl bg-[#e8e1da] py-8 shadow-2xl transition-transform duration-200 md:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6">
          <p className="font-headline text-lg italic text-primary">Admin Console</p>
        </div>
        <nav
          className="mt-8 flex flex-1 flex-col gap-1 px-3"
          data-testid="admin-nav-drawer"
        >
          <NavLinks onNavigate={() => setDrawerOpen(false)} activePath={pathname} />
        </nav>
        <div className="px-4 pb-6">
          <Link
            href="/"
            onClick={() => setDrawerOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-on-primary"
          >
            <span className="material-symbols-outlined text-lg">storefront</span>
            Storefront
          </Link>
        </div>
      </aside>

      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-outline-variant/10 bg-[#fff8f1]/90 px-4 py-4 backdrop-blur-xl md:hidden">
        <button
          type="button"
          className="rounded-full p-2 text-primary hover:bg-stone-100/50"
          data-testid="admin-mobile-menu-button"
          aria-expanded={drawerOpen}
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-headline text-lg italic text-primary">Destiny4Divine</span>
        <span className="w-10" />
      </header>

      <div className="min-h-screen md:pl-72">
        <div className="px-4 py-8 md:px-10 md:py-10">
          <div className="rounded-2xl bg-surface-container-low p-6 editorial-shadow md:bg-surface md:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
