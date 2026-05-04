export interface StorefrontMainNavItem {
  href: string;
  label: string;
  /** Fragment for `data-testid="storefront-nav-link-${id}"` */
  id: string;
  icon: string;
  match: (pathname: string) => boolean;
}

/**
 * Primary storefront destinations (header + drawer). Order is IA order.
 */
export const STOREFRONT_MAIN_NAV_ITEMS: StorefrontMainNavItem[] = [
  {
    href: "/",
    label: "Home",
    id: "home",
    icon: "home",
    match: (pathname) => pathname === "/",
  },
  {
    href: "/catalog",
    label: "Catalog",
    id: "catalog",
    icon: "auto_stories",
    match: (pathname) =>
      pathname === "/catalog" ||
      pathname.startsWith("/catalog/") ||
      pathname.startsWith("/product"),
  },
  {
    href: "/featured",
    label: "Featured",
    id: "featured",
    icon: "star",
    match: (pathname) => pathname.startsWith("/featured"),
  },
  {
    href: "/contact",
    label: "Contact",
    id: "contact",
    icon: "mail",
    match: (pathname) => pathname.startsWith("/contact"),
  },
  {
    href: "/login",
    label: "Sign in",
    id: "sign-in",
    icon: "login",
    match: (pathname) => pathname.startsWith("/login"),
  },
  {
    href: "/account",
    label: "Account",
    id: "account",
    icon: "person_outline",
    match: (pathname) => pathname.startsWith("/account"),
  },
];
