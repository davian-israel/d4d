import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";

export default async function AdminSalesPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { lines: true },
  });

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 border-b border-outline-variant/20 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            Commerce
          </p>
          <h1 className="font-headline text-4xl italic text-primary md:text-5xl">Sales management</h1>
          <p className="mt-2 text-on-surface-variant">Recent orders and payment states.</p>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-lowest shadow-[0_20px_50px_rgba(118,46,0,0.05)]">
        <div className="overflow-x-auto">
          <table data-testid="admin-sales-table" className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant/20 bg-surface-container-low text-on-surface-variant">
                <th className="py-4 pl-6 pr-4">Order</th>
                <th className="py-4 pr-4">Email</th>
                <th className="py-4 pr-4">Status</th>
                <th className="py-4 pr-4">Payment</th>
                <th className="py-4 pr-6">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-outline-variant/10 last:border-0">
                  <td className="py-4 pl-6 pr-4 font-mono text-xs">{o.id.slice(0, 8)}…</td>
                  <td className="py-4 pr-4">{o.email}</td>
                  <td className="py-4 pr-4">{o.status}</td>
                  <td className="py-4 pr-4">{o.paymentStatus}</td>
                  <td className="py-4 pr-6 font-medium">{formatCents(o.totalCents)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
