import type { MetadataRoute } from "next";
import { getDeals, getStores, getCategories, getPosts } from "@/lib/api";
import { absUrl } from "@/lib/site";

export const revalidate = 300;

// The public API caps limit at 60, so page through every LIVE deal by cursor
// to get all deal URLs into the sitemap (bounded for safety).
async function fetchAllDeals() {
  const out = [];
  let cursor: number | undefined;
  for (let i = 0; i < 200; i++) {
    const page = await getDeals({ limit: 60, cursor });
    out.push(...page.items);
    if (!page.nextCursor) break;
    cursor = page.nextCursor;
  }
  return out;
}

// Pulls slugs from the API. If the API is down every call returns its safe
// fallback, so the sitemap degrades to just the static routes — never crashes.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absUrl("/"), lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: absUrl("/stores"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/coupons"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/freebies"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.6 },
  ];

  const [allDeals, stores, categories, posts] = await Promise.all([
    fetchAllDeals(),
    getStores(),
    getCategories(),
    getPosts(),
  ]);

  const dealRoutes: MetadataRoute.Sitemap = allDeals.map((d) => ({
    url: absUrl(`/${d.slug}`),
    lastModified: new Date(d.createdAt),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const storeRoutes: MetadataRoute.Sitemap = stores.map((s) => ({
    url: absUrl(`/stores/${s.slug}`),
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absUrl(
      `/category/${c.type === "SHOPPING_SITE" ? "shopping-site" : "shopping-category"}/${c.slug}`,
    ),
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.items.map((p) => ({
    url: absUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updatedAt || p.publishedAt),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...dealRoutes, ...storeRoutes, ...categoryRoutes, ...postRoutes];
}
