import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/api";
import { absUrl } from "@/lib/site";
import POST_REDIRECTS from "../../../../post-redirects.json";

// Child of the /sitemap.xml index: blog posts.
export const revalidate = 1800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  // Slugs folded into a keeper by next.config redirects() answer 308 — never
  // submit a URL we redirect away from.
  return posts.items
    .filter((p) => !(p.slug in POST_REDIRECTS))
    .map((p) => ({
      url: absUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt || p.publishedAt),
      changeFrequency: "weekly",
      priority: 0.5,
    }));
}
