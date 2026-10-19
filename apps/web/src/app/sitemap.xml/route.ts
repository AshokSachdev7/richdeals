import { absUrl } from "@/lib/site";

// Sitemap INDEX. robots.txt points here; the children are split by page type
// so GSC shows indexing per type. Deals = top-100 indexable only.
export const revalidate = 1800;

const CHILDREN = ["/sitemaps/pages/sitemap.xml", "/sitemaps/deals/sitemap.xml", "/sitemaps/blog/sitemap.xml"];

export function GET() {
  const lastmod = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CHILDREN.map((p) => `<sitemap><loc>${absUrl(p)}</loc><lastmod>${lastmod}</lastmod></sitemap>`).join("\n")}
</sitemapindex>
`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
}
