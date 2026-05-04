import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";

interface OrdersPageProps {
  searchParams: Promise<{ thanks?: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/account/orders");
  }

  const { thanks } = await searchParams;

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { lines: true },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-headline text-3xl text-primary">Orders</h1>
      {thanks ? (
        <p className="mt-4 rounded-2xl bg-surface-low p-4 text-sm text-on-surface" data-testid="order-thanks">
          Thank you — order <span className="font-mono">{thanks}</span> is recorded.
        </p>
      ) : null}
      <ul className="mt-8 space-y-6">
        {orders.map((o) => (
          <li key={o.id} className="rounded-2xl bg-surface-low p-4" data-testid="order-row">
            <div className="flex flex-wrap justify-between gap-2">
              <span className="font-mono text-xs text-on-surface-variant">{o.id}</span>
              <span className="text-sm font-medium">{o.status}</span>
            </div>
            <p className="mt-2 text-sm text-on-surface-variant">
              {formatCents(o.totalCents)} · {o.lines.length} line(s)
            </p>
          </li>
        ))}
      </ul>
      {orders.length === 0 ? (
        <p className="mt-6 text-on-surface-variant">
          No orders yet.{" "}
          <Link href="/catalog" className="text-primary underline">
            Start shopping
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
