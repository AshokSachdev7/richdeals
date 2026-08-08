import type { MetadataRoute } from "next";
import { getDeals, getStores, getCategories, getPosts } from "@/lib/api";
import { absUrl } from "@/lib/site";
import { COMPARISONS } from "@/lib/comparisons";

// ISR-cached (not force-dynamic): with ~2000 deals the per-request render is
// ~33 sequential API calls and was timing out. Cache for 30min instead.
// ponytail: if a deploy-blip caches an empty sitemap, next revalidate fixes it.
export const revalidate = 1800;

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
    { url: absUrl("/offers"), lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: absUrl("/categories"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/stores"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/coupons"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/freebies"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: absUrl("/compare"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: absUrl("/submit"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // Trust pages — AdSense review and Google both look for these, and they
    // were reachable from the footer but absent from the sitemap.
    { url: absUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: absUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: absUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absUrl("/disclosure"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [allDeals, stores, categories, posts] = await Promise.all([
    fetchAllDeals(),
    getStores(),
    getCategories(),
    getPosts(),
  ]);

  // If the API blipped during a runtime ISR regen, every getX() returned its
  // empty fallback and we'd cache a sitemap of just the 13 static routes for
  // 30 min — GSC then records "13 discovered pages". Throw instead: Next.js
  // keeps serving the last good sitemap and retries next request, so a stub
  // never ships. Skip this at build time — the api component isn't serving
  // during the web build, so an empty fetch there is expected and the first
  // runtime revalidate repopulates it.
  if (allDeals.length === 0 && process.env.NEXT_PHASE !== "phase-production-build") {
    throw new Error("sitemap: deal fetch returned 0 — refusing to cache degraded sitemap");
  }

  // Only submit deals the page itself lets Google index. Must match the robots
  // rule in app/[dealSlug]/page.tsx EXACTLY: real deal = has price AND image AND
  // a visible saving (discountPct). Firehosing 4358 thin deal URLs starved
  // crawl budget and left ~2500 stuck in "Discovered – currently not indexed";
  // gating to genuine deals concentrates crawl on pages that can actually rank.
  const indexableDeals = allDeals.filter(
    (d) => d.status !== "EXPIRED" && d.price != null && !!d.image && d.discountPct != null,
  );

  const dealRoutes: MetadataRoute.Sitemap = indexableDeals.map((d) => ({
    url: absUrl(`/${d.slug}`),
    // last price sighting, not first publish — a deal repriced today should
    // read as changed today
    lastModified: new Date(d.priceHistory?.[0]?.postedAt ?? d.createdAt),
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

  const compareRoutes: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: absUrl(`/compare/${c.slug}`),
    lastModified: new Date(c.updated),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...dealRoutes,
    ...storeRoutes,
    ...categoryRoutes,
    ...postRoutes,
    ...compareRoutes,
  ];
}
