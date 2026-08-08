import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { COMPARISONS, comparisonBySlug } from "@/lib/comparisons";
import { SITE_NAME, SITE_URL, absUrl, breadcrumbSchema } from "@/lib/site";

export const dynamic = "force-static";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = comparisonBySlug(slug);
  if (!c) return { title: "Comparison not found" };
  return {
    title: c.seoTitle,
    description: c.seoDesc,
    alternates: { canonical: absUrl(`/compare/${c.slug}`) },
    openGraph: { title: `${c.seoTitle} | ${SITE_NAME}`, description: c.seoDesc, type: "article" },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const c = comparisonBySlug(slug);
  if (!c) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Buying Guides", href: "/compare" },
    { name: c.h1, href: `/compare/${c.slug}` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: c.h1,
    description: c.seoDesc,
    datePublished: c.updated,
    dateModified: c.updated,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: absUrl(`/compare/${c.slug}`),
  };

  const others = COMPARISONS.filter((x) => x.slug !== c.slug);

  return (
    <article className="max-w-3xl">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />
      <Breadcrumbs items={crumbs} />

      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">{c.h1}</h1>
      <p className="mt-1 text-xs text-gray-400">
        {c.intent} · Updated{" "}
        {new Date(c.updated).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
      </p>

      {/* GEO answer-first block — the passage answer engines lift */}
      <p className="mt-5 rounded-xl bg-gray-50 p-4 text-[15px] leading-relaxed text-gray-800">
        {c.answer}
      </p>
      <p className="mt-3 text-[15px] font-medium text-gray-900">{c.verdict}</p>

      {/* Comparison table — the structure that wins featured snippets */}
      <section className="mt-8">
        <h2 className="text-xl font-bold">
          {c.aLabel} vs {c.bLabel}: side by side
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3 font-medium">Feature</th>
                <th className="py-2 pr-3 font-medium">{c.aLabel}</th>
                <th className="py-2 font-medium">{c.bLabel}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.feature} className="border-b border-gray-100 align-top">
                  <td className="py-2 pr-3 font-medium text-gray-900">{r.feature}</td>
                  <td className="py-2 pr-3 text-gray-700">{r.a}</td>
                  <td className="py-2 text-gray-700">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {c.sections.map((s) => (
        <section key={s.h2} className="mt-8">
          <h2 className="text-xl font-bold">{s.h2}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-gray-700">{s.body}</p>
        </section>
      ))}

      {/* Visible FAQ — mirrors the FAQPage schema above */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Frequently asked questions</h2>
        <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-100">
          {c.faqs.map((f, i) => (
            <details key={i} open={i === 0} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 font-medium text-gray-900">
                {f.q}
                <svg
                  className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-4 text-[15px] leading-relaxed text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Internal links — stable category hubs + live deals, never volatile slugs */}
      <section className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-5">
        <h2 className="text-base font-bold">Shop the best prices</h2>
        <ul className="mt-2 space-y-1 text-[15px]">
          {c.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-indigo-600 hover:underline">
                {l.text}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-bold">More buying guides</h2>
        <ul className="mt-2 space-y-1 text-[15px]">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/compare/${o.slug}`} className="text-indigo-600 hover:underline">
                {o.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
