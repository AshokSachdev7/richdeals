import type { MetadataRoute } from "next";
import { getTopDeals } from "@/lib/api";
import { absUrl, dealIndexable } from "@/lib/site";

// Child of the /sitemap.xml index: ONLY the top-100 indexable deals (owner
// directive 2026-10-16). Every other deal is served noindex, follow and never
// submitted. Same dealIndexable() the page's robots rule uses, so they can't drift.
export const revalidate = 1800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { top, deals } = await getTopDeals();

  // API blip at runtime → empty fetch → throw so Next keeps serving the last
  // good sitemap instead of caching an empty one for 30 min. Skipped at build,
  // where the API isn't serving.
  if (deals.length === 0 && process.env.NEXT_PHASE !== "phase-production-build") {
    throw new Error("sitemaps/deals: top-deal fetch returned 0 — refusing to cache empty sitemap");
  }

  return deals
    .filter((d) => dealIndexable(d, top))
    .map((d) => ({
      url: absUrl(`/${d.slug}`),
      // last price sighting, not first publish — a repriced deal reads as changed
      lastModified: new Date(d.priceHistory?.[0]?.postedAt ?? d.createdAt),
      changeFrequency: "daily",
      priority: 0.7,
    }));
}
