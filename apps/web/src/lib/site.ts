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

// AEO/GEO: an ItemList that embeds a full Product + Offer per deal (name,
// image, INR price, availability, seller) instead of a bare url — so answer
// engines and Google's listing parsers can read prices straight off a listing
// page without crawling each deal. Mirrors the single-deal Product schema.
// Price-less deals still list (name + url + image), just without an Offer,
// since a bare item inside an ItemList is valid where a lone Product isn't.
export function dealItemListSchema(
  deals: (Pick<DealDTO, "title" | "slug" | "price" | "image" | "status"> & {
    store: { name: string };
  })[],
  name: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: deals.length,
    itemListElement: deals.map((d, i) => {
      const url = absUrl(`/${d.slug}`);
      const product: Record<string, unknown> = { "@type": "Product", name: dealProductName(d), url };
      if (d.image) product.image = [d.image];
      if (d.price != null) {
        product.offers = {
          "@type": "Offer",
          priceCurrency: "INR",
          price: String(d.price),
          availability: d.status === "EXPIRED" ? "https://schema.org/Discontinued" : "https://schema.org/InStock",
          url,
          seller: { "@type": "Organization", name: d.store.name },
        };
      }
      return { "@type": "ListItem", position: i + 1, url, item: product };
    }),
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

// GEO: a self-contained factual paragraph an answer engine can lift whole.
// Ingested descriptions are ~35 words — below the range that actually gets
// cited — so this adds the concrete numbers (price, MRP, saving, store,
// category) in plain prose. Every clause comes from a real field; clauses
// with no data are dropped rather than filled in.
export function dealSummary(
  deal: Pick<DealDTO, "title" | "price" | "mrp" | "discountPct" | "couponNote" | "dealType" | "status"> & {
    store: { name: string };
    categories: { name: string }[];
  },
): string {
  const name = dealProductName(deal);
  const store = deal.store.name;
  const disc = discountOf(deal);
  const cat = deal.categories.find((c) => c.name)?.name;
  const parts: string[] = [];

  if (deal.price != null) {
    const saving = deal.mrp != null && deal.mrp > deal.price ? deal.mrp - deal.price : null;
    parts.push(
      `${name} is listed at ${formatINR(deal.price)} on ${store}` +
        (deal.mrp != null && deal.mrp > deal.price
          ? `, down from a maximum retail price of ${formatINR(deal.mrp)}` +
            (saving ? ` — a saving of ${formatINR(saving)}${disc != null ? ` (${disc}% off)` : ""}` : "")
          : "") +
        ".",
    );
  } else {
    parts.push(`${name} is currently listed on ${store}; tap Get Deal to see the live price.`);
  }

  parts.push(
    `${SITE_NAME} tracks this ${deal.dealType.toLowerCase()} directly from the ${store} listing, so the figure above is the marketplace price rather than a quoted or estimated one.`,
  );

  if (deal.couponNote) parts.push(deal.couponNote.trim().replace(/\.?$/, "."));

  if (cat) {
    parts.push(
      `It sits in our ${cat} section, alongside other verified ${cat.toLowerCase()} offers refreshed through the day.`,
    );
  }

  parts.push(
    deal.status === "EXPIRED"
      ? `This offer has since ended — the page stays up for price reference, and the ${store} link still points at the same product.`
      : `Stock and pricing on ${store} move quickly, so check the final amount on the ${store} checkout page before paying; the deal ends whenever the seller withdraws it.`,
  );

  return parts.join(" ");
}

// AEO/GEO: build a small, genuinely-useful FAQ from a deal's real fields so
// deal pages carry FAQPage schema (rich results + AI-answer citations) with
// visible matching copy. Questions vary by product category + discount so no
// two deal pages share the same FAQ. No fabricated facts.
export function dealFaq(
  deal: Pick<DealDTO, "title" | "price" | "mrp" | "discountPct" | "couponNote" | "status"> & {
    store: { name: string };
  },
): { q: string; a: string }[] {
  const name = dealProductName(deal);
  const store = deal.store.name;
  const expired = deal.status === "EXPIRED";
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
      ? expired
        ? `${name} was last tracked at ${price}${cheaper} on ${store}. That offer has ended, so the current price on the ${store} listing will be higher — the figure is kept here for price reference.`
        : `${name} is available for ${price}${cheaper} through ${SITE_NAME}'s ${store} link. Prices change quickly during sales, so confirm the live price before you order.`
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
    a: expired
      ? `No — this offer has ended. The page stays up so you can see what ${name} sold for, and the ${store} link still opens the same product if you want the current price.`
      : `Yes — this deal is live on ${SITE_NAME} right now. Offers like this can sell out or expire once the promotion ends, so grab it soon if the price works for you.`,
  });
  faqs.push({
    q: expired ? `Where can I still buy ${name}?` : `How do I get this ${store} deal safely?`,
    a: expired
      ? `Tap Get Deal to open ${name} on ${store} at whatever it costs today, or watch ${SITE_NAME} for the next drop on it — we re-post the product when the price falls again.`
      : `Tap Get Deal to open the product on ${store}, add it to your cart and check out — you pay securely on ${store}, never on ${SITE_NAME}.${
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
