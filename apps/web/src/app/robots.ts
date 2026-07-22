import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

// AI/LLM crawlers explicitly welcomed for GEO citations (ChatGPT, Claude,
// Perplexity, Google AI, Bing/Copilot, Common Crawl, etc.). /llms.txt +
// /llms-full.txt are dynamic and reachable by all of them.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "cohere-ai",
  "Amazonbot",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  const allowRules = { allow: "/", disallow: ["/search", "/api/", "/admin"] };
  return {
    rules: [
      // Explicit allow for each AI crawler (belt-and-suspenders over the wildcard).
      ...AI_BOTS.map((userAgent) => ({ userAgent, ...allowRules })),
      { userAgent: "*", ...allowRules },
    ],
    sitemap: absUrl("/sitemap.xml"),
    host: absUrl("/"),
  };
}
