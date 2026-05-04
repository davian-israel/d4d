import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";
import {
  d4dCategorySlugs,
  d4dFeaturedSlugs,
  d4dImage,
  d4dProducts,
} from "./d4d-products";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("Admin12345!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@destiny4divine.test" },
    update: { passwordHash: password, role: Role.ADMIN },
    create: {
      email: "admin@destiny4divine.test",
      name: "Admin",
      role: Role.ADMIN,
      passwordHash: password,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@destiny4divine.test" },
    update: { passwordHash: password, role: Role.CUSTOMER },
    create: {
      email: "customer@destiny4divine.test",
      name: "Customer",
      role: Role.CUSTOMER,
      passwordHash: password,
    },
  });

  const catWellness = await prisma.category.upsert({
    where: { slug: "wellness" },
    update: {},
    create: { slug: "wellness", name: "Wellness" },
  });

  const catRitual = await prisma.category.upsert({
    where: { slug: "ritual" },
    update: {},
    create: { slug: "ritual", name: "Ritual" },
  });

  const d4dCategories: Record<string, string> = {};
  for (const c of d4dCategorySlugs) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: { slug: c.slug, name: c.name },
    });
    d4dCategories[c.slug] = row.id;
  }

  const legacyProducts = [
    {
      slug: "sacred-honey-elixir",
      name: "Sacred Honey Elixir",
      description: "Small-batch botanical infusion for slow mornings.",
      priceCents: 2800,
      currencyCode: "CAD",
      stockQuantity: 72,
      categoryId: catWellness.id,
      imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
    },
    {
      slug: "terracotta-tea-set",
      name: "Terracotta Tea Set",
      description: "Hand-glazed cups with a warm stone finish.",
      priceCents: 6400,
      currencyCode: "CAD",
      stockQuantity: 36,
      categoryId: catRitual.id,
      imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    },
    {
      slug: "editorial-cacao",
      name: "Editorial Cacao Block",
      description: "Stone-ground cacao with floral aromatics.",
      priceCents: 1800,
      currencyCode: "CAD",
      stockQuantity: 88,
      categoryId: catWellness.id,
      imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80",
    },
    {
      slug: "cedar-calming-room-mist",
      name: "Cedar Calming Room Mist",
      description:
        "Amber-glass mist with cedarwood and sage notes — light spritz for linens, altars, and slow evenings.",
      priceCents: 2400,
      currencyCode: "CAD",
      stockQuantity: 52,
      categoryId: catWellness.id,
      imageUrl: d4dImage.ourStory,
    },
    {
      slug: "botanical-evening-tonic",
      name: "Botanical Evening Tonic",
      description:
        "Small-batch herbal tonic for winding down; serve chilled in the ritual glass from your wellness shelf.",
      priceCents: 3200,
      currencyCode: "CAD",
      stockQuantity: 44,
      categoryId: catWellness.id,
      imageUrl: d4dImage.whatWeDo,
    },
    {
      slug: "hand-glazed-offering-bowl",
      name: "Hand-Glazed Offering Bowl",
      description:
        "Shallow ceramic bowl for offerings, keys, or keepsakes — reactive glaze makes each piece one of a kind.",
      priceCents: 4200,
      currencyCode: "CAD",
      stockQuantity: 22,
      categoryId: catRitual.id,
      imageUrl: d4dImage.giftAccent,
    },
    {
      slug: "woven-prayer-mat-natural",
      name: "Woven Prayer Mat — Natural",
      description:
        "Compact cotton mat with fringe detail; folds for travel to chapel, park, or retreat.",
      priceCents: 3800,
      currencyCode: "CAD",
      stockQuantity: 19,
      categoryId: catRitual.id,
      imageUrl: d4dImage.favourites,
    },
    {
      slug: "olivewood-rosary-keeper",
      name: "Olivewood Rosary Keeper",
      description:
        "Magnetic-close olivewood box lined in felt — protects rosary or small medals between prayers.",
      priceCents: 2600,
      currencyCode: "CAD",
      stockQuantity: 31,
      categoryId: catRitual.id,
      imageUrl: d4dImage.faithHero,
    },
    {
      slug: "rosehip-renewal-face-oil",
      name: "Rosehip Renewal Face Oil",
      description:
        "Cold-pressed rosehip and jojoba blend — a few drops after cleansing for glow without heavy fragrance.",
      priceCents: 3600,
      currencyCode: "CAD",
      stockQuantity: 41,
      categoryId: catWellness.id,
      imageUrl: d4dImage.faithHero,
    },
    {
      slug: "beeswax-votive-trio",
      name: "Beeswax Votive Trio",
      description:
        "Three hand-poured beeswax votives in recycled glass — clean burn for short meditations and table altars.",
      priceCents: 2200,
      currencyCode: "CAD",
      stockQuantity: 58,
      categoryId: catRitual.id,
      imageUrl: d4dImage.ourStory,
    },
  ];

  for (const p of legacyProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        priceCents: p.priceCents,
        currencyCode: p.currencyCode,
        stockQuantity: p.stockQuantity,
        categoryId: p.categoryId,
        imageUrl: p.imageUrl,
        published: true,
      },
      create: { ...p, published: true },
    });
  }

  for (const p of d4dProducts) {
    const categoryId = d4dCategories[p.categorySlug];
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        priceCents: p.priceCents,
        currencyCode: "CAD",
        stockQuantity: p.stockQuantity,
        categoryId,
        imageUrl: p.imageUrl,
        published: true,
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        priceCents: p.priceCents,
        currencyCode: "CAD",
        stockQuantity: p.stockQuantity,
        categoryId,
        imageUrl: p.imageUrl,
        published: true,
      },
    });
  }

  await prisma.featuredPlacement.deleteMany();
  let sortOrder = 0;
  for (const slug of d4dFeaturedSlugs) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (product) {
      await prisma.featuredPlacement.create({
        data: { productId: product.id, sortOrder: sortOrder++ },
      });
    }
  }
  for (const slug of ["sacred-honey-elixir", "terracotta-tea-set"] as const) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (product) {
      await prisma.featuredPlacement.create({
        data: { productId: product.id, sortOrder: sortOrder++ },
      });
    }
  }

  console.log("Seed complete", { admin: admin.email, customer: customer.email });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
