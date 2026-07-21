import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Wildcard allow keeps AI crawlers (GPTBot, PerplexityBot, ClaudeBot, etc.)
    // welcome for GEO citations. Only utility routes are blocked.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/search", "/api/", "/admin"] }],
    sitemap: absUrl("/sitemap.xml"),
    host: absUrl("/"),
  };
}
