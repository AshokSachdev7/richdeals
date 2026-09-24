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
  { label: "What's here", text: "live deals priced at ₹99 or less from Amazon, Flipkart and other Indian stores, each listed with the price we verified when it was added." },
  { label: "How to buy", text: "open a listing, then place the order on the store's own page — nothing is sold on this site. Add-on items may need a minimum cart value." },
  { label: "Stock", text: "sub-₹99 prices sell out fast; expired listings stay online with an EXPIRED label instead of being deleted, so a bookmark never 404s." },
];

const FAQ = [
  { q: "Are the freebies on this page really free?", a: "No — these are near-free deals, every one priced at ₹99 or less when we checked. The price shown is the price verified at listing time; confirm it on the store page before you order. For genuinely free brand samples, see our free-samples guide." },
  { q: "How often is this page updated?", a: "New freebies are added through the day as they are found and verified. The date above the list is when the newest listing on this page was added." },
  { q: "Why has a freebie stopped working?", a: "Sub-₹99 prices are usually short lightning deals or limited stock, and stores reprice without notice. Expired listings keep their page with an EXPIRED label rather than disappearing." },
  { q: "Where can I learn how free sampling works in India?", a: "Our guide to getting free samples in India covers the main sampling programs and the scam checks worth running before you hand over an address." },
];

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ sort?: string; cursor?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // Paged variants are crawl paths to older freebies, not index targets.
  const { cursor } = await searchParams;
  return {
    title: "Freebies Under ₹99 in India Today – Near-Free Deals",
    description: `Freebies and near-free deals in India, every one ₹99 or less and price-checked when listed — Amazon, Flipkart and more, updated through the day on ${SITE_NAME}.`,
    robots: cursor ? { index: false, follow: true } : { index: true, follow: true },
    alternates: { canonical: absUrl("/freebies") },
    openGraph: { title: "Freebies Under ₹99 in India Today", description: `Near-free deals, every one ₹99 or less, updated today on ${SITE_NAME}.`, url: absUrl("/freebies"), type: "website", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: "Freebies Under ₹99 in India Today" },
  };
}

export default async function FreebiesPage({ searchParams }: Props) {
  const { sort, cursor } = await searchParams;
  const { items, nextCursor } = await getDeals({
    maxPrice: 99, // ponytail: no deal is typed FREEBIE; "freebie" = price-capped feed
    sort,
    cursor: cursor ? Number(cursor) : undefined,
    limit: 40,
  });
  const crumbs = [{ name: "Home", href: "/" }, { name: "Freebies", href: "/freebies" }];
  return (
    <div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema(items.map((d) => `/${d.slug}`))} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mb-1 text-2xl font-extrabold">Freebies Under ₹99 in India</h1>
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-600">
        Near-free stuff in India today: every deal below costs ₹99 or less, with the price checked on the store
        page when it was listed. New ones drop through the day and sell out fast. Looking for zero-cost brand
        samples instead? Read our{" "}
        <a href="/blog/how-to-get-free-samples-freebies-india" className="text-brand underline">
          guide to getting free samples in India
        </a>.
      </p>
      <HubBullets bullets={BULLETS} updated={newestUpdated(items)} />
      <div className="mb-5 flex justify-end">
        <SortControl />
      </div>
      <DealGrid deals={items} emptyMessage="No freebies live right now. Check back soon!" />
      <Pager basePath="/freebies" cursor={nextCursor} params={{ sort }} />
      <HubFaq faq={FAQ} />
    </div>
  );
}
