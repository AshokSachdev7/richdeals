import type { Metadata } from "next";
import { getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SortControl from "@/components/SortControl";
import Pager from "@/components/Pager";
import { SITE_NAME, absUrl, itemListSchema, breadcrumbSchema } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ sort?: string; cursor?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // Paged variants are crawl paths to older coupons, not index targets.
  const { cursor } = await searchParams;
  return {
    title: "Coupon Codes & Promo Offers",
    description: `Verified coupon codes and promo offers from top Indian stores — copy, paste and save on ${SITE_NAME}.`,
    robots: cursor ? { index: false, follow: true } : undefined,
    alternates: { canonical: absUrl("/coupons") },
  };
}

export default async function CouponsPage({ searchParams }: Props) {
  const { sort, cursor } = await searchParams;
  const { items, nextCursor } = await getDeals({
    type: "COUPON",
    sort,
    cursor: cursor ? Number(cursor) : undefined,
    limit: 40,
  });
  const crumbs = [{ name: "Home", href: "/" }, { name: "Coupons", href: "/coupons" }];
  return (
    <div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema(items.map((d) => `/${d.slug}`))} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mb-1 text-2xl font-extrabold">Coupon Codes</h1>
      <p className="mb-4 text-sm text-gray-500">
        Working promo codes and discount coupons, tested and updated daily.
      </p>
      <div className="mb-5 flex justify-end">
        <SortControl />
      </div>
      <DealGrid deals={items} emptyMessage="No coupons live right now. Check back soon!" />
      <Pager basePath="/coupons" cursor={nextCursor} params={{ sort }} />
    </div>
  );
}
