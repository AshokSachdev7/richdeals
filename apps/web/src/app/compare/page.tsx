import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { COMPARISONS } from "@/lib/comparisons";
import { SITE_NAME, absUrl, breadcrumbSchema, itemListSchema } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Buying Guides — Compare Before You Buy",
  description: `Simple, up-to-date buying guides for Indian shoppers on ${SITE_NAME}: QLED vs OLED, SSD vs HDD, AMOLED vs OLED, front load vs top load and more, with clear verdicts.`,
  alternates: { canonical: absUrl("/compare") },
};

export default function CompareIndexPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Buying Guides", href: "/compare" },
  ];
  return (
    <div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema(COMPARISONS.map((c) => `/compare/${c.slug}`))} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-2 text-2xl font-extrabold">Buying Guides</h1>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-600">
        Confused between two options? These plain-English comparisons give you a clear verdict and a
        side-by-side table so you can pick fast — then grab the best live price from our deals.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {COMPARISONS.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/compare/${c.slug}`}
              className="block rounded-xl border border-gray-100 p-4 transition hover:border-indigo-200 hover:bg-gray-50"
            >
              <span className="font-semibold text-gray-900">{c.h1}</span>
              <span className="mt-1 block text-sm text-gray-500">{c.intent}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
