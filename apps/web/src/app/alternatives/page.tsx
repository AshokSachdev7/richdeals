import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { ALTERNATIVES } from "@/lib/alternatives";
import { SITE_NAME, absUrl, breadcrumbSchema, itemListSchema } from "@/lib/site";

export const dynamic = "force-static";

const TITLE = "Best Deal Site Alternatives in India (2026)";
const DESC = `Honest alternatives to DesiDime, FreeKaaMaal, IndiaFreeStuff and DealsMagnet for Indian shoppers — compare deal, coupon and cashback sites, including ${SITE_NAME}.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: absUrl("/alternatives") },
  openGraph: { siteName: SITE_NAME, locale: "en_IN", title: TITLE, description: DESC, url: absUrl("/alternatives"), type: "website", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
};

export default function AlternativesIndexPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Deal Site Alternatives", href: "/alternatives" },
  ];
  return (
    <div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema(ALTERNATIVES.map((a) => `/alternatives/${a.slug}`))} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-2">
        <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Alternatives
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{TITLE}</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-gray-600">
          Looking for a site like DesiDime, FreeKaaMaal or IndiaFreeStuff? Each guide below lists the best
          alternatives with honest pros and cons — deal feeds, coupon sites and cashback sites — so you can pick
          the one that fits how you shop. {SITE_NAME} is our own site and is marked as such.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {ALTERNATIVES.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/alternatives/${a.slug}`}
              className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/60 motion-reduce:transform-none"
            >
              <h2 className="text-lg font-bold leading-snug text-gray-900">{a.h1}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">{a.answer}</p>
              <span className="mt-4 text-sm font-semibold text-indigo-600">See the alternatives →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
