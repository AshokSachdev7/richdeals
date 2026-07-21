import type { MetadataRoute } from "next";
import { getDeals, getStores, getCategories, getPosts } from "@/lib/api";
import { absUrl } from "@/lib/site";

export const revalidate = 300;

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

  const [deals, stores, categories, posts] = await Promise.all([
    getDeals({ limit: 5000 }),
    getStores(),
    getCategories(),
    getPosts(),
  ]);

  const dealRoutes: MetadataRoute.Sitemap = deals.items.map((d) => ({
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
