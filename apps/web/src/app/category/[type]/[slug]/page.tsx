import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SortControl from "@/components/SortControl";
import Pager from "@/components/Pager";
import CollectionSeo from "@/components/CollectionSeo";
import { SITE_NAME, absUrl, CATEGORY_TYPE_LABEL, dealItemListSchema, breadcrumbSchema } from "@/lib/site";

export const dynamic = "force-dynamic";

type CatType = "shopping-category" | "shopping-site";
type Props = {
  params: Promise<{ type: string; slug: string }>;
  searchParams: Promise<{ sort?: string; cursor?: string }>;
};

function isType(v: string): v is CatType {
  return v === "shopping-category" || v === "shopping-site";
}

function titleize(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { type, slug } = await params;
  if (!isType(type)) return { title: "Not found" };
  // Paginated pages are crawl paths to older deals, not index targets.
  const { cursor } = await searchParams;
  const cat = await getCategory(type, slug);
  const name = cat?.name || titleize(slug);
  const label = CATEGORY_TYPE_LABEL[type];
  const title = `${name} ${label} Deals & Offers`;
  const description = `Best ${name} deals & coupons in India — verified live prices from Amazon, Flipkart & 100+ stores, updated daily on ${SITE_NAME}.`;
  return {
    title,
    description,
    robots: cursor ? { index: false, follow: true } : undefined,
    alternates: { canonical: absUrl(`/category/${type}/${slug}`) },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, type: "website", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { type, slug } = await params;
  if (!isType(type)) notFound();
  const { sort, cursor } = await searchParams;

  const cat = await getCategory(type, slug);
  const name = cat?.name || titleize(slug);
  const { items, nextCursor } = await getDeals({
    categoryType: type,
    category: slug,
    sort,
    cursor: cursor ? Number(cursor) : undefined,
    limit: 40,
  });

  const crumbs = [
    { name: "Home", href: "/" },
    { name: CATEGORY_TYPE_LABEL[type], href: "/" },
    { name, href: `/category/${type}/${slug}` },
  ];

  const itemListSchema = dealItemListSchema(items, `${name} deals`);

  return (
    <div>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
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
      <Pager basePath={`/category/${type}/${slug}`} cursor={nextCursor} params={{ sort }} />
      {!cursor && <CollectionSeo name={name} deals={items} variant="category" />}
    </div>
  );
}
