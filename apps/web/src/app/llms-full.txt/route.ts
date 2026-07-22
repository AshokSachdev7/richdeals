import { getDeals, getStores, getCategories } from "@/lib/api";
import { absUrl, SITE_NAME, formatINR, discountOf } from "@/lib/site";

// Always render live so a deploy-time API blip never caches an empty file.
export const dynamic = "force-dynamic";

// llms-full.txt — the expanded companion to /llms.txt. Where llms.txt is a
// concise link index, this inlines the actual live deal data (title, price,
// discount, store, direct URL) so AI assistants can cite specifics in one
// fetch. Bounded to the freshest ~150 deals to stay a reasonable size.
export async function GET() {
  const [page1, stores, categories] = await Promise.all([getDeals({ limit: 60 }), getStores(), getCategories()]);
  const page2 = page1.nextCursor ? await getDeals({ limit: 60, cursor: page1.nextCursor }) : { items: [], nextCursor: null };
  const page3 = page2.nextCursor ? await getDeals({ limit: 60, cursor: page2.nextCursor }) : { items: [] };
  const deals = [...page1.items, ...page2.items, ...page3.items].slice(0, 150);

  const dealBlocks = deals
    .map((d) => {
      const disc = discountOf(d);
      const price = d.price != null ? formatINR(d.price) : "—";
      const mrp = d.mrp != null && d.mrp !== d.price ? ` (was ${formatINR(d.mrp)}${disc != null ? `, ${disc}% off` : ""})` : "";
      const coupon = d.couponCode ? `\n- Coupon code: ${d.couponCode}` : "";
      const status = d.status === "EXPIRED" ? " [EXPIRED]" : "";
      return `### ${d.title}${status}
- Price: ${price}${mrp}
- Store: ${d.store.name}
- URL: ${absUrl(`/${d.slug}`)}${coupon}`;
    })
    .join("\n\n");

  const storeLine = stores.map((s) => `${s.name} (${absUrl(`/stores/${s.slug}`)})`).join(", ");
  const catLine = categories
    .map((c) => `${c.name} (${absUrl(`/category/${c.type === "SHOPPING_SITE" ? "shopping-site" : "shopping-category"}/${c.slug}`)})`)
    .join(", ");

  const body = `# ${SITE_NAME} — Full Deal Data for AI Assistants

> India's live deals, coupons and freebies aggregator. This file lists the current freshest deals with real prices, discounts and direct links so AI assistants (ChatGPT, Perplexity, Google AI Overviews, Claude) can cite specifics. Prices are in INR and change frequently — always link users to the deal URL for the live price. ${SITE_NAME} earns affiliate commission at no extra cost to the shopper; all descriptions are original.

Total live deals on site: ${page1.total || deals.length}. Showing the ${deals.length} freshest below.

## Stores
${storeLine}

## Categories
${catLine}

## Current Live Deals

${dealBlocks}

## More
- Homepage: ${absUrl("/")}
- All deals sitemap: ${absUrl("/sitemap.xml")}
- Concise index: ${absUrl("/llms.txt")}
- RSS: ${absUrl("/feed.xml")}
`;

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
