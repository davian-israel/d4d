/**
 * Product rows derived from repo `d4d/` catalogue artwork (Our Story, Our Favourites, Faith Collection, What We Do).
 * Prices are Canadian cents; inventory is illustrative seed data (artwork does not list MSRP or stock).
 */
export const d4dImage = {
  whatWeDo: "/d4d/D4D-Product-Catalogue-03-23-2026_10_55_PM.png",
  faithHero: "/d4d/D4D-Product-Catalogue-03-23-2026_10_53_PM.png",
  ourStory: "/d4d/D4D-Product-Catalogue-03-23-2026_10_54_PM.png",
  favourites: "/d4d/D4D-Product-Catalogue-03-23-2026_10_56_PM.png",
  giftAccent: "/d4d/D4D-Product-Catalogue--2026_10_57_PM.png",
} as const;

export const d4dCategorySlugs = [
  { slug: "faith-mugs", name: "Faith mugs" },
  { slug: "faith-apparel", name: "Faith apparel" },
  { slug: "faith-home", name: "Faith home" },
  { slug: "faith-gifts", name: "Faith gifts" },
] as const;

export interface D4dSeedProduct {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  stockQuantity: number;
  categorySlug: (typeof d4dCategorySlugs)[number]["slug"];
  imageUrl: string;
}

