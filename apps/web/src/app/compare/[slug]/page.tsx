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
  const updatedLabel = new Date(c.updated).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <article className="max-w-3xl">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />
      <Breadcrumbs items={crumbs} />

      {/* Hero */}
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 font-semibold uppercase tracking-wide text-indigo-600">
          {c.intent}
        </span>
        <span className="inline-flex items-center gap-1.5 text-gray-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Updated {updatedLabel}
        </span>
      </div>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{c.h1}</h1>

      {/* At-a-glance: the two options */}
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
        <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-indigo-700">{c.aLabel}</span>
        <span className="text-xs font-bold uppercase text-rose-500">vs</span>
        <span className="rounded-md bg-rose-50 px-2.5 py-1 text-rose-700">{c.bLabel}</span>
      </div>

      {/* Quick answer — the passage answer engines lift (GEO) */}
      <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-indigo-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick answer
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-800">{c.answer}</p>
      </div>

      {/* Bottom line */}
      <div className="mt-4 flex gap-3 rounded-2xl border border-gray-200 bg-white p-5">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Bottom line</p>
          <p className="mt-1 text-[15px] font-medium leading-relaxed text-gray-900">{c.verdict}</p>
        </div>
      </div>

      {/* Comparison table — the structure that wins featured snippets */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="h-5 w-1 rounded-full bg-indigo-500" aria-hidden />
          {c.aLabel} vs {c.bLabel}: side by side
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left text-sm tabular-nums">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold">
                  <span className="inline-block rounded bg-indigo-100 px-2 py-0.5 text-indigo-700">{c.aLabel}</span>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <span className="inline-block rounded bg-rose-100 px-2 py-0.5 text-rose-700">{c.bLabel}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r, i) => (
                <tr key={r.feature} className={`align-top ${i % 2 ? "bg-white" : "bg-gray-50/40"}`}>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.feature}</td>
                  <td className="px-4 py-3 text-gray-700">{r.a}</td>
                  <td className="px-4 py-3 text-gray-700">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {c.sections.map((s) => (
        <section key={s.h2} className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <span className="h-5 w-1 rounded-full bg-indigo-500" aria-hidden />
            {s.h2}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-gray-700">{s.body}</p>
        </section>
      ))}

      {/* Visible FAQ — mirrors the FAQPage schema above */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="h-5 w-1 rounded-full bg-indigo-500" aria-hidden />
          Frequently asked questions
        </h2>
        <div className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200">
          {c.faqs.map((f, i) => (
            <details key={i} open={i === 0} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500">
                {f.q}
                <svg
                  className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
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
      <section className="mt-12 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6">
        <h2 className="text-base font-bold text-gray-900">Shop the best prices</h2>
        <p className="mt-1 text-sm text-gray-500">Live deals updated through the day.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {c.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {l.text}
              <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M18 12H4" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-bold text-gray-900">More buying guides</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/compare/${o.slug}`}
                className="group flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {o.h1}
                <svg className="h-4 w-4 shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500 motion-reduce:transform-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
