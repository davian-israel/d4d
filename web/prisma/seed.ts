import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";
import {
  d4dCategorySlugs,
  d4dFeaturedSlugs,
  d4dImage,
  d4dProducts,
} from "./d4d-products";

const prisma = new PrismaClient();

const PRODUCTION_MIN_PASSWORD = 12;

interface SeedCredentials {
  productionMode: boolean;
  adminEmail: string;
  adminPassword: string;
  customerEmail: string | null;
  customerPassword: string | null;
  admin2Email: string | null;
  admin2Password: string | null;
}

function resolveSeedCredentials(): SeedCredentials {
  const productionMode = process.env.SEED_ENV === "production";
  const adminEmail =
    process.env.SEED_ADMIN_EMAIL?.trim() || "admin@destiny4divine.test";

  if (productionMode) {
    const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "";
    if (adminPassword.length < PRODUCTION_MIN_PASSWORD) {
      throw new Error(
        `[seed] SEED_ENV=production requires SEED_ADMIN_PASSWORD (minimum ${PRODUCTION_MIN_PASSWORD} characters).`,
      );
    }
    const customerEmail = process.env.SEED_CUSTOMER_EMAIL?.trim() || null;
    let customerPassword: string | null = null;
    if (customerEmail) {
      customerPassword = process.env.SEED_CUSTOMER_PASSWORD ?? "";
      if (customerPassword.length < PRODUCTION_MIN_PASSWORD) {
        throw new Error(
          `[seed] When SEED_CUSTOMER_EMAIL is set, SEED_CUSTOMER_PASSWORD must be set (minimum ${PRODUCTION_MIN_PASSWORD} characters).`,
        );
      }
    }
    const admin2Email = process.env.SEED_ADMIN2_EMAIL?.trim() || null;
    let admin2Password: string | null = null;
    if (admin2Email) {
      admin2Password = process.env.SEED_ADMIN2_PASSWORD ?? "";
      if (!admin2Password) {
        throw new Error("[seed] SEED_ADMIN2_EMAIL is set; SEED_ADMIN2_PASSWORD is required.");
      }
      if (admin2Password.length < PRODUCTION_MIN_PASSWORD) {
        throw new Error(
          `[seed] SEED_ADMIN2_PASSWORD must be at least ${PRODUCTION_MIN_PASSWORD} characters when SEED_ENV=production.`,
        );
      }
    }

    return {
      productionMode,
      adminEmail,
      adminPassword,
      customerEmail,
      customerPassword,
      admin2Email,
      admin2Password,
    };
  }

  const adminPassword =
    process.env.SEED_ADMIN_PASSWORD && process.env.SEED_ADMIN_PASSWORD.length > 0
      ? process.env.SEED_ADMIN_PASSWORD
      : "Admin12345!";
  const customerEmail = "customer@destiny4divine.test";
  const customerPassword =
    process.env.SEED_CUSTOMER_PASSWORD && process.env.SEED_CUSTOMER_PASSWORD.length > 0
      ? process.env.SEED_CUSTOMER_PASSWORD
      : "Admin12345!";

  const admin2Email = process.env.SEED_ADMIN2_EMAIL?.trim() || null;
  const admin2Password =
    process.env.SEED_ADMIN2_PASSWORD && process.env.SEED_ADMIN2_PASSWORD.length > 0
      ? process.env.SEED_ADMIN2_PASSWORD
      : "Admin12345!";

  return {
    productionMode,
    adminEmail,
    adminPassword,
    customerEmail,
    customerPassword,
    admin2Email,
    admin2Password,
  };
}

async function main() {
  const creds = resolveSeedCredentials();
  const adminHash = await hash(creds.adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: creds.adminEmail },
    update: { passwordHash: adminHash, role: Role.ADMIN },
    create: {
      email: creds.adminEmail,
      name: "Admin",
      role: Role.ADMIN,
      passwordHash: adminHash,
    },
  });

  let admin2: { email: string | null } | null = null;
  if (creds.admin2Email && creds.admin2Password) {
    const admin2Hash = await hash(creds.admin2Password, 10);
    admin2 = await prisma.user.upsert({
      where: { email: creds.admin2Email },
      update: { passwordHash: admin2Hash, role: Role.ADMIN },
      create: {
        email: creds.admin2Email,
        name: "Admin 2",
        role: Role.ADMIN,
        passwordHash: admin2Hash,
      },
    });
  }

  let customer: { email: string | null } | null = null;
  if (creds.customerEmail && creds.customerPassword) {
    const customerHash = await hash(creds.customerPassword, 10);
    customer = await prisma.user.upsert({
      where: { email: creds.customerEmail },
      update: { passwordHash: customerHash, role: Role.CUSTOMER },
      create: {
        email: creds.customerEmail,
        name: "Customer",
        role: Role.CUSTOMER,
        passwordHash: customerHash,
      },
    });
  }

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

  console.log("Seed complete", {
    mode: creds.productionMode ? "production" : "development",
    admin: admin.email,
    admin2: admin2?.email ?? null,
    customer: customer?.email ?? null,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
