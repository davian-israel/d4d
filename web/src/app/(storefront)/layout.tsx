import { StorefrontBottomNav } from "@/components/storefront/storefront-bottom-nav";
import { StorefrontFooter } from "@/components/storefront/storefront-footer";
import { StorefrontHeader } from "@/components/storefront/storefront-header";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StorefrontHeader />
      <div className="pb-28 md:pb-8">{children}</div>
      <StorefrontFooter />
      <StorefrontBottomNav />
    </>
  );
}
