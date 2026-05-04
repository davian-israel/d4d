import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";

export default async function AdminDashboardPage() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const [productCount, categoryCount, paidAgg, ordersToday] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.aggregate({
      where: { status: "PAID" },
      _sum: { totalCents: true },
    }),
    prisma.order.count({ where: { createdAt: { gte: start } } }),
  ]);

  const revenueCents = paidAgg._sum.totalCents ?? 0;

  return (
    <div data-testid="admin-dashboard">
      <header className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Sacred Earth &amp; grace
          </p>
          <h1 className="font-headline text-4xl italic tracking-tight text-on-surface lg:text-5xl">
            Daily overview
          </h1>
          <p className="mt-4 text-lg font-light text-on-surface-variant">
            Operational snapshot for Destiny4Divine merchandising and fulfillment.
          </p>
        </div>
      </header>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-xl border-l-4 border-primary bg-surface-container-lowest p-8 shadow-[0_20px_50px_rgba(118,46,0,0.05)]">
          <div className="mb-6 flex items-start justify-between">
            <span className="material-symbols-outlined text-primary">payments</span>
          </div>
          <p className="mb-1 text-sm font-medium uppercase tracking-widest text-on-surface-variant">
            Paid revenue (all time)
          </p>
          <p className="font-headline text-3xl tracking-tighter text-primary">
            {formatCents(revenueCents)}
          </p>
        </div>
        <div className="rounded-xl bg-surface-container-lowest p-8 shadow-[0_20px_50px_rgba(118,46,0,0.05)]">
          <div className="mb-6 flex items-start justify-between">
            <span className="material-symbols-outlined text-tertiary">shopping_bag</span>
          </div>
          <p className="mb-1 text-sm font-medium uppercase tracking-widest text-on-surface-variant">
            Orders today
          </p>
          <p className="font-headline text-3xl tracking-tighter text-tertiary">{ordersToday}</p>
        </div>
        <div className="rounded-xl bg-surface-container-lowest p-8 shadow-[0_20px_50px_rgba(118,46,0,0.05)]">
          <div className="mb-6 flex items-start justify-between">
            <span className="material-symbols-outlined text-outline">inventory_2</span>
          </div>
          <p className="mb-1 text-sm font-medium uppercase tracking-widest text-on-surface-variant">
            Catalog
          </p>
          <p className="font-headline text-3xl tracking-tighter text-on-surface">
            {productCount}{" "}
            <span className="text-lg font-normal text-on-surface-variant">
              products · {categoryCount} categories
            </span>
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-surface-container-low p-8">
        <h2 className="font-headline text-xl italic">Quick links</h2>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm">
          <li>
            <a href="/admin/products" className="text-primary underline">
              Manage products
            </a>
          </li>
          <li>
            <a href="/admin/sales" className="text-primary underline">
              View sales
            </a>
          </li>
          <li>
            <a href="/admin/featured" className="text-primary underline">
              Featured placements
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
