import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { ALTERNATIVES, ALT_LINKS, SITES, alternativeBySlug } from "@/lib/alternatives";
import { SITE_NAME, SITE_URL, absUrl, breadcrumbSchema } from "@/lib/site";

export const dynamic = "force-static";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALTERNATIVES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = alternativeBySlug(slug);
  if (!a) return { title: "Page not found" };
  return {
    title: a.seoTitle,
    description: a.seoDesc,
    alternates: { canonical: absUrl(`/alternatives/${a.slug}`) },
    openGraph: { siteName: SITE_NAME, locale: "en_IN", title: `${a.seoTitle} | ${SITE_NAME}`, description: a.seoDesc, type: "article", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
  };
}

const H2 = "flex items-center gap-2 text-xl font-bold text-gray-900";

export default async function AlternativePage({ params }: Props) {
  const { slug } = await params;
  const a = alternativeBySlug(slug);
  if (!a) notFound();

  const picks = a.picks.map((k) => SITES[k]);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Deal Site Alternatives", href: "/alternatives" },
    { name: `${a.competitor} alternatives`, href: `/alternatives/${a.slug}` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: a.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.h1,
    description: a.seoDesc,
    datePublished: a.updated,
    dateModified: a.updated,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: absUrl(`/alternatives/${a.slug}`),
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: a.h1,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: picks.length,
    itemListElement: picks.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: p.url.startsWith("/") ? absUrl(p.url) : p.url,
    })),
  };

  const others = ALTERNATIVES.filter((x) => x.slug !== a.slug);
  const updatedLabel = new Date(a.updated).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <article className="max-w-3xl">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={listSchema} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 font-semibold uppercase tracking-wide text-indigo-600">
          Alternatives
        </span>
        <span className="text-gray-400">Updated {updatedLabel}</span>
      </div>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{a.h1}</h1>

      {/* Quick answer — the passage answer engines lift (GEO) */}
      <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-indigo-600">Quick answer</p>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-800">{a.answer}</p>
      </div>

      <section className="mt-10">
        <h2 className={H2}>
          <span className="h-5 w-1 rounded-full bg-indigo-500" aria-hidden />
          What is {a.competitor}?
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-700">{a.about}</p>
      </section>

      {/* Ranked picks */}
      <section className="mt-10">
        <h2 className={H2}>
          <span className="h-5 w-1 rounded-full bg-indigo-500" aria-hidden />
          The best {a.competitor} alternatives
        </h2>
        <ol className="mt-4 space-y-4">
          {picks.map((p, i) => (
            <li
              key={p.key}
              className={`rounded-2xl border bg-white p-5 ${i === 0 ? "border-indigo-300 ring-1 ring-indigo-100" : "border-gray-200"}`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-sm font-bold text-indigo-600">#{i + 1}</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {p.url.startsWith("/") ? (
                    <Link href={p.url} className="hover:text-indigo-700">{p.name}</Link>
                  ) : (
                    <a href={p.url} target="_blank" rel="nofollow noopener noreferrer" className="hover:text-indigo-700">{p.name}</a>
                  )}
                </h3>
                {i === 0 && (
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-indigo-600">
                    Our site
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">Best for: {p.bestFor}</p>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <p className="font-semibold text-emerald-700">Pros</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-gray-700">
                    {p.pros.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-rose-700">Cons</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-gray-700">
                    {p.cons.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className={H2}>
          <span className="h-5 w-1 rounded-full bg-indigo-500" aria-hidden />
          {SITE_NAME} vs {a.competitor}: side by side
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold">{SITE_NAME}</th>
                <th className="px-4 py-3 font-semibold">{a.competitor}</th>
              </tr>
            </thead>
            <tbody>
              {a.rows.map((r, i) => (
                <tr key={r.feature} className={`align-top ${i % 2 ? "bg-white" : "bg-gray-50/40"}`}>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.feature}</td>
                  <td className="px-4 py-3 text-gray-700">{r.us}</td>
                  <td className="px-4 py-3 text-gray-700">{r.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {a.sections.map((s) => (
        <section key={s.h2} className="mt-10">
          <h2 className={H2}>
            <span className="h-5 w-1 rounded-full bg-indigo-500" aria-hidden />
            {s.h2}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-gray-700">{s.body}</p>
        </section>
      ))}

      {/* Visible FAQ — mirrors the FAQPage schema above */}
      <section className="mt-12">
        <h2 className={H2}>
          <span className="h-5 w-1 rounded-full bg-indigo-500" aria-hidden />
          Frequently asked questions
        </h2>
        <div className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200">
          {a.faqs.map((f, i) => (
            <details key={i} open={i === 0} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-medium text-gray-900 hover:bg-gray-50">
                {f.q}
                <svg className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-4 text-[15px] leading-relaxed text-gray-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-8 text-xs leading-relaxed text-gray-500">
        Disclosure: {SITE_NAME} is our own site. Details about other sites come from their public homepages
        and features visible without an account, checked {updatedLabel}. Features change, so check each site
        before relying on it.
      </p>

      <section className="mt-10 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6">
        <h2 className="text-base font-bold text-gray-900">Browse {SITE_NAME}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {ALT_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:border-indigo-400 hover:bg-indigo-50"
            >
              {l.text}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-bold text-gray-900">More deal site alternatives</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/alternatives/${o.slug}`}
                className="block rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:border-indigo-300 hover:text-indigo-700"
              >
                {o.competitor} alternatives
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
