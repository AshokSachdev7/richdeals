import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, absUrl, itemListSchema, breadcrumbSchema } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop by Category — Deals & Offers",
  description: `Browse deals by category — Electronics, Mobiles, Fashion, Home & Kitchen and more, all in one place on ${SITE_NAME}.`,
  alternates: { canonical: absUrl("/categories") },
};

// Per-category icon + soft colour tile. Static class strings (Tailwind can't
// purge dynamically-built ones). Unknown slugs fall back to a tag icon.
const CAT_META: Record<string, { wrap: string; icon: React.ReactNode }> = {
  accessories: {
    wrap: "bg-amber-50 text-amber-600",
    icon: <path d="M6 8V7a6 6 0 1112 0v1h2l1 13H3L4 8h2zm2 0h8V7a4 4 0 10-8 0v1z" />,
  },
  appliances: {
    wrap: "bg-sky-50 text-sky-600",
    icon: <path d="M4 3h16v18H4zM4 8h16M8 5.5h.01M8 14a4 4 0 108 0 4 4 0 00-8 0z" />,
  },
  "beauty-grooming": {
    wrap: "bg-pink-50 text-pink-600",
    icon: <path d="M9 3h6l-1 4H10zM10 7h4l1 5a3 3 0 01-3 3 3 3 0 01-3-3zM12 15v6M9 21h6" />,
  },
  "books-stationery": {
    wrap: "bg-indigo-50 text-indigo-600",
    icon: <path d="M4 4h11a2 2 0 012 2v14H6a2 2 0 01-2-2zM19 6h1v14H6M8 8h7M8 12h7" />,
  },
  electronics: {
    wrap: "bg-blue-50 text-blue-600",
    icon: <path d="M8 8h8v8H8zM4 10h2M4 14h2M18 10h2M18 14h2M10 4v2M14 4v2M10 18v2M14 18v2" />,
  },
  fashion: {
    wrap: "bg-rose-50 text-rose-600",
    icon: <path d="M9 4l3 2 3-2 5 4-2 3-2-1v8H8v-8l-2 1-2-3z" />,
  },
  footwear: {
    wrap: "bg-orange-50 text-orange-600",
    icon: <path d="M3 8c2 0 3 1 4 2s3 1 5 1 5 1 7 3v3H3zM3 8v6" />,
  },
  "grocery-gourmet": {
    wrap: "bg-green-50 text-green-600",
    icon: <path d="M4 5h2l2 11h10l2-7H7M9 20a1 1 0 100-2 1 1 0 000 2zM18 20a1 1 0 100-2 1 1 0 000 2z" />,
  },
  "home-kitchen": {
    wrap: "bg-teal-50 text-teal-600",
    icon: <path d="M4 11l8-6 8 6M6 10v9h12v-9M10 19v-5h4v5" />,
  },
  mobiles: {
    wrap: "bg-violet-50 text-violet-600",
    icon: <path d="M7 3h10a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM10 18h4" />,
  },
  "sports-fitness": {
    wrap: "bg-red-50 text-red-600",
    icon: <path d="M6 8v8M4 10v4M18 8v8M20 10v4M6 12h12" />,
  },
  "toys-baby": {
    wrap: "bg-yellow-50 text-yellow-600",
    icon: <path d="M12 3a3 3 0 013 3v1h2a2 2 0 012 2v3a2 2 0 01-2 2 2 2 0 000 4H7a2 2 0 000-4 2 2 0 01-2-2V9a2 2 0 012-2h2V6a3 3 0 013-3z" />,
  },
};

const FALLBACK = {
  wrap: "bg-gray-100 text-gray-500",
  icon: <path d="M4 4h7l9 9-7 7-9-9zM8 8h.01" />,
};

export default async function CategoriesPage() {
  const cats = (await getCategories()).filter((c) => c.type === "SHOPPING_CATEGORY");
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
  ];
  const paths = cats.map((c) => `/category/shopping-category/${c.slug}`);

  return (
    <div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema(paths)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mb-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">Shop by Category</h1>
      <p className="mb-7 text-sm text-gray-500">
        Pick a category to see its latest deals, discounts and coupon codes.
      </p>

      {cats.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No categories available yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cats.map((c) => {
            const m = CAT_META[c.slug] ?? FALLBACK;
            return (
              <Link
                key={c.id}
                href={`/category/shopping-category/${c.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.wrap} transition-transform duration-200 group-hover:scale-110`}
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {m.icon}
                  </svg>
                </span>
                <div className="mt-4">
                  <span className="block font-display text-base font-bold leading-tight text-ink group-hover:text-brand">
                    {c.name}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gray-400 transition-colors group-hover:text-brand">
                    Shop deals
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
