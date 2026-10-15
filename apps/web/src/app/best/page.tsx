import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { BEST_TOPICS } from "@/lib/best";
import { SITE_NAME, absUrl, breadcrumbSchema } from "@/lib/site";

const TITLE = "Best Deals Buying Guides – Live Prices Today";
const DESC =
  "Buying guides with live deals: earbuds, smartwatches, power banks, perfumes, backpacks, mixer grinders and more. What to check before you buy, prices verified.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: absUrl("/best") },
  openGraph: { siteName: SITE_NAME, locale: "en_IN", title: TITLE, description: DESC, url: absUrl("/best"), type: "website", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
};

export default function BestIndex() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Buying Guides", href: "/best" },
  ];
  return (
    <div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: TITLE,
          itemListElement: BEST_TOPICS.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: absUrl(`/best/${t.slug}`), name: t.h1 })),
        }}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="mb-1 text-2xl font-extrabold">Best Deals Buying Guides</h1>
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-gray-600">
        Each guide lists the {SITE_NAME} deals live right now for one product type, cheapest first, with a short checklist of
        what to compare before you buy. Prices come from the store page at the time each deal was listed.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {BEST_TOPICS.map((t) => (
          <li key={t.slug} className="rounded-lg border border-gray-200 p-4">
            <Link href={`/best/${t.slug}`} className="font-semibold text-brand hover:underline">
              {t.h1}
            </Link>
            <p className="mt-1 text-sm text-gray-600">{t.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
