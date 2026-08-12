import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import {
  SITE_NAME,
  formatINR,
  dealProductName,
  collectionStats,
  collectionFaq,
  type CollectionStats,
} from "@/lib/site";

type Deal = Parameters<typeof collectionStats>[0][number];

// AEO+GEO enrichment for the category/store hub pages: a data-backed summary,
// a top-picks comparison table, a visible FAQ accordion, and matching FAQPage
// JSON-LD. All numbers come from the live deals on the page — no fabrication.
// Gated: a hub with too few real deals renders nothing (avoids thin content).
//
// SEO/GEO/AEO are HARD RULES here, not decoration — do not strip on a redesign:
//  1. FAQPage JSON-LD must stay in lock-step with the visible FAQ below (Google
//     manual-action risk if schema shows Q&As the page doesn't).
//  2. The summary is an answer-first citable passage with REAL numbers — the
//     shape AI Overviews / Perplexity quote. Keep it standalone-readable.
//  3. The top-picks table is quotable structured data — keep <th scope> + caption.
//  4. <3 real deals => no summary/table (thin-content gate). No fabricated facts.
export default function CollectionSeo({
  name,
  deals,
  variant,
  extraFaqs,
}: {
  name: string;
  deals: Deal[];
  variant: "category" | "store";
  // Store/category-specific "people also ask" FAQs, merged ahead of the
  // data-driven ones into a single FAQPage. These render even when the hub is
  // too thin for the data summary/table (evergreen AEO copy always shows).
  extraFaqs?: { q: string; a: string }[];
}) {
  const stats: CollectionStats = collectionStats(deals);
  // ponytail: <3 real deals isn't enough to say anything non-generic — skip the
  // data summary + table, but still show any evergreen FAQs passed in.
  const hasData = stats.count >= 3;
  const faqs = [...(extraFaqs ?? []), ...(hasData ? collectionFaq(name, stats, variant) : [])];
  if (!hasData && faqs.length === 0) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const asOf = new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const range =
    stats.min != null && stats.max != null && stats.min !== stats.max
      ? ` priced from ${formatINR(stats.min)} to ${formatINR(stats.max)}`
      : "";

  return (
    <div className="mt-12 border-t border-gray-100 pt-8">
      <JsonLd data={faqSchema} />

      {/* GEO answer-first summary — citable standalone passage with real numbers */}
      {hasData && (
        <section aria-labelledby="collseo-summary">
          <h2
            id="collseo-summary"
            className="font-display text-xl font-bold tracking-tight text-ink"
          >
            {name} deals — quick summary
          </h2>
          <div className="mt-3 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand/[0.06] to-savings/[0.04] p-5">
            <p className="text-[15px] leading-relaxed text-ink-soft">
              As of {asOf}, {SITE_NAME} is tracking{" "}
              <strong className="text-ink">
                {stats.count} live {name} deal{stats.count === 1 ? "" : "s"}
              </strong>
              {range}
              {stats.maxDisc != null ? `, with discounts up to ${stats.maxDisc}% off` : ""}
              {stats.topStore ? ` (most from ${stats.topStore})` : ""}. Prices are pulled from each
              store&apos;s live listing and refresh through the day, so compare across stores and
              stack a bank or card offer at checkout to save the most.
            </p>
            {/* At-a-glance stat chips — reinforce the numbers without re-fabricating */}
            <dl className="mt-4 flex flex-wrap gap-2">
              <Stat label="Live deals" value={String(stats.count)} />
              {stats.min != null && (
                <Stat label="From" value={formatINR(stats.min)} />
              )}
              {stats.maxDisc != null && (
                <Stat label="Up to" value={`${stats.maxDisc}% off`} accent />
              )}
              {stats.topStore && <Stat label="Top store" value={stats.topStore} />}
            </dl>
          </div>
        </section>
      )}

      {/* Top-picks comparison table — the structure answer engines quote */}
      {stats.topPicks.length >= 3 && (
        <section className="mt-8" aria-labelledby="collseo-table">
          <h2
            id="collseo-table"
            className="font-display text-xl font-bold tracking-tight text-ink"
          >
            Top {stats.topPicks.length} {name} deals by discount
          </h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Top {name} deals ranked by discount, with price, MRP and store.
              </caption>
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wide text-ink-soft">
                  <th scope="col" className="py-3 pl-4 pr-3 font-semibold">
                    #
                  </th>
                  <th scope="col" className="py-3 pr-3 font-semibold">
                    Product
                  </th>
                  <th scope="col" className="py-3 pr-3 font-semibold">
                    Price
                  </th>
                  <th scope="col" className="py-3 pr-3 font-semibold">
                    MRP
                  </th>
                  <th scope="col" className="py-3 pr-3 font-semibold">
                    Discount
                  </th>
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    Store
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.topPicks.map((d, i) => (
                  <tr
                    key={d.slug}
                    className="border-t border-gray-100 odd:bg-white even:bg-gray-50/40 hover:bg-brand/[0.04]"
                  >
                    <td className="py-3 pl-4 pr-3">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          i === 0
                            ? "bg-brand text-white"
                            : "bg-brand/10 text-brand-dark"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="py-3 pr-3">
                      <Link
                        href={`/${d.slug}`}
                        className="font-medium text-brand hover:text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-1"
                      >
                        {dealProductName(d)}
                      </Link>
                    </td>
                    <td className="py-3 pr-3 font-semibold tabular-nums text-ink">
                      {formatINR(d.price)}
                    </td>
                    <td className="py-3 pr-3 tabular-nums text-gray-400 line-through">
                      {d.mrp != null ? formatINR(d.mrp) : "—"}
                    </td>
                    <td className="py-3 pr-3">
                      <span className="inline-block rounded-md bg-green-50 px-2 py-0.5 text-xs font-bold tabular-nums text-green-700">
                        {d.disc}% off
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-ink-soft">{d.store?.name ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Visible FAQ — must mirror the FAQPage schema above (Google requires it) */}
      <section className="mt-10" aria-labelledby="collseo-faq">
        <h2
          id="collseo-faq"
          className="font-display text-xl font-bold tracking-tight text-ink"
        >
          {name} deals — frequently asked questions
        </h2>
        <div className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
          {faqs.map((f, i) => (
            <details key={i} open={i === 0} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold text-ink hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/50">
                {f.q}
                <svg
                  className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-4 text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

// Small labelled stat pill for the summary card. dt/dd = machine-readable and
// screen-reader friendly (the label is announced with the value).
function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`inline-flex items-baseline gap-1.5 rounded-full border px-3 py-1 text-xs ${
        accent ? "border-brand/20 bg-brand/5" : "border-gray-200 bg-white"
      }`}
    >
      <dt className="text-ink-soft/70">{label}</dt>
      <dd className={`font-bold tabular-nums ${accent ? "text-brand-dark" : "text-ink"}`}>{value}</dd>
    </div>
  );
}
