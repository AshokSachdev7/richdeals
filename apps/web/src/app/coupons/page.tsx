import type { Metadata } from "next";
import { getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, absUrl, itemListSchema, breadcrumbSchema } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Coupon Codes & Promo Offers",
  description: `Verified coupon codes and promo offers from top Indian stores — copy, paste and save on ${SITE_NAME}.`,
  alternates: { canonical: absUrl("/coupons") },
};

export default async function CouponsPage() {
  const { items } = await getDeals({ type: "COUPON", limit: 40 });
  const crumbs = [{ name: "Home", href: "/" }, { name: "Coupons", href: "/coupons" }];
  return (
    <div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema(items.map((d) => `/${d.slug}`))} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mb-1 text-2xl font-extrabold">Coupon Codes</h1>
      <p className="mb-5 text-sm text-gray-500">
        Working promo codes and discount coupons, tested and updated daily.
      </p>
      <DealGrid deals={items} emptyMessage="No coupons live right now. Check back soon!" />
    </div>
  );
}
