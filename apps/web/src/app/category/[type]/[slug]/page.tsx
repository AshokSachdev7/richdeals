import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SortControl from "@/components/SortControl";
import { SITE_NAME, absUrl, CATEGORY_TYPE_LABEL } from "@/lib/site";

export const revalidate = 300;

type CatType = "shopping-category" | "shopping-site";
type Props = {
  params: Promise<{ type: string; slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

function isType(v: string): v is CatType {
  return v === "shopping-category" || v === "shopping-site";
}

function titleize(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, slug } = await params;
  if (!isType(type)) return { title: "Not found" };
  const cat = await getCategory(type, slug);
  const name = cat?.name || titleize(slug);
  const label = CATEGORY_TYPE_LABEL[type];
  const title = `${name} ${label} Deals & Offers`;
  const description = `Best ${name} deals, discounts and coupons — updated daily on ${SITE_NAME}. Save more on every ${name} order.`;
  return {
    title,
    description,
    alternates: { canonical: absUrl(`/category/${type}/${slug}`) },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, type: "website" },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { type, slug } = await params;
  if (!isType(type)) notFound();
  const { sort } = await searchParams;

  const cat = await getCategory(type, slug);
  const name = cat?.name || titleize(slug);
  const { items } = await getDeals({ categoryType: type, category: slug, sort, limit: 40 });

  const crumbs = [
    { name: "Home", href: "/" },
    { name: CATEGORY_TYPE_LABEL[type], href: "/" },
    { name, href: `/category/${type}/${slug}` },
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${name} deals`,
    itemListElement: items.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absUrl(`/${d.slug}`),
      name: d.title,
    })),
  };

  return (
    <div>
      <JsonLd data={itemListSchema} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-2xl font-extrabold">{name} Deals</h1>
      <p className="mt-1 text-sm text-gray-500">
        Discover the latest {name} offers, discounts and coupon codes handpicked by {SITE_NAME}.
        Prices refresh throughout the day — grab them before they expire.
      </p>
      <div className="mb-5 mt-4 flex justify-end">
        <SortControl />
      </div>
      <DealGrid deals={items} emptyMessage={`No ${name} deals live right now. Check back soon!`} />
    </div>
  );
}
