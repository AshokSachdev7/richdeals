import type { PostDTO } from "@/lib/api";

// ~200 wpm reading speed; strip markdown noise for a rough word count.
export function readTime(content: string | null): number {
  if (!content) return 1;
  const words = content.replace(/[#>*`_\-|]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Derive a human category label from the post's slug/title.
export function postCategory(post: Pick<PostDTO, "slug" | "title">): string {
  const s = `${post.slug} ${post.title}`.toLowerCase();
  if (/\bvs\b|compar/.test(s)) return "Comparison";
  if (/coupon|cashback/.test(s)) return "Coupons";
  if (/sale|billion|festival|prime day|deals/.test(s)) return "Deals";
  if (/fake|scam|spot|avoid/.test(s)) return "Buyer Tips";
  return "Guide";
}

// Related-post picker for the "Keep reading" block. Ranks by shared title/excerpt
// tokens (+ same category), falling back to newest so the slot always fills.
// Replaces "always the 3 newest posts": GSC shows the blog is ~99% of our organic
// impressions, so topical internal links (not a flat newest-3 graph) are the one
// lever that actually concentrates crawl + authority on posts that can rank.
const STOP = new Set(
  "the a an and or for to of in on at with your you our how what best top new under vs is are get buy india indian 2024 2025 2026".split(" "),
);
function titleTokens(s: string): Set<string> {
  return new Set(
    s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)),
  );
}
export function relatedPosts(post: PostDTO, all: PostDTO[], n = 3): PostDTO[] {
  const cat = postCategory(post);
  const t = titleTokens(`${post.title} ${post.excerpt ?? ""}`);
  return all
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const shared = [...titleTokens(`${p.title} ${p.excerpt ?? ""}`)].filter((w) => t.has(w)).length;
      return { p, score: shared * 2 + (postCategory(p) === cat ? 1 : 0), date: +new Date(p.publishedAt) };
    })
    .sort((a, b) => b.score - a.score || b.date - a.date)
    .slice(0, n)
    .map((x) => x.p);
}

// On-brand gradient chosen deterministically from the slug (no cover image needed).
const GRADIENTS = [
  "from-brand to-brand-dark",
  "from-[#f14b57] via-brand to-brand-dark",
  "from-savings to-brand",
  "from-brand-dark to-ink",
  "from-[#f77f00] to-brand",
];
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export type Cover =
  | { type: "image"; src: string; category: string }
  | { type: "gradient"; gradient: string; category: string };

export function postCover(post: PostDTO): Cover {
  const category = postCategory(post);
  if (post.coverImage) return { type: "image", src: post.coverImage, category };
  return { type: "gradient", gradient: GRADIENTS[hash(post.slug) % GRADIENTS.length], category };
}
