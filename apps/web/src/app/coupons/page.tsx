import type { Metadata } from "next";
import { getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SortControl from "@/components/SortControl";
import Pager from "@/components/Pager";
import { HubBullets, HubFaq, newestUpdated } from "@/components/HubExplainer";
import { SITE_NAME, absUrl, itemListSchema, breadcrumbSchema } from "@/lib/site";

const BULLETS = [
  { label: "What's here", text: "live coupon and promo-code offers from Amazon, Flipkart, Myntra and other Indian stores." },
  { label: "How to use", text: "open a listing, copy the code, and apply it in the store's promo-code box before payment." },
  { label: "If a code fails", text: "check the offer terms on the store page — most codes are limited by product, minimum cart value, payment method or first-order status." },
];

const FAQ = [
  { q: "Are these coupon codes verified?", a: "Each code here comes from the store's own offer and is listed with the terms we saw when it was added. Stores can pull or change a code at any time, so check the discount in your cart before you pay." },
  { q: "How do I use a coupon code?", a: "Open the listing, copy the code, go to the store, add the product to your cart, and paste the code into the promo-code box at checkout before completing payment." },
  { q: "Why didn't my code work?", a: "Most codes are restricted by product, minimum cart value, payment method or first-order status. If the discount does not apply, the offer terms on the store page name the restriction." },
  { q: "How often are coupons updated?", a: "New codes are added through the day as they are found. The date above the list is when the newest listing on this page was added." },
];

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ sort?: string; cursor?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // Paged variants are crawl paths to older coupons, not index targets.
  const { cursor } = await searchParams;
  return {
    title: "Coupon Codes Today — Amazon, Flipkart & More",
    description: `Verified coupon codes and promo offers today from Amazon, Flipkart, Myntra and more Indian stores — copy, paste and save on ${SITE_NAME}. Tested and updated daily.`,
    robots: cursor ? { index: false, follow: true } : { index: true, follow: true },
    alternates: { canonical: absUrl("/coupons") },
    openGraph: { title: "Coupon Codes Today — Amazon, Flipkart & More", description: `Verified coupon codes and promo offers today from Amazon, Flipkart, Myntra and more Indian stores on ${SITE_NAME}.`, url: absUrl("/coupons"), type: "website", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: "Coupon Codes Today — Amazon, Flipkart & More" },
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
      <h1 className="mb-1 text-2xl font-extrabold">Coupon Codes Today</h1>
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-600">
        Working promo codes and discount coupons for Amazon, Flipkart, Myntra and more Indian stores — every code
        here is tested and updated daily, so you can copy, paste and save at checkout without hunting for one that
        still works.
      </p>
      <HubBullets bullets={BULLETS} updated={newestUpdated(items)} />
      <div className="mb-5 flex justify-end">
        <SortControl />
      </div>
      <DealGrid deals={items} emptyMessage="No coupons live right now. Check back soon!" />
      <Pager basePath="/coupons" cursor={nextCursor} params={{ sort }} />
      <HubFaq faq={FAQ} />
    </div>
  );
}
