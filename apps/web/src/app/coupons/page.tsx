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
  { label: "What's here", text: "live deals that carry an extra coupon on top of the sale price — mostly Amazon clip coupons, plus bank and store offers." },
  { label: "How to use", text: "open a listing, go to the product page, tick the coupon box under the price, then add to cart — the coupon comes off at checkout." },
  { label: "Price shown", text: "the listed price is the verified price before the coupon; the coupon note on each deal says how much extra comes off." },
];

const FAQ = [
  { q: "What is an Amazon clip coupon?", a: "A clip coupon is an extra discount shown as a checkbox under the price on an Amazon product page. Tick it before adding the item to your cart and the amount is taken off at checkout — no code to type." },
  { q: "Is the price on this page before or after the coupon?", a: "Before. We list the price we verified on the product page; the coupon note on each deal says how much more the coupon takes off. Coupons we could not confirm are marked as claimed, not verified." },
  { q: "Why didn't the coupon apply?", a: "Clip coupons run out, are limited to one per account, or apply only to a specific seller or size. If the checkbox is gone from the product page, the coupon has ended." },
  { q: "How often are coupon deals updated?", a: "New coupon deals are added through the day as they are found. The date above the list is when the newest listing on this page was added." },
];

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ sort?: string; cursor?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // Paged variants are crawl paths to older coupons, not index targets.
  const { cursor } = await searchParams;
  return {
    title: "Amazon Coupons Today – Clip Coupon Deals in India",
    description: `Amazon clip coupons and extra-coupon deals in India today — price-checked products with an extra coupon on top of the sale price, updated daily on ${SITE_NAME}.`,
    robots: cursor ? { index: false, follow: true } : { index: true, follow: true },
    alternates: { canonical: absUrl("/coupons") },
    openGraph: { title: "Amazon Coupons Today – Clip Coupon Deals", description: `Price-checked deals with an extra coupon on top, updated daily on ${SITE_NAME}.`, url: absUrl("/coupons"), type: "website", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: "Amazon Coupons Today – Clip Coupon Deals" },
  };
}

export default async function CouponsPage({ searchParams }: Props) {
  const { sort, cursor } = await searchParams;
  const { items, nextCursor } = await getDeals({
    coupon: true, // ponytail: no deal is typed COUPON; "coupon" = has a couponNote
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
      <h1 className="mb-1 text-2xl font-extrabold">Amazon Coupons &amp; Clip Coupon Deals Today</h1>
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-600">
        Deals with an extra coupon on top of the sale price, mostly Amazon clip coupons. Each price below was
        checked on the product page when listed; the coupon note on the deal says how much more comes off when
        you tick the coupon box before adding to cart.
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
