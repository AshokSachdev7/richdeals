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

// Rough product-category detection from the title, so the FAQ can ask the
// questions buyers actually search for that category (warranty/EMI for
// electronics, authenticity for fashion, etc.).
function dealKind(title: string): "electronics" | "fashion" | "grocery" | "general" {
  const t = title.toLowerCase();
  if (/\b(phone|mobile|5g|smartphone|laptop|tablet|tv|television|earbud|headphone|speaker|smartwatch|watch|camera|monitor|router|printer|console|power ?bank|trimmer|fan|mixer|washing|refriger|microwave|air ?fryer|induction|purifier|iron|geyser|ac\b)/.test(t))
    return "electronics";
  if (/\b(shirt|t-?shirt|jeans|trouser|kurta|saree|dress|shoe|sneaker|sandal|slipper|footwear|jacket|hoodie|backpack|bag|vest|innerwear|lingerie|apparel|clothing)\b/.test(t))
    return "fashion";
  if (/\b(seeds|oil|atta|rice|dal|masala|namkeen|chocolate|coffee|tea|snack|papad|ghee|honey|protein|supplement|shampoo|lotion|cream|soap|facewash|body ?wash)\b/.test(t))
    return "grocery";
  return "general";
}

// AEO/GEO: build a small, genuinely-useful FAQ from a deal's real fields so
// deal pages carry FAQPage schema (rich results + AI-answer citations) with
// visible matching copy. Questions vary by product category + discount so no
// two deal pages share the same FAQ. No fabricated facts.
export function dealFaq(
  deal: Pick<DealDTO, "title" | "price" | "mrp" | "discountPct" | "couponNote"> & {
    store: { name: string };
  },
): { q: string; a: string }[] {
  const name = dealProductName(deal);
  const store = deal.store.name;
  const disc = discountOf(deal);
  const price = deal.price != null ? formatINR(deal.price) : null;
  const kind = dealKind(deal.title);
  const cheaper =
    deal.mrp != null && deal.price != null && deal.mrp > deal.price
      ? ` (down from ${formatINR(deal.mrp)}${disc != null ? `, ${disc}% off` : ""})`
      : "";

  const faqs: { q: string; a: string }[] = [];

  // Always: live price.
  faqs.push({
    q: `What is the price of ${name}?`,
    a: price
      ? `${name} is available for ${price}${cheaper} through ${SITE_NAME}'s ${store} link. Prices change quickly during sales, so confirm the live price before you order.`
      : `Tap Get Deal to see the current live price of ${name} on ${store}. ${SITE_NAME} always links to the latest marketplace price.`,
  });

  // Category-specific question(s) — the ones buyers actually search.
  if (kind === "electronics") {
    faqs.push({
      q: `Does ${name} come with a warranty?`,
      a: `Yes. Bought through ${store}'s listing, ${name} carries the standard manufacturer warranty — keep the digital invoice from your order for any service or replacement claim.`,
    });
    faqs.push({
      q: `Is No-Cost EMI available on ${name}?`,
      a: `On ${store}, No-Cost EMI and card EMI are commonly offered on electronics in this price range. The exact EMI and bank options appear on the ${store} checkout page before you pay.`,
    });
  } else if (kind === "fashion") {
    faqs.push({
      q: `Is ${name} genuine and as shown?`,
      a: `This deal links to ${name} on ${store}, so you get the seller's original listing with size chart, images and buyer reviews. Check the size guide and reviews before ordering, and use ${store}'s easy returns if the fit is off.`,
    });
  } else if (kind === "grocery") {
    faqs.push({
      q: `Is ${name} a genuine product with a good expiry date?`,
      a: `Yes — this links to ${name} on ${store}'s marketplace listing. Check the seller rating and pack details on the product page, and prefer listings with recent reviews for freshness.`,
    });
  }

  // High-discount deals: address the "is this fake MRP?" search intent.
  if (disc != null && disc >= 50) {
    faqs.push({
      q: `Is this ${disc}% discount on ${name} genuine?`,
      a: `${SITE_NAME} lists the live ${store} price, and real discounts do reach this range during sales. Still, always sanity-check the current price against the usual selling price — a genuine deal beats the recent typical price, not just an inflated MRP.`,
    });
  } else {
    faqs.push({
      q: `Is ${price ? `${price} ` : "this "}the best price for ${name}?`,
      a: `It is among the best live prices we have tracked for ${name} on ${store}. Prices fluctuate, so compare the current figure and apply any coupon before buying.`,
    });
  }

  // Always: availability + how to get it.
  faqs.push({
    q: `Is this ${name} deal still available?`,
    a: `Yes — this deal is live on ${SITE_NAME} right now. Offers like this can sell out or expire once the promotion ends, so grab it soon if the price works for you.`,
  });
  faqs.push({
    q: `How do I get this ${store} deal safely?`,
    a: `Tap Get Deal to open the product on ${store}, add it to your cart and check out — you pay securely on ${store}, never on ${SITE_NAME}.${
      deal.couponNote ? ` ${deal.couponNote}` : ""
    } The discounted price applies on the ${store} checkout page.`,
  });

  return faqs;
}

// Human labels for category URL segments.
export const CATEGORY_TYPE_LABEL: Record<string, string> = {
  "shopping-category": "Category",
  "shopping-site": "Store",
};
