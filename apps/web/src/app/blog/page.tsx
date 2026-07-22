import type { Metadata } from "next";
import { getPosts } from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogCard from "@/components/BlogCard";
import { SITE_NAME, absUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Money-Saving Guides & Deal News",
  description: `Shopping guides, coupon tips and deal roundups from the ${SITE_NAME} team.`,
  alternates: { canonical: absUrl("/blog") },
};

export default async function BlogPage() {
  const { items } = await getPosts();

  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />

      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          The RichDeals Blog
        </h1>
        <p className="mt-2 text-base leading-relaxed text-gray-500">
          Straight-talking shopping guides, coupon tricks and deal breakdowns — written to help you
          pay less, every time you buy.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
          No articles published yet. Check back soon!
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post, i) => (
            <BlogCard key={post.slug} post={post} featured={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
