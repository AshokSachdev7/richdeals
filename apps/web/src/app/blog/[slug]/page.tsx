import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { marked } from "marked";
import { getPost } from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, absUrl } from "@/lib/site";

export const revalidate = 300;

// Pull Q/A pairs from a "## FAQ" section (### question → answer) for FAQPage
// schema — big AEO/rich-result win for AI answers and Google.
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

type Props = { params: Promise<{ slug: string }> };

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
  const post = await getPost(slug);
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
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absUrl(c.href),
    })),
  };

  const faq = extractFaq(post.content || "");
  const faqSchema = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const html = marked.parse(post.content || "", { async: false }) as string;

  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Breadcrumbs items={crumbs} />

      <h1 className="text-3xl font-extrabold leading-tight">{post.title}</h1>
      <time className="mt-2 block text-sm text-gray-400" dateTime={post.publishedAt}>
        {new Date(post.publishedAt).toLocaleDateString("en-IN")}
        {post.author ? ` · ${post.author}` : ""}
      </time>

      {post.coverImage && (
        <div className="relative mt-4 aspect-video overflow-hidden rounded-lg bg-gray-50">
          <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" sizes="768px" />
        </div>
      )}

      <div
        className="prose prose-headings:font-bold prose-a:text-brand mt-6 max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="mt-10 rounded-xl border border-brand/20 bg-brand/5 p-5 text-center">
        <p className="font-bold text-ink">Ready to save?</p>
        <p className="mt-1 text-sm text-gray-600">Browse today&apos;s handpicked deals, updated every few minutes.</p>
        <a href="/" className="mt-3 inline-flex rounded-lg bg-brand px-5 py-2 text-sm font-bold text-white hover:bg-brand-dark">
          See Live Deals
        </a>
      </div>
    </article>
  );
}
