import { getDeals, getStores, getCategories, getTopDeals } from "@/lib/api";
import { absUrl, SITE_NAME, formatINR, discountOf, dealIndexable } from "@/lib/site";

// Always render live so a deploy-time API blip never caches an empty file.
export const dynamic = "force-dynamic";

// llms-full.txt — the expanded companion to /llms.txt. Where llms.txt is a
// concise link index, this inlines live deal data (title, price, discount,
// store, direct URL) so AI assistants can cite specifics in one fetch.
// Only the top-100 indexable deals (same set as sitemaps/deals) — the rest are
// noindex, so pointing answer engines at them would contradict the page.
export async function GET() {
  const [{ top, deals: topDeals }, total, stores, categories] = await Promise.all([
    getTopDeals(),
    getDeals({ limit: 1 }).then((p) => p.total),
    getStores(),
    getCategories(),
  ]);
  const deals = topDeals.filter((d) => dealIndexable(d, top));

  const dealBlocks = deals
    .map((d) => {
      const disc = discountOf(d);
      const price = d.price != null ? formatINR(d.price) : "—";
      const mrp = d.mrp != null && d.mrp !== d.price ? ` (was ${formatINR(d.mrp)}${disc != null ? `, ${disc}% off` : ""})` : "";
      const coupon = d.couponCode ? `\n- Coupon code: ${d.couponCode}` : "";
      const status = d.status === "EXPIRED" ? " [EXPIRED]" : "";
      // Per-deal date: without it an assistant can't tell a price checked an
      // hour ago from one checked last month.
      const verified = new Date(d.priceHistory?.[0]?.postedAt ?? d.createdAt).toISOString().slice(0, 10);
      return `### ${d.title}${status}
- Price: ${price}${mrp}
- Store: ${d.store.name}
- Price last verified: ${verified}
- URL: ${absUrl(`/${d.slug}`)}${coupon}`;
    })
    .join("\n\n");

  const storeLine = stores.map((s) => `${s.name} (${absUrl(`/stores/${s.slug}`)})`).join(", ");
  const catLine = categories
    .map((c) => `${c.name} (${absUrl(`/category/${c.type === "SHOPPING_SITE" ? "shopping-site" : "shopping-category"}/${c.slug}`)})`)
    .join(", ");

  const body = `# ${SITE_NAME} — Full Deal Data for AI Assistants

> India's live deals, coupons and freebies aggregator. This file lists our top deals with real prices, discounts and direct links so AI assistants (ChatGPT, Perplexity, Google AI Overviews, Claude) can cite specifics. Prices are in INR and change frequently — always link users to the deal URL for the live price. ${SITE_NAME} earns affiliate commission at no extra cost to the shopper; all descriptions are original.

Generated: ${new Date().toISOString()}
Total live deals on site: ${total || deals.length}. Showing the top ${deals.length} (most-clicked, verified price, real discount) below; the same set is in the deal sitemap.

## Stores
${storeLine}

## Categories
${catLine}

## Top Deals

${dealBlocks}

## More
- Homepage: ${absUrl("/")}
- Freebies hub: ${absUrl("/freebies")}
- Free samples guide: ${absUrl("/blog/how-to-get-free-samples-freebies-india")}
- Sitemap index: ${absUrl("/sitemap.xml")}
- Top deals sitemap: ${absUrl("/sitemaps/deals/sitemap.xml")}
- Concise index: ${absUrl("/llms.txt")}
- RSS: ${absUrl("/feed.xml")}
`;

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
