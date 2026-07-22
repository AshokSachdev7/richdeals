import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { getPost, getPosts } from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, absUrl } from "@/lib/site";
import { readTime, postCategory, postCover } from "@/lib/blog";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

// Pull Q/A pairs from a "## FAQ" section (### question → answer) for FAQPage
// schema + a styled accordion — big AEO/rich-result win.
function extractFaq(md: string): { q: string; a: string }[] {
  const i = md.search(/^##\s+FAQ/im);
  if (i < 0) return [];
  const parts = md.slice(i).split(/^###\s+/m).slice(1);
  const out: { q: string; a: string }[] = [];
  for (const p of parts) {
    const nl = p.indexOf("\n");
    if (nl < 0) continue;
    const q = p.slice(0, nl).trim();
    const a = p.slice(nl + 1).split(/^##\s+/m)[0].trim();
    if (q && a) out.push({ q, a });
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found" };
  const description = post.excerpt || `${post.title} — ${SITE_NAME} blog.`;
  const canonical = absUrl(`/blog/${post.slug}`);
  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${post.title} | ${SITE_NAME}`,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: { card: "summary_large_image", title: post.title, description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();

  const canonical = absUrl(`/blog/${post.slug}`);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { "@type": "Organization", name: post.author || SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: absUrl("/logo.png") } },
    mainEntityOfPage: canonical,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absUrl(c.href) })),
  };

  const content = post.content || "";
  const faq = extractFaq(content);
  const faqSchema = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;

  // Render prose from everything BEFORE the FAQ section; FAQ shown as accordions.
  const bodyMd = faq.length ? content.slice(0, content.search(/^##\s+FAQ/im)) : content;
  const html = marked.parse(bodyMd, { async: false }) as string;

  const date = new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const cover = postCover(post);
  const related = all.items.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Breadcrumbs items={crumbs} />

      {/* Header */}
      <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
        {postCategory(post)}
      </span>
      <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
        <span className="inline-flex items-center gap-2 font-semibold text-ink">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-black text-white">R</span>
          {post.author || SITE_NAME}
        </span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.publishedAt}>{date}</time>
        <span aria-hidden="true">·</span>
        <span>{readTime(post.content)} min read</span>
      </div>

      {/* Hero */}
      {cover.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover.src} alt={post.title} className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />
      ) : (
        <div className={`mt-6 flex aspect-[21/9] w-full items-center justify-center rounded-2xl bg-gradient-to-br ${cover.gradient}`} aria-hidden="true">
          <span className="font-display text-7xl font-black text-white/90">%</span>
        </div>
      )}

      {/* Body */}
      <div
        className="prose prose-lg mt-8 max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-ink prose-h2:mt-10 prose-h2:border-l-4 prose-h2:border-brand prose-h2:pl-3 prose-h2:text-2xl prose-a:font-semibold prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-table:text-sm prose-th:bg-gray-50 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* FAQ accordion */}
      {faq.length > 0 && (
        <section className="mt-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-display text-2xl font-bold text-ink">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {faq.map((f, i) => (
              <details key={i} className="group px-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink marker:content-none">
                  {f.q}
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="pb-4 text-[15px] leading-relaxed text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-8 text-center text-white">
        <p className="font-display text-xl font-bold">Ready to save?</p>
        <p className="mt-1 text-sm text-white/85">Browse today&apos;s handpicked deals — verified prices, updated every few minutes.</p>
        <Link href="/" className="mt-4 inline-flex rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-brand shadow-sm transition hover:bg-gray-50">
          See Live Deals
        </Link>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14" aria-labelledby="related-heading">
          <h2 id="related-heading" className="mb-5 font-display text-2xl font-bold text-ink">Keep reading</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
