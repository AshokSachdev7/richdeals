import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogCard from "@/components/BlogCard";
import { SITE_NAME, absUrl, breadcrumbSchema } from "@/lib/site";

export const dynamic = "force-dynamic";

const BLOG_TITLE = "Blog — Money-Saving Guides & Deal News";
const BLOG_DESC = `Money-saving guides, coupon tricks and deal roundups from ${SITE_NAME} — buy smarter on Amazon, Flipkart and 100+ Indian stores, and pay less on every order.`;

// 295 posts were rendering in one grid: 1.18MB of HTML, the worst TTFB on the
// site, and an ItemList of 295 entries on a page that can only be about a
// handful of them. Paginate; page 1 stays the indexable hub.
const PER_PAGE = 30;

type Props = { searchParams: Promise<{ page?: string }> };

const pageNum = (raw?: string) => Math.max(1, Number(raw) || 1);

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = pageNum((await searchParams).page);
  const url = page > 1 ? absUrl(`/blog?page=${page}`) : absUrl("/blog");
  const title = page > 1 ? `${BLOG_TITLE} — Page ${page}` : BLOG_TITLE;
  return {
    title,
    description: BLOG_DESC,
    // Page 2+ exists to be crawled (it carries the only links to older posts),
    // not indexed — same pattern the store hubs use for cursor pages.
    robots: page > 1 ? { index: false, follow: true } : undefined,
    alternates: { canonical: url },
    openGraph: { title, description: BLOG_DESC, url, type: "website", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description: BLOG_DESC },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const page = pageNum((await searchParams).page);
  const { items: all } = await getPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const items = all.slice(start, start + PER_PAGE);

  const jsonLd = [
    breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: BLOG_TITLE,
      description: BLOG_DESC,
      url: page > 1 ? absUrl(`/blog?page=${page}`) : absUrl("/blog"),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.map((post, i) => ({
          "@type": "ListItem",
          position: start + i + 1,
          url: absUrl(`/blog/${post.slug}`),
          name: post.title,
        })),
      },
    },
  ];

  const href = (p: number) => (p > 1 ? `/blog?page=${p}` : "/blog");

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post, i) => (
              <BlogCard key={post.slug} post={post} featured={page === 1 && i === 0} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-between gap-4 text-sm" aria-label="Blog pagination">
              {page > 1 ? (
                <Link href={href(page - 1)} rel="prev" className="rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold text-ink hover:bg-gray-50">
                  ← Newer articles
                </Link>
              ) : (
                <span />
              )}
              <span className="text-gray-500">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link href={href(page + 1)} rel="next" className="rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold text-ink hover:bg-gray-50">
                  Older articles →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
