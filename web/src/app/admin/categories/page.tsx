import { prisma } from "@/lib/prisma";
import { AdminCategoriesClient } from "./categories-client";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return <AdminCategoriesClient categories={categories} />;
}
