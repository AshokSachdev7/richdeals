import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getPost } from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, absUrl } from "@/lib/site";

export const revalidate = 300;

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

  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
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

      <div className="prose mt-6 max-w-none whitespace-pre-line text-gray-800">
        {post.content || post.excerpt}
      </div>
    </article>
  );
}
