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
      <section>
        <h2 className="text-lg font-bold">{name} deals — quick summary</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-700">
          As of {asOf}, {SITE_NAME} is tracking{" "}
          <strong>
            {stats.count} live {name} deal{stats.count === 1 ? "" : "s"}
          </strong>
          {range}
          {stats.maxDisc != null ? `, with discounts up to ${stats.maxDisc}% off` : ""}
          {stats.topStore ? ` (most from ${stats.topStore})` : ""}. Prices are pulled from each
          store&apos;s live listing and refresh through the day, so compare across stores and stack a
          bank or card offer at checkout to save the most.
        </p>
      </section>
      )}

      {/* Top-picks comparison table — the structure answer engines quote */}
      {stats.topPicks.length >= 3 && (
        <section className="mt-6">
          <h2 className="text-lg font-bold">Top {stats.topPicks.length} {name} deals by discount</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2 pr-3 font-medium">Product</th>
                  <th className="py-2 pr-3 font-medium">Price</th>
                  <th className="py-2 pr-3 font-medium">MRP</th>
                  <th className="py-2 pr-3 font-medium">Discount</th>
                  <th className="py-2 font-medium">Store</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPicks.map((d) => (
                  <tr key={d.slug} className="border-b border-gray-100">
                    <td className="py-2 pr-3">
                      <Link href={`/${d.slug}`} className="font-medium text-indigo-600 hover:underline">
                        {dealProductName(d)}
                      </Link>
                    </td>
                    <td className="py-2 pr-3 tabular-nums font-semibold">{formatINR(d.price)}</td>
                    <td className="py-2 pr-3 tabular-nums text-gray-400 line-through">
                      {d.mrp != null ? formatINR(d.mrp) : "—"}
                    </td>
                    <td className="py-2 pr-3 tabular-nums font-semibold text-green-600">{d.disc}% off</td>
                    <td className="py-2 text-gray-600">{d.store?.name ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Visible FAQ — must mirror the FAQPage schema above (Google requires it) */}
      <section className="mt-8">
        <h2 className="text-lg font-bold">{name} deals — frequently asked questions</h2>
        <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-100">
          {faqs.map((f, i) => (
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
    </div>
  );
}
