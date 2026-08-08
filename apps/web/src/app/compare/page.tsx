import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
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

// Per-guide visual meta — icon + accent tint keyed by slug. Static class strings
// (not concatenated) so Tailwind keeps them. Unknown slugs fall back to `generic`.
// ponytail: 4 evergreen guides, a small local map beats a data-model column.
type Meta = { icon: ReactNode; badge: string; chip: string };
const ICON = "h-6 w-6";
const META: Record<string, Meta> = {
  "qled-vs-oled": {
    badge: "bg-indigo-50 text-indigo-600",
    chip: "bg-indigo-50 text-indigo-700",
    icon: (
      <svg className={ICON} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <rect x="2.5" y="4" width="19" height="13" rx="2" />
        <path strokeLinecap="round" d="M8 20.5h8M12 17.5v3" />
      </svg>
    ),
  },
  "amoled-vs-oled": {
    badge: "bg-violet-50 text-violet-600",
    chip: "bg-violet-50 text-violet-700",
    icon: (
      <svg className={ICON} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
        <path strokeLinecap="round" d="M10.5 5.5h3" />
      </svg>
    ),
  },
  "ssd-vs-hdd": {
    badge: "bg-cyan-50 text-cyan-600",
    chip: "bg-cyan-50 text-cyan-700",
    icon: (
      <svg className={ICON} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <rect x="2.5" y="6" width="19" height="12" rx="2" />
        <circle cx="7" cy="12" r="1.4" />
        <path strokeLinecap="round" d="M11 12h7M11 15h7" />
      </svg>
    ),
  },
  "front-load-vs-top-load-washing-machine": {
    badge: "bg-rose-50 text-rose-600",
    chip: "bg-rose-50 text-rose-700",
    icon: (
      <svg className={ICON} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <rect x="4.5" y="2.5" width="15" height="19" rx="2.5" />
        <circle cx="12" cy="13.5" r="4" />
        <path strokeLinecap="round" d="M8 5.5h.5M11 5.5h5" />
      </svg>
    ),
  },
};
const GENERIC: Meta = {
  badge: "bg-gray-100 text-gray-600",
  chip: "bg-gray-100 text-gray-700",
  icon: (
    <svg className={ICON} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M6 8l-3 5h6l-3-5zM18 8l-3 5h6l-3-5zM4 21h16" />
    </svg>
  ),
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

      {/* Hero */}
      <div className="mt-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H5v14l4-2 4 2 4-2 4 2V5l-4 2-4-2-4 2z" />
          </svg>
          Buying Guides
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Compare before you buy
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-gray-600">
          Confused between two options? These plain-English comparisons give you a clear verdict and a
          side-by-side table so you can pick fast — then grab the best live price from our deals.
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-gray-400">
          <span>Clear verdicts</span>
          <span aria-hidden>·</span>
          <span>No jargon</span>
          <span aria-hidden>·</span>
          <span>Updated for 2026</span>
        </p>
      </div>

      {/* Guide cards */}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {COMPARISONS.map((c) => {
          const m = META[c.slug] ?? GENERIC;
          return (
            <li key={c.slug}>
              <Link
                href={`/compare/${c.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${m.badge}`}>
                    {m.icon}
                  </span>
                  <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    {c.intent}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-bold leading-snug text-gray-900 group-hover:text-indigo-700">
                  {c.h1}
                </h2>

                {/* A vs B */}
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className={`rounded-md px-2 py-1 font-semibold ${m.chip}`}>{c.aLabel}</span>
                  <span className="text-xs font-bold uppercase text-rose-500">vs</span>
                  <span className={`rounded-md px-2 py-1 font-semibold ${m.chip}`}>{c.bLabel}</span>
                </div>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                  Read the verdict
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M18 12H4" />
                  </svg>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
