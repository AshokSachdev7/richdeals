import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, absUrl } from "@/lib/site";

export const revalidate = 300;

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
      <h1 className="mb-1 text-2xl font-extrabold">Blog</h1>
      <p className="mb-5 text-sm text-gray-500">Guides, tips and deal news to help you save more.</p>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No articles published yet. Check back soon!
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-md"
            >
              {post.coverImage && (
                <div className="relative aspect-video bg-gray-50">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="400px" />
                </div>
              )}
              <div className="flex flex-col gap-1 p-4">
                <h2 className="font-bold leading-tight">{post.title}</h2>
                {post.excerpt && <p className="line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>}
                <time className="mt-1 text-xs text-gray-400" dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-IN")}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
