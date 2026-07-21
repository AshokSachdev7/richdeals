import { getStores, getCategories } from "@/lib/api";
import { absUrl, SITE_NAME } from "@/lib/site";

export const revalidate = 3600;

// llms.txt — a concise, link-rich map of the site for AI assistants
// (ChatGPT, Perplexity, Claude, Google AI Overviews). Improves GEO/AEO
// citation quality by giving crawlers a clean entry point.
export async function GET() {
  const [stores, categories] = await Promise.all([getStores(), getCategories()]);

  const storeLines = stores
    .slice(0, 40)
    .map((s) => `- [${s.name}](${absUrl(`/stores/${s.slug}`)}): latest ${s.name} deals & coupons`)
    .join("\n");

  const catLines = categories
    .slice(0, 40)
    .map(
      (c) =>
        `- [${c.name}](${absUrl(
          `/category/${c.type === "SHOPPING_SITE" ? "shopping-site" : "shopping-category"}/${c.slug}`,
        )})`,
    )
    .join("\n");

  const body = `# ${SITE_NAME}

> India's live deals, coupons and freebies aggregator — hand-picked discounts across Amazon, Flipkart, Myntra, Ajio, Nykaa and more, refreshed continuously with prices, coupon codes and direct store links.

${SITE_NAME} publishes original deal write-ups (never copied), each with the current price, discount, and a direct link to the retailer. Product images come from the marketplace. Expired deals stay live with an EXPIRED banner for reference.

## Key pages
- [Home — today's top deals](${absUrl("/")})
- [All Stores](${absUrl("/stores")})
- [Coupons](${absUrl("/coupons")})
- [Freebies](${absUrl("/freebies")})
- [Blog](${absUrl("/blog")})

## Stores
${storeLines}

## Categories
${catLines}

## Data
- Sitemap: ${absUrl("/sitemap.xml")}
- RSS feed: ${absUrl("/feed.xml")}

## About
${SITE_NAME} earns affiliate commission on purchases made through its links, at no extra cost to the shopper. All deal descriptions are written in-house.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