export const d4dProducts: D4dSeedProduct[] = [
  {
    slug: "john-14-27-peace-mug",
    name: "Peace I Leave With You — John 14:27 Mug",
    description:
      "Ceramic mug with dove and scripture arc: “Peace I leave with you…” — John 14:27. From Destiny4Divine Creations’ story collection.",
    priceCents: 2499,
    stockQuantity: 40,
    categorySlug: "faith-mugs",
    imageUrl: d4dImage.ourStory,
  },
  {
    slug: "destiny4divine-logo-mug",
    name: "Destiny4Divine Logo Mug",
    description:
      "White mug featuring the D4D Divine wordmark and warm splatter accent — everyday reminder of the brand’s calling.",
    priceCents: 2299,
    stockQuantity: 55,
    categorySlug: "faith-mugs",
    imageUrl: d4dImage.ourStory,
  },
  {
    slug: "psalm-31-3-fortress-hoodie-ref-204",
    name: "Psalm 31:3 Fortress Hoodie (#204)",
    description:
      "Hooded sweatshirt with Christ at the fortress and cross graphic. Verse: “For thou art my rock and my fortress…” — Psalm 31:3 KJV.",
    priceCents: 5899,
    stockQuantity: 25,
    categorySlug: "faith-apparel",
    imageUrl: d4dImage.favourites,
  },
  {
    slug: "i-love-jesus-mug-ref-106",
    name: "I Love Jesus Christ Mug (#106)",
    description:
      "White mug with red handle and interior — “I ❤️ JESUS CHRIST”. For coffee or tea with a bold statement of faith.",
    priceCents: 1999,
    stockQuantity: 60,
    categorySlug: "faith-mugs",
    imageUrl: d4dImage.favourites,
  },
  {
    slug: "psalm-37-25-faith-plate-ref-500",
    name: "Psalm 37:25 Faith Plate (#500)",
    description:
      "Decorative plate with autumn wreath and “I’ve never seen the righteous forsaken…” — Psalm 37:25. “Put faith in every meal you eat.”",
    priceCents: 3499,
    stockQuantity: 20,
    categorySlug: "faith-home",
    imageUrl: d4dImage.favourites,
  },
  {
    slug: "finished-tee-ref-304",
    name: "FINISHED Tee (#304)",
    description:
      "Comfortable blue crew tee with “FINISHED” and cross in the letter I — John 19:30. “A very comfy blue tee perfect for every occasion.”",
    priceCents: 2799,
    stockQuantity: 45,
    categorySlug: "faith-apparel",
    imageUrl: d4dImage.favourites,
  },
  {
    slug: "scripture-canvas-tote",
    name: "Scripture Canvas Tote",
    description:
      "Sturdy canvas tote designed to carry Bible verses into workplaces, classrooms, and errands — from the “What We Do” line.",
    priceCents: 3299,
    stockQuantity: 30,
    categorySlug: "faith-gifts",
    imageUrl: d4dImage.whatWeDo,
  },
  {
    slug: "bible-verse-gift-set",
    name: "Bible Verse Gift Set",
    description:
      "Curated gift set pairing scripture keepsakes for encouragement — aligns with D4D Bible verse gift sets positioning.",
    priceCents: 4499,
    stockQuantity: 15,
    categorySlug: "faith-gifts",
    imageUrl: d4dImage.giftAccent,
  },
  {
    slug: "ministry-volunteer-thank-you-bundle",
    name: "Ministry & Volunteer Thank-You Bundle",
    description:
      "Bundle crafted for ministry and volunteer appreciation — thank those who serve with faith-centred gifts.",
    priceCents: 3999,
    stockQuantity: 18,
    categorySlug: "faith-gifts",
    imageUrl: d4dImage.faithHero,
  },
  {
    slug: "morning-grace-scripture-mug",
    name: "Morning Grace Scripture Mug",
    description:
      "Start the day with gratitude — stoneware mug with soft serif verse wrap and warm interior glaze, from the Faith mugs line.",
    priceCents: 2199,
    stockQuantity: 48,
    categorySlug: "faith-mugs",
    imageUrl: d4dImage.whatWeDo,
  },
  {
    slug: "walk-by-faith-crewneck",
    name: "Walk By Faith Crewneck",
    description:
      "Mid-weight fleece crew with subtle cross detail at the cuff — comfortable layer for worship, travel, and everyday witness.",
    priceCents: 4699,
    stockQuantity: 28,
    categorySlug: "faith-apparel",
    imageUrl: d4dImage.faithHero,
  },
  {
    slug: "philippians-4-13-performance-tee",
    name: "I Can Do All Things Tee — Philippians 4:13",
    description:
      "Breathable cotton blend tee with small chest verse reference; easy care for ministry events and casual Fridays.",
    priceCents: 2999,
    stockQuantity: 42,
    categorySlug: "faith-apparel",
    imageUrl: d4dImage.favourites,
  },
  {
    slug: "blessed-home-table-runner",
    name: "Blessed Home Table Runner",
    description:
      "Linen-cotton runner with embroidered blessing motif — dresses everyday meals and holiday gatherings alike.",
    priceCents: 2899,
    stockQuantity: 21,
    categorySlug: "faith-home",
    imageUrl: d4dImage.giftAccent,
  },
  {
    slug: "truth-and-light-accent-tile",
    name: "Truth & Light Accent Tile",
    description:
      "Display tile with gold-foil verse highlight; freestanding easel back for shelves, desks, or prayer corners.",
    priceCents: 3799,
    stockQuantity: 16,
    categorySlug: "faith-home",
    imageUrl: d4dImage.ourStory,
  },
  {
    slug: "peaceful-linen-throw",
    name: "Peaceful Linen Throw",
    description:
      "Soft neutral throw with tonal cross weave — a comforting layer for reading, rest, and quiet reflection at home.",
    priceCents: 5299,
    stockQuantity: 13,
    categorySlug: "faith-home",
    imageUrl: d4dImage.faithHero,
  },
  {
    slug: "encouragement-scripture-card-set",
    name: "Encouragement Scripture Card Set",
    description:
      "Twelve folded cards with envelopes — mix of Psalms and New Testament promises for notes, care packages, and small groups.",
    priceCents: 1699,
    stockQuantity: 72,
    categorySlug: "faith-gifts",
    imageUrl: d4dImage.whatWeDo,
  },
  {
    slug: "living-water-stoneware-mug",
    name: "Living Water Stoneware Mug",
    description:
      "Speckled stoneware with interior glaze drip and etched water motif — dishwasher-safe for daily devotion breaks.",
    priceCents: 2399,
    stockQuantity: 50,
    categorySlug: "faith-mugs",
    imageUrl: d4dImage.favourites,
  },
  {
    slug: "armor-of-god-lightweight-jacket",
    name: "Armor of God Lightweight Jacket",
    description:
      "Packable wind shell with tonal embroidery at the chest; layers over hoodies for outdoor worship and travel.",
    priceCents: 7999,
    stockQuantity: 17,
    categorySlug: "faith-apparel",
    imageUrl: d4dImage.whatWeDo,
  },
  {
    slug: "sabbath-rest-table-lantern",
    name: "Sabbath Rest Table Lantern",
    description:
      "Frosted glass lantern with LED pillar — soft glow for dinner tables, entry consoles, and evening prayer.",
    priceCents: 4599,
    stockQuantity: 24,
    categorySlug: "faith-home",
    imageUrl: d4dImage.giftAccent,
  },
  {
    slug: "communion-travel-set",
    name: "Communion Travel Set",
    description:
      "Velvet-lined case with portable cup and plate — for small groups, hospital visits, and retreat leaders.",
    priceCents: 5499,
    stockQuantity: 11,
    categorySlug: "faith-gifts",
    imageUrl: d4dImage.ourStory,
  },
];

export const d4dFeaturedSlugs = [
  "psalm-31-3-fortress-hoodie-ref-204",
  "john-14-27-peace-mug",
  "finished-tee-ref-304",
  "i-love-jesus-mug-ref-106",
] as const;
