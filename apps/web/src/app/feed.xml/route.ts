import { getDeals } from "@/lib/api";
import { SITE_NAME, SITE_TAGLINE, SITE_URL, absUrl, formatINR } from "@/lib/site";

export const revalidate = 300;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const { items } = await getDeals({ feed: "latest", limit: 50 });

  const entries = items
    .map((d) => {
      const link = absUrl(`/${d.slug}`);
      const price = d.price != null ? ` — ${formatINR(d.price)}` : "";
      const desc = (d.description || d.title) + price;
      return `    <item>
      <title>${esc(d.title)}${esc(price)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(d.createdAt).toUTCString()}</pubDate>
      <description>${esc(desc)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(SITE_NAME)} — ${esc(SITE_TAGLINE)}</title>
    <link>${SITE_URL}</link>
    <description>Latest deals, coupons and freebies from ${esc(SITE_NAME)}.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${entries}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
}
