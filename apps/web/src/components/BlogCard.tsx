import Link from "next/link";
import type { PostDTO } from "@/lib/api";
import { readTime, postCover } from "@/lib/blog";
import LazyImage from "./LazyImage";

export default function BlogCard({ post, featured = false }: { post: PostDTO; featured?: boolean }) {
  const cover = postCover(post);
  const date = new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/60 ${
        featured ? "sm:col-span-2 sm:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "sm:w-1/2" : ""}`}>
        {cover.type === "image" ? (
          <LazyImage
            src={cover.src}
            className={`w-full ${featured ? "h-full min-h-[220px]" : "aspect-[16/9]"}`}
            imgClassName="group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex items-center justify-center bg-gradient-to-br ${cover.gradient} ${featured ? "h-full min-h-[220px]" : "aspect-[16/9]"}`}
            aria-hidden="true"
          >
            <span className="font-display text-5xl font-black text-white/90">%</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand shadow-sm ring-1 ring-black/5">
          {cover.category}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-5 ${featured ? "sm:justify-center" : ""}`}>
        <h2 className={`font-display font-bold leading-snug text-ink transition-colors group-hover:text-brand ${featured ? "text-2xl" : "line-clamp-2 text-lg"}`}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p className={`mt-2 text-sm leading-relaxed text-gray-500 ${featured ? "line-clamp-3" : "line-clamp-2"}`}>
            {post.excerpt}
          </p>
        )}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <time dateTime={post.publishedAt}>{date}</time>
          <span aria-hidden="true">·</span>
          <span>{readTime(post.content)} min read</span>
        </div>
      </div>
    </Link>
  );
}
