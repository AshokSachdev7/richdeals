import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, absUrl, itemListSchema, breadcrumbSchema } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Shop by Category — Deals & Offers",
  description: `Browse deals by category — Electronics, Mobiles, Fashion, Home & Kitchen and more, all in one place on ${SITE_NAME}.`,
  alternates: { canonical: absUrl("/categories") },
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
      <h1 className="mb-1 font-display text-2xl font-extrabold text-ink">Shop by Category</h1>
      <p className="mb-6 text-sm text-gray-500">
        Pick a category to see its latest deals, discounts and coupon codes.
      </p>

      {cats.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No categories available yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cats.map((c) => (
            <Link
              key={c.id}
              href={`/category/shopping-category/${c.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-lg font-extrabold text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                {c.name.charAt(0)}
              </span>
              <span className="font-display text-sm font-bold leading-tight text-ink group-hover:text-brand sm:text-base">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
