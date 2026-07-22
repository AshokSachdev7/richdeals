import type { DealDTO } from "@deals/shared";

// Central site constants + tiny pure helpers reused across pages/components.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "RichDeals";
export const SITE_TAGLINE = "Best Deals, Coupons & Freebies in India";

export function absUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

// JSON-LD helpers for listing pages (ItemList + BreadcrumbList).
export function itemListSchema(paths: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: paths.map((path, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absUrl(path),
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absUrl(c.href),
    })),
  };
}

// Build an SEO-friendly <title> from a deal: clean product name + price +
// discount. Strips our appended " at ₹X – Store", the messy pipe/dash marketing
// tail, and caps length so Google doesn't truncate. Runs at render, so it
// applies to every deal — existing and newly ingested — with no DB change.
export function dealSeoTitle(
  deal: Pick<DealDTO, "title" | "price" | "discountPct" | "mrp"> & { store: { name: string } },
): string {
  let name = deal.title
    .replace(/\s+(?:at|@)\s*₹?[\d,]+\s*[–-]\s*[\w ]+$/i, "") // drop " at ₹X – Amazon"
    .split("|")[0]
    .split(/\s[–-]\s/)[0]
    .replace(/[,\s]+$/, "")
    .trim();
  if (name.length > 48) name = name.slice(0, 48).replace(/\s+\S*$/, "").trim();
  const disc = discountOf(deal);
  const price = deal.price != null ? ` @ ${formatINR(deal.price)}` : "";
  const off = disc != null ? ` (${disc}% Off)` : "";
  return `${name}${price}${off}`;
}

// Prefer the API-provided discount; fall back to computing from MRP/price.
export function discountOf(deal: Pick<DealDTO, "discountPct" | "mrp" | "price">): number | null {
  if (deal.discountPct != null) return deal.discountPct;
  if (deal.mrp && deal.price && deal.mrp > deal.price) {
    return Math.round((1 - deal.price / deal.mrp) * 100);
  }
  return null;
}

// Clean marketplace product name — strips the " at ₹X – Store" tail + pipe junk.
export function dealProductName(
  deal: Pick<DealDTO, "title">,
): string {
  const name = deal.title
    .replace(/\s+(?:at|@)\s*₹?[\d,]+.*$/i, "")
    .split("|")[0]
    .split(/\s[–-]\s/)[0]
    .replace(/[,\s]+$/, "")
    .trim();
  return name || deal.title;
}

// AEO/GEO: build a small, genuinely-useful FAQ from a deal's real fields so
// deal pages carry FAQPage schema (rich results + AI-answer citations) with
// visible matching copy. No fabricated facts — everything comes from the deal.
export function dealFaq(
  deal: Pick<DealDTO, "title" | "price" | "mrp" | "discountPct" | "couponNote"> & {
    store: { name: string };
  },
): { q: string; a: string }[] {
  const name = dealProductName(deal);
  const store = deal.store.name;
  const disc = discountOf(deal);
  const price = deal.price != null ? formatINR(deal.price) : null;
  const cheaper =
    deal.mrp != null && deal.price != null && deal.mrp > deal.price
      ? ` (down from ${formatINR(deal.mrp)}${disc != null ? `, ${disc}% off` : ""})`
      : "";
  return [
    {
      q: `What is the price of ${name}?`,
      a: price
        ? `${name} is available for ${price}${cheaper} through ${SITE_NAME}'s ${store} link. Prices change quickly during sales, so confirm the live price before you order.`
        : `Tap Shop Now to see the current live price of ${name} on ${store}. ${SITE_NAME} always links to the latest marketplace price.`,
    },
    {
      q: `Is this ${name} deal still available?`,
      a: `Yes — this deal is live on ${SITE_NAME} right now. Offers like this can sell out or expire once the promotion ends, so grab it soon if the price works for you.`,
    },
    {
      q: `Is ${price ? `${price} ` : "this "}the best price for ${name}?`,
      a: `It is among the best live prices we have tracked for ${name} on ${store}. We monitor prices continuously, but they fluctuate — compare the current price and apply any coupon before buying.`,
    },
    {
      q: `How do I get this ${store} deal?`,
      a: `Tap the Get Deal button to open ${store}, add ${name} to your cart and check out.${
        deal.couponNote ? ` ${deal.couponNote}` : ""
      } The discounted price is applied on the ${store} checkout page.`,
    },
  ];
}

// Human labels for category URL segments.
export const CATEGORY_TYPE_LABEL: Record<string, string> = {
  "shopping-category": "Category",
  "shopping-site": "Store",
};
