import type { MetadataRoute } from "next";
import { getStores, getCategories } from "@/lib/api";
import { SITE_URL, absUrl } from "@/lib/site";
import { COMPARISONS } from "@/lib/comparisons";
import { ALTERNATIVES } from "@/lib/alternatives";
import { BEST_TOPICS } from "@/lib/best";
import { hasStoreSeo } from "@/lib/store-seo";

// Child of the /sitemap.xml index: hubs, guides, stores, categories, compares.
// Deals and blog posts live in their own children (sitemaps/deals, sitemaps/blog)
// so GSC reports indexing per page type.
export const revalidate = 1800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // New STATIC routes go here by hand; dynamic URLs come from the API.
  const staticRoutes: MetadataRoute.Sitemap = [
    // SITE_URL, not absUrl("/") — the homepage canonical has no trailing slash.
    { url: SITE_URL, lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: absUrl("/offers"), lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: absUrl("/categories"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/stores"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/coupons"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/freebies"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/best"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    ...BEST_TOPICS.map((t) => ({ url: absUrl(`/best/${t.slug}`), lastModified: now, changeFrequency: "daily" as const, priority: 0.8 })),
    { url: absUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: absUrl("/compare"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: absUrl("/alternatives"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: absUrl("/forum"), lastModified: now, changeFrequency: "hourly", priority: 0.6 },
    // Trust pages — AdSense review and Google both look for these.
    { url: absUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: absUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: absUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absUrl("/disclosure"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [stores, categories] = await Promise.all([getStores(), getCategories()]);

  // Only store hubs with live deals or hand-written copy — the 245 empty
  // directory hubs stay LIVE (never 404) but are noindexed by the store page.
  const storeRoutes: MetadataRoute.Sitemap = stores
    .filter((s) => (s.liveDeals ?? 1) > 0 || hasStoreSeo(s.slug))
    .map((s) => ({ url: absUrl(`/stores/${s.slug}`), lastModified: now, changeFrequency: "daily", priority: 0.6 }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absUrl(`/category/${c.type === "SHOPPING_SITE" ? "shopping-site" : "shopping-category"}/${c.slug}`),
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const compareRoutes: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: absUrl(`/compare/${c.slug}`),
    lastModified: new Date(c.updated),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const alternativeRoutes: MetadataRoute.Sitemap = ALTERNATIVES.map((a) => ({
    url: absUrl(`/alternatives/${a.slug}`),
    lastModified: new Date(a.updated),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...storeRoutes, ...categoryRoutes, ...compareRoutes, ...alternativeRoutes];
}
